#!/bin/bash
#
# Configure a Solr core and then run solr in the foreground

set -euo pipefail

if [[ "${VERBOSE:-}" == "yes" ]]; then
    set -x
fi

. /opt/docker-solr/scripts/run-initdb

CORE=covid19
CORE_DIR="${SOLR_HOME:-/opt/solr/server/solr}/covid19"
if [ -d "$CORE_DIR" ]; then
  echo "$CORE_DIR exists; skipping covid 19 core creation"
else
  start-local-solr
  echo "Creating $CORE"
  /opt/solr/bin/solr create -c "$CORE"
  echo "Created $CORE"
  curl -s https://api.covid19india.org/raw_data23.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data23.json
  echo "Loading covid-19 data"
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data1.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data2.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data3.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data4.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data5.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data6.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data7.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data8.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data9.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data10.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data11.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data12.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data13.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data14.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data15.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data16.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data17.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data18.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data19.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data20.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data21.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data22.json
  /opt/solr/bin/post -c $CORE -commit yes /covid_data/raw_data23.json
  
  echo "Loaded covid-19 data"
  stop-local-solr

    # check the core_dir exists; otherwise the detecting above will fail after stop/start
    if [ ! -d "$CORE_DIR" ]; then
        echo "Missing $CORE_DIR"
        exit 1
    fi
fi

exec solr-fg