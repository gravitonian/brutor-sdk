<% if (communityOrEnterprise == 'Community') { %>
FROM alfresco/alfresco-content-repository-community:<%- repoDockerImageVersion %>
<% } %>
<% if (communityOrEnterprise == 'Enterprise') { %>
FROM alfresco/alfresco-content-repository:<%- repoDockerImageVersion %>
<% } %>

ARG TOMCAT_DIR=/usr/local/tomcat

<% if (repoJarOrAmp == 'AMP') { %>
RUN mkdir -p $TOMCAT_DIR/amps
COPY target/extensions/*.amp $TOMCAT_DIR/amps/
<% } %>

<% if (repoJarOrAmp == 'JAR' || includeRepoCallApsSample == true || (repoJarOrAmp != 'AMP' && repoExtensionGenerateDockerBuild)) { %>
COPY target/extensions/*.jar $TOMCAT_DIR/webapps/alfresco/WEB-INF/lib/
<% } %>

<% if (repoJarOrAmp == 'AMP' && includeRepoCallApsSample == false)  { %>
# This project is using only AMPs, if you add JAR extensions, then you
# can delete the Dockerfile from the COPY command,
# it is only there to prevent the COPY from failing when there are no JARs
COPY Dockerfile target/extensions/*.jar $TOMCAT_DIR/webapps/alfresco/WEB-INF/lib/
<% } %>

<% if (repoJarOrAmp == 'AMP') { %>
RUN java -jar $TOMCAT_DIR/alfresco-mmt/alfresco-mmt*.jar install \
              $TOMCAT_DIR/amps $TOMCAT_DIR/webapps/alfresco -directory -nobackup -force
<% } %>

