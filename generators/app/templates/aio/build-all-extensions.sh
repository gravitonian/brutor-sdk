#!/bin/bash

cd <%- activitiJarArtifactId %>
mvn clean install
cd ..

cd <%- repoExtensionArtifactId %>
mvn clean install
cd ..

cd <%- shareExtensionArtifactId %>
mvn clean install


