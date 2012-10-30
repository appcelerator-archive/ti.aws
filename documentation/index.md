# Ti.Amazon Web Services Module

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

## Configuration

* Initialize & Authentication
	```javascript
	var AWS = require('ti.aws');
	AWS.authorize(accessKey, secretKey);
	```

## Supported Services
Please click on the links below for the Titanium Module documentation & code-snippets for each of the supported AWS Services.

* [Amazon SimpleDB](SimpleDB.md)
	
* [Simple Storage Service (S3)  ](S3.md) 

* [Amazon Simple Email Service (SES)](SES.md)
		
* [Amazon Simple Queue Service (SQS)](SQS.md)

* [Amazon Simple Notification Service (SNS) ](SNS.md)

* [Amazon DynamoDB](DDB.md)

## License

Copyright(c) 2011-2012 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

