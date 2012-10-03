var arn;
var sarn;


windowFunctions['createTopic'] = function(evt) {
	
		AWS.SNS.createTopic({
			'Name' : 'TestTopic0927121'//Required
		},
		function(response) {
		arn = response.CreateTopicResult[0].TopicArn[0];
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
			 'TopicArn' : 'arn:aws:sns:us-east-1:723565023896:TestTopic0927121' //Required
		},
		function(response) {
		alert('Success: '+ JSON.stringify(response));
		Ti.API.info(JSON.stringify(response));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

//https://sns.us-east-1.amazonaws.com/confirmation.html?TopicArn=arn:aws:sns:us-east-1:723565023896:TestTopic0927121&Token=2336412f37fb687f5d51e6e241d09c8057edc37aa0d57bdd68bc66351f89e5609b5b1a1266e4eadfb319fd366f2ffecf08a767bf841cff80b1dd06b14f7173bec02aa6c6f408b18c8e8e008de0fcc8e7ef00638db38991b620cd5d38d3cb4bdd0c1a411a2afb64d68fcc0bde644c156ad4483b762f67d6537bee190e470a4044&Endpoint=appcel321@gmail.com
//https://sns.us-east-1.amazonaws.com/confirmation.html?TopicArn=arn:aws:sns:us-east-1:723565023896:TestTopic0927121&Token=2336412f37fb687f5d51e6e241d09c8057edc37583711214e77a2f7e2c5ae7a1fe66232cbf71ce540ab7d38d7f6f31326b70aef0e7d926ef3a86d8ca3e1020753f49b18738e97eecea7e4d0a1c1b18045602f0f8fb1fb718026bce590bb61f9feefd2c3e4226472950f93ff42227f8d3e52bc1db0edf2be26f9fce4ce6fbbc29&Endpoint=appcel321@gmail.com
windowFunctions['confirmSubscription'] = function(evt) {

		AWS.SNS.confirmSubscription({
			'Token' : '2336412f37fb687f5d51e6e241d09c8057edc37583711214e77a2f7e2c5ae7a1fe66232cbf71ce540ab7d38d7f6f31326b70aef0e7d926ef3a86d8ca3e1020753f49b18738e97eecea7e4d0a1c1b18045602f0f8fb1fb718026bce590bb61f9feefd2c3e4226472950f93ff42227f8d3e52bc1db0edf2be26f9fce4ce6fbbc29',
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

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));
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

