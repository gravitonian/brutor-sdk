# The path to the tomcat installation changes in 1.9 from
# /usr/share/tomcat to /usr/local/tomcat
FROM alfresco/process-services:<%- activitiDockerImageVersion %>

<% if (activitiDockerImageMinorVersion >= 1.9) { %>
ARG TOMCAT_DIR=/usr/local/tomcat

# From version 1.9 the activiti-app.war is not unpacked, which we need it to be to add extensions.
# Unpack activiti-app.war and make webapps folder read-only.
RUN mkdir $TOMCAT_DIR/webapps/activiti-app \
 && cd $TOMCAT_DIR/webapps/activiti-app \
 && jar -xvf $TOMCAT_DIR/webapps/activiti-app.war \
 && rm -f $TOMCAT_DIR/webapps/activiti-app.war \
 && chmod -R =r $TOMCAT_DIR/webapps
<% } else { %>
ARG TOMCAT_DIR=/usr/share/tomcat
<% } %>

COPY target/jars $TOMCAT_DIR/webapps/activiti-app/WEB-INF/lib
