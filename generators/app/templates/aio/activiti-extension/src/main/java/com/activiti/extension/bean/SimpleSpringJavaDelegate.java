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


import com.activiti.domain.idm.User;
import com.activiti.service.api.UserService;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.JavaDelegate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * A simple Service Task delegate implemented as a Spring Bean.
 *
 */
@Component("simpleSpringJavaDelegate")
public class SimpleSpringJavaDelegate implements JavaDelegate {
    private static Logger logger = LoggerFactory.getLogger(SimpleSpringJavaDelegate.class);

    @Autowired
    protected UserService userService;

    /**
     * Service Task implementation
     */
    @Override
    public void execute(DelegateExecution execution) throws Exception {
      logger.info("Calling SimpleSpringJavaDelegate");

      User user = userService.findUser(Long.parseLong((String)execution.getVariable("initiator")));
      String username = user.getFirstName() + " " + user.getLastName();
      logger.info("Initiator is: " + username);
    }
}
