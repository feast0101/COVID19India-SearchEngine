# Base Image
FROM registry.mckinsey.com/gold-images/nodejs:8.9-alpine

MAINTAINER KNOW Dev Team<know_dev@mckinsey.com>

# create directory for asset library frontend
RUN mkdir -p /code/asset-library-fe

# Copy package.json file
COPY package.json /code/asset-library-fe/

# Copy package-lock.json file
#COPY package-lock.json /code/asset-fe/

# Run Install
RUN cd /code/asset-library-fe && npm install 

#&& rm /code/asset-fe/package.json 

#&& rm /code/asset-fe/package-lock.json

#Copy product.yml for application scorecard
COPY product.yml /

# Working directory trm-fe
WORKDIR /code/asset-library-fe