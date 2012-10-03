windowFunctions['verifyEmailAddress'] = function(evt) {
	

	AWS.SES.verifyEmailAddress({
		'emailAddress' : 'appcel321@gmail.com'
		}, function(response) {
			alert('Success: '+ JSON.stringify(response));
			Ti.API.info('~~~~~~~~~~~~~~~~~~~~Success: '+ JSON.stringify(response));
		}, function(error) {
			alert('Error: '+ JSON.stringify(error));
			Ti.API.info('~~~~~~~~~~~~~~~~~~~~Error: '+ JSON.stringify(error));
	
		});
};

windowFunctions['deleteVerifiedEmailAddress'] = function(evt) {
	

	AWS.SES.deleteVerifiedEmailAddress({
			'emailAddress' : 'appcel321@gmail.com'
		}, function(response) {
			alert('Success: '+ JSON.stringify(response));
			Ti.API.info('~~~~~~~~~~~~~~~~~~~~Success: '+ JSON.stringify(response));
		}, function(error) {
			alert('Error: '+ JSON.stringify(error));
			Ti.API.info('~~~~~~~~~~~~~~~~~~~~Error: '+ JSON.stringify(error));
				
		});
	

};



windowFunctions['getSendQuota'] = function(evt) {
	

	AWS.SES.getSendQuota({
		
		}, function(response) {
			alert('Success: '+ JSON.stringify(response));
			Ti.API.info('~~~~~~~~~~~~~~~~~~~~Success: '+ JSON.stringify(response));
		}, function(error) {
			alert('Error: '+ JSON.stringify(error));
			Ti.API.info('~~~~~~~~~~~~~~~~~~~~Error: '+ JSON.stringify(error));
	
		});
};

windowFunctions['getSendStatistics'] = function(evt) {
	

	AWS.SES.getSendStatistics({

		}, function(response) {
			alert('Success: '+ JSON.stringify(response));
			Ti.API.info('~~~~~~~~~~~~~~~~~~~~Success: '+ JSON.stringify(response));
		}, function(error) {
			alert('Error: '+ JSON.stringify(error));
			Ti.API.info('~~~~~~~~~~~~~~~~~~~~Error: '+ JSON.stringify(error));
	
		});
	

};
windowFunctions['listVerifiedEmailAddresses'] = function(evt) {
	

	AWS.SES.listVerifiedEmailAddresses({

		}, function(response) {
			alert('Success: '+ JSON.stringify(response));
			Ti.API.info('~~~~~~~~~~~~~~~~~~~~Success: '+ JSON.stringify(response));
		}, function(error) {
			alert('Error: '+ JSON.stringify(error));
			Ti.API.info('~~~~~~~~~~~~~~~~~~~~Error: '+ JSON.stringify(error));
	
		});
	

};
windowFunctions['sendEmail'] = function(evt) {
	

	AWS.SES.sendEmail({
			source : 'appcel321@gmail.com',
			destination : {
				to : ['etcarev@appcelerator.com'],
				cc : ['appcel321@gmail.com'],
				bcc : ['appcel321@gmail.com']
			},
			message : {
				subject : 'Hello Message',
				body : {
					text : 'Hi... This is a test message.'
				}
			}
			}, function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info('~~~~~~~~~~~~~~~~~~~~Success: '+ JSON.stringify(response));
		}, function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info('~~~~~~~~~~~~~~~~~~~~Error: '+ JSON.stringify(error));
			
		});
	

};

windowFunctions['sendRawEmail'] = function(evt) { //doesn't work
			
   // var param =  ['Received: from smtp-out.gmail.com (123.45.67.89) by',
   				// 'in.appcelerator.com (87.65.43.210); Fri, 17 Dec 2010 14:26:22',
   				// 'From: "Andrew" <appcel321@gmail.com>',
	            // 'To: "Bob" <etcarev@appcelerator.com>', 
	            // 'Date: Fri, 17 Dec 2010 14:26:21 -0800',
	            // 'Subject: Hello',
	            // 'Message-ID: <61967230-7A45-4A9D-BEC9-87CBCF2211C9@appcelerator.com>',
	            // 'Accept-Language: en-US',
	            // 'Content-Language: en-US',
	            // 'Content-Type: text/plain; charset="us-ascii"',
	            // 'Content-Transfer-Encoding: quoted-printable',
	            // 'MIME-Version: 1.0',
	            // ' ',             
	            // 'Hello, I hope you are having a good day.',                 
	            // '-Andrew'].join('\n');
	  
	  var param = [
	  				'From: appcel321@gmail.com',
					'To: etcarev@appcelerator.com',
					'Cc: appcel321@gmail.com',
					'Subject: Hello Message',
					'MIME-Version: 1.0',
					'Content-Type: text/plain; charset=UTF-8',
					'Content-Transfer-Encoding: 7bit',
					'Date: Tue, 2 Oct 2012 22:08:17 +0000',
					'Message-ID: <0000013a2385bac5-2d3d2d38-17fa-4c85-a6d4-1eec0a14a90e-000000@email.amazonses.com>',
					'X-SES-Outgoing: 199.255.192.134',
					' ',
					'Hi... This is a test message.'
	  			].join('/n');
	

	AWS.SES.sendRawEmail({
		'rawMessage' : Ti.Utils.base64encode(param)
		
		//'rawMessage' : Ti.Utils.base64encode('From:'+'appcel321@gmail.com'+'\nTo:'+'etcarev@appcelerator.com'+'\nSubject:'+'Test Email'+'\nContent-Type:'+'text/plain'+'\nMIME-Version:'+'1.0'+'/n/n')
		
		
		//'rawMessage' : ('From:'+'appcel321@gmail.com'+'\nTo:'+'etcarev@appcelerator.com'+'\nSubject:'+'Test Email'+'\nContent-Type:'+'text/plain'+'\nMIME-Version:'+'1.0'+'/n/n')				
		//'rawMessage' : ''				
		//rawMessage : {'From' : 'etcarev@appcelerator.com', 'To' : 'tcarev@appcelerator.com', 'Subject' : 'A Sample Email'}		
		},
		function(response){
			alert('Success: '+ JSON.stringify(response));
			Ti.API.info('~~~~~~~~~~~~~~~~~~~~Success: '+ JSON.stringify(response));
			
		},
		function(error){
			//alert('Error: '+ JSON.stringify(error));
			alert('error');
			Ti.API.info('~~~~~~~~~~~~~~~~~~~~Error: '+ JSON.stringify(error));
			//error handling code here.
		});
	

};
