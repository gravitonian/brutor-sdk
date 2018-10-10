FROM alfresco/alfresco-share:<%- shareDockerImageVersion %>
ARG TOMCAT_DIR=/usr/local/tomcat
<% if (shareJarOrAmp == 'AMP') { %>
RUN mkdir -p $TOMCAT_DIR/amps_share
COPY target/extensions/*.amp $TOMCAT_DIR/amps_share/
<% } %>
<% if (shareJarOrAmp == 'JAR' || (shareJarOrAmp != 'AMP' && shareExtensionGenerateDockerBuild)) { %>
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
<% if (shareEnableHotSwap == true) { %>
# Hotswap Stuff ########################################################################################################
# Download and Install the more capable DCEVM, which will allow more changes to classes, such as new methods
RUN mkdir -p dcevm \
    && curl -L -o dcevm/DCEVM-8u181-installer.jar "https://github.com/dcevm/dcevm/releases/download/light-jdk8u181%2B2/DCEVM-8u181-installer-build2.jar" \
    && cd dcevm \
    && jar -xvf DCEVM-8u181-installer.jar \
    && cp linux_amd64_compiler2/product/libjvm.so /usr/java/default/jre/lib/amd64/server

# Download HotSwap Agent - it is used in the Docker Compose file.
# It needs to be downloaded into the tomcat/lib directory, otherwise the Java Security Manager will
# not allow it to read properties from system as Tomcat is started with Security Manager enabled.
# The hotswap-agent dir will be used to hold the hotswap-agent.properties file as mapped in via volume
RUN mkdir -p hotswap-agent \
    && curl -L -o lib/hotswap-agent-1.3.0.jar "https://github.com/HotswapProjects/HotswapAgent/releases/download/RELEASE-1.3.0/hotswap-agent-1.3.0.jar"
########################################################################################################################
<% } %>
