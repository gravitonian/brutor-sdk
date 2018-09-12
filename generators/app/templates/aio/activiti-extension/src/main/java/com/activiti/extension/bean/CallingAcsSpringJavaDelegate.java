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
import okhttp3.*;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.Expression;
import org.activiti.engine.delegate.JavaDelegate;
import org.apache.commons.lang3.StringUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.activiti.alfrescoconnector.AlfrescoConnectorConstants.ON_PREM_API_LOCATION;

/**
 * A sample Service Task delegate that shows how to call Alfresco Content Services (ACS) ReST API.
 *
 * @author martin.bergljung@alfresco.com
 */
@Component("callingAcsSpringJavaDelegate")
public class CallingAcsSpringJavaDelegate implements JavaDelegate {
    private static Logger logger = LoggerFactory.getLogger(CallingAcsSpringJavaDelegate.class);

    // ReST API POST payload type
    private static final MediaType JSON
            = MediaType.parse("application/json; charset=utf-8");

    @Autowired
    protected AlfrescoEndpointService alfrescoEndpointService;

    // Service Task fields
    private Expression transactionID;
    private Expression requestType;
    private Expression customerName;
    private Expression policyID;

    // HTTP Client - see https://github.com/square/okhttp/wiki/Recipes
    private static final OkHttpClient client = new OkHttpClient();

    /**
     * Service Task class field injection
     */
    public void setTransactionID(Expression transactionID) {
        this.transactionID = transactionID;
    }
    public void setRequestType(Expression requestType) {
        this.requestType = requestType;
    }
    public void setCustomerName(Expression customerName) {
        this.customerName = customerName;
    }
    public void setPolicyID(Expression policyID) {
        this.policyID = policyID;
    }

    /**
     * Service Task implementation
     */
    @Override
    public void execute(DelegateExecution execution) throws Exception {
        String transactionIDText = (String) transactionID.getValue(execution);
        String requestTypeText = (String) requestType.getValue(execution);
        String customerNameText = (String) customerName.getValue(execution);
        String policyIDText = (String) policyID.getValue(execution);

        logger.info("Create Request Folder Service Task called [transactionID=" + transactionIDText +
                "][requestType=" + requestTypeText + "][customerName=" + customerNameText +
                "][policyId=" + policyIDText + "]");

        String repoId = "alfresco-2";
        AlfrescoEndpoint endpoint = alfrescoEndpointService.getById(
                alfrescoEndpointService.getEndpointIdForServiceId(repoId));
        if (endpoint != null) {
            logger.info("Alfresco endpoint: [endpointRepoUrl=" + endpoint.getRepositoryUrl() +
                    "][secret=" + endpoint.getSecret());

            String requestFolderNodeId = makeCreateFolderCall(endpoint, requestTypeText, customerNameText, policyIDText);

            logger.info("Create Request Folder finished [transactionID=" + transactionIDText +
                    "][nodeId=" + requestFolderNodeId);

            makeMoveCall(endpoint, requestFolderNodeId, transactionIDText);

            logger.info("Move files in Tx to Request Folder finished [transactionID=" + transactionIDText +
                    "][nodeId=" + requestFolderNodeId);


        } else {
            logger.error("Alfresco endpoint not found for Repo ID = " + repoId);
        }
    }

    /******************************** PRIVATE HELPERS *****************************************************************/


