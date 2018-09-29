/*
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements.  See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package <%- package %>.reposamples;

import org.activiti.engine.remote.client.ApiClient;
import org.activiti.engine.remote.client.ApiException;
import org.activiti.engine.remote.client.Configuration;
import org.activiti.engine.remote.client.api.ContentApi;
import org.activiti.engine.remote.client.api.ProcessDefinitionsApi;
import org.activiti.engine.remote.client.api.ProcessInstancesApi;
import org.activiti.engine.remote.client.auth.HttpBasicAuth;
import org.activiti.engine.remote.client.model.*;
import org.alfresco.model.ContentModel;
import org.alfresco.repo.nodelocator.CompanyHomeNodeLocator;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.repository.ContentWriter;
import org.alfresco.service.cmr.repository.NodeRef;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * A simple Repo Web Script that
 * shows how to use the APS ReST API Java Client.
 * <p/>
 * This requires you to first clone https://github.com/gravitonian/aps-rest-api-java-client
 * and then run mvn install so you have this lib in your local maven repo.
 *
 * @author martin.bergljung@alfresco.com
 */
public class CallApsWebScript extends DeclarativeWebScript {
    private static Logger logger = LoggerFactory.getLogger(CallApsWebScript.class);

    private ServiceRegistry serviceRegistry;

    private String apsHost;
    private String apsPort;
    private String apsUsername;
    private String apsPwd;
    private String apsProcessDefKey;
    private String apsTenantAlfrescoRepositorySource;

