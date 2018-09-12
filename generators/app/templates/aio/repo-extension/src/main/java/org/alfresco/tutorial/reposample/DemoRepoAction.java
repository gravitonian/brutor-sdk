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
package <%- package %>.platformsample;

import org.alfresco.repo.action.executer.ActionExecuterAbstractBase;
import org.alfresco.service.cmr.action.Action;
import org.alfresco.service.cmr.action.ParameterDefinition;
import org.alfresco.service.cmr.repository.NodeRef;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * Custom Repository action
 *
 * @author martin.bergljung@alfresco.com
 */
public class DemoRepoAction extends ActionExecuterAbstractBase {
    private static final Logger LOG = LoggerFactory.getLogger(DemoRepoAction.class);

    @Override
    protected void addParameterDefinitions(List<ParameterDefinition> paramList) {
        // No parameters are passed to action
    }

    @Override
    protected void executeImpl(Action action, NodeRef actionedUponNodeRef) {
        System.out.println("Now, do something ...");
    }
}

