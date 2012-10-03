windowFunctions['List Domains'] = function (evt) {
  	
	AWS.SimpleDB.listDomains({},
		
		function(data) {
		
		alert('Success: '+ JSON.stringify(data));
		Ti.API.info(JSON.stringify(data));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
		 
};


windowFunctions['createDomain'] = function (evt) {
	
	AWS.SimpleDB.createDomain({
			DomainName : 'TestDomain0928121'
		},
		function(data) {
		
		alert('Success: '+ JSON.stringify(data));
		Ti.API.info(JSON.stringify(data));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['deleteDomain'] = function (evt) {
	
	AWS.SimpleDB.deleteDomain({
			DomainName : 'TestDomain0928121'
		},
		function(data) {
		
		alert('Success: '+ JSON.stringify(data));
		Ti.API.info(JSON.stringify(data));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};


windowFunctions['batchPutAttributes'] = function (evt) {
	
	AWS.SimpleDB.batchPutAttributes({
			DomainName : 'TestDomain0928121',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		},
		function(data) {
		
		alert('Success: '+ JSON.stringify(data));
		Ti.API.info(JSON.stringify(data));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['batchDeleteAttributes'] = function (evt) {
	
	AWS.SimpleDB.batchDeleteAttributes({
			DomainName : 'TestDomain0928121',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		},
		function(data) {
		
		alert('Success: '+ JSON.stringify(data));
		Ti.API.info(JSON.stringify(data));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};


windowFunctions['domainMetadata'] = function (evt) {
	
	AWS.SimpleDB.domainMetadata({
			DomainName : 'TestDomain0928121',
			
		},
		function(data) {
		
		alert('Success: '+ JSON.stringify(data));
		Ti.API.info(JSON.stringify(data));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['putAttributes'] = function (evt) {
	
	AWS.SimpleDB.putAttributes({
			'DomainName' : 'TestDomain0928121',
			'Attribute.1.Name' : 'testAttributeName2',
			'Attribute.1.Value' : 'testAttributeValue2',
			'ItemName' : 'testItemName2',
		},
		function(data) {
		
		alert('Success: '+ JSON.stringify(data));
		Ti.API.info(JSON.stringify(data));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};

windowFunctions['getAttributes'] = function (evt) {
	
	AWS.SimpleDB.getAttributes({
			'DomainName' : 'TestDomain0928121',
			'ItemName' : 'testItemName2',
		},
		function(data) {
		
		alert('Success: '+ JSON.stringify(data));
		Ti.API.info(JSON.stringify(data));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};


windowFunctions['select'] = function (evt) {
	
	AWS.SimpleDB.select({
			'SelectExpression' : 'select * from TestDomain0928121',
		},
		function(data) {
		
		alert('Success: '+ JSON.stringify(data));
		Ti.API.info(JSON.stringify(data));

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};