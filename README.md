# COVID 19 India data search engine

It's an implementation of Apache Solr based search engine API indexing daily covid-19 data related to Indian states/UT

Commands to run:

docker build -t covid19-search:india .

docker run --name covid_search -d -p 8983:8983 covid19-search:india

docker exec -it --user=solr covid_search ./entrypoint.sh
