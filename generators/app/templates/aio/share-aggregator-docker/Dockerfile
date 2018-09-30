FROM alfresco/alfresco-share:<%- shareDockerImageVersion %>

ARG TOMCAT_DIR=/usr/local/tomcat

<% if (shareJarOrAmp == 'AMP') { %>
RUN mkdir -p $TOMCAT_DIR/amps_share
COPY target/amps_share $TOMCAT_DIR/amps_share
<% } %>

COPY target/jars $TOMCAT_DIR/webapps/share/WEB-INF/lib

<% if (shareJarOrAmp == 'AMP') { %>
RUN java -jar $TOMCAT_DIR/alfresco-mmt/alfresco-mmt*.jar install \
              $TOMCAT_DIR/amps_share $TOMCAT_DIR/webapps/share -directory -nobackup -force
<% } %>

