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

## Useful Links

* [ Getting Started with Amazon web services ]( http://docs.amazonwebservices.com/gettingstarted/latest/awsgsg-intro/intro.html )  	
* [ SimpleDB ]( http://aws.amazon.com/documentation/simpledb/ )


## Supported

* Initialize & Authentication
	```javascript
	var AWS = require('ti.aws');
	AWS.authorize(accessKey, secretKey);
	```


* [Amazon SimpleDB](http://aws.amazon.com/documentation/simpledb/)
	

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



## License

Copyright(c) 2011-2012 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

