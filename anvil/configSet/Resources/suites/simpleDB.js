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
	var tableName;
	this.init = function(testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws.key'), Titanium.App.Properties.getString('aws.secret'));
		
		tableName = Titanium.App.Properties.getString('ddbTableName');
		AWS.STS.getSessionToken({}, function(response) {
			
			Ti.App.Properties.setString('tempSessionToken', response["GetSessionTokenResult"][0]["Credentials"][0]["SessionToken"][0]);
			Ti.App.Properties.setString('tempSecretAccessKey', response["GetSessionTokenResult"][0]["Credentials"][0]["SecretAccessKey"][0]);
			Ti.App.Properties.setString('tempAccessKeyID', response["GetSessionTokenResult"][0]["Credentials"][0]["AccessKeyId"][0]);
			Ti.App.Properties.setString('tempExpiration', response["GetSessionTokenResult"][0]["Credentials"][0]["Expiration"][0]);
	}//end init
	
	this.name = "simpleDB";
	
	this.testSimple = function(testRun) {
		var w = Ti.UI.createWindow();
		w.open();
		var data = [Ti.UI.createTableViewRow({title: 'blah'})];
		var tv = Ti.UI.createTableView({data:data});
		w.add(tv);
		setTimeout(function(){
				tv.appendRow( Ti.UI.createTableViewRow({title:'blah2', header:'header1'}) );
				setTimeout(function() {
					valueOf(testRun, tv.data.length).shouldBe(2);
					finish(testRun);
				}, 1000);
			},1000);
	}//end testSimple
	
	/*
	this.testcreateDomain_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillCases1234'
		}, function(data) {
			finish(testRun);
			AWS.SimpleDB.deleteDomain({
				'DomainName' : 'DrillCases1234'
			}, function(data) {

			}, function(error) {

			});
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	}

	//Test case with invalid domain
	this.testcreateInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : '@DrillBitDomain'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);

		});
	}

	//Test cases with invalid length for domain name parameter
	this.testcreateInvalidMinimumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	//test case with invalid maximum length for domain name paramater
	this.testcreateInvalidMaximumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);

		});
	}

	//test case for empty domain name while creating domain
	this.testcreateEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	//End Test Cases for Create Domain.

	//Test case for valid request for list domain
	this.testlistDomains_as_async = function(testRun) {
		AWS.SimpleDB.listDomains({}, function(data) {
			finish(testRun);
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	}
	
	this.testlistDomainsWithInvalidParams_as_async = function(testRun) {
		AWS.SimpleDB.listDomains({
			'MaxNumberOfDomains' : '999',
			'NextToken' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testlistDomainsWithvalidParams_as_async = function(testRun) {
		AWS.SimpleDB.listDomains({
			'MaxNumberOfDomains' : '99',
			'NextToken' : ''
		}, function(data) {
			finish(testRun);
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});
	}

	// End Test Cases for List Domains.
	// Start Test Cases for Delete Domain.
	this.testdeleteDomain_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillBit12345'
		}, function(data) {
			AWS.SimpleDB.deleteDomain({
				'DomainName' : 'DrillBit12345'
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();finish(testRun);
			});
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	}

	this.testdeleteDomainWithInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteDomain({
			'DomainName' : '@DrillBitDomain'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdeleteDomainWithInvalidMaximumDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteDomain({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdeleteDomainWithInvalidMinmumDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteDomain({
			'DomainName' : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdeleteEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteDomain({
			'DomainName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases For Delete Domain.

	// Start TestCases for BatchPutAttributes

	this.testbatchPutAttributes_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			'DomainName' : 'DrillBit123456'
		}, function(data) {
			AWS.SimpleDB.batchPutAttributes({
				'DomainName' : 'DrillBit123456',
				'Item.1.Attribute.1.Name' : 'testAttributeName',
				'Item.1.Attribute.1.Value' : 'testAttributeValue',
				'Item.1.ItemName' : 'testItemName'
			}, function(data) {
				finish(testRun);
				AWS.SimpleDB.batchDeleteAttributes({
					'DomainName' : 'DrillBit123456',
					'Item.1.ItemName' : 'testItemName',
					'Item.1.Attribute.1.Value' : 'testAttributeName'
				}, function(data) {
					AWS.SimpleDB.deleteDomain({
						'DomainName' : 'DrillBit123456'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {

				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();finish(testRun);
			});
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	}
	this.testbatchPutAttributesWithInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : '@testDomain',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}
	this.testbatchPutAttributesWithInvalidMinimumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : 'xy',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testbatchPutAttributesWithInvalidMaximumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testbatchPutAttributesEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : '',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testbatchPutAttributesEmptyItemName_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : '',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testbatchPutAttributesEmptyAttributeName_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : '',
			'Item.1.Attribute.1.Name' : '',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testbatchPutAttributesEmptyAttributeValue_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : 'testDomain',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : '',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testbatchPutAttributesWithInvalidReplaceValue_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : 'testDomain',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Replace' : 'xyz'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases for batchPutAttributes.

	// Start Test Cases for BatchDeleteAttributes.

	this.testbatchDeleteAttributes_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			'DomainName' : 'Test98345'
		}, function(data) {
			AWS.SimpleDB.batchPutAttributes({
				'DomainName' : 'Test98345',
				'Item.1.Attribute.1.Name' : 'testAttributeName',
				'Item.1.Attribute.1.Value' : 'testAttributeValue',
				'Item.1.ItemName' : 'testItemName'
			}, function(data) {
				AWS.SimpleDB.batchDeleteAttributes({
					'DomainName' : 'Test98345',
					'Item.1.ItemName' : 'testItemName',
					'Item.1.Attribute.1.Name' : 'testAttributeName',
					'Item.1.Attribute.1.Value' : 'testAttributeValue'
				}, function(data) {
					finish(testRun);
					AWS.SimpleDB.deleteDomain({
						'DomainName' : 'Test98345'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {
					callback.failed(JSON.stringify(error));
				});
			}, function(error) {
				callback.failed(JSON.stringify(error));
			});
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	}
	this.testbatchDeleteAttributesWithInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : '@xyz',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}
	this.testbatchDeleteAttributesWithMinimumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : 'xy',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testbatchDeleteAttributesWithMaximumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testbatchDeleteAttributesWithEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : '',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testbatchDeleteAttributesWithEmptyItemName_as_async = function(testRun) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : 'DrillbitDomain',
			'Item.1.ItemName' : '',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testbatchDeleteAttributesWithEmptyAttributeValue_as_async = function(testRun) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : 'DrillbitDomain',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases for BatchDeleteAttributes.

	// Start TestCases for delete Attributes.
	this.testdeleteAttributes_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillBit12345611'
		}, function(data) {
			AWS.SimpleDB.putAttributes({
				'Attribute.1.Name' : 'testAttributeName',
				'Attribute.1.Value' : 'testAttributeValue',
				'ItemName' : 'testItemName',
				'DomainName' : 'DrillBit12345611'
			}, function(data) {
				AWS.SimpleDB.deleteAttributes({
					'ItemName' : 'testItemName',
					'DomainName' : 'DrillBit12345611'
				}, function(data) {
					finish(testRun);
					AWS.SimpleDB.deleteDomain({
						'DomainName' : 'DrillBit12345611'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();finish(testRun);
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();finish(testRun);
			});

		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	}

	this.testdeleteAttributesWithInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : '@testDomainName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdeleteAttributesWithInvalidMinimumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdeleteAttributesWithInvalidMaximumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdeleteAttributesWithEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdeleteAttributesWithEmptyItemName_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : '',
			'DomainName' : 'testDomain'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdeleteAttributesWithInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomain',
			'Expected.1.Name' : '',
			'Expected.1.Value' : 'testValue'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdeleteAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomain',
			'Expected.1.Name' : 'testName',
			'Expected.1.Value' : 'testValue',
			'Expected.1.Exists' : 'falses'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdeleteAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomainName',
			'Expected.1.Exists' : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdeleteAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomainName',
			'Expected.1.Name' : 'testName',
			'Expected.1.Value' : 'testValue',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdeleteAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomainName',
			'Expected.1.Name' : 'testName',
			'Expected.1.Exists' : 'falses',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdeleteAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomainName',
			'Expected.1.Value' : 'testValue',
			'Expected.1.Exists' : 'falses',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases for deleteAttributes.
	// Start Test Cases for domainMetadata
	this.testdomainMetadata_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillBit98123456'
		}, function(data) {
			AWS.SimpleDB.domainMetadata({
				'DomainName' : 'DrillBit98123456'
			}, function(data) {
				finish(testRun);
				AWS.SimpleDB.deleteDomain({
					'DomainName' : 'DrillBit98123456'
				}, function(data) {

				}, function(error) {

				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();finish(testRun);
			});
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	}

	this.testdomainMetadataInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : 'testDomain'// domain does ot exists
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}
	this.testdomainMetadataWithEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdomainMetadataWithInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : '@testDomainName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdomainMetadataWithInvalidMinimumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testdomainMetadataWithInvalidMaximumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases for Domain Metadata

	// Start Test Cases for Get Attributes.

	this.testgetAttributes_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillBit1981236'
		}, function(data) {
			AWS.SimpleDB.putAttributes({
				'Attribute.1.Name' : 'testAttributeName',
				'Attribute.1.Value' : 'testAttributeValue',
				'ItemName' : 'testItemName',
				'DomainName' : 'DrillBit1981236'
			}, function(data) {
				AWS.SimpleDB.getAttributes({
					'DomainName' : 'DrillBit1981236',
					'ItemName' : 'testItemName'
				}, function(data) {
					AWS.SimpleDB.deleteAttributes({
						'ItemName' : 'testItemName',
						'DomainName' : 'DrillBit1981236'
					}, function(data) {
						finish(testRun);
						AWS.SimpleDB.deleteDomain({
							'DomainName' : 'DrillBit1981236'
						}, function(data) {

						}, function(error) {

						});
					}, function(error) {

					});
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();finish(testRun);
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();finish(testRun);
			});

		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	}

	this.testgetAttributesWithInvalidConsistemtRead_as_async = function(testRun) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : 'testDomainName',
			'ItemName' : 'testItemName',
			'ConsistentRead' : 'xyz'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testgetAttributesWithInvalidDomianName_as_async = function(testRun) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : '@testDomainName',
			'ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testgetAttributesWithInvalidMinimumLengthDomianName_as_async = function(testRun) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : 'xy',
			'ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testgetAttributesWithInvalidMaximumLengthDomianName_as_async = function(testRun) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget',
			'ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testgetAttributesWithEmptyDomianName_as_async = function(testRun) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : '',
			'ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testgetAttributesWithEmptyItemName_as_async = function(testRun) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : 'Domain1',
			'ItemName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases for Get Attributes.
	// Start Test Cases for Put Attributes.
	this.testputAttributes_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillBit777120'
		}, function(data) {
			AWS.SimpleDB.putAttributes({
				'Attribute.1.Name' : 'testAttributeName',
				'Attribute.1.Value' : 'testAttributeValue',
				'ItemName' : 'testItemName',
				'DomainName' : 'DrillBit777120'
			}, function(data) {
				finish(testRun);
				AWS.SimpleDB.deleteAttributes({
					'ItemName' : 'testItemName',
					'DomainName' : 'DrillBit777120'
				}, function(data) {
					AWS.SimpleDB.deleteDomain({
						'DomainName' : 'DrillBit777120'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {

				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();finish(testRun);
			});

		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	}

	this.testputAttributesWithInvalidDomainName_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : '@testDomainName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testputAttributesWithInvalidMinimumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : 'te'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testputAttributesWithInvalidMaximumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testputAttributesWithEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testputAttributesWithEmptyAttributeName_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : '',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testputAttributesWithEmptyAttributeValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : '',
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1'
		}, function(data) {
			finish(testRun);
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	}

	this.testputAttributesWithEmptyItemName_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : '',
			'Attribute.1.Value' : 'test',
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testputAttributesWithInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : '',
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Name' : '',
			'Expected.1.Value' : 'testValue'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testputAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Name' : 'testName',
			'Expected.1.Value' : 'testValue',
			'Expected.1.Exists' : 'falses'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testputAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Exists' : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testputAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Name' : 'testName',
			'Expected.1.Value' : 'testValue',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testputAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Name' : 'testName',
			'Expected.1.Exists' : 'falses',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}

	this.testputAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Value' : 'testValue',
			'Expected.X.Exists' : 'falses',
			'Attribute.X.Value' : 'value1,value2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases for  put Attributes.

	// Start Test Cases for Select.

	this.testselect_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillBit7787120'
		}, function(data) {
			AWS.SimpleDB.putAttributes({
				'Attribute.1.Name' : 'testAttributeName',
				'Attribute.1.Value' : 'testAttributeValue',
				'ItemName' : 'testItemName',
				'DomainName' : 'DrillBit7787120'
			}, function(data) {
				AWS.SimpleDB.select({
					'SelectExpression' : 'select * from DrillBit7787120',
				}, function(data) {
					finish(testRun);
					AWS.SimpleDB.deleteAttributes({
						'ItemName' : 'testItemName',
						'DomainName' : 'DrillBit7787120'
					}, function(data) {
						AWS.SimpleDB.deleteDomain({
							'DomainName' : 'DrillBit7787120'
						}, function(data) {
						}, function(error) {
						});
					}, function(error) {
					});
				}, function(error) {
					callback.failed(JSON.stringify(error));
				});
			}, function(error) {
				callback.failed(JSON.stringify(error));
			});
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});
	}
	
	this.testselectWithInvalidExpression_as_async = function(testRun) {
		AWS.SimpleDB.select({
			'SelectExpression' : 34567,
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}
	this.testselectWithEmptyExpression_as_async = function(testRun) {
		AWS.SimpleDB.select({
			'SelectExpression' : '',
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}
	this.testselectWithInvalidConsistentReadValue_as_async = function(testRun) {
		AWS.SimpleDB.select({
			'SelectExpression' : 'valid Expression',
			'ConsistentRead' : 'gfh'                       //Value must be boolean
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();finish(testRun);
		}, function(error) {
			finish(testRun);
		});
	}
	*/
	
	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 30000);
	
};
