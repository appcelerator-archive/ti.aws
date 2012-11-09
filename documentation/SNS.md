# Ti.Amazon Web Services Module

## Author

GlobalLogic

## Documentation

Amazon SNS Module
Amazon Simple Notification Service is a web service that enables you to build distributed web-enabled applications. Applications can use Amazon SNS to easily push real-time notification messages to interested subscribers over multiple delivery protocols. For more information about this product go to http://aws.amazon.com/sns.

## Installation

* [ Using Modules ]( http://docs.appcelerator.com/titanium/latest/index.html#!/guide/Using_Modules )

## Useful Links

* [ Getting Started with Amazon web services ]( http://docs.amazonwebservices.com/gettingstarted/latest/awsgsg-intro/intro.html )    
* [ SNS ]( http://aws.amazon.com/documentation/sns/ )


## Supported

* Initialize & Authentication
	<pre><code>
	var AWS = require('ti.aws');
	AWS.authorize(accessKey, secretKey);
	</code></pre>



	##createTopic

	 <em>Description</em>

	The CreateTopic action creates a topic to which notifications can be published. Users can create at most 100 topics. For more information, see http://aws.amazon.com/sns. This action is idempotent, so if the requester already owns a topic with the specified name, that topic's ARN will be returned without creating a new topic.

	<em>Request Parameters</em>
<div class="informaltable"><table cellspacing="0" border="0"><colgroup><col><col><col></colgroup><thead><tr><th> Name </th><th> Description </th><th> Required </th></tr></thead><tbody><tr><td>
                     <em class="parameter"><code>Name</code></em>
                  </td><td>
                     <p>The name of the topic you want to create.</p>
                     <p>Constraints: Topic names must be made up of 
    only uppercase and lowercase ASCII letters, numbers, underscores, and hyphens, and must be 
    between 1 and 256 characters long. </p>
                     <p class="simpara">
            Type:
              String</p>
                  </td><td>Yes</td></tr></tbody></table></div>

	<em>Sample Request</em>
	<pre><code>
	    var params = {
  			'Name' : ''//Empty
			};
			AWS.SNS.createTopic(params, function(data) {
				valueOf(testRun, true).shouldBeFalse();finish(testRun);
			}, function(error) {
				finish(testRun);
			});
	</code></pre>
	
	##addPermission

	 <em>Description</em>

	Returns information about the domain, including when the domain was created, the number of items and attributes, and the size of attribute names and values.

	<em>Request Parameters</em>
<div class="informaltable"><table cellspacing="0" border="0"><colgroup><col><col><col></colgroup><thead><tr><th> Name </th><th> Description </th><th> Required </th></tr></thead><tbody><tr><td>
                     <em class="parameter"><code>AWSAccountId.member.N</code></em>
                  </td><td>
                     <p>The AWS account IDs of the users (principals) who will be given access to the specified
    actions. The users must have AWS accounts, but do not need to be signed up 
    for this service. </p>
                     <p class="simpara">
            Type:
              String
                    list
                </p>
                  </td><td>Yes</td></tr><tr><td>
                     <em class="parameter"><code>ActionName.member.N</code></em>
                  </td><td>
                     <p>The action you want to allow for the specified principal(s).</p>
                     <p>Valid values: any Amazon SNS action name.</p>
                     <p class="simpara">
            Type:
              String
                    list
                </p>
                  </td><td>Yes</td></tr><tr><td>
                     <em class="parameter"><code>Label</code></em>
                  </td><td>
                     <p>A unique identifier for the new policy statement.</p>
                     <p class="simpara">
            Type:
              String</p>
                  </td><td>Yes</td></tr><tr><td>
                     <em class="parameter"><code>TopicArn</code></em>
                  </td><td>
                     <p>The ARN of the topic whose access control policy you wish to modify.</p>
                     <p class="simpara">
            Type:
              String</p>
                  </td><td>Yes</td></tr></tbody></table></div>
	<em>Sample Request</em>
	<pre><code>
 		    var params = {
  				'TopicArn' : '',
					'Label' : 'MyPermission',
					'ActionName.member.1' : 'GetTopicAttributes',
					'AWSAccountId.member.1' : ''
				};

        AWS.SNS.addPermission(params, function(data) {
          Ti.API.info(JSON.stringify(data))
				}, function(error) {	
          Ti.API.info(JSON.stringify(error))
				});
	</code></pre>
	

	##confirmSubscription

	 <em>Description</em>

	The ConfirmSubscription action verifies an endpoint owner's intent to receive messages by validating the token sent to the endpoint by an earlier Subscribe action. If the token is valid, the action creates a new subscription and returns its Amazon Resource Name (ARN). This call requires an AWS signature only when the AuthenticateOnUnsubscribe flag is set to "true".

	<em>Request Parameters</em>
<div class="informaltable"><table cellspacing="0" border="0"><colgroup><col><col><col></colgroup><thead><tr><th> Name </th><th> Description </th><th> Required </th></tr></thead><tbody><tr><td>
                     <em class="parameter"><code>AuthenticateOnUnsubscribe</code></em>
                  </td><td>
                     <p>Disallows unauthenticated unsubscribes of the subscription. 
    If the value of this parameter is <code class="code">true</code> and the request has an AWS signature, then only the topic owner
    and the subscription owner can unsubscribe the endpoint.  The unsubscribe
    action will require AWS authentication. </p>
                     <p class="simpara">
            Type:
              String</p>
                  </td><td>No</td></tr><tr><td>
                     <em class="parameter"><code>Token</code></em>
                  </td><td>
                     <p>Short-lived token sent to an endpoint during the Subscribe action.</p>
                     <p class="simpara">
            Type:
              String</p>
                  </td><td>Yes</td></tr><tr><td>
                     <em class="parameter"><code>TopicArn</code></em>
                  </td><td>
                     <p>The ARN of the topic for which you wish to confirm a subscription.</p>
                     <p class="simpara">
            Type:
              String</p>
                  </td><td>Yes</td></tr></tbody></table></div>
	<em>Sample Request</em>
	<pre><code>
   	    var params = {
    			'Token' : '',
  				'TopicArn' : '
  			};
  			AWS.SNS.confirmSubscription(params, function(data) {
  				Ti.API.info(JSON.stringify(data))
  			}, function(error) {
  				Ti.API.info(JSON.stringify(error))
  			});
	</code></pre>
	



## License

Copyright(c) 2011-2012 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

