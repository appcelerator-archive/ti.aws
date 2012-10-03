// Some things to be aware of:
// AWS requires each bucketName to be a unique name in S3's global namespace
// Deleting bucket does not release the bucketname from the global namespace right away
// so if you create, delete, recreate in succession, it may not work
// In order to make the app work with your AWS credentials, you will have 
windowFunctions['putBucket'] = function(evt) {
	
		AWS.S3.putBucket({
		// you may need to choose diff bucketname if this one is not available 
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

// For all tests below, we will assume that bucket created above still exists. 
windowFunctions['putBucketPolicy'] = function(evt) {
		var jsonObject = {
				"Version" : "2008-10-17",
				//canonical user ID - look up your AWS account and grab one from there
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
	
	// By default Titanium will look for this file in Resources directory of example app
	// So if you decide to change the file, just make sure it exists in Resources directory
    var f = Titanium.Filesystem.getFile('KS_nav_views.png');
	
	
	AWS.S3.putObject({
			'bucketName' : 'test092612_1',
			'objectName' : 'KS_nav_views.png',
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
			 'objectName' : 'KS_nav_views.png'
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
			'copySource' : 'https://s3.amazonaws.com/test092612_1/KS_nav_views.png'
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
			'objectName' : 'KS_nav_views.png'
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
			'objectName' : 'KS_nav_views.png'
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
			'xmlTemplate' : '<Delete><Object><Key>KS_nav_views.png</Key></Object><Object><Key>test.jpg</Key></Object></Delete>'
			
			},
			function(response) {
				alert('Success: '+ JSON.stringify(response));
				Ti.API.info(JSON.stringify(response));
	
	  	},  function(error) {
				alert('Error: '+ JSON.stringify(error));
				Ti.API.info(JSON.stringify(error));
	
		});
	
};



// Please note that AWS

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
			'objectName' : 'KS_nav_views.png'
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
			'objectName' : 'KS_nav_views.png'
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
			'objectName' : 'KS_nav_views.png',
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


windowFunctions['uploadPart'] = function(evt) {
	
	AWS.S3.initiateMultipartUpload({
			'bucketName' : 'test092612_1',
			'objectName' : 'sample.pdf'
			},
			function(data) {
				alert('Success: '+ JSON.stringify(data));
				Ti.API.info(JSON.stringify(data));
				var uploadId = data.UploadId;
				var f1 = Titanium.Filesystem.getFile('testfile.pdf');
				AWS.S3.uploadPart({
							'bucketName' : 'test092612_1',
							'objectName' : 'testfile.pdf',
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
			'objectName' : 'testfile_2.pdf'
		},
		function(data) {
			// alert('Success: '+ JSON.stringify(data));
			// Ti.API.info(JSON.stringify(data));
			var uploadId = data.UploadId;
			alert(uploadId);
			AWS.S3.uploadPartCopy({
						'bucketName' : 'test092612_1',
						'objectName' : 'testfile.pdf',
						'copySource' : '/test092612_1/testfile.pdf',
						'uploadId' : uploadId,
						'partNumber' : '2'
					},
				function(data) {
				alert('Success: '+ JSON.stringify(data));
				Ti.API.info(JSON.stringify(response));				
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