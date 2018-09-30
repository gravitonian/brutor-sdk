<% if (communityOrEnterprise == 'Community') { %>
FROM alfresco/alfresco-content-repository-community:<%- repoDockerImageVersion %>
<% } %>
<% if (communityOrEnterprise == 'Enterprise') { %>
FROM alfresco/alfresco-content-repository:<%- repoDockerImageVersion %>
<% } %>

ARG TOMCAT_DIR=/usr/local/tomcat

<% if (repoJarOrAmp == 'AMP') { %>
RUN mkdir -p $TOMCAT_DIR/amps
COPY target/amps $TOMCAT_DIR/amps
<% } %>

COPY target/jars $TOMCAT_DIR/webapps/alfresco/WEB-INF/lib

<% if (repoJarOrAmp == 'AMP') { %>
RUN java -jar $TOMCAT_DIR/alfresco-mmt/alfresco-mmt*.jar install \
              $TOMCAT_DIR/amps $TOMCAT_DIR/webapps/alfresco -directory -nobackup -force
<% } %>

