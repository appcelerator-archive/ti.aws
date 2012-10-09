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

			Titanium.App.Properties.setString('tempSessionToken', response["GetSessionTokenResult"][0]["Credentials"][0]["SessionToken"][0]);
			Titanium.App.Properties.setString('tempSecretAccessKey', response["GetSessionTokenResult"][0]["Credentials"][0]["SecretAccessKey"][0]);
			Titanium.App.Properties.setString('tempAccessKeyID', response["GetSessionTokenResult"][0]["Credentials"][0]["AccessKeyId"][0]);
			Titanium.App.Properties.setString('tempExpiration', response["GetSessionTokenResult"][0]["Credentials"][0]["Expiration"][0]);

		}, function(error) {

		});
		
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
	

	this.testCreateDomain_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillCases1234'
		}, function(data) {
			
			AWS.SimpleDB.deleteDomain({
				'DomainName' : 'DrillCases1234'
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}

	//Test case with invalid domain
	this.testCreateInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : '@AnvilDomain'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);

		});
	}

	//Test cases with invalid length for domain name parameter
	this.testCreateInvalidMinimumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	//test case with invalid maximum length for domain name paramater
	this.testCreateInvalidMaximumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);

		});
	}

	//test case for empty domain name while creating domain
	this.testCreateEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	//End Test Cases for Create Domain.

	//Test case for valid request for list domain
	this.testListDomains_as_async = function(testRun) {
		AWS.SimpleDB.listDomains({}, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}
	
	this.testListDomainsWithInvalidParams_as_async = function(testRun) {
		AWS.SimpleDB.listDomains({
			'MaxNumberOfDomains' : '999',
			'NextToken' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	// This test passes even if we pass an invalid token to AWS - bug to be filed
	this.testListDomainsWithvalidParams_as_async = function(testRun) {
	AWS.SimpleDB.listDomains({
			'MaxNumberOfDomains' : '99',
			'NextToken' : 'Invalid Token'
		}, function(data) {
			
			//valueOf(testRun, true).shouldBeFalse();
			//alert(data);
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
			//finish(testRun);
		});
	}

	// End Test Cases for List Domains.
	// Start Test Cases for Delete Domain.
	this.testDeleteDomain_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'Anvil12345'
		}, function(data) {
			AWS.SimpleDB.deleteDomain({
				'DomainName' : 'Anvil12345'
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}

	this.testDeleteDomainWithInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteDomain({
			'DomainName' : '@AnvilDomain'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDeleteDomainWithInvalidMaximumDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteDomain({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDeleteDomainWithInvalidMinmumDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteDomain({
			'DomainName' : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDeleteEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteDomain({
			'DomainName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases For Delete Domain.

	// Start TestCases for BatchPutAttributes

	this.testBatchPutAttributes_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			'DomainName' : 'Anvil123456'
		}, function(data) {
			AWS.SimpleDB.batchPutAttributes({
				'DomainName' : 'Anvil123456',
				'Item.1.Attribute.1.Name' : 'testAttributeName',
				'Item.1.Attribute.1.Value' : 'testAttributeValue',
				'Item.1.ItemName' : 'testItemName'
			}, function(data) {
				
				AWS.SimpleDB.batchDeleteAttributes({
					'DomainName' : 'Anvil123456',
					'Item.1.ItemName' : 'testItemName',
					'Item.1.Attribute.1.Name' : 'testAttributeName',
					'Item.1.Attribute.1.Value' : 'testAttributeName'
				}, function(data) {
					AWS.SimpleDB.deleteDomain({
						'DomainName' : 'Anvil123456'
					}, function(data) {
						finish(testRun);
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
						
					});
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
					//alert('from batchDeleteAttribuets' + error);
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
				//alert('From BatchPutAttributes' + error);
			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
			//alert('From Create domain' + error);
		});

	}
	this.testBatchPutAttributesWithInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : '@testDomain',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	this.testBatchPutAttributesWithInvalidMinimumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : 'xy',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testBatchPutAttributesWithInvalidMaximumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testBatchPutAttributesEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : '',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testBatchPutAttributesEmptyItemName_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : '',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testBatchPutAttributesEmptyAttributeName_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : '',
			'Item.1.Attribute.1.Name' : '',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testBatchPutAttributesEmptyAttributeValue_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : 'testDomain',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : '',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testBatchPutAttributesWithInvalidReplaceValue_as_async = function(testRun) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : 'testDomain',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Replace' : 'xyz'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases for batchPutAttributes.

	// Start Test Cases for BatchDeleteAttributes.

	this.testBatchDeleteAttributes_as_async = function(testRun) {
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
					
					AWS.SimpleDB.deleteDomain({
						'DomainName' : 'Test98345'
					}, function(data) {
						finish(testRun);
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					});
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}
	this.testBatchDeleteAttributesWithInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : '@xyz',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	this.testBatchDeleteAttributesWithMinimumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : 'xy',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testBatchDeleteAttributesWithMaximumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testBatchDeleteAttributesWithEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : '',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testBatchDeleteAttributesWithEmptyItemName_as_async = function(testRun) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : 'AnvilDomain',
			'Item.1.ItemName' : '',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testBatchDeleteAttributesWithEmptyAttributeValue_as_async = function(testRun) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : 'AnvilDomain',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases for BatchDeleteAttributes.

	// Start TestCases for delete Attributes.
	this.testDeleteAttributes_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'Anvil12345611'
		}, function(data) {
			AWS.SimpleDB.putAttributes({
				'Attribute.1.Name' : 'testAttributeName',
				'Attribute.1.Value' : 'testAttributeValue',
				'ItemName' : 'testItemName',
				'DomainName' : 'Anvil12345611'
			}, function(data) {
				AWS.SimpleDB.deleteAttributes({
					'ItemName' : 'testItemName',
					'DomainName' : 'Anvil12345611',
					'Attribute.1.Name' : 'testAttributeName',
					'Attribute.1.Value' : 'testAttributeValue'
				}, function(data) {
					
					AWS.SimpleDB.deleteDomain({
						'DomainName' : 'Anvil12345611'
					}, function(data) {
						finish(testRun);
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					});
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});

		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}

	this.testDeleteAttributesWithInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : '@testDomainName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDeleteAttributesWithInvalidMinimumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDeleteAttributesWithInvalidMaximumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDeleteAttributesWithEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDeleteAttributesWithEmptyItemName_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : '',
			'DomainName' : 'testDomain'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDeleteAttributesWithInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomain',
			'Expected.1.Name' : '',
			'Expected.1.Value' : 'testValue'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDeleteAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomain',
			'Expected.1.Name' : 'testName',
			'Expected.1.Value' : 'testValue',
			'Expected.1.Exists' : 'falses'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDeleteAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomainName',
			'Expected.1.Exists' : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDeleteAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomainName',
			'Expected.1.Name' : 'testName',
			'Expected.1.Value' : 'testValue',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDeleteAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomainName',
			'Expected.1.Name' : 'testName',
			'Expected.1.Exists' : 'falses',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDeleteAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomainName',
			'Expected.1.Value' : 'testValue',
			'Expected.1.Exists' : 'falses',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases for deleteAttributes.
	// Start Test Cases for domainMetadata
	this.testDomainMetadata_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'Anvil98123456'
		}, function(data) {
			AWS.SimpleDB.domainMetadata({
				'DomainName' : 'Anvil98123456'
			}, function(data) {
				
				AWS.SimpleDB.deleteDomain({
					'DomainName' : 'Anvil98123456'
				}, function(data) {
					finish(testRun);
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}

	this.testDomainMetadataInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : 'testDomain'// domain does ot exists
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	this.testDomainMetadataWithEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDomainMetadataWithInvalidDomain_as_async = function(testRun) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : '@testDomainName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDomainMetadataWithInvalidMinimumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testDomainMetadataWithInvalidMaximumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases for Domain Metadata

	// Start Test Cases for Get Attributes.

	this.testGetAttributes_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'Anvil1981236'
		}, function(data) {
			AWS.SimpleDB.putAttributes({
				'Attribute.1.Name' : 'testAttributeName',
				'Attribute.1.Value' : 'testAttributeValue',
				'ItemName' : 'testItemName',
				'DomainName' : 'Anvil1981236'
			}, function(data) {
				AWS.SimpleDB.getAttributes({
					'DomainName' : 'Anvil1981236',
					'ItemName' : 'testItemName'
				}, function(data) {
					AWS.SimpleDB.deleteAttributes({
						'ItemName' : 'testItemName',
						'DomainName' : 'Anvil1981236',
						'Attribute.1.Name' : 'testAttributeName',
						'Attribute.1.Value' : 'testAttributeValue'
					}, function(data) {
						finish(testRun);
						AWS.SimpleDB.deleteDomain({
							'DomainName' : 'Anvil1981236'
						}, function(data) {
							finish(testRun);
						}, function(error) {
							valueOf(testRun, true).shouldBeFalse();
						});
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					});
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});

		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}

	this.testGetAttributesWithInvalidConsistemtRead_as_async = function(testRun) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : 'testDomainName',
			'ItemName' : 'testItemName',
			'ConsistentRead' : 'xyz'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testGetAttributesWithInvalidDomianName_as_async = function(testRun) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : '@testDomainName',
			'ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testGetAttributesWithInvalidMinimumLengthDomianName_as_async = function(testRun) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : 'xy',
			'ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testGetAttributesWithInvalidMaximumLengthDomianName_as_async = function(testRun) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget',
			'ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testGetAttributesWithEmptyDomianName_as_async = function(testRun) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : '',
			'ItemName' : 'testItemName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testGetAttributesWithEmptyItemName_as_async = function(testRun) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : 'Domain1',
			'ItemName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases for Get Attributes.
	// Start Test Cases for Put Attributes.
	this.testPutAttributes_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'Anvil777120'
		}, function(data) {
			AWS.SimpleDB.putAttributes({
				'Attribute.1.Name' : 'testAttributeName',
				'Attribute.1.Value' : 'testAttributeValue',
				'ItemName' : 'testItemName',
				'DomainName' : 'Anvil777120'
			}, function(data) {
				
				AWS.SimpleDB.deleteAttributes({
					'ItemName' : 'testItemName',
					'DomainName' : 'Anvil777120'
				}, function(data) {
					AWS.SimpleDB.deleteDomain({
						'DomainName' : 'Anvil777120'
					}, function(data) {
						finish(testRun);
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					});
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
			}, function(error,response) {
				//valueOf(testRun, true).shouldBeFalse();
				alert(error + JSON.stringify(response));
			});

		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}

	this.testPutAttributesWithInvalidDomainName_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : '@testDomainName'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testPutAttributesWithInvalidMinimumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : 'te'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testPutAttributesWithInvalidMaximumLengthDomain_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testPutAttributesWithEmptyDomain_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testPutAttributesWithEmptyAttributeName_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : '',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testPutAttributesWithEmptyAttributeValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : '',
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});

	}

	this.testPutAttributesWithEmptyItemName_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : '',
			'Attribute.1.Value' : 'test',
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testPutAttributesWithInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : '',
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Name' : '',
			'Expected.1.Value' : 'testValue'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testPutAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Name' : 'testName',
			'Expected.1.Value' : 'testValue',
			'Expected.1.Exists' : 'falses'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testPutAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Exists' : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testPutAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Name' : 'testName',
			'Expected.1.Value' : 'testValue',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testPutAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Name' : 'testName',
			'Expected.1.Exists' : 'falses',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	this.testPutAttributesInvalidExpectedValue_as_async = function(testRun) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Value' : 'testValue',
			'Expected.X.Exists' : 'falses',
			'Attribute.X.Value' : 'value1,value2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	// End Test Cases for  put Attributes.

	// Start Test Cases for Select.

	this.testSelect_as_async = function(testRun) {
		AWS.SimpleDB.createDomain({
			DomainName : 'Anvil7787120'
		}, function(data) {
			AWS.SimpleDB.putAttributes({
				'Attribute.1.Name' : 'testAttributeName',
				'Attribute.1.Value' : 'testAttributeValue',
				'ItemName' : 'testItemName',
				'DomainName' : 'Anvil7787120'
			}, function(data) {
				AWS.SimpleDB.select({
					'SelectExpression' : 'select * from Anvil7787120',
				}, function(data) {
					
					AWS.SimpleDB.deleteAttributes({
						'ItemName' : 'testItemName',
						'DomainName' : 'Anvil7787120'
					}, function(data) {
						AWS.SimpleDB.deleteDomain({
							'DomainName' : 'Anvil7787120'
						}, function(data) {
							finish(testRun);
						}, function(error) {
							valueOf(testRun, true).shouldBeFalse();
						});
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					});
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testSelectWithInvalidExpression_as_async = function(testRun) {
		AWS.SimpleDB.select({
			'SelectExpression' : 34567,
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	this.testSelectWithEmptyExpression_as_async = function(testRun) {
		AWS.SimpleDB.select({
			'SelectExpression' : '',
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	this.testSelectWithInvalidConsistentReadValue_as_async = function(testRun) {
		AWS.SimpleDB.select({
			'SelectExpression' : 'valid Expression',
			'ConsistentRead' : 'gfh'                       //Value must be boolean
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	
	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 30000);
	
};
