
windowFunctions['putBucket'] = function(evt) {
	
		AWS.S3.putBucket({
				'bucketName' : 'test092612_2'
			},
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};


windowFunctions['putBucketPolicy'] = function(evt) {
		var jsonObject = {
				"Version" : "2008-10-17",
				"Id" : "bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364",
				"Statement" : [{
					"Effect" : 'Allow',
					"Sid" : "1",
					"Principal" : {
						"AWS" : "*"
					},
					"Action" : ["s3:*"],
					"Resource" : "arn:aws:s3:::test092612_2/*"
				}]
			};
			
		AWS.S3.putBucketPolicy({
			'bucketName' : 'test092612_2',
			'xmlTemplate' : JSON.stringify(jsonObject)
			},
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};




windowFunctions['putObject'] = function(evt) {
	
	
    //var f = Titanium.Filesystem.getFile('KS_nav_views.png');
	var f = Titanium.Filesystem.getFile('/Users/etcarev/sample.pdf');
	
	AWS.S3.putObject({
			'bucketName' : 'test092612_1',
			'objectName' : 'sample.pdf',
			'file' : f
			},
			function(data) {
				alert('Success: '+ JSON.stringify(data));
				Ti.API.info(JSON.stringify(data));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};

windowFunctions['getBucket'] = function(evt) {

	AWS.S3.getBucket({
			 'bucketName' : 'test092612_1'
			},
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};

windowFunctions['getObject'] = function(evt) {

	AWS.S3.getObject({
			 'bucketName' : 'test092612_1',
			 'objectName' : 'IMG_0008.JPG'
			},
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};

windowFunctions['putObjectCopy'] = function(evt) {
	
	AWS.S3.putObjectCopy({
			'bucketName' : 'test092612_1',
			'objectName' : 'IMG_0008_2.JPG',
			'copySource' : 'https://s3.amazonaws.com/test092612_1/IMG_0008.JPG'
			},
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};


windowFunctions['headObject'] = function(evt) {
	
	AWS.S3.headObject({
			'bucketName' : 'test092612_1',
			'objectName' : 'IMG_0008.JPG'
		},
			function(data) {
				alert('Success: '+ JSON.stringify(data));
				Ti.API.info(JSON.stringify(data));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});

};


windowFunctions['headBucket'] = function(evt) { 		
	
	AWS.S3.headBucket({
			'bucketName' : 'test092612_1'
		},
			 function(data) {
			 	alert('Success: '+ JSON.stringify(data));
				Ti.API.info(JSON.stringify(data));
	  	 },  function(error) {
			 	alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
		});
	
};



windowFunctions['deleteObject'] = function(evt) {
	
	AWS.S3.deleteObject({
			'bucketName' : 'test092612_1',
			'objectName' : 'sample.pdf'
			},
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};

windowFunctions['deleteMultipleObjects'] = function(evt) {
	
	AWS.S3.deleteMultipleObjects({
			'bucketName' : 'test092612_1',
			'xmlTemplate' : '<Delete><Object><Key>IMG_0008_2.JPG</Key></Object><Object><Key>test.jpg</Key></Object></Delete>'
			
			},
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};





windowFunctions['deleteBucket'] = function(evt) {
	
	AWS.S3.deleteBucket({
			'bucketName' : 'test092612_2'
			},
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};

windowFunctions['getObjectTorrent'] = function(evt) {
	
	AWS.S3.getObjectTorrent({
			'bucketName' : 'test092612_1',
			'objectName' : 'IMG_0008.JPG'
			},
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};

var uploadId;
windowFunctions['initiateMultipartUpload'] = function(evt) {
	
	AWS.S3.initiateMultipartUpload({
			'bucketName' : 'test092612_1',
			'objectName' : 'IMG_0008.JPG'
			},
			function(response) {
				uploadId = response.UploadId;
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};


windowFunctions['listParts'] = function(evt) {
	
	AWS.S3.listParts({
			'bucketName' : 'test092612_1',
			'objectName' : 'IMG_0008.JPG',
			'uploadId' : uploadId
			},
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};


windowFunctions['uploadPart'] = function(evt) { //???? doesn't return 
	
	AWS.S3.initiateMultipartUpload({
			'bucketName' : 'test092612_1',
			'objectName' : 'sample.pdf'
			},
			function(data) {
				alert('Success: '+ JSON.stringify(data));
				Ti.API.info(JSON.stringify(data));
				var uploadId = data.UploadId;
				var f1 = Titanium.Filesystem.getFile('/Users/etcarev/dl600.pdf');
				AWS.S3.uploadPart({
							'bucketName' : 'test092612_1',
							'objectName' : 'sample.pdf',
							'file' : f1,
							'uploadId' : uploadId,
							'partNumber' : '1'
							},
						function(data) {
							alert('Success: '+ JSON.stringify(data));
							Ti.API.info(JSON.stringify(response));
				
				  	},  function(error) {
							alert('Error: '+ JSON.stringify(error));
							Ti.API.info(JSON.stringify(error));
				
					});
			
	
	  	},  function(error) {
			alert('Error: '+ JSON.stringify(error));
			Ti.API.info(JSON.stringify(error));
	
		});
	
};


windowFunctions['uploadPartCopy'] = function(evt) { 
	
	AWS.S3.initiateMultipartUpload({
			'bucketName' : 'test092612_1',
			'objectName' : 'sample.pdf'
		},
		function(data) {
			// alert('Success: '+ JSON.stringify(data));
			// Ti.API.info(JSON.stringify(data));
			var uploadId = data.UploadId;
			alert(uploadId);
			AWS.S3.uploadPartCopy({
						'bucketName' : 'test092612_1',
						'objectName' : 'sample.pdf',
						'copySource' : '/test131testaws_M_1/testfile.pdf',
						'uploadId' : uploadId,
						'partNumber' : '2'
					},
				function(data) {
				alert('Success: '+ JSON.stringify(data));
				Ti.API.info(JSON.stringify(response));
				AWS.S3.completeMultipartUpload({
					'bucketName' : 'test953',
					'objectName' : 'ATC.pdf',
					'uploadId' : test,
					'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>' + data.ETag + '</ETag></Part></CompleteMultipartUpload>'
				
					},  function(error) {
				  		alert('3');
						alert('Error: '+ JSON.stringify(error));
						Ti.API.info(JSON.stringify(error));
				
		
		  			},  function(error) {
						alert('Error: '+ JSON.stringify(error));
						Ti.API.info(JSON.stringify(error));
		
				});					
				
					
				
		
		  	},  function(error) {
		  		alert('3');
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
		
			});
		

  	},  function(error) {
		alert('Error: '+ JSON.stringify(error));
		Ti.API.info(JSON.stringify(error));

	});
	
};