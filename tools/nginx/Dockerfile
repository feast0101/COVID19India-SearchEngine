# Base Image
FROM registry.mckinsey.com/gold-images/nginx:1.11.9

MAINTAINER KNOW Dev Team<know_dev@mckinsey.com>

RUN chown -R nginx:nginx /var/run
RUN chown -R nginx:nginx /run
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chown -R nginx:nginx /etc/nginx
RUN chown -R nginx:nginx /var/cache/nginx

USER nginx

# Adding local configs  
ADD tools/nginx/configs /etc/nginx/configs

# Adding customized default.conf to override existing default.conf
ADD tools/nginx/default.conf /etc/nginx/conf.d/default.conf

# Adding customized nginx.conf to override existing nginx.conf
ADD tools/nginx/nginx.conf /etc/nginx/nginx.conf

# Adding artifact folder content in root of nginx / location
ADD build /usr/share/nginx/html/