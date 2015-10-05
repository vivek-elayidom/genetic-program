from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404, HttpResponseNotFound
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_GET, require_POST
from django.conf import settings
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from models import Job
from datetime import datetime
import json, subprocess, shlex, csv, os, uuid
from urllib2 import urlopen
from urllib import quote, quote_plus



def login_user(request):
	if request.method == "POST":
		# print request.POST
		email, password, next_url = request.POST.get('email'), request.POST.get('password'), request.GET.get('next')
		next_url = '' if next_url in (None, 'None') else next_url

		try:
			user_qs = User.objects.filter(email=email)
			if not user_qs.exists():
				raise User.DoesNotExist

			user = user_qs[0]
			user = authenticate(username=user.username, password=password)

			if not user:
				raise User.DoesNotExist

			login(request, user)
			redirect_url = '/' if next_url == '' else next_url
			return HttpResponseRedirect(redirect_url)
		except (User.DoesNotExist, ObjectDoesNotExist):
			return render(request, 'login.html', {'err': 'Invalid Email or Password', 'next_url': next_url})
	else:
		user = request.user
		if user.is_anonymous():
			next_url = request.GET.get('next')
			next_url = '' if next_url in (None, 'None') else next_url
			return render(request, 'login.html', {'err': '', 'next_url': next_url})
		else:
			return HttpResponseRedirect('/')



@login_required
def job_create(request):
	return render(request, 'job_create.html')



@login_required
@require_POST
def api_job_create(request):
	print request.POST
	job = Job(
		user = request.user,
		annotation_program = request.POST.get('annotation_program'),
		annotation_databases = request.POST.get('annotation_databases'),
		params = request.POST.get('params'),
		csvout = str(uuid.uuid3(uuid.NAMESPACE_DNS, str(datetime.now())))
	)
	job.dossier = request.FILES['dossier']
	job.save()

	media_url = settings.MEDIA_ROOT + "/"

	annotation_cmd = "perl " + (settings.ANNOVAR_PATH + "table_annovar.pl ") + (media_url + str(job.dossier)) + " " + (settings.ANNOVAR_PATH + "humandb/") + " -buildver hg19 -out " + (media_url + "job/output/" + job.csvout) + " -remove -protocol " + job.annotation_databases + " -operation " + job.params + " -nastring . -csvout"
	params = shlex.split(annotation_cmd)
	print params
	p = subprocess.Popen(params, stdout=subprocess.PIPE)
	output, error = p.communicate()
	print output, error

	outputfile = (media_url + "job/output/" + job.csvout + ".hg19_multianno.csv")

	if os.path.isfile(outputfile):
		tmplist, x = [], settings.GENE_DIFF_HEADER
		with open(outputfile, 'rb') as file1:
			reader = csv.DictReader(file1)
			for row in reader:
				newrow = {}
				for key, value in row.items():
					if value != '.':
						newrow[key] = value
					else:
						newrow[key] = 0 if x[key] == 'number' else '-'
				tmplist.append(newrow)

		jsonfile = media_url + job.csvout + '.json'
		with open(jsonfile, 'w') as file2:
			json.dump(tmplist, file2)

		create_collection_cmd = settings.SOLR_PATH + 'bin/solr create -c ' + job.csvout + ' -n data_driven_schema_configs'
		params = shlex.split(create_collection_cmd)
		print params
		p = subprocess.Popen(params, stdout=subprocess.PIPE)
		output, error = p.communicate()
		print output, error

		index_jsonfile_cmd = settings.SOLR_PATH + 'bin/post -c ' + job.csvout + ' ' + jsonfile
		params = shlex.split(index_jsonfile_cmd)
		print params
		p = subprocess.Popen(params, stdout=subprocess.PIPE)
		output, error = p.communicate()
		print output, error

		if os.path.isfile(jsonfile):
			os.remove(jsonfile)

		return HttpResponse(content=json.dumps(job.id), content_type='application/json', status=200)
	else:
		return HttpResponse(content=json.dumps({'msg': 'exception'}), content_type='application/json', status=412)



@login_required
def job_filter(request, job_id):
	try:
		job = Job.objects.get(pk=job_id)
		return render(request, 'job_results.html')
	except Job.DoesNotExist as e:
		print e
		return HttpResponseNotFound('<h1>Page not found</h1>')



@login_required
@require_POST
def api_job_filter(request, job_id):
	try:
		job = Job.objects.get(pk=job_id)
		start = request.POST.get('start', 0)
		q = request.POST.get('q', '*:*')
		q = quote(q)
		solr_url = 'http://localhost:8983/solr/' + str(job.csvout) + '/select?q=' + q + '&start=' + str(start) + '&rows=15&wt=json'
		print solr_url
		connection = urlopen(solr_url)
		result = json.load(connection)
		return HttpResponse(content=json.dumps(result['response']['docs']), content_type='application/json', status=200)
	except Job.DoesNotExist as e:
		print e
		return HttpResponse(content=json.dumps(True), content_type='application/json', status=412)