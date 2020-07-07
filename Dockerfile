FROM solr

MAINTAINER Kallol Das<kallolds@gmail.com>

USER root

RUN apt-get update && apt-get install jq -y

RUN mkdir -p /covid_data

WORKDIR /covid_data

#fetching data from covid19 apis and performing ETL operations
RUN curl -s https://api.covid19india.org/raw_data1.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data1.json

RUN curl -s https://api.covid19india.org/raw_data2.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data2.json

RUN curl -s https://api.covid19india.org/raw_data3.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data3.json

RUN curl -s https://api.covid19india.org/raw_data4.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data4.json

RUN curl -s https://api.covid19india.org/raw_data5.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data5.json

RUN curl -s https://api.covid19india.org/raw_data6.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data6.json

RUN curl -s https://api.covid19india.org/raw_data7.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data7.json

RUN curl -s https://api.covid19india.org/raw_data8.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data8.json

COPY --chown=solr:solr entrypoint.sh .

RUN chmod +x entrypoint.sh

USER solr


