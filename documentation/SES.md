# Ti.Amazon Web Services Module

## Author

GlobalLogic

## Documentation

Amazon Simple Email Service (SES) Module
Amazon SES provides an easy, flexible, and low-cost way to deliver emails from the cloud, while reducing the likelihood of legitimate email being classified by ISPs as spam. It integrates seamlessly with other AWS products, can send a broad range of transactional, marketing, and subscription messages, and scales to handle large volumes of email. Amazon SES removes the barrier to entry for those not needing the costly full-service campaign management features of traditional email service providers.

The Amazon Simple Email Service Developer Guide provides a conceptual overview of Amazon SES, detailed information on how to send email, a description of how to manage your sending activity, information about email authentication, an overview of the API, and detailed information on all API operations.
## Installation

* [ Using Modules ]( http://docs.appcelerator.com/titanium/2.1/index.html#!/guide/Using_Modules )

## Useful Links

* [ Getting Started with Amazon web services ]( http://docs.amazonwebservices.com/gettingstarted/latest/awsgsg-intro/intro.html )    
* [ SES ]( http://aws.amazon.com/documentation/ses/ )


## Supported

* Initialize & Authentication
	<pre><code>
	var AWS = require('ti.aws');
	AWS.authorize(accessKey, secretKey);
	</code></pre>



	##sendEmail

	 <em>Description</em>

    Composes an email message based on input data, and then immediately queues the message for sending.
    The total size of the message cannot exceed 10 MB.

	<em>Request Parameters</em>
<div class="informaltable"><table cellspacing="0" border="0"><colgroup><col class="col1"><col class="col2"><col class="col3"></colgroup><thead><tr><th> Name </th><th> Description </th><th> Required </th></tr></thead><tbody><tr><td>
                     <em class="parameter"><code>Destination</code></em>
                  </td><td>
                     <p>The destination for this email, composed of To:, CC:, and BCC: fields.</p>
                     <p class="simpara">
            
                     </p>
                  </td><td>Yes</td></tr><tr><td>
                     <em class="parameter"><code>Message</code></em>
                  </td><td>
                     <p>The message to be sent.</p>
          
                  </td><td>Yes</td></tr><tr><td>
                     <em class="parameter"><code>ReplyToAddresses.member.N</code></em>
                  </td><td>
                     <p>The reply-to email address(es) for the message. If the recipient replies to the message, each reply-to address
            will receive the reply.
        </p>
                     <p class="simpara">
            Type:
              String
                    list
                </p>
                  </td><td>No</td></tr><tr><td>
                     <em class="parameter"><code>ReturnPath</code></em>
                  </td><td>
                     <p>The email address to which bounce notifications are to be forwarded. If the message cannot be delivered to the
            recipient, then an error message will be returned from the recipient's ISP; this message will then be forwarded
            to the email address specified by the
            <code class="code">ReturnPath</code>
            parameter.
        </p>
                     <p class="simpara">
            Type:
              String</p>
                  </td><td>No</td></tr><tr><td>
                     <em class="parameter"><code>Source</code></em>
                  </td><td>
                     <p>The identity's email address.</p>
                     <p>
            By default, the string must be 7-bit ASCII. If the text must contain any other characters, 
            then you must use MIME encoded-word syntax (RFC 2047) instead of a literal string. 
            MIME encoded-word syntax uses the following form: <code class="code">=?charset?encoding?encoded-text?=</code>. 
            For more information, see <a class="ulink" href="http://tools.ietf.org/html/rfc2047" target="_blank">RFC 2047</a>.
        </p>
                     <p class="simpara">
            Type:
              String</p>
                  </td><td>Yes</td></tr></tbody></table></div>
	<em>Sample Request</em>
	<pre><code>
  		AWS.SES.sendEmail({
    		'Source' : 'test@test.com',
  			'Destination' : {
  				'ToAddresses' : ['test@test.com'],
  				'CcAddresses' : ['test@test.com'],
  				'BccAddresses' : ['test@test.com']
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
  				Ti.API.info(JSON.stringify(response));
  		}, function(message,error) {
  				Ti.API.info(JSON.stringify(error));
  		});

	</code></pre>
	

	##listVerifiedEmailAddresses

	 <em>Description</em>

	Returns a list containing all of the email addresses that have been verified.
    
	<em>Request Parameters</em>

	<em>Sample Request</em>
	<pre><code>
  		AWS.SES.listVerifiedEmailAddresses({

		}, function(response) {
			Ti.API.info(JSON.stringify(response));
		}, function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});

	</code></pre>

	
	##verifyEmailAddress

	 <em>Description</em>

	Verifies an email address. This action causes a confirmation email message to be sent to the specified address.

    
	<em>Request Parameters</em>
<div class="informaltable"><table cellspacing="0" border="0"><colgroup><col class="col1"><col class="col2"><col class="col3"></colgroup><thead><tr><th> Name </th><th> Description </th><th> Required </th></tr></thead><tbody><tr><td>
                     <em class="parameter"><code>EmailAddress</code></em>
                  </td><td>
                     <p>The email address to be verified.</p>
                     <p class="simpara">
            Type:
              String</p>
                  </td><td>Yes</td></tr></tbody></table></div>

	<em>Sample Request</em>
	<pre><code>
		AWS.SES.verifyEmailAddress({
		'EmailAddress' : 'test@test.com'
		}, function(response) {
			Ti.API.info(JSON.stringify(response));
		}, function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});
	</code></pre>

	##deleteVerifiedEmailAddress

	 <em>Description</em>

	Deletes the specified email address from the list of verified addresses.

    
	<em>Request Parameters</em>
	<div class="informaltable"><table cellspacing="0" border="0"><colgroup><col class="col1"><col class="col2"><col class="col3"></colgroup><thead><tr><th> Name </th><th> Description </th><th> Required </th></tr></thead><tbody><tr><td>
                     <em class="parameter"><code>EmailAddress</code></em>
                  </td><td>
                     <p>An email address to be removed from the list of verified addresses.</p>
                     <p class="simpara">
            Type:
              String</p>
                  </td><td>Yes</td></tr></tbody></table></div>

	<em>Sample Request</em>
	<pre><code>
  		AWS.SES.deleteVerifiedEmailAddress({
			'EmailAddress' : 'appcel321@gmail.com'
		}, function(response) {
			Ti.API.info(JSON.stringify(response));
		}, function(message,error) {
			Ti.API.info(JSON.stringify(error));
		});

	</code></pre>

## License

Copyright(c) 2011-2012 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

