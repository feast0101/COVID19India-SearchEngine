#!/bin/bash
echo "=========== startup script begins =================="

if ! /opt/docker-solr/scripts/wait-for-solr.sh --max-attempts 2 --wait-seconds 10; 
then
    echo "Could not start Solr."
    exit 1
else
#creating solr collection core
/opt/solr-8.5.2/bin/solr create_core -c covid-19

#injecting data
/opt/solr-8.5.2/bin/post -c covid-19 /covid_data/raw_data1.json
/opt/solr-8.5.2/bin/post -c covid-19 /covid_data/raw_data2.json
/opt/solr-8.5.2/bin/post -c covid-19 /covid_data/raw_data3.json
/opt/solr-8.5.2/bin/post -c covid-19 /covid_data/raw_data4.json
/opt/solr-8.5.2/bin/post -c covid-19 /covid_data/raw_data5.json
/opt/solr-8.5.2/bin/post -c covid-19 /covid_data/raw_data6.json
/opt/solr-8.5.2/bin/post -c covid-19 /covid_data/raw_data7.json
/opt/solr-8.5.2/bin/post -c covid-19 /covid_data/raw_data8.json
fi
exec "$@"