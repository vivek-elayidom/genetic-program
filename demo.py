import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

import django
django.setup()

from django.contrib.auth.models import User



# Start execution here!
if __name__ == '__main__':
	print 'Starting demo population...'

	user = User(
		first_name='Vivek',
		last_name='Elayidom',
		username='vivek.elayidom',
		email='vivek.elayidom@mdrift.com'
	)
	user.set_password('justgo')
	user.save()

	print 'Created a sample user Vivek Elayidom'