    /**
     * Spring Setter injection
     */

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
      this.serviceRegistry = serviceRegistry;
    }

    public void setApsPwd(String apsPwd) {
      this.apsPwd = apsPwd;
    }

    public void setApsUsername(String apsUsername) {
      this.apsUsername = apsUsername;
    }

    public void setApsPort(String apsPort) {
      this.apsPort = apsPort;
    }

    public void setApsHost(String apsHost) {
      this.apsHost = apsHost;
    }

    public void setApsProcessDefKey(String apsProcessDefKey) {
        this.apsProcessDefKey = apsProcessDefKey;
    }

    public void setApsTenantAlfrescoRepositorySource(String apsTenantAlfrescoRepositorySource) {
        this.apsTenantAlfrescoRepositorySource = apsTenantAlfrescoRepositorySource;
    }

    /**
     * Web Script implementation
     *
     * @param req
     * @param status
     * @param cache
     * @return
     */
    protected Map<String, Object> executeImpl(
        WebScriptRequest req, Status status, Cache cache) {
        // Get the default API client and update with base URL and authentication,
        // it will be automatically used by any specific API
        ApiClient defaultClient = Configuration.getDefaultApiClient();

        // Set base APS API URL
        String endpoint = "http://" + apsHost + ":" + apsPort + "/activiti-app/api";
        defaultClient.setBasePath(endpoint);

        // Configure HTTP basic authorization: basicAuth
        HttpBasicAuth basicAuth = (HttpBasicAuth) defaultClient.getAuthentication("basicAuth");
        basicAuth.setUsername(apsUsername);
        basicAuth.setPassword(apsPwd);

        // Get the process definition that we should use when starting a process
        String processDefId = getProcessDefId();

        if (processDefId != null) {
          // Set up a link in APS to ACS content, so we can associate with process
          Long contentId = uploadAcsContent2Aps(createTextFile());

          // Start a process
          ProcessInstanceRepresentation processInstance = startProcess(processDefId, contentId);

          Map<String, Object> model = new HashMap<String, Object>();
          model.put("processInfo", processInstance.toString());
          return model;
        } else {
          Map<String, Object> model = new HashMap<String, Object>();
          model.put("processInfo", "No process started, no process definition matched " + apsProcessDefKey);
          return model;
        }
    }

    /**
     * Create a text file in the Guest Home folder
     *
     * @return the Alfresco Node Reference for the text file
     */
    private NodeRef createTextFile() {
        String fileName = "some-text.txt";
        NodeRef companyHomeNodeRef = serviceRegistry.getNodeLocatorService().getNode(
          CompanyHomeNodeLocator.NAME, null, null);
        NodeRef guestHomeNodeRef = serviceRegistry.getNodeService().getChildByName(
          companyHomeNodeRef, ContentModel.ASSOC_CONTAINS, "Guest Home");

        // Check if the file already exists
        NodeRef contentFileNodeRef = serviceRegistry.getNodeService().getChildByName(
          guestHomeNodeRef, ContentModel.ASSOC_CONTAINS, fileName);
        if (contentFileNodeRef == null) {
          // Create the file node
          contentFileNodeRef = serviceRegistry.getFileFolderService().create(
            guestHomeNodeRef, fileName, ContentModel.TYPE_CONTENT).getNodeRef();

          // Add some content to it
          ContentWriter writer = serviceRegistry.getFileFolderService().getWriter(contentFileNodeRef);
          writer.putContent("lorem ipsum dolorem");
        }

        return contentFileNodeRef;
    }

    /**
     * Get latest version of process def ID matching process definition key.
     * <p>
     * http://localhost:9080/activiti-app/api/enterprise/process-definitions?latest=true
     * <p>
     * Sample response:
     * {
     * size: 1,
     * total: 1,
     * start: 0,
     * data: [
     * {
     * id: "ReviewRequestProcess:10:75028",
     * name: "Review Request Process",
     * description: "Handles the initial review of the customer request and decides if to proceed or not.",
     * key: "ReviewRequestProcess",
     * category: "http://www.activiti.org/processdef",
     * version: 10,
     * deploymentId: "75025",
     * tenantId: "tenant_1",
     * metaDataValues: [ ],
     * hasStartForm: true
     * }
     * ]
     * }
     *
     * @return the latest version of process definition ID that matches process definition key
     */
    private String getProcessDefId() {
        // Get all the latest process definitions
        ProcessDefinitionsApi apiInstance = new ProcessDefinitionsApi();
        Boolean latest = true;        // [OPTIONAL] get latest versions of process definitions
        Long appDefinitionId = null;  // [OPTIONAL] get process defs for the process app definition Id
        String deploymentId = null;   // [OPTIONAL] filter process defs by process definition deployment ID
        ResultListDataRepresentationProcessDefinitionRepresentation result = null;

        try {
          result = apiInstance.getProcessDefinitionsUsingGET(latest, appDefinitionId, deploymentId);
        } catch (ApiException e) {
          logger.error("Exception when calling ProcessDefinitionsApi#getProcessDefinitionsUsingGET [responseCode=" +
            e.getCode() + "][responseBody=" + e.getResponseBody() + "]");
          e.printStackTrace();
        }

        String lastestProcessDefId = null;
        if (result != null) {
          // Loop over process defs and find the one we are interested in (i.e. the one matching apsProcessDefKey)
          List<ProcessDefinitionRepresentation> processDefs = result.getData();
          lastestProcessDefId = null;
          for (ProcessDefinitionRepresentation processDef : processDefs) {
            if (processDef.getId().startsWith(apsProcessDefKey)) {
              lastestProcessDefId = processDef.getId();
              break;
            }
          }
        }

        if (lastestProcessDefId == null) {
          throw new RuntimeException("Missing " + apsProcessDefKey + " process definition");
        }

        return lastestProcessDefId;
    }

    /**
     * Upload/Link ACS content to APS.
     * <p>
     * Example of upload response:
     * {
     * "id":25025,
     * "name":"Request Text",
     * "created":"2018-06-21T15:10:32.464+0000",
     * "createdBy":{
     * "id":1,
     * "firstName":null,
     * "lastName":"Administrator",
     * "email":"admin@app.activiti.com"
     * },
     * "relatedContent":false,
     * "contentAvailable":true,
     * "link":true,
     * "source":"alfresco-1-ACS 6",
     * "sourceId": "65acc59d-2d01-4701-ac61-de1ea6d241ab",
     * "mimeType":"text/plain",
     * "simpleType":"content",
     * "previewStatus": "queued",
     * "thumbnailStatus":"queued"
     * }
     *
     * @param acsContentNodeRef the Alfresco Node Reference for the file that should be linked or uploaded to APS
     * @return the Content ID in APS, or null if could not be uploaded or linked
     */
    private Long uploadAcsContent2Aps(NodeRef acsContentNodeRef) {
        // Set up content props
        ContentApi apiInstance = new ContentApi();
        RelatedContentRepresentation relatedContent = new RelatedContentRepresentation();
        relatedContent.setName("Some Text");
        relatedContent.setLink(true); // Keep content only in ACS, do not upload to APS
        relatedContent.setSource(apsTenantAlfrescoRepositorySource);
        relatedContent.setSourceId(acsContentNodeRef.getId());
        relatedContent.setMimeType("text/plain");

        // Set up ACS Content Link in APS
        RelatedContentRepresentation result = null;
        try {
          result = apiInstance.createTemporaryRelatedContentUsingPOST(relatedContent);
        } catch (ApiException e) {
          logger.error("Exception when calling ContentApi#createTemporaryRelatedContentUsingPOST [responseCode=" +
            e.getCode() + "][responseBody=" + e.getResponseBody() + "]");
          e.printStackTrace();
        }

        Long contentId = null;

        if (result != null) {
          contentId = result.getId();
        }

        return contentId;
    }

    /**
     * Start the process instance in APS with all props and content
     *
     * @param processDefId the process definition ID to use when starting a new process instance
     * @param acsContentId the ACS file content ID in APS
     * @return the new process instance data, or null if could not be started
     */
    private ProcessInstanceRepresentation startProcess(String processDefId, Long acsContentId) {
        logger.info("Starting process [processDefinitionId=" + processDefId + "][contentId=" + acsContentId + "]");

        // Set up Start form field values
        Map<String, Object> formFieldValues = new HashMap<>();
        formFieldValues.put("acscontent", acsContentId.toString());
        formFieldValues.put("atextvar", "Some text");

        // Start a new Process Instance in APS
        ProcessInstancesApi apiInstance = new ProcessInstancesApi();
        CreateProcessInstanceRepresentation startRequest = new CreateProcessInstanceRepresentation();
        startRequest.setName("My Process Instance");
        startRequest.setProcessDefinitionId(processDefId);
        startRequest.setValues(formFieldValues);
        ProcessInstanceRepresentation result = null;

        try {
          result = apiInstance.startNewProcessInstanceUsingPOST(startRequest);
        } catch (ApiException e) {
          logger.error("Exception when calling ProcessInstancesApi#startNewProcessInstanceUsingPOST [responseCode=" +
            e.getCode() + "][responseBody=" + e.getResponseBody() + "]");
          e.printStackTrace();
        }

        return result;
    }
}
