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
	var tableNameForUpdate;
	
	this.init = function(testUtils) {
		
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		AWS = require('ti.aws');
		
		AWS.authorize(Titanium.App.Properties.getString('aws.key'), Titanium.App.Properties.getString('aws.secret'));
		
		awsAccountId = Titanium.App.Properties.getString('aws-account-id');
	//	tableName = Titanium.App.Properties.getString('ddbTableName'); //
		tableName = 'AWS_DynamoDB_Appcel_Test';
		tableNameForUpdate = 'AWS_DynamoDB_Appcel_Test_For_UpdateTable';
		AWS.STS.getSessionToken({}, function(response) {

			Titanium.App.Properties.setString('tempSessionToken', response["GetSessionTokenResult"]["Credentials"]["SessionToken"]);
			Titanium.App.Properties.setString('tempSecretAccessKey', response["GetSessionTokenResult"]["Credentials"]["SecretAccessKey"]);
			Titanium.App.Properties.setString('tempAccessKeyID', response["GetSessionTokenResult"]["Credentials"]["AccessKeyId"]);
			Titanium.App.Properties.setString('tempExpiration', response["GetSessionTokenResult"]["Credentials"]["Expiration"]);

		}, function(error) {

		});
		
	}//end init
	
	this.name = "ddb";
	
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
	
	this.testBatchGetItemWithEmptyrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {} //Empty
		};
		
		AWS.DDB.batchGetItem(params, function(data) {
			valueOf(testRun, true).shouldBeFalse(); 
		}, function(error) {
			finish(testRun);
		});
	}

	/**
	 *Test case for batchGetItem With an Invalid requestJSON.
	 */
	
	this.testBatchGetItemWithInvalidrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {
				'test' : 'test'
			} //Empty
		};
		AWS.DDB.batchGetItem(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	
	/**
	 *Test case for batchGetItem With a valid requestJSON.
	 */

	this.testBatchGetItem_as_async = function(testRun) {
		
		var params = '{"requestJSON" : {"RequestItems":{"my-ddb-test-tab": {"Keys": [{"HashKeyElement": {"S":"1"}, "RangeKeyElement":{"N":"1"}}],"AttributesToGet":["item2"]},"my-ddb-test-tab": {"Keys": [{"HashKeyElement": {"S":"1"}, "RangeKeyElement":{"N":"1"}}],"AttributesToGet": ["item1"]}}}}';
			
		AWS.DDB.batchGetItem(JSON.parse(params),			
		function(data, response) {
			finish(testRun);
  	},  function(message,error) {
			valueOf(testRun, true).shouldBeFalse();
	});
	
	}

	//*************batchGetItem test cases ends**************

	//***************batchWriteItem test cases start**************

	/**
	 *Test case for BatchWriteItem WithEmpty  requestJSON.
	 */
	
	
	this.testBatchWriteItemWithEmptyrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.batchWriteItem(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	/**
	 *Test case for batchWriteItem With an Invalid requestJSON.
	 */
	
	this.testBatchWriteItemWithInvalidrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.batchWriteItem(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	/**
	 *Test case for batchWriteItem With a valid requestJSON.
	 */
// 
	this.testBatchWriteItem_as_async = function(testRun) {

		var params ='{"requestJSON" : {"RequestItems": {"my-ddb-test-tab": [{"PutRequest":{"Item":{"name":{"S":"1234567"},"1234":{"N":"12345678"}}}},{"DeleteRequest":{"Key":{"HashKeyElement":{"S":"1"},"RangeKeyElement":{"N":"1"}}}}], "my-ddb-test-tab": [{"PutRequest":{"Item": {"name":{"S":"Amazon DynamoDB"},"1234":{"N":"6"}}}}]}}}';	
		AWS.DDB.batchWriteItem(JSON.parse(params),
		function(data, response) {
			finish(testRun);
  		},function(message,error) {
			valueOf(testRun, true).shouldBeFalse();
	});

	}

	//*************batchWriteItem test cases ends**************

	//***************createTable test cases start**************

	/**
	 *Test case for createTable With a valid requestJSON.
	 */
	this.testCreateTable_as_async = function(testRun) {

	var param = {
	"requestJSON" : {
	"TableName" : "AWS_Appcel_Test_Create",
	"KeySchema" : {
	"HashKeyElement" : {
	"AttributeName" : "name",
	"AttributeType" : "S",
	"AttributeValue" : "testing"
	},
	"RangeKeyElement" : {
	"AttributeName" : "1234",
	"AttributeType" : "N",
	"AttributeValue" : "12345"
	}
	},
	"ProvisionedThroughput" : {
	"ReadCapacityUnits" : 10,
	"WriteCapacityUnits" : 10
	}
	}
	}
	AWS.DDB.createTable(param, function(data) {
		
		//finish(testRun);
	 }, function(error) {
		 valueOf(testRun, true).shouldBeFalse();
	});
	
	var cleanUp = function () {	
		var param = {
			"requestJSON" : {
			"TableName" : "AWS_Appcel_Test_Create",
			}
					};	
		AWS.DDB.deleteTable(param, function(data) {
		finish(testRun);
		
	}, function(error) {
		alert('errror in deleting' + error);
		 valueOf(testRun, true).shouldBeFalse();
		
		});
	}
	setTimeout(cleanUp, 60000);	
	}
	

	/**
	 *Test case for createTable WithEmpty  requestJSON.
	 */
	this.testCreateTableWithEmptyrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.createTable(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	/**
	 *Test case for createTable With an Invalid requestJSON.
	 */
	this.testCreateTableWithInvalidrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.createTable(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	//*************createTable test cases ends**************

	//***************deleteItem test cases start**************
	/**
	 *Test case for deleteItem WithEmpty  requestJSON.
	 */
	this.testDeleteItemWithEmptyrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.deleteItem(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for deleteItem With an Invalid requestJSON.
	 */
	this.testDeleteItemWithInvalidrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.deleteItem(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for deleteItem With a valid requestJSON.
	 */

	this.testDeleteItem_as_async = function(testRun) {

		var params = {
			'requestJSON' : {
				"TableName" : tableName,
				"Item" : {
					"name" : {
						"S" : "testingName2"
					},
					"1234" : {
						"N" : "1234567"
					}
				}
			} //Required
		};
		AWS.DDB.putItem(params, function(data) {
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
					"Key" : {
						"HashKeyElement" : {
							"S" : "testingName2"
						},
						"RangeKeyElement" : {
							"N" : "1234567"
						}
					}
				} //Required
			};
			AWS.DDB.deleteItem(params, function(data) {
				finish(testRun);

			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}

	//*************deleteItem test cases ends**************

	//***************describeTable test cases start**************
	/**
	 *Test case for describeTable WithEmpty  requestJSON.
	 */
	this.testDescribeTableWithEmptyrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.describeTable(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for describeTable With an Invalid requestJSON.
	 */
	this.testDescribeTableWithInvalidrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.describeTable(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	/**
	 *Test case for describeTable With a valid requestJSON.
	 */

	this.testDescribeTable_as_async = function(testRun) {

		var params = {
			'requestJSON' : {
				'TableName' : tableName
			}//Required
		};
		AWS.DDB.describeTable(params, function(data) {
			
			finish(testRun);
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
				}
			};

		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}

	//*************DescribeTable test cases ends**************

	//***************GetItem test cases start**************
	/**
	 *Test case for getItem WithEmpty  requestJSON.
	 */
	this.testGetItemWithEmptyrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.getItem(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for getItem With an Invalid requestJSON.
	 */
	this.testGetItemWithInvalidrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.getItem(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for getItem With a valid requestJSON.
	 */

	this.testGetItem_as_async = function(testRun) {

		var params = {
			'requestJSON' : {
				"TableName" : tableName,
				"Item" : {
					"name" : {
						"S" : "Bill & Ted's Excellent Adventure"
					},
					"1234" : {
						"N" : "12345"
					}
				}
			} //Required
		};
		AWS.DDB.putItem(params, function(data) {
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
					"Key" : {
						"HashKeyElement" : {
							"S" : "Bill & Ted's Excellent Adventure"
						},
						"RangeKeyElement" : {
							"N" : "12345"
						}
					},
					"ConsistentRead" : true
				}   //Required
			};
			AWS.DDB.getItem(params, function(data) {

				finish(testRun);
				var params = {
					'requestJSON' : {
						"TableName" : tableName,
						"Key" : {
							"HashKeyElement" : {
								"S" : "Bill & Ted's Excellent Adventure"
							},
							"RangeKeyElement" : {
								"N" : "12345"
							}
						}
					} //Required
				};
				AWS.DDB.deleteItem(params, function(data) {

				}, function(error) {

				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});

		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}

	//*************getItem test cases ends**************

	//***************listTables test cases start**************

	/*
	 *Test case for listTables With an Invalid requestJSON.
	 */
	this.testListTablesWithInvalidrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.listTables(params, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	/**
	 *Test case for listTables With a valid requestJSON.
	 */
	this.testListTables_as_async = function(testRun) {
		var params = {
			'requestJSON' : {}
		};
		AWS.DDB.listTables(params, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	//*************listTables test cases ends**************

	//***************putItem test cases start**************
	/**
	 *Test case for putItem WithEmpty  requestJSON.
	 */
	this.testPutItemWithEmptyrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.putItem(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for putItem With an Invalid requestJSON.
	 */
	this.testPutItemWithInvalidrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.putItem(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for putItem With a valid requestJSON.
	 */

	this.testPutItem_as_async = function(testRun) {

		var params = {
			'requestJSON' : {
				"TableName" : tableName,
				"Item" : {
					"name" : {
						"S" : "Bill & Ted's Excellent Adventure"
					},
					"1234" : {
						"N" : "123456"
					}
				}
			} //Required
		};
		AWS.DDB.putItem(params, function(data) {
			finish(testRun);
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
					"Key" : {
						"HashKeyElement" : {
							"S" : "Bill & Ted's Excellent Adventure"
						},
						"RangeKeyElement" : {
							"N" : "123456"
						}
					}
				} //Required
			};
			AWS.DDB.deleteItem(params, function(data) {

			}, function(error) {

			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}

	//*************putItem test cases ends**************

	//***************query test cases start**************
	/**
	 *Test case for query WithEmpty  requestJSON.
	 */
	this.testQueryWithEmptyrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.query(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for query With an Invalid requestJSON.
	 */
	this.testQueryWithInvalidrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.query(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for query With a valid requestJSON.
	 */

	this.testQuery_as_async = function(testRun) {

		var params = {
			'requestJSON' : {
				"TableName" : tableName,
				"HashKeyValue" : {
					"S" : "Bill & Ted's Excellent Adventure"
				}
			} //Required
		};
		AWS.DDB.query(params, function(data) {
			finish(testRun);
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
				}//Required
			};

		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}

	//*************query test cases ends**************

	//***************scan test cases start**************
	/**
	 *Test case for scan WithEmpty  requestJSON.
	 */
	this.testScanWithEmptyrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.scan(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for scan With an Invalid requestJSON.
	 */
	this.testScanWithInvalidrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.scan(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for scan With a valid requestJSON.
	 */

	this.testScan_as_async = function(testRun) {

		var params = {
			'requestJSON' : {
				"TableName" : tableName,
				"ScanFilter" : {
					"1234" : {
						"AttributeValueList" : [{
							"N" : "123"
						}],
						"ComparisonOperator" : "GT"
					}
				}
			}  //Required
		};
		AWS.DDB.scan(params, function(data) {
			finish(testRun);
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
				}//Required
			};

		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}

	//*************scan test cases ends**************

	//***************updateItem test cases start**************
	/**
	 *Test case for updateItem WithEmpty  requestJSON.
	 */
	this.testUpdateItemWithEmptyrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.updateItem(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for updateItem With an Invalid requestJSON.
	 */
	this.testUpdateItemWithInvalidrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.updateItem(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for updateItem With a valid requestJSON.
	 */

	this.testUpdateItem_as_async = function(testRun) {

		var params = {
			'requestJSON' : {
				"TableName" : tableName,
				"Item" : {
					"name" : {
						"S" : "Bill & Ted's Excellent Adventure"
					},
					"1234" : {
						"N" : "12345"
					}
				}
			} //Required
		};
		AWS.DDB.putItem(params, function(data) {
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
					"Key" : {
						"HashKeyElement" : {
							"S" : "name"
						},
						"RangeKeyElement" : {
							"N" : "1234"
						}
					},
					"AttributeUpdates" : {
						"test1" : {
							"Value" : {
								"S" : "newvalue"
							},
							"Action" : "PUT"
						}
					},
					"ReturnValues" : "ALL_NEW"
				}
				//Required
			};
			AWS.DDB.updateItem(params, function(data) {
				finish(testRun);
				var params = {
					'requestJSON' : {
						"TableName" : tableName,
						"Key" : {
							"HashKeyElement" : {
								"S" : "name"
							},
							"RangeKeyElement" : {
								"N" : "123456789"
							}
						}
					} //Required
				};
				AWS.DDB.deleteItem(params, function(data) {

				}, function(error) {

				});
			}, function(message,error) {
				alert('from update' + message + error);
				
				//valueOf(testRun, true).shouldBeFalse();
			});
		}, function(message,error) {
			alert('from put' + message + error);
		});

	}

	//*************updateItem test cases ends**************

	//***************updateTable test cases start**************
	/**
	 *Test case for UpdateTable WithEmpty  requestJSON.
	 */
	this.testUpdateTableWithEmptyrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.updateTable(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for updateTable With an Invalid requestJSON.
	 */
	this.testUpdateTableWithInvalidrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.updateTable(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for updateTable With a valid requestJSON.
	 */

	this.testUpdateTable_as_async = function(testRun) {
		
		var params = '{"requestJSON" : {"TableName" : "' + tableNameForUpdate + '","ProvisionedThroughput" : {"ReadCapacityUnits" : 6,"WriteCapacityUnits" : 6} }}';
		
		AWS.DDB.updateTable(JSON.parse(params), function(data) {
			// Nothing here!! just pass!!
			setTimeout(cleanUp, 70000);	
	
		}, function(error) {
			alert(error);
			//valueOf(testRun, true).shouldBeFalse();
		});
		
			var cleanUp = function () {	
			var param = {
				"requestJSON" : {
				"TableName" : tableNameForUpdate,
				}
					};	
			//alert('in clean Up  ' + param);
			AWS.DDB.deleteTable(param, function(data) {
			// nothing here just pass
		//	alert('Success in Deleting');
		
				var reCreate = function () {	
				var param = {
							"requestJSON" : {
							"TableName" : tableNameForUpdate,
							"KeySchema" : {
							"HashKeyElement" : {
							"AttributeName" : "nameUpdate",
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
					 		AWS.DDB.createTable(param, function(response) {
								finish(testRun);
							}, function(error) {
								alert(error);
								//valueOf(testRun, true).shouldBeFalse();
							});
				}
				setTimeout(reCreate, 70000);
			}, function(error) {
				alert('errror in deleting' + error);
		 	//valueOf(testRun, true).shouldBeFalse();
		});		
	}
}

	//*************updateTable test cases ends**************
	//***************deleteTable test cases start**************

	/**
	 *Test case for deleteTable With a valid requestJSON.
	 */
	/*this.testDeleteTable_as_async = function(testRun) {
	var param = {
	"requestJSON" : {
	"TableName" : "my-ddb-goyal-tab",
	"KeySchema" : {
	"HashKeyElement" : {
	"AttributeName" : "name",
	"AttributeType" : "S",
	"AttributeValue" : "pankaj"
	},
	"RangeKeyElement" : {
	"AttributeName" : "1234",
	"AttributeType" : "N",
	"AttributeValue" : "12345"
	}
	},
	"ProvisionedThroughput" : {
	"ReadCapacityUnits" : 10,
	"WriteCapacityUnits" : 10
	}
	}
	}

	AWS.DDB.createTable(param, function(data) {
	var param = {
	'requestJSON' : {
	"TableName" : "my-ddb-test-tab",
	}
	};
	AWS.DDB.deleteTable(param, function(data) {
	finish(testRun);
	}, function(error) {
	testRun.failed('Some error occured' + JSON.stringify(error));
	});

	}, function(error) {
	testRun.failed('Some error occured' + JSON.stringify(error));
	});
	},*/

	/**
	 *Test case for deleteTable WithEmpty  requestJSON.
	 */
	this.testDeleteTableWithEmptyrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.deleteTable(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for deleteTable With an Invalid requestJSON.
	 */
	this.testDeleteTableWithInvalidrequestJSON_as_async = function(testRun) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.deleteTable(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	
	
	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 200000);
	
};
