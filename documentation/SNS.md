# Amazon Web Services (AWS) Module

## Amazon Simple Notification Service (Amazon SNS)
Amazon SNS is a web service that enables you to build distributed web-enabled applications. Applications can use Amazon SNS to easily push real-time notification messages to interested subscribers over multiple delivery protocols. For more information about this product go to http://aws.amazon.com/sns.

## Useful Links

* [ Getting Started with Amazon Web Services ]( http://docs.amazonwebservices.com/gettingstarted/latest/awsgsg-intro/intro.html )
* [ Amazon SNS ]( http://aws.amazon.com/documentation/sns/ )

## Method Calls

All methods are called using a standard calling convention:

* parameters[object]: Request parameters as specified in the corresponding Amazon Web Services API documentation.
* success[function]: A callback function that is executed if the request succeeds (optional). Parameters passed to the callback function are:
    * data[object]: Processed data.
    * response[object]: Server response.
* error[function]: A callback function that is executed if the request fails (optional). Parameters passed to the callback function are:
    * message[string]: Error message.
    * error[object]: Server response.

### Example

        AWS.SNS.addPermission({
            'TopicArn' : '',
            'Label' : 'MyPermission',
            'ActionName.member.1' : 'GetTopicAttributes',
            'AWSAccountId.member.1' : ''
        },
        function(data, response){
            Ti.API.info(JSON.stringify(data));
        },
        function(message, error) {
            Ti.API.error(message);
            Ti.API.info(JSON.stringify(error));
        });

## Methods

[addPermission](http://docs.amazonwebservices.com/sns/latest/api/API_AddPermission.html)

[confirmSubscription](http://docs.amazonwebservices.com/sns/latest/api/API_ConfirmSubscription.html)

[createTopic](http://docs.amazonwebservices.com/sns/latest/api/API_CreateTopic.html)

[deleteTopic](http://docs.amazonwebservices.com/sns/latest/api/API_DeleteTopic.html)

[getSubscriptionAttributes](http://docs.amazonwebservices.com/sns/latest/api/API_GetSubscriptionAttributes.html)

[getTopicAttributes](http://docs.amazonwebservices.com/sns/latest/api/API_GetTopicAttributes.html)

[listSubscriptions](http://docs.amazonwebservices.com/sns/latest/api/API_ListSubscriptions.html)

[listSubscriptionsByTopic](http://docs.amazonwebservices.com/sns/latest/api/API_ListSubscriptionsByTopic.html)

[listTopics](http://docs.amazonwebservices.com/sns/latest/api/API_ListTopics.html)

[publish](http://docs.amazonwebservices.com/sns/latest/api/API_Publish.html)

[removePermission](http://docs.amazonwebservices.com/sns/latest/api/API_RemovePermission.html)

[setSubscriptionAttributes](http://docs.amazonwebservices.com/sns/latest/api/API_SetSubscriptionAttributes.html)

[setTopicAttributes](http://docs.amazonwebservices.com/sns/latest/api/API_SetTopicAttributes.html)

[subscribe](http://docs.amazonwebservices.com/sns/latest/api/API_Subscribe.html)

[unsubscribe](http://docs.amazonwebservices.com/sns/latest/api/API_Unsubscribe.html)

## License

Copyright(c) 2011-2012 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

