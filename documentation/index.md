# Amazon Web Services (AWS) Module

## Description

A framework for exposing the Amazon Web Service APIs to Appcelerator Titanium Mobile.

## Amazon Web Services Documentation

This framework is designed for QueryAPIs provided by AWS. Each service is represented
as a NameSpace, within which each operation is exposed.

This framework requires you to refer to the AWS API reference for handling requests sent to and
responses received from the service.

Refer to the [Amazon Web Services Documentation](http://aws.amazon.com/documentation/) for instructions on
getting started, setting up your account, and obtaining the credentials needed to access the APIs.

## Getting Started

View the [Using Titanium Modules](http://docs.appcelerator.com/titanium/latest/#!/guide/Using_Titanium_Modules) document for instructions on getting
started with using this module in your application.

## Accessing the Module

Use `require` to access this module from JavaScript:

	    var AWS = require("ti.aws");

The AWS variable is a reference to the Module object.

### Authentication

Before using the module, you need to create an account with Amazon and obtain your AWS Access Key ID and Secret Access Key. The Access
Key ID and Secret Access Key must be used to authorize access to your account.

	// Specify the accesskey & secretKey to be used for authorizing the QueryAPI calls made by the Service.
	AWS.authorize(accessKey, secretKey);

* accessKey[string]: The access key for your application
* secureKey[string]: The secure key for your application

#### Useful Links

* [Overview of Policies](http://docs.amazonwebservices.com/IAM/latest/UserGuide/PoliciesOverview.html?r=3093)

* [Example Policies for IAM Entities](http://docs.amazonwebservices.com/IAM/latest/UserGuide/ExampleIAMPolicies.html)

* [How to Write a Policy](http://docs.amazonwebservices.com/IAM/latest/UserGuide/AccessPolicyLanguage_HowToWritePolicies.html)

* [Integrating with Other AWS Products](http://docs.amazonwebservices.com/IAM/latest/UserGuide/Using_SpecificProducts.html)

* [AWS Policy Generator](http://awspolicygen.s3.amazonaws.com/policygen.html)

## Supported Services

Please click on the links below for the Titanium Module documentation & code-snippets for each of the supported AWS services.

* [Amazon SimpleDB](SimpleDB.html)
	
* [Simple Storage Service (Amazon S3)](S3.html)

* [Amazon Simple Email Service (Amazon SES)](SES.html)
		
* [Amazon Simple Queue Service (Amazon SQS)](SQS.html)

* [Amazon Simple Notification Service (Amazon SNS)](SNS.html)

* [Amazon DynamoDB](DDB.html)

## Usage
See the example applications in the `example` folder of the module.

## Author

Global Logic & Jeff English

## Module History

View the [change log](changelog.html) for this module.

## Feedback and Support

Please direct all questions, feedback, and concerns to [info@appcelerator.com](mailto:info@appcelerator.com?subject=ti.aws%20Module).

## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.


