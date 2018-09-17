#!/bin/bash

<% if (includeActivitiExtension == true) { %>
cd <%- activitiExtensionArtifactId %>
mvn clean install
cd ..
<% } %>

<% if (includeRepoExtension == true) { %>
cd <%- repoExtensionArtifactId %>
mvn clean install
cd ..
<% } %>

<% if (includeShareExtension == true) { %>
cd <%- shareExtensionArtifactId %>
mvn clean install
<% } %>

