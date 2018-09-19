#!/bin/bash

<% if (includeActivitiExtension == true) { %>
./build-activiti-docker-image.sh
<% } %>

<% if (includeRepoExtension == true) { %>
./build-repo-docker-image.sh
<% } %>

<% if (includeShareExtension == true) { %>
./build-share-docker-image.sh
<% } %>

