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

* [ Using Modules ]( http://docs.appcelerator.com/titanium/2.1/index.html#!/guide/Using_Modules )

## Supported

* Initialize & Aunthentication
	```javascript
	var AWS = require('ti.aws');
	AWS.authorize(accessKey, secretKey);
	```


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
			DomainName : 'DomainName'
		},
		function(data, response){
			Ti.API.info(JSON.stringify(data));
  		}, 
		function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```
	
	putAttributes
	```javascript
		AWS.SimpleDB.putAttributes({
			'DomainName' : 'DomainName',
			'ItemName' : 'ItemName',
			'Attribute.1.Name' : 'AttributeName1',
			'Attribute.1.Value' : 'AttributeValue1',
			'Attribute.2.Name' : 'AttributeName2',
			'Attribute.2.Value' : 'AttributeValue2'
		},
		function(data, response){
			Ti.API.info(JSON.stringify(data));
  		},  
		function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```
	
* [Amazon Simple Storage Service (S3)  ](https:aws.amazon.com) (Simple Storage Service)


	putBucket
	```javascript
		// you may need to choose diff bucketname if this one is not available
		AWS.S3.putBucket({
			'BucketName' : 'BucketName'
		},
		function(data, response) {
			Ti.API.info(JSON.stringify(response));
	  	}, 
		function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```
	
	getBucket
	```javascript
		AWS.S3.getBucket({
			 'BucketName' : 'BucketName'
		},
		function(data, response) {
			Ti.API.info(JSON.stringify(response));
	
	  	},  
		function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	putBucketPolicy
	```javascript
		var jsonObject = {
			"Version" : "2008-10-17",
			//canonical user ID - look up your AWS account and grab one from there
			"Id" : "",
			"Statement" : [{
				"Effect" : 'Allow',
				"Sid" : "1",
				"Principal" : {
						"AWS" : "*"
					},
				"Action" : ["s3:*"],
				"Resource" : "arn:aws:s3:::BucketName/*"
				}]
			};
				
		AWS.S3.putBucketPolicy({
			'BucketName' : 'BucketName',
			'xmlTemplate' : JSON.stringify(jsonObject)
		},
		function(data, response) {
			Ti.API.info(JSON.stringify(response));
	  	}, 
		function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	putObject
	```javascript
		var f = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'KS_nav_views.png');	
		AWS.S3.putObject({
			'BucketName' : 'BucketName',
			'ObjectName' : 'KS_nav_views.png',
			'file' : f
		},
		function(data, response) {
			Ti.API.info(JSON.stringify(response));
	
	  	},  
		function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```



* [Amazon Simple Email Service (SES)](http://aws.amazon.com) (Identity and Access Management)
	
	sendEmail
	```javascript
		AWS.SES.sendEmail({
			'Source' : 'dummy@gmail.com',
			'Destination' : {
				'ToAddresses' : ['test1@gmail.com'],
				'CcAddresses' : ['test2@gmail.com'],
				'BccAddresses' : ['test3@gmail.com']
			},
			'Message' : {
				'Subject' : {
					'Data' : 'Hello Message'
				},
				'Body' : {
					'Text' : {
						'Data' : 'Hi... This is a test message.'
					}
				}
			}
		}, function(response) {
			Ti.API.info('Success: '+ JSON.stringify(response));
		}, function(message,error) {
			Ti.API.info('Error: '+ JSON.stringify(error));
		});
	```

	sendRawEmail
	```javascript
  		var param = [
			'From: test@gmail.com',
			'To: test1@gmail.com',
			'Cc: test2@gmail.com',
			'Subject: Hello Message',
			'MIME-Version: 1.0',
			'Content-Type: text/plain; charset=UTF-8',
			'Content-Transfer-Encoding: 7bit',
			'Date: Tue, 2 Oct 2012 22:08:17 +0000',
			' ',
			'Hi... This is a test message.'
	  		].join('\n');
	

		AWS.SES.sendRawEmail({
			'RawMessage' : {
				//basic base64 encoding
				'Data' : Ti.Utils.base64encode(param)
			}
		},
		function(data, response){
			Ti.API.info('Success: '+ JSON.stringify(response));
			
		},
		function(message,error){
			Ti.API.info('Error: '+ JSON.stringify(error));
		});
	```
	
	verifyEmailAddress
	```javascript
		AWS.SES.verifyEmailAddress({
			'EmailAddress' : 'test@gmail.com'
		}, 
		function(response) {
			Ti.API.info('Success: '+ JSON.stringify(response));
		}, 
		function(message,error) {
			Ti.API.info('Error: '+ JSON.stringify(error));
		});
	```


	
* [Amazon Simple Queue Service (SQS)](http://aws.amazon.com) (Simple Queue Service)

	createQueue	
	```javascript
		AWS.SQS.createQueue({
			'QueueName' : 'TestQueue',
		}, function(data, response) {
			Ti.API.info(JSON.stringify(response));
		}, function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	listQueues	
	```javascript
		AWS.SQS.listQueues({	
		}, 
		function(data, response) {
			Ti.API.info(JSON.stringify(response));
		}, 
		function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	addPermission
	```javascript
		AWS.SQS.addPermission({
			'QueueName' : 'TestQueue',
			'AWSAccountId' : ''//your aws account id goes here,
			'Label' : 'AddPermissionTest',
			'AWSAccountId.1' : '',//your aws account id goes here
			'ActionName.1' : 'SendMessage'
		}, 
		function(data, response) {
			Ti.API.info(JSON.stringify(response));
		}, 
		function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	removePermission
	```javascript
		AWS.SQS.removePermission({
			'QueueName' : 'TestQueue',
			'AWSAccountId' : '',//your aws account id goes here
			'Label' : 'AddPermissionTest'
		}, 
		function(data, response) {
			Ti.API.info(JSON.stringify(response));
		}, function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	sendMessage
	```javascript
		AWS.SQS.sendMessage({
			'AWSAccountId':'',//your aws account id goes here
			'QueueName': 'TestQueue',
			'MessageBody' : 'This is test message in SQS.'
			
		}, function(data, response) {
			Ti.API.info(JSON.stringify(response));
	
		}, function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	sendMessageBatch
	```javascript
		AWS.SQS.sendMessageBatch({
			'AWSAccountId':'',//your aws account id goes here
			'QueueName': 'TestQueue',
			'SendMessageBatchRequestEntry.1.Id' : 'test_msg_092512',
			'SendMessageBatchRequestEntry.1.MessageBody' : 'This is testApp Test Cases Message Body'
		}, function(data, response) {
			Ti.API.info(JSON.stringify(response));
		}, function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	receiveMessage
	```javascript
		var params = {
			'AWSAccountId': '',//your aws account id goes here
			'QueueName': 'TestQueue'
		};
		
		AWS.SQS.receiveMessage(
			params,
		function(data, response) {
				Ti.API.info(JSON.stringify(response));
		}, 
		function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

* [Amazon Simple Notification Service (SNS) ](http://aws.amazon.com)

	createTopic
	```javascript
		AWS.SNS.createTopic({
			'Name' : 'TestTopic'
		},
		function(data, response) 
		{
			arn = data.CreateTopicResult.TopicArn;
			Ti.API.info(JSON.stringify(response));
  		},  function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	subscribe
	```javascript
	AWS.SNS.subscribe({		
			 'Endpoint' : 'test@gmail.com', //Required
			 'Protocol' : 'email', //Required
			 'TopicArn' : arn	//'arn:aws:sns:us-east-1:723565023896:TestTopic0927121' //Required
		},
		function(data, response) {
			Ti.API.info('Success: '+ JSON.stringify(data) + JSON.stringify(response));
  		},  function(message, response) {
			Ti.API.info('Success: '+ JSON.stringify(message) + JSON.stringify(response));
		});
	```

	confirmSubscription
	```javascript
	AWS.SNS.confirmSubscription({
			// Copy from email you received after executing 'subscribe' call.
			'Token' : '',			
			'TopicArn' : arn //'arn:aws:sns:us-east-1:723565023896:TestTopic0927121'
			// can get it from sns managment console or arn
		},
		function(data, response) {
			sarn = data.ConfirmSubscriptionResult.SubscriptionArn;
			Ti.API.info(JSON.stringify(response));
  		},  function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	unsubscribe
	```javascript
	AWS.SNS.unsubscribe({
			'SubscriptionArn' : sarn
		}, function(data, response) {
			Ti.API.info(JSON.stringify(response));
	  	},  function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	removePermission
	```javascript
		AWS.SNS.removePermission({
			'Label' : 'MyPermission',
			'TopicArn' : arn,
		}, function(data, response) {
			Ti.API.info(JSON.stringify(response));
	
	  	},  function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	listSubscriptions
	```javascript	
		AWS.SNS.listSubscriptions({
		}, function(data, response) {
			Ti.API.info(JSON.stringify(response));
	  	},  function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

* [Amazon DynamoDB](http://aws.amazon.com)

	getSessionToken
	```javascript
		AWS.STS.getSessionToken({}, 
		function(data, response) {
			Ti.API.info(JSON.stringify(response));
			Ti.App.Properties.setString('tempSessionToken', data.GetSessionTokenResult.Credentials.SessionToken);
			Ti.App.Properties.setString('tempSecretAccessKey', data.GetSessionTokenResult.Credentials.SecretAccessKey);
			Ti.App.Properties.setString('tempAccessKeyID', data.GetSessionTokenResult.Credentials.AccessKeyId);
			Ti.App.Properties.setString('tempExpiration', data.GetSessionTokenResult.Credentials.Expiration);
		}, function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	createTable
	```javascript

	var param = {
		"requestJSON" : {
			"TableName" : "my-ddb-test-tab-0926121",
			"KeySchema" : {
				"HashKeyElement" : {
					"AttributeName" : "name",
					"AttributeType" : "S"
					},
				"RangeKeyElement" : {
					"AttributeName" : "1234",
					"AttributeType" : "N"
					}
				},
			"ProvisionedThroughput" : {
				"ReadCapacityUnits" : 10,
				"WriteCapacityUnits" : 10
					}
				}
			};

		AWS.DDB.createTable(param,	
			function(data, response) {	
				Ti.API.info(JSON.stringify(response));
  		},  
			function(message, error) {
				Ti.API.info(JSON.stringify(message)+ JSON.stringify(error));
		});
	```

	listTables
	```javascript
		var params = {
			'requestJSON' : {}
		};
		AWS.DDB.listTables(params,	
			function(data, response) {
				Ti.API.info(JSON.stringify(response));
  		},  
			function(message,error) {
				Ti.API.info(JSON.stringify(error));
		});
	```
		
	putItem
	```javascript
		var params = {
			'requestJSON' : {
				"TableName" : 'my-ddb-test-tab-0926121',
				"Item" : {
					"name" : { "S" : 'test'}, //Required
					"1234" : { "N" : "12345"}, //Required
					'testatr' : { 'S' : 'tester'}
				}
			} //Required
		};
	
		AWS.DDB.putItem(params,		
			function(data, response) {
				Ti.API.info(JSON.stringify(response));
  		},  function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	```

	query
	```javascript
		var params = {
			'requestJSON' : {
				"TableName" : 'my-ddb-test-tab-0926121',
				"HashKeyValue" : {
					"S" : "1"
				}
			} //Required
		};

		AWS.DDB.query(params,	
			function(data, response) {
				Ti.API.info(JSON.stringify(response));
  			},  function(message,error) {
				Ti.API.info(JSON.stringify(error));
		});
	```

	deleteItem
	```javascript
		var params = {
			'requestJSON' : {
				"TableName" : 'my-ddb-test-tab-0926121',
				"Key" : {
					"HashKeyElement" : {
						"S" : "test"
					},
					"RangeKeyElement" : {
						"N" : "12345"
					}
				}
			} //Required
		};
			
		AWS.DDB.deleteItem(params,	
			function(data, response) {
				Ti.API.info(JSON.stringify(response));
  			},  function(message,error) {
				Ti.API.info(JSON.stringify(error));
			});
	```


## License

Copyright(c) 2011-2012 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

