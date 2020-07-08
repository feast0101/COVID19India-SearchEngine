# COVID 19 India data search engine

An implementation of Apache Solr based search engine API indexing daily covid-19  related data of all Indian states/UT. It bootstraps latest collection of data from https://api.covid19india.org/ endpoints

Commands to run:

docker run --name covid19-search -d -p 8983:8983 feast0101/covid19-search:india

To index/refresh latest data:

docker exec -it --user=solr covid19-search update

![Dashboard](https://github.com/feast0101/COVID19India-SearchEngine/blob/master/screenshot.png)
