# Amazon Web Services (AWS) Module

## Amazon Simple Queue Service (Amazon SQS)
Amazon SQS offers reliable and scalable hosted queues for storing messages as they travel between computers. By using Amazon SQS, you can move data between distributed components of your applications that perform different tasks without losing messages or requiring each component to be always available.

## Useful Links

* [ Getting Started with Amazon Web Services ]( http://docs.amazonwebservices.com/gettingstarted/latest/awsgsg-intro/intro.html )
* [ Amazon SQS ]( http://aws.amazon.com/documentation/sqs/ )

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
    	AWS.SQS.createQueue({
    	  'QueueName' : 'Test'
  	    },
        function(data, response){
            Ti.API.info(JSON.stringify(data));
        },
        function(message, error) {
            Ti.API.error(message);
            Ti.API.info(JSON.stringify(error));
        });

## Methods

[addPermission](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QueryAddPermission.html)

[changeMessageVisibility](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QueryChangeMessageVisibility.html)

[changeMessageVisibilityBatch](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QueryChangeMessageVisibilityBatch.html)

[createQueue](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QueryCreateQueue.html)

[deleteMessage](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QueryDeleteMessage.html)

[deleteMessageBatch](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QueryDeleteMessageBatch.html)

[deleteQueue](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QueryDeleteQueue.html)

[getQueueAttributes](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QueryGetQueueAttributes.html)

[getQueueUrl](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QueryGetQueueUrl.html)

[listQueues](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QueryListQueues.html)

[receiveMessage](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QueryReceiveMessage.html)

[removePermission](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QueryRemovePermission.html)

[sendMessage](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QuerySendMessage.html)

[sendMessageBatch](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QuerySendMessageBatch.html)

[setQueueAttributes](http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/APIReference/Query_QuerySetQueueAttributes.html)

## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

