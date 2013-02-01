/**
 * Ti.Aws Module
 * Copyright (c) 2011-2013 by Appcelerator, Inc. All Rights Reserved.
 * Please see the LICENSE included with this distribution for details.
 */

module.exports = new function () {
	var finish;
	var valueOf;
	var AWS;
	var awsAccountId;
	var queuename1;
	this.init = function(testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws.key'), Titanium.App.Properties.getString('aws.secret'));
		awsAccountId = Titanium.App.Properties.getString('aws-account-id');
		queuename1 = 'Appcel_AWS_Test_queue_1';
		queuename1 = 'Appcel_AWS_Test_queue_2';
	}
	
	this.name = "sqs";
	
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
	
	/**
	 *Test case for creating queue without passing queue name
	 */
	this.testSQSCreateEmptyQueue_as_async = function(testRun) {
		var params = {
			'QueueName' : ''
		};
		AWS.SQS.createQueue(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for creating queue by passing a Invalid queue name
	 */
	this.testSQSCreateInValidQueue_as_async = function(testRun) {
		var params = {
			'QueueName' : 'Queue@@drill'// special characters not allowed
		};
		AWS.SQS.createQueue(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}

	/**
	 *Test case for creating queue by passing a valid queue name
	 *Creating Queue with valid Queue Name
	 *Deleting Queue
	 */

	this.testSQSCreateValidQueue_as_async = function(testRun) {
		var params = {
			'QueueName' : 'AnvilTestQueue1'
		};
		AWS.SQS.createQueue(params, function(data) {
			finish(testRun);
			var params = {
				'QueueName' : 'AnvilTestQueue1',
				'AWSAccountId' : awsAccountId,
			};
			AWS.SQS.deleteQueue(params, function(data) {
			}, function(error) {

			});

		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}

	//*************Create queue test cases ends**************
	//***************list queue test cases start**************
	this.testSQSlistQueues_as_async = function(testRun) {
		var params = {
			'QueueNamePrefix' : ''// its not required parameter
		};
		AWS.SQS.listQueues(params, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	//*************list queue test cases ends**************

	//***************getQueueUrl test cases start**************
	/**
	 *Test case for getting QueueUrl without passing queue name
	 */
	this.testSQSgetQueueUrlWithEmptyQueueName_as_async = function(testRun) {
		var params = {
			'QueueName' : '',
			'QueueOwnerAWSAccountId' : ''
		};
		AWS.SQS.getQueueUrl(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for getting QueueUrl with passing queue name
	 *Creating Queue to get QueueUrl
	 *Getting QueueUrl
	 *Deleting Queue
	 */
	this.testSQSgetQueueUrl_as_async = function(testRun) {
		var params = {
			'QueueName' : 'AnvilTestQueue2'

		};
		AWS.SQS.createQueue(params, function(data) {
			AWS.SQS.getQueueUrl(params, function(data) {
				finish(testRun);
				var params = {
					'QueueName' : 'AnvilTestQueue2',
					'AWSAccountId' : awsAccountId,
				};
				AWS.SQS.deleteQueue(params, function(data) {

				}, function(error) {

				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	//*************getQueueUrl test cases ends**************

	//***************addPermission test cases start**************
	/**
	 *Test case for addPermission without passing any parameter
	 */
	this.testSQSaddPermissionWithEmptyParams_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue55555',
			'Label' : '',
			'AWSAccountId.1' : '',
			'ActionName.1' : ''
		};
		AWS.SQS.addPermission(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for addPermission without passing label
	 */
	this.testSQSaddPermissionWithEmptyLabel_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue55555',
			'Label' : '', //Label is empty
			'AWSAccountId.1' : awsAccountId,
			'ActionName.1' : 'SendMessage '
		};
		AWS.SQS.addPermission(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for addPermission without passing AWSAccountId.1
	 */
	this.testSQSaddPermissionWithEmptyAWSOtherAccountId_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue55555',
			'Label' : 'addPermissiontest',
			'AWSAccountId.1' : '', //AWSOtherAccountId is empty
			'ActionName.1' : 'SendMessage'
		};
		AWS.SQS.addPermission(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for addPermission without passing ActionName
	 */
	this.testSQSaddPermissionWithEmptyActionName_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue55555',
			'Label' : 'addPermissiontest',
			'AWSAccountId.1' : awsAccountId,
			'ActionName.1' : ''//ActionName is empty
		};
		AWS.SQS.addPermission(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for addPermission with all valid parameters
	 *Creating Queue to add permission
	 *Add Permission
	 *Remove Permission
	 *Deleting Queue
	 */
	this.testSQSaddPermission_as_async = function(testRun) {
		var params = {
			'QueueName' : 'AnvilTestQueue3'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : awsAccountId,
				'QueueName' : 'AnvilTestQueue3',
				'Label' : 'AddPermissionTest',
				'AWSAccountId.1' : awsAccountId,
				'ActionName.1' : 'SendMessage'
			};
			AWS.SQS.addPermission(params, function(data) {
				var params = {
					'AWSAccountId' : awsAccountId,
					'QueueName' : 'AnvilTestQueue3',
					'Label' : 'AddPermissionTest',
				};
				finish(testRun);
				AWS.SQS.removePermission(params, function(data) {
					var params = {
						'QueueName' : 'AnvilTestQueue3'
					};
					var params = {
						'QueueName' : 'AnvilTestQueue3',
						'AWSAccountId' : awsAccountId,
					};
					AWS.SQS.deleteQueue(params, function(data) {

					}, function(error) {

					})
				}, function(error) {

				})
			}, function(error,response) {
				valueOf(testRun, true).shouldBeFalse();
				//alert(error);
			})
		}, function(error) {
			 valueOf(testRun, true).shouldBeFalse();
			//alert(error);
		});
	}
	/**
	 *Test case for addPermission with invalid Action Name
	 */
	this.testSQSaddPermissionWithInvalidActionName_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue55555',
			'Label' : 'addPermissiontest',
			'AWSAccountId.1' : awsAccountId,
			'ActionName.1' : 'SendMessageToAll'//Invalid ActionName
		};
		AWS.SQS.addPermission(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for addPermission with invalid AWSAccountId.1
	 */
	this.testSQSaddPermissionWithInvalidAWSOtherAccountId_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue55555',
			'Label' : 'addPermissiontest',
			'AWSAccountId.1' : '68210930314067', //Invalid AWSOtherAccountId
			'ActionName.1' : 'SendMessage'
		};
		AWS.SQS.addPermission(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	//*************addPermission test cases ends**************
	//***************setQueueAttributes test cases start**************
	/**
	 *Test case for setQueueAttributes without passing any parameter
	 */
	this.testSQSsetQueueAttributesWithEmptyParams_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'Attribute.Name' : '',
			'Attribute.Value' : ''
		};
		AWS.SQS.setQueueAttributes(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for setQueueAttributes without passing Attribute Name
	 */
	this.testSQSsetQueueAttributesWithEmptyAttributeName_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'Attribute.Name' : '', //Empty Attribute.Name
			'Attribute.Value' : '3000'
		};
		AWS.SQS.setQueueAttributes(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for setQueueAttributes without passing Attribute Value
	 */
	this.testSQSsetQueueAttributesWithEmptyAttributeValue_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'Attribute.Name' : 'VisibilityTimeout',
			'Attribute.Value' : ''//Empty Attribute.Value
		};
		AWS.SQS.setQueueAttributes(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for setQueueAttributes with passing Invalid Attribute Name
	 */
	this.testSQSsetQueueAttributesWithEmptyAttributeValue_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'Attribute.Name' : 'VisibilityTimeouts', //Invalid Attribute Name
			'Attribute.Value' : '35'
		};
		AWS.SQS.setQueueAttributes(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for setQueueAttributes with passing Invalid Attribute Value
	 */
	this.testSQSsetQueueAttributesWithEmptyAttributeValue_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'Attribute.Name' : 'VisibilityTimeout',
			'Attribute.Value' : '35dasda'//Invalid Attribute Value
		};
		AWS.SQS.setQueueAttributes(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for setQueueAttributes with passing all required valid parameters
	 *Creating Queue To set Attribute
	 *SetQueueAttribute
	 *Deleting Queue
	 */
	this.testSQSsetQueueAttributes_as_async = function(testRun) {
		var params = {
			'QueueName' : 'AnvilTestQueue4'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : awsAccountId,
				'QueueName' : 'AnvilTestQueue4',
				'Attribute.Name' : 'VisibilityTimeout',
				'Attribute.Value' : '3000'
			};
			AWS.SQS.setQueueAttributes(params, function(data) {
				var params = {
					'QueueName' : 'AnvilTestQueue4'
				};
				finish(testRun);
				var params = {
					'QueueName' : 'AnvilTestQueue4',
					'AWSAccountId' : awsAccountId,
				};
				AWS.SQS.deleteQueue(params, function(data) {

				}, function(error) {

				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	//*************setQueueAttributes test cases ends**************
	//***************getQueueAttributes test cases start**************
	/**
	 *Test case for getQueueAttributes without passing AttributeName
	 */
	this.testSQSgetQueueAttributesWithEmptyAttributeName_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'AttributeName.1' : ''//Empty AttributeName
		};
		AWS.SQS.getQueueAttributes(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for getQueueAttributes with Invalid AttributeName
	 */
	this.testSQSgetQueueAttributesWithEmptyAttributeName_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'AttributeName.1' : 'TestInvalid'//Invalid AttributeName
		};
		AWS.SQS.getQueueAttributes(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for getQueueAttributes with passing all parameter
	 *Creating Queue to set Attribute
	 *SetQueueAttribute to get Attribute
	 *GetQueueAttribute
	 *Delete Queue
	 */
	this.testSQSgetQueueAttributes_as_async = function(testRun) {
		var params = {
			'QueueName' : 'AnvilTestQueue5'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : awsAccountId,
				'QueueName' : 'AnvilTestQueue5',
				'Attribute.Name' : 'VisibilityTimeout',
				'Attribute.Value' : '3000'
			};
			AWS.SQS.setQueueAttributes(params, function(data) {
				var params = {
					'AWSAccountId' : awsAccountId,
					'QueueName' : 'AnvilTestQueue5',
					'AttributeName.1' : 'All'
				};
				AWS.SQS.getQueueAttributes(params, function(data) {
					var params = {
						'QueueName' : 'AnvilTestQueue5'
					};
					finish(testRun);
					var params = {
						'QueueName' : 'AnvilTestQueue5',
						'AWSAccountId' : awsAccountId,
					};
					AWS.SQS.deleteQueue(params, function(data) {

					}, function(error) {

					})
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	//*************getQueueAttributes test cases ends**************
	//***************sendMessage test cases start**************
	/**
	 *Test case for sendMessage without passing message body
	 */
	this.testSQSsendMessageWithEmptyMessageBody_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'MessageBody' : '', //Empty MessageBody
			'DelaySeconds' : ''//Not a required parameter
		};
		AWS.SQS.sendMessage(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for sendMessage with valid Parameters
	 *Create Queue to send Message
	 *Send Message
	 *Delete Queue
	 */
	this.testSQSsendMessage_as_async = function(testRun) {
		var params = {
			'QueueName' : 'AnvilTestQueue6'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : awsAccountId,
				'QueueName' : 'AnvilTestQueue6',
				'MessageBody' : 'This is test message in SQS.'
			};
			AWS.SQS.sendMessage(params, function(data) {
				var params = {
					'QueueName' : 'AnvilTestQueue6'
				};
				finish(testRun);
				var params = {
					'QueueName' : 'AnvilTestQueue6',
					'AWSAccountId' : awsAccountId,
				};
				AWS.SQS.deleteQueue(params, function(data) {

				}, function(error) {

				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	//*************sendMessage test cases ends**************

	//***************sendMessageBatch test cases start**************
	/**
	 *Test case for sendMessageBatch without passing any parameters
	 */
	this.testSQSsendMessageBatchWithEmptyParams_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'SendMessageBatchRequestEntry.1.Id' : '',
			'SendMessageBatchRequestEntry.1.MessageBody' : '',
			'SendMessageBatchRequestEntry.n.DelaySeconds' : ''
		};
		AWS.SQS.sendMessageBatch(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for sendMessageBatch without passing SendMessageBatchRequestEntryId
	 */
	this.testSQSsendMessageBatchWithEmptyEntryId_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'SendMessageBatchRequestEntry.1.Id' : '', //Empty EntryId
			'SendMessageBatchRequestEntry.1.MessageBody' : 'Test',
			'SendMessageBatchRequestEntry.n.DelaySeconds' : ''//Not a required parameter
		};
		AWS.SQS.sendMessageBatch(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for sendMessageBatch without passing SendMessageBatchRequestEntryMessageBody parameters
	 */
	this.testSQSsendMessageBatchWithEmptyMessageBody_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'SendMessageBatchRequestEntry.1.Id' : 'test_msg_1',
			'SendMessageBatchRequestEntry.1.MessageBody' : '', //Empty MessageBody
			'SendMessageBatchRequestEntry.n.DelaySeconds' : ''//Not a required parameter
		};
		AWS.SQS.sendMessageBatch(params, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	/**
	 *Test case for sendMessageBatch with passing all parameters
	 *Creating Queue
	 *SendMessageBatch
	 *Deleting Queue
	 */
	this.testSQSsendMessageBatch_as_async = function(testRun) {
		var params = {
			'QueueName' : 'AnvilTestQueue7'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : awsAccountId,
				'QueueName' : 'AnvilTestQueue7',
				'SendMessageBatchRequestEntry.1.Id' : 'test_msg_1',
				'SendMessageBatchRequestEntry.1.MessageBody' : 'This is Anvil Test Cases Message Body'

			};
			AWS.SQS.sendMessageBatch(params, function(data) {
				
				finish(testRun);
				var params = {
					'QueueName' : 'AnvilTestQueue7',
					'AWSAccountId' : awsAccountId,
				};
				AWS.SQS.deleteQueue(params, function(data) {

				}, function(error) {

				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	//*************sendMessageBatch test cases ends**************
	//*************receive Message test cases starts**************
	/**
	 *Test case for receiveMessage with valid parameters
	 *Creating Queue
	 *Send Message
	 *receive Message
	 *Delete Queue
	 */
	this.testSQSreceiveMessage_as_async = function(testRun) {

		var params = {
			'QueueName' : 'AnvilTestQueue8'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : awsAccountId,
				'QueueName' : 'AnvilTestQueue8',
				'MessageBody' : 'This is test message in SQS.'
			};
			AWS.SQS.sendMessage(params, function(data) {
				var params = {
					'AWSAccountId' : awsAccountId,
					'QueueName' : 'AnvilTestQueue8'
				};
				AWS.SQS.receiveMessage(params, function(data) {

					finish(testRun);
					var params = {
						'QueueName' : 'AnvilTestQueue8',
						'AWSAccountId' : awsAccountId,
					};
					AWS.SQS.deleteQueue(params, function(data) {

					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					})
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}

	//*************receive Message test cases ends**************
	//***************deleteMessage test cases start**************
	/**
	 *Test case for deleteMessage without passing ReceiptHandle
	 */
	this.testSQSdeleteMessageWithEmptyReceiptHandle_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : ''//Empty ReceiptHandle
		};
		AWS.SQS.deleteMessage(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for deleteMessage with passing parameters
	 *Create Queue to send message
	 *Send Message
	 *receive Message to get Receipt Handle
	 *Delete Message
	 *Delete Queue
	 */
	this.testSQSdeleteMessage_as_async = function(testRun) {
		var params = {
			'QueueName' : 'AnvilTestQueue9'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : awsAccountId,
				'QueueName' : 'AnvilTestQueue9',
				'MessageBody' : 'This is test message in SQS.'
			};
			AWS.SQS.sendMessage(params, function(data) {
				var params = {
					'AWSAccountId' : awsAccountId,
					'QueueName' : 'AnvilTestQueue9'
				};
				AWS.SQS.receiveMessage(params, function(data) {
					var receiptHandle = data.ReceiveMessageResult.Message[0].ReceiptHandle;
					var params = {
						'AWSAccountId' : awsAccountId,
						'QueueName' : 'AnvilTestQueue9',
						'ReceiptHandle' : receiptHandle
					};
					AWS.SQS.deleteMessage(params, function(data) {
						var params = {
							'QueueName' : 'AnvilTestQueue9'
						};
						finish(testRun);
						var params = {
							'QueueName' : 'AnvilTestQueue9',
							'AWSAccountId' : awsAccountId,
						};
						AWS.SQS.deleteQueue(params, function(data) {

						}, function(error) {

						})
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					})
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	/**
	 *Test case for deleteMessage with passing invalid receipt handle parameters
	 */
	this.testSQSdeleteMessageWithInvalidReceiptHandle_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : 'P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC'//Invalid ReceiptHandle
		};
		AWS.SQS.deleteMessage(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	//*************deleteMessage test cases ends**************

	//***************deleteMessageBatch test cases start**************
	/**
	 *Test case for deleteMessageBatch without passing any parameters
	 */
	this.testSQSdeleteMessageBatchWithEmptyParams_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'DeleteMessageBatchRequestEntry.1.Id' : '',
			'DeleteMessageBatchRequestEntry.1.ReceiptHandle' : ''
		};
		AWS.SQS.deleteMessageBatch(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for deleteMessageBatch without passing DeleteMessageBatchRequestEntryId parameters
	 */
	this.testSQSdeleteMessageBatchWithEmptyId_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'DeleteMessageBatchRequestEntry.1.Id' : '',
			'DeleteMessageBatchRequestEntry.1.ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9jwV7hPFUYtcKnEcboDeSpaP5yeypQxdppdDbn0QFatuSVvVSyw4kvBtpNH8pUxCaPSsX/5Xrtu/T2VHSkIC0DOHR0XupPRY0OlcjmOe0PpYFnOvNlStPL6pN0aNy8I5iwCHyZlI8ls0aAC/P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC'
		};
		AWS.SQS.deleteMessageBatch(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for deleteMessageBatch without passing DeleteMessageBatchRequestEntryReceiptHandle parameters
	 * Api's is returning success even if a parameter is missing. That's why test cases is failing
	 */
	this.testSQSdeleteMessageBatchWithEmptyReceiptHandle_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'DeleteMessageBatchRequestEntry.1.Id' : 'msg1',
			'DeleteMessageBatchRequestEntry.1.ReceiptHandle' : ''
		};
		AWS.SQS.deleteMessageBatch(params, function(data) {
			finish(testRun);
		}, function(error) {
				
		});
	}
	/**
	 *Test case for deleteMessageBatch with passing invalid DeleteMessageBatchRequestEntryReceiptHandle parameters
	 * Api's is returning success even if a parameter is invalid. That's why test cases is failing
	 */
	this.testSQSdeleteMessageBatchWithInvalidReceiptHandle_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'DeleteMessageBatchRequestEntry.1.Id' : 'msg1',
			'DeleteMessageBatchRequestEntry.1.ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9'//Invalid ReceiptHandle
		};
		AWS.SQS.deleteMessageBatch(params, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	/**
	 *Test case for deleteMessageBatch with passing all parameters
	 *Create Queue to send message
	 *Send Message
	 *receive Message to get receipt Handle
	 *Delete Message Batch
	 *Delete Queue

	 */

	this.testSQSdeleteMessageBatch_as_async = function(testRun) {
		var params = {
			'QueueName' : 'AnvilTestQueue10'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : awsAccountId,
				'QueueName' : 'AnvilTestQueue10',
				'MessageBody' : 'This is test message in SQS.'
			};
			AWS.SQS.sendMessage(params, function(data) {
				var params = {
					'AWSAccountId' : awsAccountId,
					'QueueName' : 'AnvilTestQueue10'
				};
				AWS.SQS.receiveMessage(params, function(data) {
					var receiptHandle = data.ReceiveMessageResult.Message[0].ReceiptHandle;
					var params = {
						'AWSAccountId' : awsAccountId,
						'QueueName' : 'AnvilTestQueue10',
						'DeleteMessageBatchRequestEntry.1.Id' : 'testdelete',
						'ReceiptHandle' : receiptHandle
					};
					AWS.SQS.deleteMessageBatch(params, function(data) {
						var params = {
							'QueueName' : 'AnvilTestQueue10'
						};
						finish(testRun);
						var params = {
							'QueueName' : 'AnvilTestQueue10',
							'AWSAccountId' : awsAccountId,
						};
						AWS.SQS.deleteQueue(params, function(data) {

						}, function(error) {

						})
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					})
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}

	//*************deleteMessageBatch test cases ends**************
	//***************changeMessageVisibility test cases start**************
	/**
	 *Test case for changeMessageVisibility without passing any parameters
	 */
	this.testSQSchangeMessageVisibilityWithEmptyParams_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : '',
			'VisibilityTimeout' : ''
		};
		AWS.SQS.changeMessageVisibility(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for changeMessageVisibility with passing all parameters
	 *Create Queue to send message
	 *Send Message
	 *receive Message to get receipt Handle
	 *changeMessageVisibility
	 *Delete Queue
	 */
	this.testSQSchangeMessageVisibility_as_async = function(testRun) {
		var params = {
			'QueueName' : 'AnvilTestQueue11'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : awsAccountId,
				'QueueName' : 'AnvilTestQueue11',
				'MessageBody' : 'This is test message in SQS.'
			};
			AWS.SQS.sendMessage(params, function(data) {
				var params = {
					'AWSAccountId' : awsAccountId,
					'QueueName' : 'AnvilTestQueue11'
				};
				AWS.SQS.receiveMessage(params, function(data) {
					var receiptHandle = data.ReceiveMessageResult.Message[0].ReceiptHandle;
					var params = {
						'AWSAccountId' : awsAccountId,
						'QueueName' : 'AnvilTestQueue11',
						'VisibilityTimeout' : '9000',
						'ReceiptHandle' : receiptHandle
					};
					AWS.SQS.changeMessageVisibility(params, function(data) {
						var params = {
							'QueueName' : 'AnvilTestQueue11'
						};
						finish(testRun);
						var params = {
							'QueueName' : 'AnvilTestQueue11',
							'AWSAccountId' : awsAccountId,
						};
						AWS.SQS.deleteQueue(params, function(data) {

						}, function(error) {

						})
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					})
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	/**
	 *Test case for changeMessageVisibility without passing ReceiptHandle parameters
	 */
	this.testSQSchangeMessageVisibilityWithEmptyReceiptHandle_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : '',
			'VisibilityTimeout' : '9000'
		};
		AWS.SQS.changeMessageVisibility(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for changeMessageVisibility without passing VisibilityTimeout parameters
	 */
	this.testSQSchangeMessageVisibilityWithEmptyVisibilityTimeout_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9jwV7hPFUYtcKnEcboDeSpaP5yeypQxdppdDbn0QFatuSVvVSyw4kvBtpNH8pUxCaPSsX/5Xrtu/T2VHSkIC0DOHR0XupPRY0OlcjmOe0PpYFnOvNlStPL6pN0aNy8I5iwCHyZlI8ls0aAC/P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC',
			'VisibilityTimeout' : ''
		};
		AWS.SQS.changeMessageVisibility(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for changeMessageVisibility with passing invalid ReceiptHandle parameters
	 */
	this.testSQSchangeMessageVisibilityWithInvalidReceiptHandle_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4eruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC', //Invalid ReceiptHandle
			'VisibilityTimeout' : '9000'
		};
		AWS.SQS.changeMessageVisibility(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for changeMessageVisibility with passing invalid VisibilityTimeout parameters;VisibilityTimeout must not exceed 43200
	 */
	this.testSQSchangeMessageVisibilityWithInvalidVisibilityTimeout_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9jwV7hPFUYtcKnEcboDeSpaP5yeypQxdppdDbn0QFatuSVvVSyw4kvBtpNH8pUxCaPSsX/5Xrtu/T2VHSkIC0DOHR0XupPRY0OlcjmOe0PpYFnOvNlStPL6pN0aNy8I5iwCHyZlI8ls0aAC/P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC',
			'VisibilityTimeout' : '43500'//Invalid VisibilityTimeout- must not exceed 43200
		};
		AWS.SQS.changeMessageVisibility(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	//*************changeMessageVisibility test cases ends**************

	//***************changeMessageVisibilityBatch test cases start**************
	/**
	 *Test case for changeMessageVisibilityBatch without passing any parameters
	 */
	this.testSQSchangeMessageVisibilityBatchWithEmptyParameters_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'ChangeMessageVisibilityBatchRequestEntry.1.Id' : '',
			'ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle' : '',
			'ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout' : ''
		};
		AWS.SQS.changeMessageVisibilityBatch(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for changeMessageVisibilityBatch with passing all parameters
	 *Create Queue to send message
	 *Send Message
	 *receive Message to get receipt Handle
	 *changeMessageVisibility Batch
	 *Delete Queue
	 */
	this.testSQSchangeMessageVisibilityBatch_as_async = function(testRun) {
		var params = {
			'QueueName' : 'AnvilTestQueue12'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : awsAccountId,
				'QueueName' : 'AnvilTestQueue12',
				'MessageBody' : 'This is test message in SQS.'
			};
			AWS.SQS.sendMessage(params, function(data) {
				var params = {
					'AWSAccountId' : awsAccountId,
					'QueueName' : 'AnvilTestQueue12'
				};
				AWS.SQS.receiveMessage(params, function(data) {
					var receiptHandle = data.ReceiveMessageResult.Message[0].ReceiptHandle;
					var params = {
						'AWSAccountId' : awsAccountId,
						'QueueName' : 'AnvilTestQueue12',
						'ChangeMessageVisibilityBatchRequestEntry.1.Id' : 'testbatch1',
						'ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle' : receiptHandle,
						'ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout' : '7000'
					};
					AWS.SQS.changeMessageVisibilityBatch(params, function(data) {
						var params = {
							'QueueName' : 'AnvilTestQueue12'
						};
						finish(testRun);
						var params = {
							'QueueName' : 'AnvilTestQueue12',
							'AWSAccountId' : awsAccountId,
						};
						AWS.SQS.deleteQueue(params, function(data) {

						}, function(error) {

						})
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					})
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});

	}
	/**
	 *Test case for changeMessageVisibilityBatch without passing ChangeMessageVisibilityBatchRequestEntryId parameter
	 */
	this.testSQSchangeMessageVisibilityBatchWithEmptyId_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'ChangeMessageVisibilityBatchRequestEntry.1.Id' : '',
			'ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9jwV7hPFUYtcKnEcboDeSpaP5yeypQxdppdDbn0QFatuSVvVSyw4kvBtpNH8pUxCaPSsX/5Xrtu/T2VHSkIC0DOHR0XupPRY0OlcjmOe0PpYFnOvNlStPL6pN0aNy8I5iwCHyZlI8ls0aAC/P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC',
			'ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout' : '7000'
		};
		AWS.SQS.changeMessageVisibilityBatch(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for changeMessageVisibilityBatch without passing ChangeMessageVisibilityBatchRequestEntryReceiptHandle parameter
	 */
	this.testSQSchangeMessageVisibilityBatchWithEmptyReceiptHandle_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'ChangeMessageVisibilityBatchRequestEntry.1.Id' : 'msgbatch1',
			'ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle' : '',
			'ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout' : '7000'
		};
		AWS.SQS.changeMessageVisibilityBatch(params, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	/**
	 *Test case for changeMessageVisibilityBatch with passing invalid ChangeMessageVisibilityBatchRequestEntryReceiptHandle parameter
	 */
	this.testSQSchangeMessageVisibilityBatchWithInvalidReceiptHandle_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'ChangeMessageVisibilityBatchRequestEntry.1.Id' : 'msgbatch1',
			'ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R',
			'ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout' : '7000'
		};
		AWS.SQS.changeMessageVisibilityBatch(params, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	//*************changeMessageVisibilityBatch test cases ends**************

	//***************removePermission test cases start**************
	/**
	 *Test case for removePermission without passing any parameters
	 */
	this.testSQSremovePermissionWithEmptyParams_as_async = function(testRun) {
		var params = {
			'AWSAccountId' : awsAccountId,
			'QueueName' : 'TestQueue676767',
			'Label' : ''
		};
		AWS.SQS.removePermission(params, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	/**
	 *Test case for removePermission with passing all parameters
	 *Creating Queue to add permission
	 *Adding Permission to remove permission
	 *Remove Permission
	 *Delete Queue
	 */
	this.testSQSremovePermission_as_async = function(testRun) {
		var params = {
			'QueueName' : 'AnvilTestQueue13'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : awsAccountId,
				'QueueName' : 'AnvilTestQueue13',
				'Label' : 'AddPermissionTest',
				'AWSAccountId.1' : awsAccountId,
				'ActionName.1' : 'SendMessage'
			};
			AWS.SQS.addPermission(params, function(data) {
				var params = {
					'AWSAccountId' : awsAccountId,
					'QueueName' : 'AnvilTestQueue13',
					'Label' : 'AddPermissionTest',
				};
				AWS.SQS.removePermission(params, function(data) {
					var params = {
						'QueueName' : 'AnvilTestQueue13'
					};
					finish(testRun);
					var params = {
						'QueueName' : 'AnvilTestQueue13',
						'AWSAccountId' : awsAccountId,
					};
					AWS.SQS.deleteQueue(params, function(data) {

					}, function(error) {

					})
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	//*************removePermission test cases ends**************
	//*************deleteQueue test cases ends**************
	/**
	 *Test case for deleteQueue with valid  parameters
	 */
	this.testSQSDeleteValidQueue_as_async = function(testRun) {
		var params = {
			'QueueName' : 'AnvilTestQueue14'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'QueueName' : 'AnvilTestQueue14',
				'AWSAccountId' : awsAccountId,
			};
			AWS.SQS.deleteQueue(params, function(data) {
				finish(testRun);
			}, function(error) {

			});

		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 30000);
	
};
