# Ti.Amazon Web Services Module

## Author

GlobalLogic

## Documentation

Amazon DynamoDB Module
Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. If you are a developer, you can use Amazon DynamoDB to create a database table that can store and retrieve any amount of data, and serve any level of request traffic. Amazon DynamoDB automatically spreads the data and traffic for the table over a sufficient number of servers to handle the request capacity specified by the customer and the amount of data stored, while maintaining consistent and fast performance. All data items are stored on Solid State Disks (SSDs) and are automatically replicated across multiple Availability Zones in a Region to provide built-in high availability and data durability.
## Installation

* [ Using Modules ]( http://docs.appcelerator.com/titanium/2.1/index.html#!/guide/Using_Modules )

## Useful Links

* [ Getting Started with Amazon web services ]( http://docs.amazonwebservices.com/gettingstarted/latest/awsgsg-intro/intro.html )    
* [ DynamoDB ]( http://aws.amazon.com/documentation/dynamodb/ )


## Supported

* Initialize & Authentication
	<pre><code>
	var AWS = require('ti.aws');
	AWS.authorize(accessKey, secretKey);
	</code></pre>



	##getSessionToken

	 <em>Description</em>

	

	<em>Request Parameters</em>

	<em>Sample Request</em>
	<pre><code>
		  AWS.STS.getSessionToken(
      {
      }, 
    	function(data, response) {
  			Ti.API.info(JSON.stringify(response));
  			Ti.App.Properties.setString('tempSessionToken', data.GetSessionTokenResult.Credentials.SessionToken);
  			Ti.App.Properties.setString('tempSecretAccessKey', data.GetSessionTokenResult.Credentials.SecretAccessKey);
  			Ti.App.Properties.setString('tempAccessKeyID', data.GetSessionTokenResult.Credentials.AccessKeyId);
  			Ti.App.Properties.setString('tempExpiration', data.GetSessionTokenResult.Credentials.Expiration);
		  }, 
      function(message,error) {
			  Ti.API.info(JSON.stringify(error));
		  });
	</code></pre>
	
  ##createTable

	 <em>Description</em>

    The CreateTable operation adds a new table to your account. The table name must be unique among those associated with the AWS Account issuing the request, and the AWS region that receives the request (such as dynamodb.us-east-1.amazonaws.com). Each Amazon DynamoDB endpoint is entirely independent. For example, if you have two tables called "MyTable," one in dynamodb.us-east-1.amazonaws.com and one in dynamodb.us-west-1.amazonaws.com, they are completely independent and do not share any data.

    The CreateTable operation triggers an asynchronous workflow to begin creating the table. Amazon DynamoDB immediately returns the state of the table (CREATING) until the table is in the ACTIVE state. Once the table is in the ACTIVE state, you can perform data plane operations.

    
	<em>Request Parameters</em>
<div class="informaltable"><table cellspacing="0" border="0"><colgroup><col class="col1"><col class="col2"><col class="col3"></colgroup><thead><tr><th> Name </th><th> Description </th><th> Required</th></tr></thead><tbody><tr><td>
  						<em class="parameter"><code>TableName</code></em>
						</td><td>
							<p class="simpara">The name of the table to create.</p><p class="simpara">Allowed characters are a-z, A-Z, 0-9, '_' (underscore), '-' (dash), and '.' (dot). Names
                                    can be between 3 and 255 characters long.</p>
							<p class="simpara">Type: String</p>
						</td><td> Yes </td></tr><tr><td>
							<em class="parameter"><code>KeySchema</code></em>
						</td><td><p class="simpara">The primary key (simple or composite) structure for the table. A name-value
                                    pair for the <em class="parameter"><code>HashKeyElement</code></em> is required,
                                    and a name-value pair for the
                                        <em class="parameter"><code>RangeKeyElement</code></em> is optional (only
                                    required for composite primary keys). For more information about
                                    primary keys, see <a class="xref" href="DataModel.html#DataModelPrimaryKey" title="Primary Key">Primary Key</a>.</p><p class="simpara">Primary key element names can be between 1 and 255 characters long with no character
                                    restrictions.</p>
								<p class="simpara">Possible values for the AttributeType are "S" (string), "N"
									(numeric), or "B" (binary).</p><p class="simpara">Type: Map of
                                        <em class="parameter"><code>HashKeyElement</code></em>, or <em class="parameter"><code>HashKeyElement</code></em> and
                                        <em class="parameter"><code>RangeKeyElement</code></em> for a composite primary key.</p></td><td>Yes</td></tr><tr><td>
							<em class="parameter"><code>ProvisionedThroughput</code></em>
						</td><td>New throughput for the specified table, consisting of values for
							<em class="parameter"><code>ReadCapacityUnits</code></em> and
							<em class="parameter"><code>WriteCapacityUnits</code></em>. For details, see <a class="xref" href="WorkingWithDDTables.html#ProvisionedThroughput" title="Specifying Read and Write Requirements (Provisioned Throughput)">Specifying Read and Write Requirements (Provisioned
            Throughput)</a>.
						    <div class="aws-note" style="margin-left: 0.5in; margin-right: 0.5in;"><p style="margin-bottom:.5em;"><strong>Note</strong></p><p class="simpara">For current maximum/minimum values, see <a class="xref" href="Limits.html" title="Limits in Amazon DynamoDB">Limits in Amazon DynamoDB</a>.</p></div><p class="simpara">Type: Array </p></td><td>Yes</td></tr><tr><td><em class="parameter"><code>ProvisionedThroughput</code></em>:
							<em class="parameter"><code>ReadCapacityUnits</code></em></td><td>
							<p>Sets the minimum number of consistent <em class="parameter"><code>ReadCapacityUnits</code></em> consumed
									per second for the specified table before Amazon DynamoDB balances the
									load with other operations. </p>
								<p>Eventually consistent read operations require less effort than
									a consistent read operation, so a setting of 50 consistent
										<em class="parameter"><code>ReadCapacityUnits</code></em> per second provides
									100 eventually consistent
										<em class="parameter"><code>ReadCapacityUnits</code></em> per second. </p><p class="simpara">Type: Number
                                </p></td><td>Yes</td></tr><tr><td><em class="parameter"><code>ProvisionedThroughput</code></em>:
							<em class="parameter"><code>WriteCapacityUnits</code></em></td><td>Sets the minimum number of <em class="parameter"><code>WriteCapacityUnits</code></em> consumed per
								second for the specified table before Amazon DynamoDB balances the load with
								other operations. <p class="simpara">Type: Number </p></td><td>Yes</td></tr></tbody></table></div>


	<em>Sample Request</em>
	<pre><code>
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

	</code></pre>


  ##listTables

	 <em>Description</em>

    Returns an array of all the tables associated with the current account and endpoint. Each Amazon DynamoDB endpoint is entirely independent. For example, if you have two tables called "MyTable," one in dynamodb.us-east-1.amazonaws.com and one in dynamodb.us-west-1.amazonaws.com, they are completely independent and do not share any data. The ListTables operation returns all of the table names associated with the account making the request, for the endpoint that receives the request.

    
	<em>Request Parameters</em>
<div class="informaltable"><table cellspacing="0" border="0"><colgroup><col class="col1"><col class="col2"><col class="newCol3"></colgroup><thead><tr><th> Name </th><th> Description </th><th>Required</th></tr></thead><tbody><tr><td>
                                <em class="parameter"><code>Limit</code></em>
                            </td><td>
                                <p class="simpara">A number of maximum table names to return. </p>
                                <p class="simpara">Type: Integer</p>
                            </td><td>No</td></tr><tr><td><em class="parameter"><code>ExclusiveStartTableName</code></em>
                            </td><td><p class="simpara">The name of the table that starts the list. If you already ran a ListTables operation and
                                    received an <em class="parameter"><code>LastEvaluatedTableName</code></em> value
                                    in the response, use that value here to continue the
                                    list.</p>
                            <p class="simpara">Type: String</p></td><td>No</td></tr></tbody></table></div>

	<em>Sample Request</em>
	<pre><code>
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

	</code></pre>

## License

Copyright(c) 2011-2012 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

