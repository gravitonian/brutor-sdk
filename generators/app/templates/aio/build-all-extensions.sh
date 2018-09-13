#!/bin/bash

cd <%- activitiExtensionArtifactId %>
mvn clean install
cd ..

cd <%- repoExtensionArtifactId %>
mvn clean install
cd ..

cd <%- shareExtensionArtifactId %>
mvn clean install


