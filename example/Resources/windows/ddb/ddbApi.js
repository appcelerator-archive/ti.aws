windowFunctions['getSessionToken'] = function(evt) { 	
 	
 		
		AWS.STS.getSessionToken({}, 
			function(response) {
			alert('Success: '+ JSON.stringify(response));
			Ti.API.info(JSON.stringify(response));

			Ti.App.Properties.setString('tempSessionToken', response.GetSessionTokenResult[0].Credentials[0].SessionToken[0]);
			Ti.App.Properties.setString('tempSecretAccessKey', response.GetSessionTokenResult[0].Credentials[0].SecretAccessKey[0]);
			Ti.App.Properties.setString('tempAccessKeyID', response.GetSessionTokenResult[0].Credentials[0].AccessKeyId[0]);
			Ti.App.Properties.setString('tempExpiration', response.GetSessionTokenResult[0].Credentials[0].Expiration[0]);

			
			
		}, function(error) {
			alert('Error: '+ JSON.stringify(error));
			Ti.API.info(JSON.stringify(error));
		});

};


windowFunctions['createTable'] = function(evt) {
	
	var param = {
	"requestJSON" : {
	"TableName" : "my-ddb-test-tab-0926121",
	"KeySchema" : {
	"HashKeyElement" : {
	"AttributeName" : "name",
	"AttributeType" : "S",
	//"AttributeValue" : "pankaj"
	},
	"RangeKeyElement" : {
	"AttributeName" : "1234",
	"AttributeType" : "N",
	//"AttributeValue" : "12345"
	}
	},
	"ProvisionedThroughput" : {
	"ReadCapacityUnits" : 10,
	"WriteCapacityUnits" : 10
	}
	}
	};

AWS.DDB.createTable(param,
			
		function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['listTables'] = function(evt) {
	
	var params = {
			'requestJSON' : {}
		};
		
AWS.DDB.listTables(params,
			
		function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};


windowFunctions['putItem'] = function(evt) {
	
	var params = {
			'requestJSON' : {
				"TableName" : 'my-ddb-test-tab-0926121',
				"Item" : {
					"name" : { "S" : 'test'}, //Required
					"1234" : { "N" : "12345"}, //Required
					'testatr' : { 'S' : 'apcell tester'}
				}
			} //Required
		};
	
	
		
		AWS.DDB.putItem(params,
			
		function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};
	
windowFunctions['updateItem'] = function(evt) {	
	var params = {
				'requestJSON' : {
					"TableName" : 'my-ddb-test-tab-0926121',
					"Key" : {
						"HashKeyElement" : {
							"S" : "name"
						},
						"RangeKeyElement" : {
							"N" : "1234"
						}
					},
					"AttributeUpdates" : {
						"status" : {
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
	
		AWS.DDB.updateItem(params,
			
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};
	
	
windowFunctions['updateTable'] = function(evt) {
	
		var params = [
		'{"requestJSON" : ',
		'{"TableName" : "my-ddb-test-tab-0926121","ProvisionedThroughput" : ',
		'{"ReadCapacityUnits" : 9, "WriteCapacityUnits" : 9',
		'}}}'
		].join('');
		AWS.DDB.updateTable(JSON.parse(params),
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};
	
windowFunctions['query'] = function(evt) {	
	var params = {
			'requestJSON' : {
				"TableName" : 'my-ddb-test-tab-0926121',
				"HashKeyValue" : {
					"S" : "1"
				}
			} //Required
		};

AWS.DDB.query(params,
			
		function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};


windowFunctions['deleteItem'] = function(evt) {	
	
	var params = {
				'requestJSON' : {
					"TableName" : 'my-ddb-test-tab-0926121',
					"Key" : {
						"HashKeyElement" : {
							"S" : "test"
						},
						"RangeKeyElement" : {
							"N" : "12345"
						}
					}
				} //Required
			};
			
AWS.DDB.deleteItem(params,
			
		function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['describeTable'] = function(evt) {
	
	var params = {
			'requestJSON' : {
				"TableName" : 'my-ddb-test-tab-0926121' //Required
			}
				};
			
AWS.DDB.describeTable(params,
			
		function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};


windowFunctions['deleteTable'] = function(evt) {
	var params = {
			'requestJSON' : {
				"TableName" : 'my-ddb-test-tab-0926121' //Required
			}
				};
			
AWS.DDB.deleteTable(params,
			
		function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};


windowFunctions['batchWriteItem'] = function(evt) {
	
	var params ='{"requestJSON" : {"RequestItems": {"my-ddb-test-tab-0926121": [{"PutRequest":{"Item":{"name":{"S":"2012-04-03T11:04:47.034Z"},"1234":{"N":"6"}}}},{"DeleteRequest":{"Key":{"HashKeyElement":{"S":"1"},"RangeKeyElement":{"N":"1"}}}}], "my-ddb-test-tab": [{"PutRequest":{"Item": {"name":{"S":"Amazon DynamoDB"},"1234":{"N":"6"}}}}]}}}';
			
AWS.DDB.batchWriteItem(JSON.parse(params),
			
		function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};



windowFunctions['batchGetItem'] = function(evt) {
	
	var params = '{"requestJSON" : {"RequestItems":{"my-ddb-test-tab": {"Keys": [{"HashKeyElement": {"S":"1"}, "RangeKeyElement":{"N":"1"}}],"AttributesToGet":["item2"]},"my-ddb-test-tab-0926121": {"Keys": [{"HashKeyElement": {"S":"a"}, "RangeKeyElement":{"N":"1"}}],"AttributesToGet": ["item1"]}}}}';
			
AWS.DDB.batchGetItem(JSON.parse(params),
			
		function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['scan'] = function(evt) {
		var params = {
			'requestJSON' : {
				"TableName" : 'my-ddb-test-tab',
				"ScanFilter" : {
					"1234" : {
						"AttributeValueList" : [{
							"N" : "1"
						}],
						"ComparisonOperator" : "GT"
					}
				}
			}  //Required
		};
		AWS.DDB.scan(params, 
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};