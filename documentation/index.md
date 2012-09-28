# Ti.Amazon Web Services Module

## Author

GlobalLogic

## Documentation

## Installation

* [ Using Mondules ]( http://docs.appcelerator.com/titanium/2.1/index.html#!/guide/Using_Modules )

## Supported


 * [Amazon SimpleDB](http://aws.amazon.com) (Simple Storage Service)

	SimpleDB
	
			method : batchPutAttributes
			required Params: DomainName'
			
			method : putAttributes
			required Params : DomainName, ItemName

			method : 'batchDeleteAttributes',

					params : ['DomainName']


			method : 'listDomains',

			method : 'createDomain',
			
				required : {
					params : ['DomainName']

			method : 'deleteDomain',
					params : ['DomainName']

			method : 'select',

					params : ['SelectExpression']

			method : 'domainMetadata',

			method : 'getAttributes',
					params : ['DomainName', 'ItemName']

			method : 'deleteAttributes',

			required params : ['DomainName', 'ItemName']

		 * [Amazon Simple Storage Service (S3)  ](https:aws.amazon.com) (Simple Storage Service)


			method : 'getService'

			method : 'getPresignedUrl',
					params : ['bucketName', 'expires']

			method : 'listVersions',
					params : ['bucketName']

			method : 'deleteVersion',
					params : ['bucketName', 'key', 'versionId']

			method : 'deleteBucket',
					params : ['bucketName']
			
			method : 'deleteBucketLifecycle',
					params : ['bucketName']

			method : 'deleteBucketPolicy',
					params : ['bucketName']

			method : 'deleteBucketWebsite',
					params : ['bucketName']

			method : 'listObjects',
					params : ['bucketName']

			method : 'getBucketAcl', // Xml Parsing Problem.
					params : ['bucketName']

			method : 'getBucketLifecycle',
					params : ['bucketName']

			method : 'getBucketPolicy',
					params : ['bucketName']
					
			method : 'getBucketLocation',
					params : ['bucketName']

			method : 'getBucketLogging',
					params : ['bucketName']

			method : 'getBucketNotification',
					params : ['bucketName']

			method : 'getBucketObjectVersions',
					params : ['bucketName']

			method : 'getBucketRequestPayment',
					params : ['bucketName']

			method : 'getBucketVersioning',
					params : ['bucketName']

			method : 'getBucketWebsite',
					params : ['bucketName']
				
			method : 'getObjectMetadata',
					params : ['bucketName']
					
			method : 'listMultipartUploads',
					params : ['bucketName']
					
			method : 'putBucket',
					params : ['bucketName']

			method : 'putBucketAcl',
					params : ['bucketName', 'xmlTemplate']

			method : 'putBucketLifecycle',
					params : ['bucketName', 'xmlTemplate']

			method : 'putBucketPolicy',
					params : ['bucketName', 'xmlTemplate']

			method : 'putBucketLogging',
					params : ['bucketName', 'xmlTemplate']

			method : 'putBucketNotification',
					params : ['bucketName', 'xmlTemplate']

			method : 'putBucketRequestPayment',
					params : ['bucketName', 'xmlTemplate']

			method : 'putBucketVersioning',
					params : ['bucketName', 'xmlTemplate']

			method : 'putBucketWebsite',
					params : ['bucketName', 'xmlTemplate']

			method : 'deleteObject',
					params : ['bucketName', 'objectName']

			method : 'deleteMultipleObjects',
					params : ['bucketName', 'xmlTemplate']

			method : 'getObject', // Returning Blob Data.
					params : ['bucketName', 'objectName']

			method : 'getObjectTorrent', // Returning Blob Data.
					params : ['bucketName', 'objectName']

			method : 'getObjectAcl', // Xml Parsing Problem.
					params : ['bucketName', 'objectName']

			method : 'headObject',
					params : ['bucketName', 'objectName']
					
			method : 'putObject', //Working on Ios only.Content Length Header Value Cannot be Override in Android.
					params : ['bucketName', 'objectName']

			method : 'putObjectAcl',
					params : ['bucketName', 'objectName', 'xmlTemplate']

			method : 'putObjectCopy',
					params : ['bucketName', 'objectName', 'copySource']

			method : 'initiateMultipartUpload',
					params : ['bucketName', 'objectName']

			method : 'abortMultipartUpload',
					params : ['bucketName', 'objectName', 'uploadId']

			method : 'completeMultipartUpload',
					params : ['bucketName', 'objectName', 'uploadId', 'xmlTemplate']
					
			method : 'uploadPart',
					params : ['bucketName', 'objectName', 'uploadId', 'partNumber', 'file']

			method : 'uploadPartCopy',
					params : ['bucketName', 'objectName', 'uploadId', 'partNumber']

			method : 'listParts',
					params : ['bucketName', 'objectName', 'uploadId']

		* [Amazon Simple Email Service (SES)](http://aws.amazon.com) (Identity and Access Management)
		
			method : 'deleteVerifiedEmailAddress',
			validations : {
				required : {
					params : ['emailAddress']
				}
			}
		}, {
			method : 'getSendQuota'
		}, {
			method : 'getSendStatistics'
		}, {
			method : 'listVerifiedEmailAddresses'
		}, {
			method : 'sendEmail',
			validations : {
				required : {
					params : ['source', 'destination', 'message']
				}
			}
		}, {
			method : 'sendRawEmail',
			isRawMessage : true,
			validations : {
				required : {
					params : ['rawMessage']
				}
			}
		}, {
			method : 'verifyEmailAddress',
			validations : {
				required : {
					params : ['emailAddress']
				}
			}
		}]
	}, {
		property : 'SQS',
		endpoint : "http://sqs."+regionEndpoint+".amazonaws.com",
		version : '2009-02-01',
		children : [{
			method : 'createQueue',
			version : '2011-10-01',
			validations : {
				required : {
					params : ['QueueName']
				}
			}

		}, {
			method : 'listQueues',
			version : '2011-10-01',
			arrayOverride : ['/ListQueuesResponse/ListQueuesResult/QueueUrl']
		}, {
			method : 'getQueueUrl',
			version : '2011-10-01',
			validations : {
				required : {
					params : ['QueueName']
				}
			}
		}, {
			method : 'addPermission',
			version : '2011-10-01'
		}, {
			method : 'setQueueAttributes',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName', 'Attribute.Name', 'Attribute.Value']
				}
			}
		}, {
			method : 'getQueueAttributes',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName']
				}
			},
			patternExistsValidator : {
				params : ['AttributeName.*']
			}
		}, {
			method : 'sendMessage',
			version : '2011-10-01',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName', 'MessageBody']
				}
			}
		}, {
			method : 'sendMessageBatch',
			version : '2011-10-01',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName']
				}
			},
			patternExistsValidator : {
				params : ['SendMessageBatchRequestEntry.*.Id', 'SendMessageBatchRequestEntry.*.MessageBody']
			}
		}, {
			method : 'receiveMessage',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName']
				}
			}
		}, {
			method : 'deleteMessage',
			validations : {
				required : {
					params : ['ReceiptHandle', 'AWSAccountId', 'QueueName']
				}
			}
		}, {
			method : 'deleteMessageBatch',
			version : '2011-10-01',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName']
				}
			},
			patternExistsValidator : {
				params : ['DeleteMessageBatchRequestEntry.*.Id', 'DeleteMessageBatchRequestEntry.*.ReceiptHandle']
			}
		}, {
			method : 'deleteQueue',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName']
				}
			}
		}, {
			method : 'changeMessageVisibility',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName', 'ReceiptHandle', 'VisibilityTimeout']
				}
			}
		}, {
			method : 'changeMessageVisibilityBatch',
			version : '2011-10-01',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName']
				}
			},
			patternExistsValidator : {
				params : ['ChangeMessageVisibilityBatchRequestEntry.*.Id', 'ChangeMessageVisibilityBatchRequestEntry.*.ReceiptHandle', 'ChangeMessageVisibilityBatchRequestEntry.*.VisibilityTimeout']
			}
		}, {
			method : 'removePermission',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName', 'Label']
				}
			}
		}]
	}, {
		
		 * [Amazon Simple Notification Service (SNS) ](http://aws.amazon.com)
		

			method : 'addPermission',
					params : ['Label', 'TopicArn']
					
			method : 'confirmSubscription',
					params : ['Token', 'TopicArn']

			method : 'createTopic',
					params : ['Name']

			method : 'deleteTopic',
					params : ['TopicArn']

			method : 'getSubscriptionAttributes',
					params : ['SubscriptionArn']

			method : 'getTopicAttributes',
					params : ['TopicArn']

			method : 'listSubscriptions'

			method : 'listSubscriptionsByTopic',
					params : ['TopicArn']

			method : 'listTopics'
					params : ['TopicArn', 'Message']

			method : 'removePermission',
					params : ['Label', 'TopicArn']

			method : 'setSubscriptionAttributes',
					params : ['AttributeName', 'AttributeValue', 'SubscriptionArn']

			method : 'setTopicAttributes',
					params : ['AttributeName', 'AttributeValue', 'TopicArn']

			method : 'subscribe',
					params : ['TopicArn', 'Endpoint', 'Protocol']

			method : 'unsubscribe',
					params : ['SubscriptionArn']

		* [STS]()
			method : 'getSessionToken'

		 * [Amazon DynamoDB](http://aws.amazon.com)
			
			method : 'listTables'
			method : 'batchWriteItem'
			method : 'describeTable'
			method : 'updateTable'
			method : 'updateItem'
			method : 'deleteTable'
			method : 'getItem'
			method : 'putItem'
			method : 'scan'
			method : 'query'
			method : 'deleteItem'
			method : 'batchGetItem'
			method : 'createTable'
				
		 * [Amazon Simple Queue Service (SQS)](http://aws.amazon.com) (Simple Queue Service)
		


## License

Copyright(c) 2011-2012 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

