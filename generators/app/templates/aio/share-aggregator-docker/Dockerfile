FROM alfresco/alfresco-share:<%- shareDockerImageVersion %>

ARG TOMCAT_DIR=/usr/local/tomcat

<% if (shareJarOrAmp == 'AMP') { %>
RUN mkdir -p $TOMCAT_DIR/amps_share
COPY target/extensions/*.amp $TOMCAT_DIR/amps_share/
<% } %>

<% if (shareJarOrAmp == 'JAR') { %>
COPY target/extensions/*.jar $TOMCAT_DIR/webapps/share/WEB-INF/lib/
<% } %>

<% if (shareJarOrAmp == 'AMP')  { %>
# This project is using only AMPs, if you add JAR extensions, then you
# can delete the Dockerfile from the COPY command,
# it is only there to prevent the COPY from failing when there are no JARs
COPY Dockerfile target/extensions/*.jar $TOMCAT_DIR/webapps/share/WEB-INF/lib/
<% } %>

<% if (shareJarOrAmp == 'AMP') { %>
RUN java -jar $TOMCAT_DIR/alfresco-mmt/alfresco-mmt*.jar install \
              $TOMCAT_DIR/amps_share $TOMCAT_DIR/webapps/share -directory -nobackup -force
<% } %>
