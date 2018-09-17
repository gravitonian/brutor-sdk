FROM alfresco/process-services:<%- activitiDockerImageVersion %>

ARG TOMCAT_DIR=/usr/share/tomcat

COPY target/jars $TOMCAT_DIR/webapps/activiti-app/WEB-INF/lib
