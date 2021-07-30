FROM solr

MAINTAINER Kallol Das<kallolds@gmail.com>

USER root

RUN apt-get update &&  apt-get install -y \
jq \
wget \
&& rm -rf /var/lib/apt/lists/*

RUN mkdir -p /opt/cprof && \
    wget -q -O- https://storage.googleapis.com/cloud-profiler/java/latest/profiler_java_agent.tar.gz \
    | tar xzv -C /opt/cprof

RUN mkdir -p /covid_data

WORKDIR /covid_data
 
COPY --chown=0:0 update /opt/docker-solr/scripts/update

RUN chmod +x /opt/docker-solr/scripts/update

#fetching data from covid19 apis and performing ETL operations
RUN curl -s https://api.covid19india.org/raw_data1.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data1.json

RUN curl -s https://api.covid19india.org/raw_data2.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data2.json

RUN curl -s https://api.covid19india.org/raw_data3.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data3.json

RUN curl -s https://api.covid19india.org/raw_data4.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data4.json

RUN curl -s https://api.covid19india.org/raw_data5.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data5.json

RUN curl -s https://api.covid19india.org/raw_data6.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data6.json

RUN curl -s https://api.covid19india.org/raw_data7.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data7.json

RUN curl -s https://api.covid19india.org/raw_data8.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data8.json

RUN curl -s https://api.covid19india.org/raw_data9.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data9.json

RUN curl -s https://api.covid19india.org/raw_data10.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data10.json

RUN curl -s https://api.covid19india.org/raw_data11.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data11.json

RUN curl -s https://api.covid19india.org/raw_data12.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data12.json

RUN curl -s https://api.covid19india.org/raw_data13.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data13.json

RUN curl -s https://api.covid19india.org/raw_data14.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data14.json

RUN curl -s https://api.covid19india.org/raw_data15.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data15.json

RUN curl -s https://api.covid19india.org/raw_data16.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data16.json

RUN curl -s https://api.covid19india.org/raw_data17.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data17.json

RUN curl -s https://api.covid19india.org/raw_data18.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data18.json

RUN curl -s https://api.covid19india.org/raw_data19.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data19.json

RUN curl -s https://api.covid19india.org/raw_data20.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data20.json

RUN curl -s https://api.covid19india.org/raw_data21.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data21.json

RUN curl -s https://api.covid19india.org/raw_data22.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data22.json

RUN curl -s https://api.covid19india.org/raw_data23.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data23.json

RUN curl -s https://api.covid19india.org/raw_data24.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data24.json

RUN curl -s https://api.covid19india.org/raw_data25.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data25.json

RUN curl -s https://api.covid19india.org/raw_data26.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data26.json

RUN curl -s https://api.covid19india.org/raw_data27.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data27.json

RUN curl -s https://api.covid19india.org/raw_data28.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data28.json

RUN curl -s https://api.covid19india.org/raw_data29.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data29.json

RUN curl -s https://api.covid19india.org/raw_data30.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data30.json

RUN curl -s https://api.covid19india.org/raw_data31.json | jq -r '[.raw_data[] | {entryid : .entryid, patientnumber : .patientnumber, detecteddistrict : .detecteddistrict, detectedstate : .detectedstate, numcases : .numcases, source1 : .source1, statecode : .statecode, dateannounced : .dateannounced, currentstatus : .currentstatus, notes : .notes} ]'  >> raw_data31.json

RUN chown solr:solr /covid_data

COPY --chown=solr:solr covid-search.sh .

RUN chmod +x /covid_data/covid-search.sh

USER solr

ENTRYPOINT ["/bin/bash", "-c", "/covid_data/covid-search.sh"]
