# Amazon Web Services (AWS) Module

## Amazon DynamoDB
Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. If you are a developer, you can use Amazon DynamoDB to create a database table that can store and retrieve any amount of data, and serve any level of request traffic. Amazon DynamoDB automatically spreads the data and traffic for the table over a sufficient number of servers to handle the request capacity specified by the customer and the amount of data stored, while maintaining consistent and fast performance. All data items are stored on Solid State Disks (SSDs) and are automatically replicated across multiple Availability Zones in a Region to provide built-in high availability and data durability.

## Useful Links

* [ Getting Started with Amazon web services ]( http://docs.amazonwebservices.com/gettingstarted/latest/awsgsg-intro/intro.html )    
* [ DynamoDB ]( http://aws.amazon.com/documentation/dynamodb/ )

## Method Calls

All methods are called using a standard calling convention:

* parameters[object]: Request parameters as specified in the corresponding Amazon Web Services API documentation. (See NOTE below)
* success[function]: A callback function that is executed if the request succeeds (optional). Parameters passed to the callback function are:
    * data[object]: Processed data.
    * response[object]: Server response.
* error[function]: A callback function that is executed if the request fails (optional). Parameters passed to the callback function are:
    * message[string]: Error message.
    * error[object]: Server response.

### NOTE

The DDB methods require sending a JSON formatted object in the request. Specify the JSON object in the `RequestJSON` property.

### Example
        AWS.DDB.createTable({
            "RequestJSON" : {
                "TableName" : "my-ddb-test",
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
        },
        function(data, response){
            Ti.API.info(JSON.stringify(data));
        },
        function(message, error) {
            Ti.API.error(message);
            Ti.API.info(JSON.stringify(error));
        });


## Methods

[batchGetItem](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/API_BatchGetItems.html)

[batchWriteItem](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/API_BatchWriteItem.html)

[createTable](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/API_CreateTable.html)

[deleteItem](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/API_DeleteItem.html)

[deleteTable](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/API_DeleteTable.html)

[describeTable](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/API_DescribeTables.html)

[getItem](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/API_GetItem.html)

[listTables](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/API_ListTables.html)

[putItem](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/API_PutItem.html)

[query](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/API_Query.html)

[scan](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/API_Scan.html)

[updateItem](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/API_UpdateItem.html)

[updateTable](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/API_UpdateTable.html)

## License

Copyright(c) 2011-2012 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

