from django.conf.urls import url
from app_genetic import views

urlpatterns = [
	url(r'^login/$', views.login_user),
	# url(r'^logout/$', views.logout_user),
	url(r'^$', views.job_create),
	url(r'^job/(?P<job_id>.+)/filter/$', views.job_filter),
	url(r'^api/job/create/$', views.api_job_create),
	url(r'^api/job/(?P<job_id>.+)/filter/$', views.api_job_filter),
]