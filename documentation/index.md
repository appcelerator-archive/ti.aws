# Ti.Amazon Web Services Module

## Author

GlobalLogic

## Documentation

## Installation

* [ Using Mondules ]( http://docs.appcelerator.com/titanium/2.1/index.html#!/guide/Using_Modules )

## Supported


* [Amazon SimpleDB](http://aws.amazon.com) (Simple Storage Service)
	
	SimpleDBs
	
	batchPutAttributes
	```javascript
		batchPutAttributes( DomainName )
	```
	
	putAttributes
	```javascript
		putAttributes(DomainName, ItemName  )
	```
	
	batchDeleteAttributes
	```javascript
		batchDeleteAttributes(DomainName) 
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
		getPresignedUrl(bucketName, expires)
	```
	
	listVersions
	```javascript
		listVersions(bucketName)
	```
	
	deleteVersion
	```javascript
		deleteVersion(bucketName, key, versionId)
	```
	
	deleteBucket
	```javascript
		deleteBucket(bucketName)
	```
	
	deleteBucketLifecycle
	```javascript
		deleteBucketLifecycle (bucketName)
	```
	
	deleteBucketPolicy
	```javascript
		deleteBucketPolicy(bucketName)
	```
	
	deleteBucketWebsite
	```javascript
		deleteBucketWebsite(bucketName)
	```
	
	listObjects
	```javascript
		listObjects(bucketName)
	```
	
	getBucketAcl', // Xml Parsing Problem.
	```javascript
		getBucketAcl(bucketName);
	```
	
	getBucketLifecycle
	```javascript
		getBucketLifecycle(bucketName)
	```
	
	getBucketPolicy
	```javascript
		getBucketPolicy(bucketName)
	```
	
	getBucketLocation
	```javascript
		getBucketLocation(bucketName)
	```
	
	getBucketLogging
	```javascript
	 	getBucketLogging(bucketName)
	```
	
	getBucketNotification
	```javascript
		getBucketNotification  ['bucketName']
	```
	
	getBucketObjectVersions
	```javascript
	 	getBucketObjectVersions ['bucketName']
	```
	
	getBucketRequestPayment
	```javascript
		getBucketRequestPayment ['bucketName']
	```
	
	getBucketVersioning
	```javascript
		getBucketVersioning ['bucketName']
	```
	
	getBucketWebsite
	```javascript
		getBucketWebsite ['bucketName']
	```
	
	getObjectMetadata
	```javascript
		getObjectMetadata ['bucketName']
	```
	
	listMultipartUploads
	```javascript
		listMultipartUploads ['bucketName']
	```
	
	putBucket
	```javascript
	 	putBucket ['bucketName']
	```
	
	putBucketAcl
	```javascript
		 putBucketAcl ['bucketName', 'xmlTemplate']
	```
	
	putBucketLifecycle
	```javascript
		 putBucketLifecycle ['bucketName', 'xmlTemplate']
	```
	
	putBucketPolicy
	```javascript
		putBucketPolicy ['bucketName', 'xmlTemplate']
	```
	
	putBucketLogging
	```javascript
		putBucketLogging ['bucketName', 'xmlTemplate']
	```
	
	putBucketNotification
	```javascript
		putBucketNotification ['bucketName', 'xmlTemplate']
	```
	
	putBucketRequestPayment
	```javascript
		putBucketRequestPayment ['bucketName', 'xmlTemplate']
	```
	
	putBucketVersioning
	```javascript
		putBucketVersioning ['bucketName', 'xmlTemplate']
	```
	
	putBucketWebsite
	```javascript
		putBucketWebsite ['bucketName', 'xmlTemplate']
	```
	
	deleteObject
	```javascript
		deleteObject ['bucketName', 'objectName']
	```
	
	deleteMultipleObjects
	```javascript
		deleteMultipleObjects ['bucketName', 'xmlTemplate']
	```
	
	getObject   // Returning Blob Data.
	```javascript
		getObject ['bucketName', 'objectName']
	```
	
	getObjectTorrent  // Returning Blob Data.
	```javascripts
		getObjectTorrent  ['bucketName', 'objectName']
	```
	
	getObjectAcl  // Xml Parsing Problem.
	```javascript
	 	getObjectAcl ['bucketName', 'objectName']
	```
	
	headObject
	```javascript
		headObject ['bucketName', 'objectName']
	```				
	putObject   //Working on Ios only.Content Length Header Value Cannot be Override in Android.
	```javascript
		putObject ['bucketName', 'objectName']
	'''
	
	putObjectAcl
	```javascript
		putObjectAcl ['bucketName', 'objectName', 'xmlTemplate']
	```
	
	putObjectCopy
	```javascript
		params : ['bucketName', 'objectName', 'copySource']
	```	
	
	initiateMultipartUpload
	```javascript
		initiateMultipartUpload ['bucketName', 'objectName']
	```
	
	abortMultipartUpload
	```javascript
		abortMultipartUpload ['bucketName', 'objectName', 'uploadId']
	'''
	
	completeMultipartUpload
	```javascript
		completeMultipartUpload : ['bucketName', 'objectName', 'uploadId', 'xmlTemplate']
	'''
	
	uploadPart
	```javascript
		uploadPart ['bucketName', 'objectName', 'uploadId', 'partNumber', 'file']
	'''
	
	uploadPartCopy
	```javascript
		uploadPartCopy ['bucketName', 'objectName', 'uploadId', 'partNumber']
	```
	
	listParts
	```javascript
		listParts ['bucketName', 'objectName', 'uploadId']
	```
	
* [Amazon Simple Email Service (SES)](http://aws.amazon.com) (Identity and Access Management)
	
	deleteVerifiedEmailAddress
	```javascript
		deleteVerifiedEmailAddress (emailAddress);
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
		sendEmail(source, destination, message)
	```
	
	sendRawEmail
	```javascript
		sendRawEmail(rawMessage)
	```
	
	verifyEmailAddress
	```javascript
		verifyEmailAddress (emailAddress)
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

