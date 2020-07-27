# COVID 19 India data search engine

An implementation of Apache Solr based search engine API indexing daily covid-19  related data of all Indian states/UT. It bootstraps latest collection of data from https://api.covid19india.org/ endpoints

Commands to run:

docker run --name covid19-search -d -p 8983:8983 feast0101/covid19-search:india

To index/refresh latest data:

docker exec -it --user=solr covid19-search update

![Dashboard](https://github.com/feast0101/COVID19India-SearchEngine/blob/master/screenshot.png)

Use Case 1: One single API with uniform format instead of 8 different datasets being served by 8 separate API endpoints.
Also because of the Solr/Lucene platform, it brings on the table some of the advanced search related features like:

Advanced full-text search capability
Sorting, Filitering, Ordering
Faceted search
Inbuilt spelling check
Performance improvement as it is ideal for handling big data
Rich in document parsing
Highly scalable and fault tolerant
Use Case 2: Zero maintenance effort required, as we can automate daily index/update activity as a cron job

Use Case 3: Enrich response data set by combining multiple Solr collections containing various data sets. Custom request handler is another option in this regard.

High Level DFD:
https://user-images.githubusercontent.com/6492003/87252420-87bf0900-c490-11ea-8f0d-f12874f5b5e4.png

For demo purpose, I have deployed the search engine on Google Cloud :

Dashboard Link:
https://covidservice-axuikumjgq-uc.a.run.app/solr/#/covid19/query)

Total Number of Recovered Cases (stats. stats_fields. numcases.sum)
https://covidservice-axuikumjgq-uc.a.run.app/solr/covid19/select?fq=currentstatus%20%3A%20%22Recovered%22&q=*%3A*&rows=0&stats.field=numcases&stats=true

Total Number of Hospitalised Cases (stats. stats_fields. numcases.sum)
https://covidservice-axuikumjgq-uc.a.run.app/solr/covid19/select?fq=currentstatus%20%3A%20%22Hospitalized%22&q=*%3A*&rows=0&stats.field=numcases&stats=true

Total Number of Fatalities (stats. stats_fields. numcases.sum)
https://covidservice-axuikumjgq-uc.a.run.app/solr/covid19/select?fq=currentstatus%20%3A%20%22Deceased%22&q=*%3A*&rows=0&stats.field=numcases&stats=true

Note: If you encounter error after first visit, please refresh the page multiple times to get the response

Let me know if any info required related to the search queries.