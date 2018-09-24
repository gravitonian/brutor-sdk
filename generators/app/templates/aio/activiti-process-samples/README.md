# Activiti / APS Process Samples
This directory contains a number of process definition samples.

## process-app-service-task-call-asc
This is a Process App with a Process Definition that
has one Service Task that is implemented as a 
Spring Delegate. 

The implementation uses the ACS ReST API Java client 
wrapper to call ACS and create a folder.

The implementation class is located here:
```bash
activiti-extension/src/main/java/com/activiti/extension/bean/CallAcsSpringJavaDelegate.java
```

You would need to configure an Alfresco Repository endpoint under Tenants for this to work.
And make sure the the ID of it is passed in as a class field in the Service Task definition.

Running the process should give an outpout similar to:

```bash
process_1        | 02:06:30 [http-nio-8080-exec-7] INFO  com.activiti.extension.bean.CallAcsSpringJavaDelegate  - Alfresco Repo ID, should match what's configured in Tenant section: [ID=1]
process_1        | 02:06:30 [http-nio-8080-exec-7] INFO  com.activiti.extension.bean.CallAcsSpringJavaDelegate  - Alfresco Repo endpoint: [endpointRepoUrl=http://content:8080/alfresco][secret=null]
process_1        | 02:06:30 [http-nio-8080-exec-7] INFO  com.activiti.extension.bean.CallAcsSpringJavaDelegate  - ACS ReST API base URL: http://content:8080/alfresco/api/-default-/public/alfresco/versions/1
process_1        | 02:06:34 [http-nio-8080-exec-7] INFO  com.activiti.extension.bean.CallAcsSpringJavaDelegate  - Created new Request folder: class NodeEntry {
process_1        |     entry: class Node {
process_1        |         id: 24c973f1-bbd7-4d5d-92ca-dc345efb00fc
process_1        |         name: My Folder
process_1        |         nodeType: cm:folder
process_1        |         isFolder: true
process_1        |         isFile: false
process_1        |         isLocked: false
process_1        |         modifiedAt: 2018-09-24T14:06:33.822Z
process_1        |         modifiedByUser: class UserInfo {
process_1        |             displayName: Administrator
process_1        |             id: admin
process_1        |         }
process_1        |         createdAt: 2018-09-24T14:06:33.822Z
process_1        |         createdByUser: class UserInfo {
process_1        |             displayName: Administrator
process_1        |             id: admin
process_1        |         }
process_1        |         parentId: 8f2105b4-daaf-4874-9e8a-2152569d109b
process_1        |         isLink: null
process_1        |         content: null
process_1        |         aspectNames: [cm:titled, cm:auditable]
process_1        |         properties: {cm:title=My new folder, cm:description=A folder created via ReST API call from APS}
process_1        |         allowableOperations: null
process_1        |         path: null
process_1        |         permissions: null
process_1        |     }
process_1        | }
process_1        | 02:06:34 [http-nio-8080-exec-7] INFO  com.activiti.extension.bean.CallAcsSpringJavaDelegate  - Created new folder in Repository [nodeId=24c973f1-bbd7-4d5d-92ca-dc345efb00fc]
```
The folder is created in the Document Library of the default site.


   
  
 