    private void makeMoveCall(AlfrescoEndpoint endpoint, String requestFolderNodeId, String transactionID)
            throws ParseException, IOException {
        String credential = getCredential();

        // Get all nodes to move
        // TODO: hard coded site information should be parameterized
        String restCallUrl = endpoint.getRepositoryUrl() + "/" + ON_PREM_API_LOCATION +
                "nodes/-root-/children?relativePath=" +
                "Sites/customer-request-management/documentLibrary/Customer Request Solution/Incoming/" + transactionID;
        logger.info("Invoking GET URL: " + restCallUrl);
        String response = get(restCallUrl, credential);
        logger.info("GET Response: " + response);
        JSONObject childrenList = parseJSON(response);

        /*
{
        "list":{
        "pagination":{
            "count":4, "hasMoreItems":false, "totalItems":4, "skipCount":0, "maxItems":100
        },
        "entries":[{
            "entry":{
                "createdAt":"2018-06-27T08:31:14.982+0000",
                "isFolder":false,
                "isFile":true,
                "createdByUser":{ "id":"martin", "displayName":"Martin Bergljung" },
                "modifiedAt":"2018-06-27T08:31:14.982+0000",
                "modifiedByUser":{ "id":"martin", "displayName":"Martin Bergljung" },
                "name":"crashed car 1.jpeg",
                "id":"56a1ce76-066c-46d9-8d25-d530fea264bf",
                "nodeType": "cm:content",
                "content":{
                    "mimeType":"image/jpeg",
                    "mimeTypeName":"JPEG Image",
                    "sizeInBytes":7400,
                    "encoding":"UTF-8"
                },
                "parentId":"51d81c11-e629-4181-b262-f9394551a1be"
            }
        },{
            "entry":{
                "createdAt":"2018-06-27T08:31:15.088+0000", "isFolder":false, "isFile":true, "createdByUser":{
                    "id":"martin", "displayName":"Martin Bergljung"
                },"modifiedAt":"2018-06-27T08:31:15.088+0000", "modifiedByUser":{
                    "id":"martin", "displayName":"Martin Bergljung"
                },"name":"crashed car 2.jpeg", "id":"df8fb816-90ec-4880-8815-b2e52a952504", "nodeType":
                "cm:content", "content":{
                    "mimeType":"image/jpeg", "mimeTypeName":"JPEG Image", "sizeInBytes":10615, "encoding":"UTF-8"
                },"parentId":"51d81c11-e629-4181-b262-f9394551a1be"
            }
        },{
            "entry":{
                "createdAt":"2018-06-27T08:31:14.354+0000", "isFolder":false, "isFile":true, "createdByUser":{
                    "id":"martin", "displayName":"Martin Bergljung"
                },"modifiedAt":"2018-06-27T08:31:15.585+0000", "modifiedByUser":{
                    "id":"martin", "displayName":"Martin Bergljung"
                },"name":"Quote Request", "id":"0ecc6e18-0555-403a-8924-b9e41d48b587", "nodeType":
                "cm:content", "content":{
                    "mimeType":"text/plain", "mimeTypeName":"Plain Text", "sizeInBytes":147, "encoding":"UTF-8"
                },"parentId":"51d81c11-e629-4181-b262-f9394551a1be"
            }
        },{
            "entry":{
                "createdAt":"2018-06-27T08:31:14.842+0000", "isFolder":false, "isFile":true, "createdByUser":{
                    "id":"martin", "displayName":"Martin Bergljung"
                },"modifiedAt":"2018-06-27T08:31:14.842+0000", "modifiedByUser":{
                    "id":"martin", "displayName":"Martin Bergljung"
                },"name":"Quote Request (part 1).html", "id":"ce297e34-d2f4-4ea7-8a77-ae318686b221", "nodeType":
                "cm:content", "content":{
                    "mimeType":"text/html", "mimeTypeName":"HTML", "sizeInBytes":1992, "encoding":"UTF-8"
                },"parentId":"51d81c11-e629-4181-b262-f9394551a1be"
            }
        }]}
    }
         */

        // Loop over and move
        // Payload specifying where to move folders and files
        Map<String, Object> properties = new HashMap<>();
        properties.put("targetParentId", requestFolderNodeId);
        String json = buildJSON(properties);

        JSONArray nodeEntries = ((JSONArray)((JSONObject)childrenList.get("list")).get("entries"));
        for (Object nodeEntry: nodeEntries) {
            JSONObject entry = (JSONObject) ((JSONObject)nodeEntry).get("entry");
            String nodeId = (String)entry.get("id");
            // TODO: There is a bug in ACS that makes it impossible to move files uploaded via Inbound Email feature
            // restCallUrl = endpoint.getRepositoryUrl() + "/" + ON_PREM_API_LOCATION + "nodes/" + nodeId + "/move";
            restCallUrl = endpoint.getRepositoryUrl() + "/" + ON_PREM_API_LOCATION + "nodes/" + nodeId + "/copy";
            logger.info("Invoking POST URL: " + restCallUrl);
            response = post(restCallUrl, json, credential);
            logger.info("Copy response: " + response);
        }
    }

