# Ti.Amazon Web Services Module

## Author

GlobalLogic

## Documentation

Amazon Simple Queue Service (SQS) Module
This is the Amazon Simple Queue Service API Reference. This section describes who should read this guide, how the guide is organized, and other resources related to the Amazon Simple Queue Service (Amazon SQS).

Amazon SQS offers reliable and scalable hosted queues for storing messages as they travel between computers. By using Amazon SQS, you can move data between distributed components of your applications that perform different tasks without losing messages or requiring each component to be always available.
## Installation

* [ Using Modules ]( http://docs.appcelerator.com/titanium/2.1/index.html#!/guide/Using_Modules )

## Useful Links

* [ Getting Started with Amazon web services ]( http://docs.amazonwebservices.com/gettingstarted/latest/awsgsg-intro/intro.html )    
* [ SQS ]( http://aws.amazon.com/documentation/sqs/ )


## Supported

* Initialize & Authentication
  <pre><code>
	var AWS = require('ti.aws');
	AWS.authorize(accessKey, secretKey);
	</code></pre>

  ##createQueue

	 <em>Description</em>

    The CreateQueue action creates a new queue.

    When you request CreateQueue, you provide a name for the queue. To successfully create a new queue, you must provide a name that is unique within the scope of your own queues.

    
	<em>Request Parameters</em>
<div class="informaltable"><table cellspacing="0" border="0"><colgroup><col class="col1"><col class="col2"><col class="col3"></colgroup><thead><tr><th>Name</th><th>Description</th><th>Required</th></tr></thead>
<tbody><tr><td>
  						<p class="simpara">
								<em class="parameter"><code>QueueName</code></em>
							</p>
						</td><td>
							<p class="simpara">The name to use for the queue created.</p>
							<p class="simpara">Type: String</p>
							<p class="simpara">Constraints: Maximum 80 characters; alphanumeric characters, hyphens (-),
								and underscores (_) are allowed.</p>
						</td><td>
							<p class="simpara">Yes</p>
						</td></tr>
<tr><td>
							<p class="simpara">
								<em class="parameter"><code>Attribute.n.Name</code></em>
							</p>
						</td><td>
							<p class="simpara">The name of the attribute you want to set.</p>
							</td><td>							<p class="simpara">No</p>						</td></tr><tr><td>				<p class="simpara">
								<em class="parameter"><code>Attribute.n.Value</code></em>
							</p>
						</td><td>
							<p class="simpara">The value of the attribute you want to set. </p>
							<p class="simpara">Constraints: Constraints are specific for each value. </p>
							
							<p class="simpara">Default: Varies according to attribute</p>
						</td><td>
							<p class="simpara">Yes, if there is a corresponding Name Attribute.n.name parameter</p>
						</td></tr></tbody></table></div>

	<em>Sample Request</em>
	<pre><code>
    	AWS.SQS.createQueue({
    	  'QueueName' : 'Test'
  	    }, 
        function(data, response) {
  		      Ti.API.info(JSON.stringify(response));
  	    }, 
        function(message,error) {
  		    Ti.API.info(JSON.stringify(error));
  	  });
	</code></pre>


	##deleteQueue

	 <em>Description</em>
	
	The DeleteQueue action deletes the queue specified by the queue URL, regardless of whether the queue is empty. If the specified queue does not exist, SQS returns a successful response.
    
	<em>Request Parameters</em>
	
	The DeleteQueue action uses no special request parameters besides the common request parameters all actions use (for more information, see About SQS Queues in the Amazon SQS Developer Guide).

	<em>Sample Request</em>
	<pre><code>
		AWS.SQS.deleteQueue({
			'QueueName' : 'Test',
			'AWSAccountId' : ''
		}, 
		function(data, response) {
			Ti.API.info(JSON.stringify(data)+ JSON.stringify(response));
		}, 
		function(message, error) {
			Ti.API.info(JSON.stringify(error));
		});	
  	

	</code></pre>

	##getQueueUrl

	 <em>Description</em>

	The GetQueueUrl action returns the Uniform Resource Locater (URL) of a queue. This action provides a simple way to retrieve the URL of an SQS queue.

    
	<em>Request Parameters</em>
<div class="informaltable"><table cellspacing="0" border="0"><colgroup><col class="col1"><col class="col2"><col class="col3"></colgroup><thead><tr><th>Name</th><th>Description</th><th>Required</th></tr></thead><tbody><tr><td>
							<p class="simpara">
								<em class="parameter"><code>QueueName</code></em>
							</p>
						</td><td>
							<p class="simpara">The name of an existing queue.</p>
							<p class="simpara">Type: String</p>
							<p class="simpara">Constraints: Maximum 80 characters; alphanumeric characters, hyphens (-),
								and underscores (_) are allowed.</p>
						</td><td>
							<p class="simpara">Yes</p>
						</td></tr><tr><td>
							<p class="simpara">
								<em class="parameter"><code>QueueOwnerAWSAccountId</code></em>
							</p>
						</td><td>
							<p class="simpara">The AWS account ID of the account that created the queue.</p>
							<p class="simpara">Type: String</p>
						</td><td>
							<p class="simpara">No</p>
						</td></tr></tbody></table></div>

	<em>Sample Request</em>
	<pre><code>
	  	AWS.SQS.getQueueUrl({
			'QueueName' : 'TestQueue676767'
		}, function(data, response) {
			Ti.API.info(JSON.stringify(response));
		}, function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});

	</code></pre>


## License

Copyright(c) 2011-2012 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

