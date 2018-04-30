#!bin/bash
subscription-manager repos --enable rhel-server-rhscl-7-rpms
yum udpate
yum update
yum provides nginx
yum install nginx14
systemctl start nginx14-nginx
systemctl status nginx14-nginx
## nginx.conf location /opt/rh/nginx14/root/etc/nginx/nginx.conf
sudo systemctl daemon-reload
