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
 * A simple Service Task delegate implemented as a Spring Bean.
 *
 */
@Component("simpleSpringJavaDelegate")
public class SimpleSpringJavaDelegate implements JavaDelegate {
    private static Logger logger = LoggerFactory.getLogger(SimpleSpringJavaDelegate.class);

    // TODO: find some other bean to inject
    @Autowired
    protected AlfrescoEndpointService alfrescoEndpointService;

    /**
     * Service Task implementation
     */
    @Override
    public void execute(DelegateExecution execution) throws Exception {
        logger.info("Calling SimpleSpringJavaDelegate");
    }
}
