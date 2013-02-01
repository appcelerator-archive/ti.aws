# Amazon Web Services (AWS) Module

## Amazon SimpleDB
Amazon SimpleDB is a web service for running queries on structured data in real time. This service works in close conjunction with Amazon Simple Storage Service (Amazon S3) and Amazon Elastic Compute Cloud (Amazon EC2), collectively providing the ability to store, process and query data sets in the cloud. These services are designed to make web-scale computing easier and more cost-effective for developers.

## Useful Links

* [ Getting Started with Amazon Web Services ]( http://docs.amazonwebservices.com/gettingstarted/latest/awsgsg-intro/intro.html )
* [ Amazon SimpleDB ]( http://aws.amazon.com/documentation/simpledb/ )

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
        AWS.SimpleDB.createDomain({
            DomainName : 'DomainName'
        },
        function(data, response){
            Ti.API.info(JSON.stringify(data));
        },
        function(message, error) {
            Ti.API.error(message);
            Ti.API.info(JSON.stringify(error));
        });

## Methods

[batchDeleteAttributes](http://docs.amazonwebservices.com/AmazonSimpleDB/latest/DeveloperGuide/SDB_API_BatchDeleteAttributes.html)

[batchPutAttributes](http://docs.amazonwebservices.com/AmazonSimpleDB/latest/DeveloperGuide/SDB_API_BatchPutAttributes.html)

[createDomain](http://docs.amazonwebservices.com/AmazonSimpleDB/latest/DeveloperGuide/SDB_API_CreateDomain.html)

[deleteAttributes](http://docs.amazonwebservices.com/AmazonSimpleDB/latest/DeveloperGuide/SDB_API_DeleteAttributes.html)

[deleteDomain](http://docs.amazonwebservices.com/AmazonSimpleDB/latest/DeveloperGuide/SDB_API_DeleteDomain.html)

[domainMetadata](http://docs.amazonwebservices.com/AmazonSimpleDB/latest/DeveloperGuide/SDB_API_DomainMetadata.html)

[getAttributes](http://docs.amazonwebservices.com/AmazonSimpleDB/latest/DeveloperGuide/SDB_API_GetAttributes.html)

[listDomains](http://docs.amazonwebservices.com/AmazonSimpleDB/latest/DeveloperGuide/SDB_API_ListDomains.html)

[putAttributes](http://docs.amazonwebservices.com/AmazonSimpleDB/latest/DeveloperGuide/SDB_API_PutAttributes.html)

[select](http://docs.amazonwebservices.com/AmazonSimpleDB/latest/DeveloperGuide/SDB_API_Select.html)

## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

