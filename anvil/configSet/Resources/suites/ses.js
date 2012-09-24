/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2012 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

module.exports = new function () {
	var finish;
	var valueOf;
	var AWS;
	this.init = function(testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws.key'), Titanium.App.Properties.getString('aws.secret'));
	}//end init

	this.name = "ses";

	this.testDeleteVerifiedEmailAddressWithoutEmailAddress = function(testRun) {
			var params = {
				'emailAddress' : ''//empty EmailAddress
			};
			AWS.SES.deleteVerifiedEmailAddress(params, function(data) {
				valueOf(testRun, false).shouldBeTrue();
			}, function(error) {
				finish(testRun);
			});
		};

		//Test case for deleteVerifiedEmailAddress by passing a valid EmailAddress

		this.testDeleteVerifiedEmailAddress = function(testRun) {
			var params = {
				'emailAddress' : 'test@test.com'//Required
			};
			
			AWS.SES.verifyEmailAddress(params, function(data) {
				AWS.SES.deleteVerifiedEmailAddress(params, function(data) {
					finish(testRun);
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
			}, function(error) {
				Ti.API.debug(error);
				valueOf(testRun, true).shouldBeFalse();
			});
		};

		// Test case for deleteVerifiedEmailAddress by passing a Invalid EmailAddress

		this.testDeleteVerifiedEmailAddressWithInvalidEmailAddress = function(testRun) {
			var params = {
				'emailAddress' : 'caxvcx'//invalid EmailAddress
			};
			AWS.SES.deleteVerifiedEmailAddress(params, function(data) {
				valueOf(testRun, true).shouldBeFalse();
			}, function(error) {
				Ti.API.debug(error);
				finish(testRun);
			});
		};

		//***************getSendQuota test cases start**************

		//Test case for getSendQuota
		this.testGetSendQuota = function(testRun) {
			var params = {

			};
			AWS.SES.getSendQuota(params, function(data) {
				finish(testRun);
			}, function(error) {
				Ti.API.debug(error);
				valueOf(testRun, true).shouldBeFalse();finish(testRun);
			valueOf(testRun, true).shouldBeFalse();
			});
		}
		//*************getSendQuota test cases ends**************
		//***************getSendStatistics test cases start**************


		//Test case for getSendStatistics
		this.testGetSendQuota = function(testRun) {
			var params = {

			};
			AWS.SES.getSendQuota(params, function(data) {
				finish(testRun);
			}, function(error) {
				Ti.API.debug(error);
				valueOf(testRun, true).shouldBeFalse();
				finish(testRun);
			});
		}

		//*************getSendStatistics test cases ends**************

		//*************** listVerifiedEmailAddresses test cases start**************

		// Test case for listVerifiedEmailAddresses
		this.testListVerifiedEmailAddresses = function(testRun) {
			var params = {

			};
			AWS.SES.listVerifiedEmailAddresses(params, function(data) {
				finish(testRun);
			}, function(error) {
				Ti.API.debug(error);
				valueOf(testRun, true).shouldBeFalse();
				finish(testRun);
			});
		}
		//************* listVerifiedEmailAddresses test cases ends**************

		//***************verifyEmailAddress test cases start**************

		//Test case for verifyEmailAddress without passing EmailAddress
		this.testVerifyEmailAddressWithoutEmailAddress = function(testRun) {
			var params = {
				'emailAddress' : ''//empty EmailAddress
			};
			AWS.SES.verifyEmailAddress(params, function(data) {
				valueOf(testRun, true).shouldBeFalse();
			}, function(error) {
				finish(testRun);
			});
		}

		// Test case for verifyEmailAddress by passing a valid EmailAddress
		this.testVerifyEmailAddress = function(testRun) {
			var params = {
				'emailAddress' : 'test@test.com'//Required
			};
			AWS.SES.verifyEmailAddress(params, function(data) {
				AWS.SES.deleteVerifiedEmailAddress(params, function(data) {
					finish(testRun);
				}, function(error) {
					Ti.API.debug(error); valueOf(testRun, true).shouldBeFalse(); finish(testRun);
				});
			}, function(error) {
				Ti.API.debug(error); valueOf(testRun, true).shouldBeFalse(); finish(testRun);
			});
		}

		//Test case for verifyEmailAddress by passing a Invalid EmailAddress
		this.testVerifyEmailAddressWithInvalidEmailAddress = function(testRun) {
			var params = {
				'emailAddress' : 'bdvjhdbdgv'//invalid EmailAddress
			};
			AWS.SES.verifyEmailAddress(params, function(data) {
				valueOf(testRun, true).shouldBeFalse();
			}, function(error) {
				Ti.API.debug(error);
				finish(testRun);
			});
		}
		//*************verifyEmailAddress test cases ends**************
		//***************sendEmail test cases start**************

		//Test case for sendEmail without passing Destination
		this.testSendEmailWithoutDestination = function(testRun) {
			var params = {
				'destination' : '', //empty EmailAddress
				'message' : {
					body: {
						text: 'hi'
					},
					subject: 'Hello'
				}, //Required
				'source' : 'test@gmail.com'
			};
			AWS.SES.sendEmail(params, function(data) {
				valueOf(testRun, true).shouldBeFalse();
			valueOf(testRun, true).shouldBeFalse();
			}, function(error) {
				Ti.API.debug(error);
				finish(testRun);
			});
		}

		// Test case for sendEmail without passing Message
		this.testSendEmailWithoutMessage = function(testRun) {
			var params = {
				'destination' : { to: [ 'test@gmail.com' ] },
				'message' : '', //Empty
				'source' : 'test@gmail.com'
			};
			AWS.SES.sendEmail(params, function(data) {
				valueOf(testRun, true).shouldBeFalse();
			}, function(error) {
				Ti.API.debug(error);
				finish(testRun);
			});
		}

		// Test case for sendEmail without passing Source
		this.testSendEmailWithoutSource = function(testRun) {
			var params = {
				'destination' : { to: [ 'test@test.com' ] }, //Required
				'message' : {
					body: {
						text: 'hi'
					},
					subject: 'Hello'
				}, //Required
				'source' : ''//Empty
			};
			AWS.SES.sendEmail(params, function(data) {
				valueOf(testRun, true).shouldBeFalse();
			}, function(error) {
				Ti.API.debug(error);
				finish(testRun);
			});
		}

		// Test case for sendEmail by passing a valid Destination,Message,Source
		this.testSendEmail = function(testRun) {
			//!! THE ORIGINAL UNIT TEST FOR THIS TEST (AND OTHERS) COULD NOT HAVE PASSED BECAUSE
			//!! THE 'message' PARAMETER WAS NOT DEFINED PROPERLY. THE ORIGINAL CODE
			//!! HAD "'message' : 'hi'" BUT THE MODULE CODE IS EXPECTING A DICTIONARY
			//!! WITH 'body' AND 'subject' KEYS, AND THE 'body' VALUE MUST BE A DICTIONARY
			//!! OF EITHER 'html' OR 'text'
			//!! ALSO, THE FORMAT OF THE 'destination' MUST BE A DICTIONARY WITH 'to', 'cc', AND 'bcc'
			//!! ENTRIES, WHERE EACH ENTRY IS AN ARRAY
			var verifiedEmailAddress = 'appcel321@gmail.com';
			var params = {
				'destination' : { to: [ verifiedEmailAddress ] }, //Required
				'message' : {
					body: {
						text: 'hi'
					},
					subject: 'Hello'
				}, //Required
				'source' : verifiedEmailAddress//Required
			};
			AWS.SES.sendEmail(params, function(data) {
				finish(testRun);
			}, function(error) {
				Ti.API.debug(error);
				valueOf(testRun, true).shouldBeFalse();
			});
		}

		//Test case for sendEmail by passing a Invalid Destination
		this.testSendEmailWithInvalidDestination = function(testRun) {
			var params = {
				'destination' : { to: [ 'hbegjhrg' ] }, //Invalid EmailAddress
				'message' : {
					body: {
						text: 'hi'
					},
					subject: 'Hello'
				}, //Required
				'source' : 'rahul0789@gmail.com'//Required
			};
			AWS.SES.sendEmail(params, function(data) {
				valueOf(testRun, true).shouldBeFalse();
			valueOf(testRun, true).shouldBeFalse();
			}, function(error) {
				Ti.API.debug(error);
				finish(testRun);
			});
		}

		// Test case for sendEmail by passing a Invalid Source
		this.testSendEmailWithInvalidSource = function(testRun) {
			var params = {
				'destination' : { to: [ 'test@test.com' ] }, //Required
				'message' : {
					body: {
						text: 'hi'
					},
					subject: 'Hello'
				}, //Required
				'source' : 'bndjvnd'//Invalid
			};
			AWS.SES.sendEmail(params, function(data) {
				valueOf(testRun, true).shouldBeFalse();
			valueOf(testRun, true).shouldBeFalse();
			}, function(error) {
				Ti.API.debug(error);
				finish(testRun);
			});
		}
		//*************sendEmail test cases ends**************
		//***************sendRawEmail test cases start**************

		// Test case for sendRawEmail without passing RawMessage
		this.testSendRawEmailWithoutRawMessage = function(testRun) {

			var params = {
				'rawMessage' : ''//empty RawMessage
			};
			AWS.SES.sendRawEmail(params, function(data) {
				valueOf(testRun, true).shouldBeFalse();
			}, function(error) {
				Ti.API.debug(error);
				finish(testRun);
			});
		}

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 30000);

};