    /**
     * Make the call to create a new folder in ACS
     *
     * @param endpoint - the ACS Repo instance to talk to
     * @param requestType
     * @param customerName
     * @param policyID
     *
     * @return a node ID such as e859588c-ae81-4c5e-a3b6-4c6109b6c905 for the newly created folder
     */
    private String makeCreateFolderCall(AlfrescoEndpoint endpoint,
                                        String requestType, String customerName, String policyID)
            throws IOException, ParseException {
        String requestTypeOption = getRequestTypeOption(requestType);
        String requestID = generateRequestID();
        String slaTargetDate = getSlaTargetDate(requestTypeOption);
        String customerID = getCustomerID(customerName);

        // TODO: Create a model class with constants for all strings
        String rootPath = "-root-"; // /Company Home
        String relativeFolderPath = "Sites/customer-request-library/documentLibrary";
        String folderName = requestID + "-" + customerID + "-" + customerName;
        String folderType = "acme:requestFolder";

        List<String> folderAspects = new ArrayList<String>();
        folderAspects.add("acme:quoteRequest");

        Map<String, Object> folderProps = new HashMap<>();
        folderProps.put("acme:requestType", requestTypeOption);
        folderProps.put("acme:requestStatus", "Evaluated");
        folderProps.put("acme:policyId", policyID);
        folderProps.put("acme:slaDate", slaTargetDate);
        folderProps.put("acme:requestId", requestID);
        folderProps.put("acme:customerId", customerID);
        folderProps.put("acme:customerName", customerName);

        String json = buildJSON(relativeFolderPath, folderName, folderType, folderAspects, folderProps);
        String url = endpoint.getRepositoryUrl() + "/" + ON_PREM_API_LOCATION + "nodes/" + rootPath + "/children";
        logger.info("Invoking POST URL: " + url);

        String credential = getCredential();
        String response = post(url, json, credential);

        logger.info("Created new Request folder: " + response);

        /*
    {
      "entry":{
        "aspectNames":["cm:auditable", "acme:quoteRequest"],
        "createdAt":"2018-06-27T12:47:32.031+0000",
        "isFolder": true,
        "isFile":false,
        "createdByUser":{ "id":"admin", "displayName":"Administrator" },
        "modifiedAt":"2018-06-27T12:47:32.031+0000",
        "modifiedByUser":{ "id":"admin", "displayName":"Administrator"},
        "name":"REQ16357-536-Martin",
        "id":"45b7bafc-dc86-40ad-a762-0b6613c0744f",
        "nodeType": "acme:requestFolder",
        "properties":{
            "acme:customerName":"Martin",
            "acme:customerId":"536",
            "acme:policyId":"P01",
            "acme:requestStatus": "Evaluated",
            "acme:requestType":"Quote Request",
            "acme:requestId":"REQ16357",
            "acme:slaDate": "2018-06-27T00:00:00.000+0000"
        },
        "parentId":"7b3cf4de-1182-4078-8b82-1825368bd071"
      }
    }
    */

        JSONObject node = parseJSON(response);

        return ((JSONObject)node.get("entry")).get("id").toString();
    }

    private String getCredential() {
        // TODO: Don't hardcode credentials, get from APS config
        String credential = Credentials.basic("admin", "admin");
        return credential;
    }

    /**
     * Map passed in request type to content model constraint value
     *
     * @param requestType
     * @return
     */
    private String getRequestTypeOption(String requestType) {
        if (StringUtils.equals(requestType, "quote_request")) {
            return "Quote Request"; // From content model constraint
        }

        throw new RuntimeException("Unknown request type:" + requestType);
    }

    /**
     * This method should make a call to some system to find out customer ID
     *
     * @param customerName
     * @return
     */
    Random rand = new Random();
    private String getCustomerID(String customerName) {
        // TODO: Dummy implementation
        Integer  n = rand.nextInt(999) + 1;
        return n.toString();
    }

    /**
     * The Request ID format is XXX-99999, where XXX is determined through a lookup, based on the request type.
     * 9999 is sequential within each XXX.
     * TODO:
     * Need to use a Database SEQUENCE, such as CREATE SEQUENCE REQUEST_ID_SEQ
     * Access in Java:
     * String sqlIdentifier = "select REQUEST_ID_SEQ.NEXTVAL from dual";
     * PreparedStatement pst = conn.prepareStatement(sqlIdentifier);
     * synchronized( this ) {
     *    ResultSet rs = pst.executeQuery();
     *    if (rs.next())
     *    long myId = rs.getLong(1);
     *
     * @return
     */
    private String generateRequestID() {
        // TODO: Just do a dummy ID for the moment
        Integer  n = rand.nextInt(99998) + 1;
        return "REQ" + n;
    }

    /**
     * Lookup SLA Target Date by Request Type
     *
     * @param requestTypeText
     * @return something like 2018-06-18
     */
    private String getSlaTargetDate(String requestTypeText) {
        // TODO: Just returning current date for the moment
        Date now = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String nowFormatted = sdf.format(now);

        return nowFormatted;
    }

