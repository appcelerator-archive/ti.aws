# Ti.Amazon Web Services Module

## Author

GlobalLogic

## Documentation

Amazon SimpleDB Module
Amazon SimpleDB is a web service for running queries on structured data in real time. This service works in close conjunction with Amazon Simple Storage Service (Amazon S3) and Amazon Elastic Compute Cloud (Amazon EC2), collectively providing the ability to store, process and query data sets in the cloud. These services are designed to make web-scale computing easier and more cost-effective for developers.
## Installation

* [ Using Modules ]( http://docs.appcelerator.com/titanium/2.1/index.html#!/guide/Using_Modules )

## Useful Links

* [ Getting Started with Amazon web services ]( http://docs.amazonwebservices.com/gettingstarted/latest/awsgsg-intro/intro.html )  	
* [ SimpleDB ]( http://aws.amazon.com/documentation/simpledb/ )


## Supported

* Initialize & Authentication
	<pre><code>
	var AWS = require('ti.aws');
	AWS.authorize(accessKey, secretKey);
	</code></pre>



	##createDomain

	 <em>Description</em>

	The CreateDomain operation creates a new domain. The domain name must be unique among the domains associated with the Access Key ID provided in the request. The CreateDomain operation might take 10 or more seconds to complete.

	<em>Request Parameters</em>
<div class="informaltable"><table cellspacing="0" border="0"><colgroup><col class="col1"><col class="col2"><col class="col3"></colgroup><thead><tr><th> Name </th><th> Description </th><th> Required</th></tr></thead><tbody><tr><td>
							<em class="parameter"><code>DomainName</code></em>
						</td><td>
							<p class="simpara"> The name of the domain to create. The name can range between
							3 and 255 characters and can contain the following characters: a-z, A-Z,
							0-9, '_', '-', and '.'. </p>
							<p class="simpara">Type: String</p>
						</td><td> Yes </td></tr></tbody></table></div>

	<em>Sample Request</em>
	<pre><code>
		AWS.SimpleDB.createDomain({
			DomainName : 'DomainName'
		},
		function(data, response){
			Ti.API.info(JSON.stringify(data));
  		},  
		function(message, error) { 
			Ti.API.info(JSON.stringify(error));
		});
	</code></pre>
	
	##listDomain

	 <em>Description</em>

	Returns information about the domain, including when the domain was created, the number of items and attributes, and the size of attribute names and values.

	<em>Request Parameters</em>
<div class="informaltable"><table cellspacing="0" border="0"><colgroup><col class="col1"><col class="col2"><col class="col3"></colgroup><thead><tr><th> Name </th><th> Description </th><th> Required</th></tr></thead><tbody><tr><td>
							<em class="parameter"><code>MaxNumberOfDomains</code></em>
						</td><td>
							<p class="simpara"> The maximum number of domain names you want returned. </p>
							<p class="simpara"> Type: String </p>
							<p class="simpara"> The range is 1 to 100. </p>
							<p class="simpara"> The default setting is 100. </p>
						</td><td> No </td></tr><tr><td>
							<em class="parameter"><code>NextToken</code></em>
						</td><td> String that tells Amazon SimpleDB where to start the next list of domain names. </td><td> No </td></tr></tbody></table></div>

	<em>Sample Request</em>
	<pre><code>
 		 AWS.SimpleDB.domainMetadata({
		        DomainName : 'DomainName'
		    },
		    function(data, response){
		        Ti.API.info(JSON.stringify(data));
		    }, 
		    function(message,error) {
		        Ti.API.info(JSON.stringify(error));
		    });
	</code></pre>
	

	##domainMetadata

	 <em>Description</em>

	The ListDomains operation lists all domains associated with the Access Key ID. It returns domain names up to the limit set by MaxNumberOfDomains. A NextToken is returned if there are more than MaxNumberOfDomains domains. Calling ListDomains successive times with the NextToken returns up to MaxNumberOfDomains more domain names each time.

	<em>Request Parameters</em>
<div class="informaltable"><table cellspacing="0" border="0"><colgroup><col class="col1"><col class="col2"><col class="col3"></colgroup><thead><tr><th> Name </th><th> Description </th><th> Required</th></tr></thead><tbody><tr><td>
							<em class="parameter"><code>DomainName</code></em>
						</td><td>
							<p class="simpara"> The name of the domain for which to display metadata. </p>
							<p class="simpara"> Type: String </p>
						</td><td> Yes </td></tr></tbody></table></div>

	<em>Sample Request</em>
	<pre><code>
 		AWS.SimpleDB.listDomains({
		    },  
		    function(data, response){
		        Ti.API.info(JSON.stringify(data));
		    },  
		    function(message,error) {
		        Ti.API.info(JSON.stringify(error));
		    });
	</code></pre>
	



## License

Copyright(c) 2011-2012 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

