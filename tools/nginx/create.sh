#!/bin/bash

# Building two deployable images, one with latest revision and second with 'latest' as tags.
docker build --rm -t registry.mckinsey.com/ks/asset-library/asset-library-fe-nginx:`cat asset_library_fe_revision` -f tools/nginx/Dockerfile .
docker push registry.mckinsey.com/ks/asset-library/asset-library-fe-nginx:`cat asset_library_fe_revision`
docker rmi -f registry.mckinsey.com/ks/asset-library/asset-library-fe-nginx:`cat asset_library_fe_revision`
echo \"registry.mckinsey.com/ks/asset-library/asset-library-fe-nginx:`cat asset_library_fe_revision`\" | tee build_nginx_image_ref