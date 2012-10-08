var arn = 'arn:aws:sns:us-east-1:723565023896:TestTopic0927121';
var sarn;
//https://sns.us-east-1.amazonaws.com/confirmation.html?TopicArn=arn:aws:sns:us-east-1:723565023896:TestTopic0927121&Token=2336412f37fb687f5d51e6e241d09c81deeb4477e44b04c066df716cb127db2cb73650e79fdf6d6f1f6677056d8650e3cdbb0d98b688c0f6307b2c29e27a8b8fbde88649f89437b97a1938b23a433c59e9fe9642da628044a290844199ac6832c206bb30267f74fc7c38875173c8e2e0bcc5824191d8ab68d8be256c76fe177c&Endpoint=appcel321@gmail.com

windowFunctions['createTopic'] = function(evt) {
	
		AWS.SNS.createTopic({
			'Name' : 'TestTopic0927121'//Required
		},
		function(response) {
		arn = response.CreateTopicResult[0].TopicArn[0];
		alert('arn'+ arn);
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['getTopicAttributes'] = function(evt) {
	

	AWS.SNS.getTopicAttributes({
		'TopicArn' : arn
	},
		function(response) {
		
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	

};

windowFunctions['listTopics'] = function(evt) {
	
		AWS.SNS.listTopics({
			
		},
		function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['subscribe'] = function(evt) {
	AWS.SNS.subscribe({
			
			 'Endpoint' : 'appcel321@gmail.com', //Required
			 'Protocol' : 'email', //Required
			 // 'Endpoint' : '', //Required
			 // 'Protocol' : 'sms', //Required
			 'TopicArn' : 'arn:aws:sns:us-east-1:723565023896:TestTopic0927121' //Required
		},
		function(data, response) {
		alert('Success: '+ JSON.stringify(data) + JSON.stringify(response));
		Ti.API.info('Success: '+ JSON.stringify(data) + JSON.stringify(response));

  	},  function(message, response) {
		
		alert('Success: '+ JSON.stringify(message) + JSON.stringify(response));
		Ti.API.info('Success: '+ JSON.stringify(message) + JSON.stringify(response));
		// alert('Error: '+ JSON.stringify(error));
		// Ti.API.info(JSON.stringify(error));

	});
	
};

//https://sns.us-east-1.amazonaws.com/confirmation.html?TopicArn=arn:aws:sns:us-east-1:723565023896:TestTopic0927121&Token=2336412f37fb687f5d51e6e241d09c8057edc37aa0d57bdd68bc66351f89e5609b5b1a1266e4eadfb319fd366f2ffecf08a767bf841cff80b1dd06b14f7173bec02aa6c6f408b18c8e8e008de0fcc8e7ef00638db38991b620cd5d38d3cb4bdd0c1a411a2afb64d68fcc0bde644c156ad4483b762f67d6537bee190e470a4044&Endpoint=appcel321@gmail.com
//https://sns.us-east-1.amazonaws.com/confirmation.html?TopicArn=arn:aws:sns:us-east-1:723565023896:TestTopic0927121&Token=2336412f37fb687f5d51e6e241d09c8057edc37583711214e77a2f7e2c5ae7a1fe66232cbf71ce540ab7d38d7f6f31326b70aef0e7d926ef3a86d8ca3e1020753f49b18738e97eecea7e4d0a1c1b18045602f0f8fb1fb718026bce590bb61f9feefd2c3e4226472950f93ff42227f8d3e52bc1db0edf2be26f9fce4ce6fbbc29&Endpoint=appcel321@gmail.com
//https://sns.us-east-1.amazonaws.com/confirmation.html?TopicArn=arn:aws:sns:us-east-1:723565023896:TestTopic0927121&Token=2336412f37fb687f5d51e6e241d09c81deeb44719844cd92553951595d1868526a3c34c763a20636c9beb7c8931b9f239ac35cc5872fe7691d67eb513577397081b1c4ae27bd2dfde908418b21f23a5dc20d5af53580cdc64d2fa40de2a0e08e72ad29a08e7d8ce34996a7a898aa43a35fbc519524789a2035de4bcc27046e61&Endpoint=appcel321@gmail.com
//https://sns.us-east-1.amazonaws.com/confirmation.html?TopicArn=arn:aws:sns:us-east-1:723565023896:TestTopic0927121&Token=2336412f37fb687f5d51e6e241d09c81deeb4476b0c5b269844f4ade83574e0298be5bad09e750a8018b911f9bffc65008a7a367585faace050f6c8addde418c8388b804957866be73bf2c32ac5032ab4026a84b1e24773c1cf3edd03548c27d63eaf20ac5f267855b7edcddbd7ade1f13664d6f559b1a95e760bbb8829ef48c&Endpoint=appcel321@gmail.com
//TopicArn=arn:aws:sns:us-east-1:723565023896:TestTopic0927121&Token=2336412f37fb687f5d51e6e241d09c81deeb4476b0c5b269868329dfacdccfbc9895d3c86c098d3256076a45206b0ad9f43afcc1f83e5d9b76280869a6328505f7caae66551104624a25314fbcb7c4e663b02b737ddf2ca7d5e032ee04ba24de49ac52101c89e42945e20727370a34d16231eef062160e504e252c16a321569c&Endpoint=appcel321@gmail.com


windowFunctions['confirmSubscription'] = function(evt) {

		AWS.SNS.confirmSubscription({
			'Token' : '2336412f37fb687f5d51e6e241d09c81deeb4477e44b04c066df716cb127db2cb73650e79fdf6d6f1f6677056d8650e3cdbb0d98b688c0f6307b2c29e27a8b8fbde88649f89437b97a1938b23a433c59e9fe9642da628044a290844199ac6832c206bb30267f74fc7c38875173c8e2e0bcc5824191d8ab68d8be256c76fe177',
			// get Token from e-mail
			'TopicArn' : 'arn:aws:sns:us-east-1:723565023896:TestTopic0927121'
			//'TopicArn' : arn
			// can get it from sns managment console or arn
		},
		function(response) {
		sarn = response.ConfirmSubscriptionResult[0].SubscriptionArn[0];
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};


windowFunctions['addPermission'] = function(evt) {

AWS.SNS.addPermission({
					'TopicArn' : arn,
					'Label' : 'MyPermission',
					'ActionName.member.1' : 'GetTopicAttributes',
					'AWSAccountId.member.1' : '723565023896'
		},
		function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};


windowFunctions['removePermission'] = function(evt) {
	
	AWS.SNS.removePermission({
		'Label' : 'MyPermission',
		'TopicArn' : arn,
	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));
	});
	win.open();

};


windowFunctions['getSubscriptionAttributes'] = function(evt) {
	

	AWS.SNS.getSubscriptionAttributes({
		'SubscriptionArn' : sarn
	},
		function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['listSubscriptions'] = function(evt) {
	

	AWS.SNS.listSubscriptions({

	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});

};

windowFunctions['listSubscriptionsByTopic'] = function(evt) {
	

	AWS.SNS.listSubscriptionsByTopic({
		'TopicArn' : arn
	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(message, response) {
		alert('Error: '+ JSON.stringify(message) + JSON.stringify(response));
		Ti.API.info('Error: '+ JSON.stringify(message) + JSON.stringify(response));
	});
	win.open();

};

windowFunctions['unsubscribe'] = function(evt) {
	
	AWS.SNS.unsubscribe({
		'SubscriptionArn' : sarn
	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});

};


windowFunctions['publish'] = function(evt) {
	

	AWS.SNS.publish({
		'TopicArn' : arn,
		'Message' : 'Hello,Test this side'
	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	

};




windowFunctions['deleteTopic'] = function(evt) {
	

	AWS.SNS.deleteTopic({
		'TopicArn' : arn
	}, function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});

};


windowFunctions['setSubscriptionAttributes'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);
	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	AWS.SNS.setSubscriptionAttributes({
		'AttributeName' : '',//DeliveryPolicy
		'AttributeValue' : '',
		'SubscriptionArn' : ''
	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
windowFunctions['setTopicAttributes'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	AWS.SNS.setTopicAttributes({
		AttributeName : '',//DisplayName
		AttributeValue : '',
		TopicArn : ''
	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};

