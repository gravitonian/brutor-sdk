#!/bin/bash

<% if (includeActivitiExtension == true) { %>
./build-activiti-extension.sh
<% } %>

<% if (includeRepoExtension == true) { %>
./build-repo-extension.sh
<% } %>

<% if (includeShareExtension == true) { %>
./build-share-extension.sh
<% } %>

