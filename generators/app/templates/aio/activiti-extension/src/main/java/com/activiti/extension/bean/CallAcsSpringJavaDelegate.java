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
package com.activiti.extension.bean;

import com.activiti.domain.integration.AlfrescoEndpoint;
import com.activiti.service.api.AlfrescoEndpointService;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.Expression;
import org.activiti.engine.delegate.JavaDelegate;
import org.alfresco.repository.remote.client.ApiClient;
import org.alfresco.repository.remote.client.model.NodeBodyCreate;
import org.alfresco.repository.remote.client.model.NodeEntry;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import org.alfresco.repository.remote.client.ApiException;
import org.alfresco.repository.remote.client.api.NodesApi;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.*;

import static com.activiti.alfrescoconnector.AlfrescoConnectorConstants.ON_PREM_API_LOCATION;

/**
 * A simple Service Task delegate implemented as a Spring Bean that
 * shows how to use the ACS ReST API Java Client.
 * <p/>
 * This requires you to first clone https://github.com/gravitonian/acs-rest-api-java-client
 * and then run mvn install so you have this lib in your local maven repo.
 *
 * @author martin.bergljung@alfresco.com
 */
@Component("callAcsSpringJavaDelegate")
public class CallAcsSpringJavaDelegate implements JavaDelegate {
  private static Logger logger = LoggerFactory.getLogger(CallAcsSpringJavaDelegate.class);

  @Autowired
  protected AlfrescoEndpointService alfrescoEndpointService;

  // Service Task fields
  private Expression alfrescoRepoId;

  /**
   * Service Task class field injection
   */
  public void setAlfrescoRepoId(Expression alfrescoRepoId) {
    this.alfrescoRepoId = alfrescoRepoId;
  }

  /**
   * Service Task implementation
   */
  @Override
  public void execute(DelegateExecution execution) throws Exception {
    String alfrescoRepoIdText = (String) alfrescoRepoId.getValue(execution);

    logger.info("Alfresco Repo ID, should match what's configured in Tenant section: [ID=" + alfrescoRepoIdText + "]");

    // Format as Service ID
    String repoId = "alfresco-" + alfrescoRepoIdText;

    // Get the Alfresco Repository Endpoint configuration from APS
    AlfrescoEndpoint endpoint = alfrescoEndpointService.getById(
      alfrescoEndpointService.getEndpointIdForServiceId(repoId));
    if (endpoint != null) {
      logger.info("Alfresco Repo endpoint: [endpointRepoUrl=" + endpoint.getRepositoryUrl() +
        "][secret=" + endpoint.getSecret() + "]");

      // https://content:8080/alfresco/api/-default-/public/alfresco/versions/1
      String url = endpoint.getRepositoryUrl() + "/" + ON_PREM_API_LOCATION.substring(0, ON_PREM_API_LOCATION.length()-1);
      logger.info("ACS ReST API base URL: " + url);

      // Generic API client that can be used by the specific API clients
      ApiClient client = new ApiClient();
      client.setBasePath(url);                              // TODO: Fix these hard coded credentials...
      client.addDefaultHeader("Authorization", getCredential("admin", "admin"));

      String requestFolderNodeId = makeCreateFolderCall(endpoint, client);

      if (requestFolderNodeId != null) {
        logger.info("Created new folder in Repository [nodeId=" + requestFolderNodeId + "]");
      } else {
        logger.error("Failed to create folder in Repository");
      }
    }
  }

  /**
   * Make the remote call to create a new folder in ACS
   * For more info: https://github.com/gravitonian/acs-rest-api-java-client/blob/master/docs/NodesApi.md#createNode
   *
   * @param endpoint - the ACS Repo instance to talk to
   * @param client - the API client to use with base URL and auth
   * @return a node ID such as e859588c-ae81-4c5e-a3b6-4c6109b6c905 for the newly created folder
   */
  private String makeCreateFolderCall(AlfrescoEndpoint endpoint, ApiClient client) throws IOException {
    String rootPath = "-root-"; // /Company Home
    String relativeFolderPath = "Sites/swsdp/documentLibrary"; // Out-of-the-box Share site
    String folderName = "My Folder";
    String folderType = "cm:folder";

    List<String> folderAspects = new ArrayList<String>();
    folderAspects.add("cm:titled");
    Map<String, String> folderProps = new HashMap<>();
    folderProps.put("cm:title", "My new folder");
    folderProps.put("cm:description", "A folder created via ReST API call from APS");

    // Specific API client for working with Repository Nodes
    NodesApi apiInstance = new NodesApi(client);

    // String | The identifier of a node. You can also use one of these well-known aliases: * -my- * -shared- * -root-
    String nodeId = rootPath;
    NodeBodyCreate nodeBodyCreate = new NodeBodyCreate();
    nodeBodyCreate.setName(folderName);
    nodeBodyCreate.setNodeType(folderType);
    nodeBodyCreate.setAspectNames(folderAspects);
    nodeBodyCreate.setProperties(folderProps);
    nodeBodyCreate.setRelativePath(relativeFolderPath);

    // Boolean | If true, then  a name clash will cause an attempt to auto rename by
    // finding a unique name using an integer suffix.
    Boolean autoRename = true;
    // List<String> | Returns additional information about the node.
    // The following optional fields can be requested:
    // * allowableOperations
    // * association
    // * isLink
    // * isLocked
    // * path
    // * permissions
    List<String> include = new ArrayList<>();
    // List<String> | A list of field names.
    // You can use this parameter to restrict the fields returned within a response if, for example,
    // you want to save on overall bandwidth. The list applies to a returned individual entity or entries
    // within a collection.  If the API method also supports the **include** parameter, then the fields specified in
    // the **include** parameter are returned in addition to those specified in the **fields** parameter.
    List<String> fields = new ArrayList<>();
    NodeEntry newNode = null;

    try {
      newNode = apiInstance.createNode(nodeId, nodeBodyCreate, autoRename, include, fields);
      logger.info("Created new Request folder: " + newNode);
    } catch (ApiException e) {
      logger.error("Exception when calling NodesApi#createNode [responseCode=" +
        e.getCode() + "][responseBody=" + e.getResponseBody() + "]");
      e.printStackTrace();
    }

    return newNode != null ? newNode.getEntry().getId() : null;
  }

  /**
   * Helper method to construct the value of the Basic Auth header
   *
   * @return
   */
  private String getCredential(String username, String pwd) {
    String auth = username + ":" + pwd;
    byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
    String authHeader = "Basic " + new String(encodedAuth);
    return authHeader;
  }
}
