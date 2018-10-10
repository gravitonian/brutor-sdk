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
<% if (activitiEnableHotSwap == true) { %>
# Hotswap Stuff ########################################################################################################
# Download and Install the more capable DCEVM, which will allow more changes to classes, such as new methods
RUN mkdir -p dcevm \
    && curl -L -o dcevm/DCEVM-8u181-installer.jar "https://github.com/dcevm/dcevm/releases/download/light-jdk8u181%2B2/DCEVM-8u181-installer-build2.jar" \
    && cd dcevm \
    && jar -xvf DCEVM-8u181-installer.jar \
    && cp linux_amd64_compiler2/product/libjvm.so /usr/java/default/jre/lib/amd64/server
########################################################################################################################
<% } %>
