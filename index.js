const aws = require('aws-sdk');

const config = new aws.ConfigService();


// Helper function used to validate input
function checkDefined(reference, referenceName) {
    if (!reference) {
        throw new Error(`Error: ${referenceName} is not defined`);
    }
    return reference;
}

// Check whether the message is OversizedConfigurationItemChangeNotification or not
function isOverSizedChangeNotification(messageType) {
    checkDefined(messageType, 'messageType');
    return messageType === 'OversizedConfigurationItemChangeNotification';
}

// Get configurationItem using getResourceConfigHistory API.
function getConfiguration(resourceType, resourceId, configurationCaptureTime, callback) {
    config.getResourceConfigHistory({ resourceType, resourceId, laterTime: new Date(configurationCaptureTime), limit: 1 }, (err, data) => {
        if (err) {
            callback(err, null);
        }
        const configurationItem = data.configurationItems[0];
        callback(null, configurationItem);
    });
}

// Convert from the API model to the original invocation model
/*eslint no-param-reassign: ["error", { "props": false }]*/
function convertApiConfiguration(apiConfiguration) {
    apiConfiguration.awsAccountId = apiConfiguration.accountId;
    apiConfiguration.ARN = apiConfiguration.arn;
    apiConfiguration.configurationStateMd5Hash = apiConfiguration.configurationItemMD5Hash;
    apiConfiguration.configurationItemVersion = apiConfiguration.version;
    apiConfiguration.configuration = JSON.parse(apiConfiguration.configuration);
    if ({}.hasOwnProperty.call(apiConfiguration, 'relationships')) {
        for (let i = 0; i < apiConfiguration.relationships.length; i++) {
            apiConfiguration.relationships[i].name = apiConfiguration.relationships[i].relationshipName;
        }
    }
    return apiConfiguration;
}

// Based on the type of message get the configuration item either from configurationItem in the invoking event or using the getResourceConfigHistiry API in getConfiguration function.
function getConfigurationItem(invokingEvent, callback) {
    checkDefined(invokingEvent, 'invokingEvent');
    if (isOverSizedChangeNotification(invokingEvent.messageType)) {
        const configurationItemSummary = checkDefined(invokingEvent.configurationItemSummary, 'configurationItemSummary');
        getConfiguration(configurationItemSummary.resourceType, configurationItemSummary.resourceId, configurationItemSummary.configurationItemCaptureTime, (err, apiConfigurationItem) => {
            if (err) {
                callback(err);
            }
            const configurationItem = convertApiConfiguration(apiConfigurationItem);
            callback(null, configurationItem);
        });
    } else {
        checkDefined(invokingEvent.configurationItem, 'configurationItem');
        callback(null, invokingEvent.configurationItem);
    }
}

// Check whether the resource has been deleted. If it has, then the evaluation is unnecessary.
function isApplicable(configurationItem, event) {
    checkDefined(configurationItem, 'configurationItem');
    checkDefined(event, 'event');
    const status = configurationItem.configurationItemStatus;
    const eventLeftScope = event.eventLeftScope;
    return (status === 'OK' || status === 'ResourceDiscovered') && eventLeftScope === false;
}

