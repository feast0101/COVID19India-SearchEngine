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
  echo "Loading covid-19 data"
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data1.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data2.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data3.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data4.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data5.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data6.json
  /opt/solr/bin/post -c $CORE -commit no /covid_data/raw_data7.json
  /opt/solr/bin/post -c $CORE -commit yes /covid_data/raw_data8.json
  echo "Loaded covid-19 data"
  stop-local-solr

    # check the core_dir exists; otherwise the detecting above will fail after stop/start
    if [ ! -d "$CORE_DIR" ]; then
        echo "Missing $CORE_DIR"
        exit 1
    fi
fi

exec solr-fg