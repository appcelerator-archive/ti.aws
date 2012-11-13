# Amazon Web Services (AWS) Module

## Amazon Simple Email Service (SES)
Amazon SES provides an easy, flexible, and low-cost way to deliver emails from the cloud, while reducing the likelihood of legitimate email being classified by ISPs as spam. It integrates seamlessly with other AWS products, can send a broad range of transactional, marketing, and subscription messages, and scales to handle large volumes of email. Amazon SES removes the barrier to entry for those not needing the costly full-service campaign management features of traditional email service providers.

The Amazon Simple Email Service Developer Guide provides a conceptual overview of Amazon SES, detailed information on how to send email, a description of how to manage your sending activity, information about email authentication, an overview of the API, and detailed information on all API operations.

## Useful Links

* [ Getting Started with Amazon web services ]( http://docs.amazonwebservices.com/gettingstarted/latest/awsgsg-intro/intro.html )    
* [ SES ]( http://aws.amazon.com/documentation/ses/ )

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
        },
        function(data, response){
            Ti.API.info(JSON.stringify(data));
        },
        function(message, error) {
            Ti.API.error(message);
            Ti.API.info(JSON.stringify(error));
        });

## Methods

[deleteVerifiedEmailAddress](http://docs.amazonwebservices.com/ses/latest/APIReference/API_DeleteVerifiedEmailAddress.html)

[getSendQuota](http://docs.amazonwebservices.com/ses/latest/APIReference/API_GetSendQuota.html)

[getSendStatistics](http://docs.amazonwebservices.com/ses/latest/APIReference/API_GetSendStatistics.html)

[listVerifiedEmailAddresses](http://docs.amazonwebservices.com/ses/latest/APIReference/API_ListVerifiedEmailAddresses.html)

[sendEmail](http://docs.amazonwebservices.com/ses/latest/APIReference/API_SendEmail.html)

[sendRawEmail](http://docs.amazonwebservices.com/ses/latest/APIReference/API_SendRawEmail.html)

[verifyEmailAddress](http://docs.amazonwebservices.com/ses/latest/APIReference/API_VerifyEmailAddress.html)

## License

Copyright(c) 2011-2012 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