// This is where it's determined whether the resource is compliant or not.
// In this example, we simply decide that the resource is compliant if it is an instance and its type matches the type specified as the desired type.
// If the resource is not an instance, then we deem this resource to be not applicable. (If the scope of the rule is specified to include only
// instances, this rule would never have been invoked.)
function evaluateChangeNotificationCompliance(configurationItem, ruleParameters) {
    checkDefined(configurationItem, 'configurationItem');
    checkDefined(configurationItem.configuration, 'configurationItem.configuration');
    checkDefined(ruleParameters, 'ruleParameters');


// Original Config Rule Logic Starts Here
/*

    if (configurationItem.resourceType !== 'AWS::EC2::Instance') {
        return 'NOT_APPLICABLE';
    } else if (ruleParameters.desiredInstanceType === configurationItem.configuration.instanceType) {
        return 'COMPLIANT';
    }
    return 'NON_COMPLIANT';
}
*/
// Original Config Rule Logic Ends Here


// Custom Config Rule Logic Starts Here
//
//

const AWS = require('aws-sdk');
const s3 = new AWS.S3();


            function sleep(milliseconds) {
            const date = Date.now();
            let currentDate = null;
            do {
            currentDate = Date.now();
                } while (currentDate - date < milliseconds);
                }



function sizeOf(key, bucket) {
    return s3.headObject({ Key: key, Bucket: bucket })
        .promise()
        ////.then(result => result.ContentLength)
        //.then(result => result.ContentLength) //{return var tt = res.ContentLength)
        .then(result => console.log(`Got the final result: ${result.ContentLength}`)
        // .then(finalResult => console.log(res.ContentLength))
        //console.log(result)
        //var test55 = res.ContentLength
        //console.log(test55)
        )
        //console.log(res.ContentLength);
        .catch(function (error) {
            console.log(error.message);
       })}

// sizeOf('ahihi.mp4', 'output').then(size => console.log(size));


    if (configurationItem.resourceType !== 'AWS::EC2::Instance') {
        return 'NOT_APPLICABLE';

   } else if (configurationItem.resourceType === 'AWS::EC2::Instance') {

            var strInstID1 = configurationItem.resourceId;
            //console.log(strInstID1);

            var varInstanceId = strInstID1.toString();
            //console.log(varInstanceId);
            
            var varKey1 = "PSWindowsUpdate/SSM_WUChecks/" + varInstanceId + "/SSM_WUCheck.log";
            //var varKey1 = "PSWindowsUpdate/SSM_WUChecks/i-042c2f2a1425ee628/SSM_WUCheck.log";
            console.log(varKey1);
            
            var strInstID2 = sizeOf(varKey1, 'sbx-poc-adobjectautomation').then(size => console.log(size));
            //console.log(strInstID2);
            var strInstID3 = Math.floor(strInstID2);
            //console.log(strInstID3);

            //console.log(data.ContentLength);
            
            //var strInstID2 = sizeOf(varKey1, 'sbx-poc-adobjectautomation') //.then(size => console.log(size).catch(error => { throw error}));
            // console.log(strInstID2);
            //console.log(strInstID3);
            //console.log(strInstID3);
            


            //console.log("Hello");
            //sleep(2000);
            //console.log("World!");
            
            
            
            
            //console.log(strInstID3);
            //console.log(strInstID3);
            //console.log(strInstID3);
            if (strInstID3 !== -1) {  //if there is no value, then it will equal "-1" and it will exit out of if condition
                                        // main issue is how to equate line 121 -->.then(result => console.log(`Got the final result: ${result.ContentLength}`))
                                        // to variable strInstID3.  Line 121 does produce size of S3 successfully.
                if (strInstID3 === 0) {  //if the S3 log file size (variable "strInstID3") equals 0 KB then the instance is compliant.
                    return 'COMPLIANT';
                }
                if (strInstID3 !== 0) {  //if the S3 log file size (variable "strInstID3") DOES NOT equals 0 KB then the instance is non_compliant.
                    return 'NON_COMPLIANT';
                }
            }
    }
    
    return 'NOT_APPLICABLE';
    }
//
//
// Custom Config Rule Logic Ends Here


// This is the handler that's invoked by Lambda
// Most of this code is boilerplate; use as is
exports.handler = (event, context, callback) => {
    checkDefined(event, 'event');
    const invokingEvent = JSON.parse(event.invokingEvent);
    const ruleParameters = JSON.parse(event.ruleParameters);
    getConfigurationItem(invokingEvent, (err, configurationItem) => {
        if (err) {
            callback(err);
        }
        let compliance = 'NOT_APPLICABLE';
        const putEvaluationsRequest = {};
        if (isApplicable(configurationItem, event)) {
            // Invoke the compliance checking function.
            compliance = evaluateChangeNotificationCompliance(configurationItem, ruleParameters);
        }
        // Put together the request that reports the evaluation status
        putEvaluationsRequest.Evaluations = [
            {
                ComplianceResourceType: configurationItem.resourceType,
                ComplianceResourceId: configurationItem.resourceId,
                ComplianceType: compliance,
                OrderingTimestamp: configurationItem.configurationItemCaptureTime,
            },
        ];
        putEvaluationsRequest.ResultToken = event.resultToken;

        // Invoke the Config API to report the result of the evaluation
        config.putEvaluations(putEvaluationsRequest, (error, data) => {
            if (error) {
                callback(error, null);
            } else if (data.FailedEvaluations.length > 0) {
                // Ends the function execution if any evaluation results are not successfully reported.
                callback(JSON.stringify(data), null);
            } else {
                callback(null, data);
            }
        });
    });
};
