# Ti.Amazon Web Services Module

## Author

GlobalLogic

## Documentation

Amazon WebServices Module
A framework for exposing the Amazon QueryAPIs to Appcelerator Titanium Mobile.

This framework is designed for QueryAPIs provided by AWS. Each service is represented
as a NameSpace, within which each operation is exposed.

This framework requires you to refer to the AWS API reference for handling request, and
responses received from the service.
i.e. refer to : http://aws.amazon.com/documentation/

## Installation

* [ Using Mondules ]( http://docs.appcelerator.com/titanium/2.1/index.html#!/guide/Using_Modules )

## Supported


* [Amazon SimpleDB](http://aws.amazon.com)
	

	createDomain
	```javascript
		AWS.SimpleDB.createDomain({
			DomainName : 'DomainName'
		},
		function(data, response){
			Ti.API.info(JSON.stringify(data));
  		},  
		function(message, error) { 
			Ti.API.info(JSON.stringify(error));
		});
	
	```
	
	listDomain
	```javascript
		AWS.SimpleDB.listDomains({
		},	
		function(data, response){
			Ti.API.info(JSON.stringify(data));
  		},  
		function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```
	
	domainMetadata
	```javascript
		AWS.SimpleDB.domainMetadata({
			DomainName : 'DomainName',
		},
		function(data, response){
			Ti.API.info(JSON.stringify(data));
  		}, 
		function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```
	
	listDomains
	```javascript
		listDomains()
	```

	createDomain
	```javascript
		createDomain ( DomainName );
	```
	
	deleteDomain
	```javascript
		deleteDomain(DomainName);
	```
	
	select
	```javascript
		select(SelectExpression);
	```
	
	domainMetadata
	```javascript
		domainMetadata();
	```
	
	getAttributes
	```javascript	
		getAttributes(DomainName,ItemName);
	```
	
	deleteAttributes
	```javascript
		deleteAttributes(DomainName, ItemName);
	```
	
* [Amazon Simple Storage Service (S3)  ](https:aws.amazon.com) (Simple Storage Service)

	getService
	```javascript
		getService
	```
	
	getPresignedUrl
	```javascript
		getPresignedUrl(BucketName, expires)
	```
	
	listVersions
	```javascript
		listVersions(BucketName)
	```
	
	deleteVersion
	```javascript
		deleteVersion(BucketName, key, versionId)
	```
	
	deleteBucket
	```javascript
		deleteBucket(BucketName)
	```
	
	deleteBucketLifecycle
	```javascript
		deleteBucketLifecycle (BucketName)
	```
	
	deleteBucketPolicy
	```javascript
		deleteBucketPolicy(BucketName)
	```
	
	deleteBucketWebsite
	```javascript
		deleteBucketWebsite(BucketName)
	```
	
	listObjects
	```javascript
		listObjects(BucketName)
	```
	
	getBucketAcl', // Xml Parsing Problem.
	```javascript
		getBucketAcl(BucketName);
	```
	
	getBucketLifecycle
	```javascript
		getBucketLifecycle(BucketName)
	```
	
	getBucketPolicy
	```javascript
		getBucketPolicy(BucketName)
	```
	
	getBucketLocation
	```javascript
		getBucketLocation(BucketName)
	```
	
	getBucketLogging
	```javascript
	 	getBucketLogging(BucketName)
	```
	
	getBucketNotification
	```javascript
		getBucketNotification  ['BucketName']
	```
	
	getBucketObjectVersions
	```javascript
	 	getBucketObjectVersions ['BucketName']
	```
	
	getBucketRequestPayment
	```javascript
		getBucketRequestPayment ['BucketName']
	```
	
	getBucketVersioning
	```javascript
		getBucketVersioning ['BucketName']
	```
	
	getBucketWebsite
	```javascript
		getBucketWebsite ['BucketName']
	```
	
	getObjectMetadata
	```javascript
		getObjectMetadata ['BucketName']
	```
	
	listMultipartUploads
	```javascript
		listMultipartUploads ['BucketName']
	```
	
	putBucket
	```javascript
	 	putBucket ['BucketName']
	```
	
	putBucketAcl
	```javascript
		 putBucketAcl ['BucketName', 'xmlTemplate']
	```
	
	putBucketLifecycle
	```javascript
		 putBucketLifecycle ['BucketName', 'xmlTemplate']
	```
	
	putBucketPolicy
	```javascript
		putBucketPolicy ['BucketName', 'xmlTemplate']
	```
	
	putBucketLogging
	```javascript
		putBucketLogging ['BucketName', 'xmlTemplate']
	```
	
	putBucketNotification
	```javascript
		putBucketNotification ['BucketName', 'xmlTemplate']
	```
	
	putBucketRequestPayment
	```javascript
		putBucketRequestPayment ['BucketName', 'xmlTemplate']
	```
	
	putBucketVersioning
	```javascript
		putBucketVersioning ['BucketName', 'xmlTemplate']
	```
	
	putBucketWebsite
	```javascript
		putBucketWebsite ['BucketName', 'xmlTemplate']
	```
	
	deleteObject
	```javascript
		deleteObject ['BucketName', 'ObjectName']
	```
	
	deleteMultipleObjects
	```javascript
		deleteMultipleObjects ['BucketName', 'xmlTemplate']
	```
	
	getObject   // Returning Blob Data.
	```javascript
		getObject ['BucketName', 'ObjectName']
	```
	
	getObjectTorrent  // Returning Blob Data.
	```javascripts
		getObjectTorrent  ['BucketName', 'ObjectName']
	```
	
	getObjectAcl  // Xml Parsing Problem.
	```javascript
	 	getObjectAcl ['BucketName', 'ObjectName']
	```
	
	headObject
	```javascript
		headObject ['BucketName', 'ObjectName']
	```				
	putObject   //Working on Ios only.Content Length Header Value Cannot be Override in Android.
	```javascript
		putObject ['BucketName', 'ObjectName']
	'''
	
	putObjectAcl
	```javascript
		putObjectAcl ['BucketName', 'ObjectName', 'xmlTemplate']
	```
	
	putObjectCopy
	```javascript
		params : ['BucketName', 'ObjectName', 'copySource']
	```	
	
	initiateMultipartUpload
	```javascript
		initiateMultipartUpload ['BucketName', 'ObjectName']
	```
	
	abortMultipartUpload
	```javascript
		abortMultipartUpload ['BucketName', 'ObjectName', 'UploadId']
	'''
	
	completeMultipartUpload
	```javascript
		completeMultipartUpload : ['BucketName', 'ObjectName', 'UploadId', 'xmlTemplate']
	'''
	
	uploadPart
	```javascript
		uploadPart ['BucketName', 'ObjectName', 'UploadId', 'PartNumber', 'file']
	'''
	
	uploadPartCopy
	```javascript
		uploadPartCopy ['BucketName', 'ObjectName', 'UploadId', 'PartNumber']
	```
	
	listParts
	```javascript
		listParts ['BucketName', 'ObjectName', 'UploadId']
	```
	
* [Amazon Simple Email Service (SES)](http://aws.amazon.com) (Identity and Access Management)
	
	deleteVerifiedEmailAddress
	```javascript
		deleteVerifiedEmailAddress (EmailAddress);
	```
	
	getSendQuota
	```javascript
		getSendQuota()
	```
	
	getSendStatistics
	```javascript
		getSendStatistics()
	```
	
	listVerifiedEmailAddresses
	```javascript
		listVerifiedEmailAddresses()
	```
	
	sendEmail
	```javascript
		sendEmail(Source, Destination, Message)
	```
	
	sendRawEmail
	```javascript
		sendRawEmail(RawMessage)
	```
	
	verifyEmailAddress
	```javascript
		verifyEmailAddress (EmailAddress)
	```
	
* [Amazon Simple Queue Service (SQS)](http://aws.amazon.com) (Simple Queue Service)


		createQueue
		```javascript
				createQueue ['QueueName']
		```
		
		listQueues
		```javascript
			listQueues()
		```

		getQueueUrl
		```javascript
				getQueueUrl  ['QueueName']
		```

		addPermission
		```javascript
			addPermission()
		```
		
		setQueueAttributes
		```javascript
			setQueueAttributes : ['AWSAccountId', 'QueueName', 'Attribute.Name', 'Attribute.Value']
		```
		
		getQueueAttributes
		```javascript
				getQueueAttributes ['AWSAccountId', 'QueueName']
		```

		patternExistsValidator
		```javascript
		 	patternExistsValidator['AttributeName.*']
		```

		sendMessage
		```javascript
				sendMessage (AWSAccountId, QueueName,MessageBody)
		```

		sendMessageBatch',
		```javascript
				params : ['AWSAccountId', 'QueueName']
		```
		
		receiveMessage
		```javascript
				receiveMessage : ['AWSAccountId', 'QueueName']
		```
		
		deleteMessage
		```javascript
				deleteMessage : ['ReceiptHandle', 'AWSAccountId', 'QueueName']
		```
		
		deleteMessageBatch
		```javascript
				deleteMessageBatch : ['AWSAccountId', 'QueueName']
		```
		
		patternExistsValidator
		```javascript
			patternExistsValidator : ['DeleteMessageBatchRequestEntry.*.Id', 'DeleteMessageBatchRequestEntry.*.ReceiptHandle']
		```
		
		deleteQueue
		```javascript
				deleteQueue ['AWSAccountId', 'QueueName']
		```
		
		changeMessageVisibility
		```javascript
				params : ['AWSAccountId', 'QueueName', 'ReceiptHandle', 'VisibilityTimeout']
		```
		
		changeMessageVisibilityBatch
		```javascript
				params : ['AWSAccountId', 'QueueName']
		```
				
		patternExistsValidator
				```javascript
				params : ['ChangeMessageVisibilityBatchRequestEntry.*.Id', 'ChangeMessageVisibilityBatchRequestEntry.*.ReceiptHandle', 'ChangeMessageVisibilityBatchRequestEntry.*.VisibilityTimeout']

				```javascript
			removePermission',
					params : ['AWSAccountId', 'QueueName', 'Label']
		
		 * [Amazon Simple Notification Service (SNS) ](http://aws.amazon.com)
		

			```javascript
			addPermission',
					params : ['Label', 'TopicArn']
					
					```javascript
			confirmSubscription',
					params : ['Token', 'TopicArn']

					```javascript
			createTopic',
					params : ['Name']

					```javascript
			deleteTopic',
					params : ['TopicArn']

					```javascript
			getSubscriptionAttributes',
					params : ['SubscriptionArn']

					```javascript
			getTopicAttributes',
					params : ['TopicArn']

					```javascript
			listSubscriptions'

			```javascript
			listSubscriptionsByTopic',
					params : ['TopicArn']

					```javascript
			listTopics'
					params : ['TopicArn', 'Message']

					```javascript
			removePermission',
					params : ['Label', 'TopicArn']

					```javascript
			setSubscriptionAttributes',
					params : ['AttributeName', 'AttributeValue', 'SubscriptionArn']

			setTopicAttributes',
			```javascript
					params : ['AttributeName', 'AttributeValue', 'TopicArn']

			subscribe',
			```javascript
					params : ['TopicArn', 'Endpoint', 'Protocol']

			unsubscribe',
			```javascript
					params : ['SubscriptionArn']

		* [STS]()
			getSessionToken'
			```javascript
			```

* [Amazon DynamoDB](http://aws.amazon.com)
			
	listTables
	```javascript
	listTables();
	```
	batchWriteItem
	```javascript
	batchWriteItem();
	```
	
	describeTable
	```javascript
	describeTable();
	```
	
	updateTable
	```javascript
	updateTable();
	```
	
	updateItem
	```javascript
	updateItem();
	```
	
	deleteTable
	```javascript
	deleteTable();
	```
	
	getItem
	```javascript
	getItem();
	```
	
	putItem
	```javascript
	putItem();
	```'
	
	scan
	```javascript
		scan();
	```
	
	query
	```javascript
		query();
	```
	
	deleteItem
	```javascript
		deleteItem();
	```
	
	batchGetItem
	```javascript
		batchGetItem();
	```
	createTable
	```javascript
		createTable();
	```

## License

Copyright(c) 2011-2012 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

