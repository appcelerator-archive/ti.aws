/**
 * Ti.Aws Module
 * Copyright (c) 2011-2013 by Appcelerator, Inc. All Rights Reserved.
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
				'EmailAddress' : ''//empty EmailAddress
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
				'EmailAddress' : 'test@test.com'//Required
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
				'EmailAddress' : 'caxvcx'//invalid EmailAddress
			};
			AWS.SES.deleteVerifiedEmailAddress(params, function(data) {
				valueOf(testRun, true).shouldBeFalse();
			}, function(error) {
				Ti.API.debug(error);
				finish(testRun);
			});
		};

		//***************getSendQuota test cases start**************

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
				'EmailAddress' : ''//empty EmailAddress
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
				'EmailAddress' : 'test@test.com'//Required
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
				'EmailAddress' : 'bdvjhdbdgv'//invalid EmailAddress
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
				'Destination' : '', //empty EmailAddress
				'Message' : {
					'Body' : {
						'Text' : {
							'Data' : 'hi'
						}
					},
					'Subject': {
						'Data' : 'Hello'
					}
				}, //Required
				'Source' : 'test@gmail.com'
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
				'Destination' : {
					ToAddresses: [ 'test@gmail.com' ]
				},
				'Message' : '', //Empty
				'Source' : 'test@gmail.com'
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
				'Destination' : {
					ToAddresses: [ 'test@test.com' ]
				}, //Required
				'Message' : {
					'Body' : {
						'Text' : {
							'Data' : 'hi'
						}
					},
					'Subject' : {
						'Data' : 'Hello'
					}
				}, //Required
				'Source' : ''//Empty
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
			var verifiedEmailAddress = 'appcel321@gmail.com';
			var params = {
				'Destination' : {
					ToAddresses: [ verifiedEmailAddress ]
				}, //Required
				'Message' : {
					'Body' : {
						'Text' : {
							'Data' : 'hi'
						}
					},
					'Subject' : {
						'Data' : 'Hello'
					}
				}, //Required
				'Source' : verifiedEmailAddress//Required
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
				'Destination' : {
					'ToAddresses' : [ 'hbegjhrg' ]
				}, //Invalid EmailAddress
				'Message' : {
					'Body' : {
						'Text' : {
							'Data' : 'hi'
						}
					},
					'Subject' : {
						'Data' : 'Hello'
					}
				}, //Required
				'Source' : 'rahul0789@gmail.com'//Required
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
				'Destination' : {
					'ToAddresses' : [ 'test@test.com' ]
				}, //Required
				'Message' : {
					'Body' : {
						'Text' : {
							'Data' : 'hi'
						}
					},
					'Subject' : {
						'Data' : 'Hello'
					}
				}, //Required
				'Source' : 'bndjvnd'//Invalid
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
				'RawMessage' : {
					'Data': ''
				}//empty RawMessage
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