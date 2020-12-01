FROM maven:3.3-jdk-8 as BUILD
MAINTAINER Kallol Das<kallolds@gmail.com>
WORKDIR /usr/src/mymaven
COPY --chown=root:root . .
USER root
RUN [ "mvn", "clean", "install" ]

FROM openjdk:8-jre-alpine
WORKDIR /app
COPY --from=BUILD /usr/src/mymaven/target/ms-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar", "app.jar"]