    /**
     * POST JSON payload for creating a folder
     *  {
     *    "name":"My Folder",
     *    "nodeType":"cm:folder",
     *    "aspectNames":{          No need to set aspects as they will be set automatically depending on the properties, but good for clarity
     *      [
     *          "cm:titled"
     *      ]
     *     },
     *     "properties":{
     *      "cm:title":"Test",
     *      "cm:description":"Description"
     *     },
     *     "relativePath": "Sites/customer-request-library/documentLibrary"
     *   }
     *
     * @param relativeFolderPath
     * @param folderName
     * @param folderType
     * @param properties
     * @return
     */
    private String buildJSON(String relativeFolderPath, String folderName, String folderType, List<String> folderAspects,
                               Map<String, Object> properties) {
        // TODO: Create a model class with constants for all strings
        JSONObject obj = new JSONObject();
        obj.put("name", folderName);
        obj.put("nodeType", folderType);

        JSONArray aspects = new JSONArray();
        aspects.addAll(folderAspects);
        obj.put("aspectNames", aspects);

        JSONObject props = new JSONObject();
        props.putAll(properties);
        obj.put("properties", props);

        obj.put("relativePath", relativeFolderPath);

        String payload = obj.toJSONString();

        logger.info("Payload = " + payload);

/*
       {
            "aspectNames": ["acme:quoteRequest"],
            "relativePath":"Sites\/customer-request-library\/documentLibrary",
            "name":"ABC00001-1000-Customer",
            "nodeType":"acme:requestFolder",
            "properties":{
                "acme:customerId":"1000",
                "acme:customerName":
                "Customer","acme:policyId":
                "P01","acme:requestStatus":"Evaluated",
                "acme:requestType":"quote_request",
                "acme:requestId":"ABC00001",
                "acme:slaDate":"2018-06-18"}}
                    */


        return payload;
    }

    /**
     * POST JSON payload for moving files
     *
     * @param properties
     * @return
     */
    private String buildJSON(Map<String, Object> properties) {
        JSONObject props = new JSONObject();
        props.putAll(properties);
        String payload = props.toJSONString();

        return payload;
    }

    /**
     * Parse passed in JSON string into a JSON Object
     * {
     "entry":{
         "aspectNames":["cm:auditable", "acme:quoteRequest"],
         "createdAt":"2018-06-18T10:28:50.786+0000",
         "isFolder": true,
         "isFile":false,
         "createdByUser":{ "id":"admin", "displayName":"Administrator"},
         "modifiedAt":"2018-06-18T10:28:50.786+0000",
         "modifiedByUser":{"id":"admin", "displayName":"Administrator"},
         "name":"ABC00001-1000-Custpmer",
         "id":"e859588c-ae81-4c5e-a3b6-4c6109b6c905",
         "nodeType":"acme:requestFolder",
         "properties":{
            "acme:customerName":"Custpmer", "acme:customerId":"1000", "acme:policyId":"P1", "acme:requestStatus":
            "Evaluated", "acme:requestType":"Quote Request", "acme:requestId":"ABC00001", "acme:slaDate":
            "2018-06-18T00:00:00.000+0000"
         },
         "parentId":"7b3cf4de-1182-4078-8b82-1825368bd071"
         }
     }
     *
     *
     * @param jsonString
     * @return JSON Object
     * @throws ParseException
     */
    private JSONObject parseJSON(String jsonString) throws ParseException {
        JSONParser parser = new JSONParser();

        Object obj = parser.parse(jsonString);

        JSONObject jsonObject = (JSONObject) obj;

        return jsonObject;
    }

    /**
     * Do the actual POST call with payload to ACS
     *
     * @param url
     * @param json
     * @param secretAuth
     * @return
     * @throws IOException
     */
    private String post(String url, String json, String secretAuth) throws IOException {
        RequestBody body = RequestBody.create(JSON, json);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .header("Authorization", secretAuth)
                .build();
        try (Response response = client.newCall(request).execute()) {
            return response.body().string();
        }
    }

    /**
     * Do the actual GET call to ACS
     *
     * @param url
     * @param secretAuth
     * @return
     * @throws IOException
     */
    private String get(String url, String secretAuth) throws IOException {
        Request request = new Request.Builder()
                .url(url)
                .get()
                .header("Authorization", secretAuth)
                .build();
        try (Response response = client.newCall(request).execute()) {
            return response.body().string();
        }
    }
}
