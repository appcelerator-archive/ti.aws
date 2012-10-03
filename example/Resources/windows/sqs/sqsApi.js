windowFunctions['createQueue'] = function(evt) {
	
	
	AWS.SQS.createQueue({
		'QueueName' : 'TestQueue676767',
		//'Label' : 'Test'
	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

	}, function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	win.open();
};


windowFunctions['Deleting Queue'] = function(evt) {

	AWS.SQS.deleteQueue({
	'QueueName' : 'TestQueue676767',
	'AWSAccountId' : awsAccountId
	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

	}, function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});

};


windowFunctions['listQueues'] = function(evt) {
	
	AWS.SQS.listQueues({
		
	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

	}, function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};


windowFunctions['getQueueUrl'] = function(evt) {
	
	AWS.SQS.getQueueUrl({
		'QueueName' : 'TestQueue676767'
	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

	}, function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['Add Permission'] = function(evt) {
	
	
	AWS.SQS.addPermission({
		
		'QueueName' : 'TestQueue676767',
		'AWSAccountId' : awsAccountId,
		'Label' : 'AddPermissionTest',
		'AWSAccountId.1' : '723565023896',
		'ActionName.1' : 'SendMessage'
		
		
		}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

		}, function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};
		

windowFunctions['Remove Permission'] = function(evt) {
	
		AWS.SQS.removePermission({
			'QueueName' : 'TestQueue676767',
			'AWSAccountId' : awsAccountId,
			'Label' : 'AddPermissionTest'
			}, function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
		
				}, function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
		
			});
	
};
			
		



windowFunctions['setQueueAttributes'] = function(evt) {
	
	AWS.SQS.setQueueAttributes({
		'AWSAccountId':awsAccountId,
		'QueueName': 'TestQueue676767',
		'Attribute.Name':'VisibilityTimeout',
		'Attribute.Value':'35'
	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

	}, function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};


windowFunctions['getQueueAttributes'] = function(evt) {
	
	AWS.SQS.getQueueAttributes({
		'AWSAccountId':awsAccountId,
		'QueueName': 'TestQueue676767',
		'AttributeName.1' : 'All'
		
	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

	}, function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['sendMessage'] = function(evt) {
	
	AWS.SQS.sendMessage({
		'AWSAccountId':awsAccountId,
		'QueueName': 'TestQueue676767',
		'MessageBody' : 'This is test message in SQS.'
		
	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

	}, function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['sendMessageBatch'] = function(evt) {
	
	AWS.SQS.sendMessageBatch({
		'AWSAccountId':awsAccountId,
		'QueueName': 'TestQueue676767',
		'SendMessageBatchRequestEntry.1.Id' : 'test_msg_092512',
		'SendMessageBatchRequestEntry.1.MessageBody' : 'This is testApp Test Cases Message Body'
		
	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

	}, function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};



windowFunctions['receiveMessage'] = function(evt) {
	var paramsxx = {
		'AWSAccountId': awsAccountId,
		'QueueName': 'TestQueue676767'
	};
	
	AWS.SQS.receiveMessage(paramsxx,
		// {
		// 'AWSAccountId':awsAccountId,
		// 'QueueName': 'TestQueue676767'
		// },
		
		function(response) {
		
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

	}, function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['deleteMessage'] = function(evt) {
	
	var paramsxx = {
		'AWSAccountId': awsAccountId,
		'QueueName': 'TestQueue676767'
	};
	
	AWS.SQS.receiveMessage(paramsxx,
			
		function(response) {
			var recieptHandle = response.ReceiveMessageResult[0].Message[0].ReceiptHandle[0];
			
			AWS.SQS.deleteMessage({
			'AWSAccountId': awsAccountId,
			'QueueName': 'TestQueue676767',
			'ReceiptHandle' : recieptHandle
				},
					
					function(response) {
					alert('Success. Message deleted: '+ JSON.stringify(response));
					Ti.API.info(JSON.stringify(response));
			
				}, function(error) {
					alert('Error from deleteMessage: '+ JSON.stringify(error));
					Ti.API.info(JSON.stringify(error));
			
				});

	}, function(error) {
		 alert('Error from receiveMessage: '+ JSON.stringify(error));
		 Ti.API.info(JSON.stringify(error));

	});
		
};

windowFunctions['deleteMessageBatch'] = function(evt) {
		var paramsxx = {
		'AWSAccountId': awsAccountId,
		'QueueName': 'TestQueue676767'
	};
	
	AWS.SQS.receiveMessage(paramsxx,
			
		function(response) {
			var recieptHandle = response.ReceiveMessageResult[0].Message[0].ReceiptHandle[0];
			
			AWS.SQS.deleteMessageBatch({
			'AWSAccountId': awsAccountId,
			'QueueName': 'TestQueue676767',
			'DeleteMessageBatchRequestEntry.1.Id' : 'testdelete',
			'ReceiptHandle' : recieptHandle
					},
						
						function(response) {
						alert('Success. Message Batch deleted: '+ JSON.stringify(response));
						Ti.API.info(JSON.stringify(response));
				
					}, function(error) {
						alert('Error from deleteMessageBatch: '+ JSON.stringify(error));
						Ti.API.info(JSON.stringify(error));
				
					});

	}, function(error) {
		 alert('Error from receiveMessage: '+ JSON.stringify(error));
		 Ti.API.info(JSON.stringify(error));

	});
		
};
	
windowFunctions['changeMessageVisibility'] = function(evt) {	
	var paramsxx = {
		'AWSAccountId': awsAccountId,
		'QueueName': 'TestQueue676767'
	};
	
	AWS.SQS.receiveMessage(paramsxx,
			
		function(response) {
			var recieptHandle = response.ReceiveMessageResult[0].Message[0].ReceiptHandle[0];
			
			AWS.SQS.changeMessageVisibility({
					'AWSAccountId': awsAccountId,
					'QueueName': 'TestQueue676767',
					'VisibilityTimeout' : '9000',
					'ReceiptHandle' : recieptHandle
					},
					
					function(response) {
						alert('Success. changeMessageVisibility: '+ JSON.stringify(response));
						Ti.API.info(JSON.stringify(response));
			
				 }, function(error) {
						alert('Error from changeMessageVisibility: '+ JSON.stringify(error));
						Ti.API.info(JSON.stringify(error));
			
				});

	}, function(error) {
		 alert('Error from receiveMessage: '+ JSON.stringify(error));
		 Ti.API.info(JSON.stringify(error));

	});
		
};

windowFunctions['changeMessageVisibilityBatch'] = function(evt) {	
	var paramsxx = {
		'AWSAccountId': awsAccountId,
		'QueueName': 'TestQueue676767'
	};
	
	AWS.SQS.receiveMessage(paramsxx,
			
		function(response) {
			var recieptHandle = response.ReceiveMessageResult[0].Message[0].ReceiptHandle[0];
			
			AWS.SQS.changeMessageVisibilityBatch({
					'AWSAccountId': awsAccountId,
					'QueueName': 'TestQueue676767',
					'ChangeMessageVisibilityBatchRequestEntry.1.Id' : 'testbatch1',
					'ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle' : recieptHandle,
					'ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout' : '7000'
					
				},
					
					function(response) {
					alert('Success. changeMessageVisibilityBatch: '+ JSON.stringify(response));
					Ti.API.info(JSON.stringify(response));
			
				}, function(error) {
					alert('Error from changeMessageVisibilityBatch: '+ JSON.stringify(error));
					Ti.API.info(JSON.stringify(error));
			
				});

	}, function(error) {
		 alert('Error from receiveMessage: '+ JSON.stringify(error));
		 Ti.API.info(JSON.stringify(error));

	});
		
};



