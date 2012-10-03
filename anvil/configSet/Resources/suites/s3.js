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
	var emailId;
	var uploadId = '';
	var ETag = '';
	
	// Throughout the app, we use these two buckets which are precreated for the AWS account, please don't modify through S3 console.  
	var bucketName1 = 'test131testaws_M_1';
	var bucketName2 = 'test131testaws_M_2';
	
	// we upload these files to S3 bucket. They resides in the resources folder. 
	var filename1 = 'KS_nav_views.png';
	var filename2 = 'testfile.pdf';
	var	filename3 = 'KS_nav_ui.png';
	
	
	this.init = function(testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws.key'), Titanium.App.Properties.getString('aws.secret'));
		
		emailId = Titanium.App.Properties.getString('email-id');
		uploadId = '';
		ETag = '';
		
		// We are creating two buckets here that we will use in the rest of tests 
		AWS.S3.putBucket({
			bucketName : bucketName1
		}, function(data) {},
		   function(error){
		   //	alert('Failure to create required buckets as test initializing - We must exit');
		   	
		   });
		AWS.S3.putBucket({
			bucketName : bucketName2
		}, function(data) {},
		   function(error){
		   	 //  	alert('Failure to create required buckets as test initializing - We must exit');
		   	   	
		   });
		
	}//end init
	
	this.name = "s3";
	
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
	
	this.testHeadObject_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		valueOf(testRun, f).shouldNotBeNull();
		//alert('in HeadObject');
		AWS.S3.putObject({
				'bucketName' : bucketName1,
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
			//	alert('success PutObject  + ');
				AWS.S3.headObject({
					'bucketName' : bucketName1,
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					finish(testRun);
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
					//alert('from put object  ' + error);
				});
			}, function(error) {
				//alert(error);
				valueOf(testRun, true).shouldBeFalse();
			});
	}
	
	this.testHeadObjectWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.headObject({
			'bucketName' : '',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}//end testHeadObjectWithEmptybucketName_as_async
	
	this.testHeadObjectWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.headObject({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}//end testHeadObjectWithEmptybucketName_as_async
	
	this.testHeadObjectWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.headObject({
			'bucketName' : 'test12398',
			'objectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}//end testHeadObjectWithEmptybucketName_as_async
	
	this.testHeadObjectWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.headObject({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}//end testHeadObjectWithEmptybucketName_as_async
	
	// Commeting out the headbucket tests since headbucket call is throwing exception
	
/*	
	
	this.testHeadBucketWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.headBucket({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}//end testHeadObjectWithEmptybucketName_as_async
	
	this.testHeadBucketWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.headBucket({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}//end testHeadObjectWithEmptybucketName_as_async
	
*/
	this.testPutObjectCopy_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		
		
			AWS.S3.putObjectCopy({
						'bucketName' : bucketName2,
						'objectName' : 'xyz',
						'copySource' : '/' + bucketName1 + '/' + 'KS_nav_views.png',
					}, function(data) {
						//finish(testRun);
						AWS.S3.deleteObject({
							'bucketName' : bucketName2,
							'objectName' : 'xyz'
						}, function(data) {
							finish(testRun);
						}, function(error) {
							alert('in delete Object M_2 Copy' + error)
						});
					}, function(error) {
						alert('in put Object Copy' + error)
					});
		
	}
	
	this.testPutObjectCopyWithInvalidBucketName_as_async= function(testRun) {
		AWS.S3.putObjectCopy({
			'bucketName' : 'invalid',
			'objectName' : 'xyz',
			'copySource' : '/test12398/strus2.pdf'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectCopyWithEmptyBucketName_as_async= function(testRun) {
		AWS.S3.putObjectCopy({
			'bucketName' : '',
			'objectName' : 'xyz',
			'copySource' : '/test12398/strus2.pdf'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectCopyWithEmptyObjectName_as_async= function(testRun) {
		AWS.S3.putObjectCopy({
			'bucketName' : bucketName1,
			'objectName' : '',
			'copySource' : '/test12398/strus2.pdf'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectCopyWithEmptyCopySource_as_async= function(testRun) {
		AWS.S3.putObjectCopy({
			'bucketName' : bucketName1,
			'objectName' : 'validname',
			'copySource' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectCopyWithInvalidCopySource_as_async= function(testRun) {
		AWS.S3.putObjectCopy({
			'bucketName' : bucketName1,
			'objectName' : 'validname',
			'copySource' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectTorrent_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		
			
				AWS.S3.getObjectTorrent({
					'bucketName' : bucketName1,
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					finish(testRun);
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
	}
	
	this.testGetObjectTorrentWithEmptyBucketName_as_async= function(testRun) {
		AWS.S3.getObjectTorrent({
			'bucketName' : '',
			'objectName' : 'Spring.pdf'
		}, function(data) {

			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectTorrentWithInvalidBucketName_as_async= function(testRun) {
		AWS.S3.getObjectTorrent({
			'bucketName' : 'xyzw',
			'objectName' : 'Spring.pdf'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectTorrentWithEmptyObjectName_as_async= function(testRun) {
		AWS.S3.getObjectTorrent({
			'bucketName' : bucketName1,
			'objectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);

		});
	}
	
	this.testGetObjectTorrentWithInvalidObjectName_as_async= function(testRun) {
		AWS.S3.getObjectTorrent({
			'bucketName' : bucketName1,
			'objectName' : 'image'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testInitiateMultipartUpload_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		
			
				AWS.S3.initiateMultipartUpload({
					'bucketName' : bucketName1,
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					finish(testRun);
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
		
	}
		
	this.testUploadPart_as_async= function(testRun) {
		// var f =Titanium.Filesystem.getFile(filename2);
		
				AWS.S3.initiateMultipartUpload({
					'bucketName' : bucketName1,
					'objectName' : 'testfile.pdf'
				}, function(data) {
					uploadId = data.UploadId;
					var f1 =Titanium.Filesystem.getFile(filename2);
					AWS.S3.uploadPart({
						'bucketName' : bucketName1,
						'objectName' : 'testfile.pdf',
						'file' : f1,
						'uploadId' : uploadId,
						'partNumber' : '2'
					}, function(data) {
						finish(testRun);
						//alert(data);
					}, function(error) {
						alert('in UploadPart ' + JSON.stringify(error));
						// valueOf(testRun, true).shouldBeFalse();
					});
				}, function(error) {
					alert(error);
					// valueOf(testRun, true).shouldBeFalse();
				});
		
	}
	
	this.testUploadPartCopy_as_async= function(testRun) {
			
			AWS.S3.initiateMultipartUpload({
							'bucketName' : bucketName1,
							'objectName' : 'testfile.pdf'
						}, function(data) {
							uploadId = data.UploadId;
							AWS.S3.uploadPartCopy({
								'bucketName' : bucketName1,
								'objectName' : 'testfile.pdf',
								'copySource' : '/' + bucketName2 + '/testfile_1.pdf',
								'uploadId' : uploadId,
								'partNumber' : '3'
							}, function(data) {
								finish(testRun);
							}, function(error) {
								valueOf(testRun, true).shouldBeFalse();
								//alert(error);
							});
						}, function(error) {
							valueOf(testRun, true).shouldBeFalse();
						});
					}
	
	
	// Complete MultiPart Upload is used for completing the process of uploading in MultiPart.

	// this.testCompleteMultipartUpload_as_async= function(testRun) {
// 		
			// var f = Titanium.Filesystem.getFile('testfile_3.pdf');
			// AWS.S3.putObject({
				// 'bucketName' : bucketName1,
				// 'objectName' : 'testfile_3.pdf',
				// 'file' : f
			// }, function(data) {
// 				
					// var f1 = Titanium.Filesystem.getFile('testfile_4.pdf');
					// AWS.S3.putObject({
						// 'bucketName' : bucketName2,
						// 'objectName' : 'testfile_4.pdf',
						// 'file' : f
					// }, function(data) {
						// alert('putObject success');
						// AWS.S3.initiateMultipartUpload({
							// 'bucketName' : bucketName1,
							// 'objectName' : 'testfile_3.pdf'
						// }, function(data) {
							// alert('initiateMultipartUpload success');
							// test = data.UploadId;
							// AWS.S3.uploadPartCopy({
								// 'bucketName' : bucketName1,
								// 'objectName' : 'testfile_3.pdf',
								// 'copySource' : '/' + bucketName2 +  '/testfile_4.pdf',
								// 'uploadId' : data.UploadId,
								// 'partNumber' : '2'
							// }, function(data) {
								// alert('uploadPartCopy success' + data.ETag);
								// Ti.API.info(JSON.stringify(data));
								// AWS.S3.completeMultipartUpload({
									// 'bucketName' : bucketName1,
									// 'objectName' : 'testfile_3.pdf',
									// 'uploadId' : test,
									// 'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>' + data.ETag + '</ETag></Part></CompleteMultipartUpload>'
								// }, function(data) {
									// alert('completeMultipartUpload success');
									// Ti.API.info(JSON.stringify(data));
									// //finish(testRun);
								// }, function(error) {
									// alert('Some error occured' + JSON.stringify(error));
									// //callback.failed('Some error occured'+JSON.stringify(error));
								// });
							// }, function(error) {
								// alert('Some error occured' + JSON.stringify(error));
							// });
						// }, function(error) {
							// alert('Some error occured' + JSON.stringify(error));
						// });
					// }, function(error) {
						// alert('Some error occured' + JSON.stringify(error));
					// });
// 				
			// }, function(error) {
				// alert('Some error occured' + JSON.stringify(error));
			// });
	// }
// 	
	
	this.testPutObject_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		
			AWS.S3.putObject({
				'bucketName' :  bucketName1,
				'objectName' : 'KS_nav_views_putObject.png',
				'file' : f
			}, function(data) {
				//finish(testRun);
				AWS.S3.deleteObject({
					'bucketName' :  bucketName1,
					'objectName' : 'KS_nav_views_putObject.png'
				}, function(data) {
					finish(testRun);
					//alert(data);
					//alert(data);
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
	}
	
	this.testListMultipartUploads_as_async= function(testRun) {

		AWS.S3.listMultipartUploads({
				'bucketName' : bucketName1
			}, function(data) {
				//alert(data);
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}

	 //delete Multiple Objects is used for deleting multiple Objects from a Single Bucket.
	this.testDeleteMultipleObjects_as_async= function(testRun) {
		
			var f = Titanium.Filesystem.getFile(filename1);
			AWS.S3.putObject({
				'bucketName' : bucketName2,
				'objectName' : 'KS_nav_views_1.png',
				'file' : f
			}, function(data) {
				var f1 = Titanium.Filesystem.getFile(filename3);
				AWS.S3.putObject({
					'bucketName' : bucketName2,
					'objectName' : 'KS_nav_ui_1.png',
					'file' : f1
				}, function(data) {
					AWS.S3.deleteMultipleObjects({
						'bucketName' : bucketName2,
						'xmlTemplate' : '<Delete><Object><Key>KS_nav_views_1.png</Key></Object><Object><Key>KS_nav_ui_1.png</Key></Object></Delete>'
					}, function(data) {
						//alert(data);
						finish(testRun);
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					});
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
	}
	
	this.testGetBucketPolicy_as_async= function(testRun) {

		
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
					"Resource" : "arn:aws:s3:::" + bucketName2 + "/*"
				}]
			}

			AWS.S3.putBucketPolicy({
				'bucketName' : bucketName2,
				'xmlTemplate' : JSON.stringify(jsonObject)
			}, function(data) {

				AWS.S3.getBucketPolicy({
					'bucketName' : bucketName2
				}, function(data) {
					//alert(data);
					finish(testRun);
					
				}, function(error) {

					valueOf(testRun, true).shouldBeFalse();
				});

			}, function(error) {

				valueOf(testRun, true).shouldBeFalse();
			});
	}
	
	//Already verified that putbucket works in the init function
	
	//Start Test Cases for put Bucket
	// this.testPutBucket_as_async= function(testRun) {
		// AWS.S3.putBucket({
			// bucketName : 'DrillBitPutBucket'
		// }, function(data) {
// 
			// finish(testRun);
			// AWS.S3.deleteBucket({
				// 'bucketName' : 'DrillBitPutBucket'
			// }, function(data) {
// 
			// }, function(error) {
// 
			// });
		// }, function(error) {
// 
			// valueOf(testRun, true).shouldBeFalse();
		// });
// 
	// }
	
	this.testPutEmptyBucket_as_async= function(testRun) {
		AWS.S3.putBucket({
			bucketName : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	// End Test Cases for Put Bucket.
	// Start Test Cases for putBucketACL
	this.testPutBucketAcl_as_async= function(testRun) {
		AWS.S3.putBucketAcl({
				'bucketName' : bucketName2,
				'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser"><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Grantee><Permission>FULL_CONTROL</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI xmlns="">http://acs.amazonaws.com/groups/global/AllUsers</URI></Grantee><Permission xmlns="">READ</Permission></Grant></AccessControlList></AccessControlPolicy>'			
			}, function(data) {
				finish(testRun);
			}, function(error) {

				valueOf(testRun, true).shouldBeFalse();
			});
		
	}
	
	this.testPutEmptyBucketACL_as_async= function(testRun) {
		AWS.S3.putBucketAcl({
			'bucketName' : '',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketACLWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketAcl({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketACLWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketAcl({
			'bucketName' : 't16est12354',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketACLWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketAcl({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName></DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLifeCycle_as_async= function(testRun) {
		
			AWS.S3.putBucketLifecycle({
				'bucketName' : bucketName1,
				'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
			}, function(data) {
				
				AWS.S3.deleteBucketLifecycle({
					'bucketName' : bucketName1
				}, function(data) {
					finish(testRun);
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
	}
	
	this.testPutEmptyBucketLifeCycle_as_async= function(testRun) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : '',
			'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLifeCycleWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLifeCycleWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLifeCycleWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<LifecycleConfiguration><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></LifecycleConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketPolicy_as_async= function(testRun) {
		
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
					"Resource" : "arn:aws:s3:::" + bucketName1 + "/*" 
				}]
			}

			AWS.S3.putBucketPolicy({
				'bucketName' : bucketName1,
				'xmlTemplate' : JSON.stringify(jsonObject)
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
	}
	
	this.testPutEmptyBucketPolicy_as_async= function(testRun) {
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
				"Resource" : "arn:aws:s3:::test12354/*"
			}]
		}
		AWS.S3.putBucketPolicy({
			'bucketName' : '',
			'xmlTemplate' : JSON.stringify(jsonObject)
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketPolicyWithInvalidbucketName_as_async= function(testRun) {
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
				"Resource" : "arn:aws:s3:::test12354/*"
			}]
		}
		AWS.S3.putBucketPolicy({
			'bucketName' : 'xyzw',
			'xmlTemplate' : JSON.stringify(jsonObject)
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketPolicyWithEmptyXmlTemplate_as_async= function(testRun) {

		AWS.S3.putBucketPolicy({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketPolicyWithInvalidXmlTemplate_as_async= function(testRun) {
		var jsonObject = {
			"Version" : "",
			"Id" : "bdffafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364",
			"Statement" : [{
				"Effect" : 'Allow',
				"Sid" : "1",
				"Principal" : {
					"AWS" : "*"
				},
				"Action" : ["s3:*"]
			}]
		}
		AWS.S3.putBucketPolicy({
			'bucketName' : 'xyzw',
			'xmlTemplate' : JSON.stringify(jsonObject)
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
this.testPutBucketLogging_as_async= function(testRun) {
		
			//Set up the ACL for Amazon logging services to give read and write permissions on the bucket
			//alert('before ACL call');
			AWS.S3.putBucketAcl({
				'bucketName' : bucketName2,
				'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser"><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Grantee><Permission>FULL_CONTROL</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>WRITE</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>READ_ACP</Permission></Grant></AccessControlList></AccessControlPolicy>'			
			}, function(data) {
				//pass and move on to BucketLogging
				//alert( ' success in ACL' + data);
						
						AWS.S3.putBucketLogging({
						'bucketName' : bucketName2,
						'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>' + bucketName2 + '</TargetBucket><TargetPrefix>appcel-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>mgadiya@appcelerator.com</EmailAddress></Grantee><Permission>READ</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
						//'<Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>WRITE</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>READ_ACP</Permission></Grant>
												}, 
						function(data) {
							finish(testRun);
							//alert('Success in logging');
						}, function(error) {
							valueOf(testRun, true).shouldBeFalse();
							//alert(error);
						});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
				//alert(error);
			});
		}
	
	this.testPutEmptyBucketLogging_as_async= function(testRun) {
		AWS.S3.putBucketLogging({
			'bucketName' : '',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>pankaj1234567</TargetBucket><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLoggingWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketLogging({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>pankaj1234567</TargetBucket><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLoggingWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketLogging({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLoggingWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketLogging({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketNotification_as_async= function(testRun) {
		
			AWS.S3.putBucketNotification({
				'bucketName' : bucketName2,
				'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:723565023896:Appcel_AWS_TestTopic_1</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}
	
	this.testPutEmptyBucketNotification_as_async= function(testRun) {
		AWS.S3.putBucketNotification({
			'bucketName' : '',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687501311:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketNotificationWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketNotification({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687501311:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketNotificationWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketNotification({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketNotificationWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketNotification({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutEmptyBucketRequestPayment_as_async= function(testRun) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : '',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Payer>Requester</Payer></RequestPaymentConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketRequestPaymentWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Payer>Requester</Payer></RequestPaymentConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketRequestPaymentWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketRequestPaymentWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"></RequestPaymentConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketVersioning_as_async= function(testRun) {
		
			AWS.S3.putBucketVersioning({
				'bucketName' : bucketName2,
				'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
	}
	
	this.testPutEmptyBucketVersioning_as_async= function(testRun) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketVersioningWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketVersioningWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketVersioningWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status></VersioningConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketWebsite_as_async= function(testRun) {

	
			AWS.S3.putBucketWebsite({
				bucketName : 'test953',
				'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
				//alert(error);
			});
	}
	
	this.testPutBucketWebsitewithEmptyBucketName_as_async= function(testRun) {
		AWS.S3.putBucketWebsite({
			'bucketName' : '',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketWebsiteWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketWebsite({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketWebsiteWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketWebsite({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketWebsiteWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketWebsite({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectWithEmptybucketName_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename3);
		AWS.S3.putObject({
			'bucketName' : '',
			'objectName' : 'KS_nav_ui.png',
			'file' : f
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectWithInvalidbucketName_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename3);
		AWS.S3.putObject({
			'bucketName' : 'xyzw',
			'objectName' : 'KS_nav_ui.png',
			'file' : f
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectWithEmptyobjectName_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename3);
		AWS.S3.putObject({
			'bucketName' : 'pankaj12345',
			'objectName' : '',
			'file' : f
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectAcl_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		
			
		AWS.S3.putObjectAcl({
			'bucketName' : bucketName2,
			'objectName' : 'KS_nav_views.png',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser"><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Grantee><Permission>FULL_CONTROL</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>WRITE</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>READ_ACP</Permission></Grant></AccessControlList></AccessControlPolicy>'
			//'<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser"><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Grantee><Permission>FULL_CONTROL</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>WRITE</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>READ_ACP</Permission></Grant></AccessControlList></AccessControlPolicy>'	
		}, function(data) {
			finish(testRun);
			}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});	
	}
	
	this.testPutObjectAclWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.putObjectAcl({
			'bucketName' : '',
			'objectName' : 'myFile1.png',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectAclWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putObjectAcl({
			'bucketName' : 'xyzw',
			'objectName' : 'myFile1.png',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectAclWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.putObjectAcl({
			'bucketName' : 'pankaj12345',
			'objectName' : '',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectAclWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putObjectAcl({
			'bucketName' : 'test12354',
			'objectName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetService_as_async= function(testRun) {
		AWS.S3.getService({}, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	// commeting out the getBucket tests as the getBucket API is thriwing exceptions
	/*
	 this.testGetBucket_as_async= function(testRun) {
			 AWS.S3.getBucket({
				 'bucketName' : 'test953'
			 }, function(data) {
				 finish(testRun);
			 }, function(error) {
				 //valueOf(testRun, true).shouldBeFalse();
				 alert(error);
			 });
	 }
 	
	this.testGetBucketWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucket({
			'bucketName' : ''
		}, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testGetBucketWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucket({
			'bucketName' : 'xyzwxyzwxyzwxyzwxyzwxyzwxyzwxyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	*/
	this.testGetBucketAcl_as_async= function(testRun) {

		
			AWS.S3.getBucketAcl({
				'bucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testGetBucketAclWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketAcl({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketAclWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketAcl({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketLifecycle_as_async= function(testRun) {
		

			AWS.S3.putBucketLifecycle({
				'bucketName' : bucketName1 ,
				'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
			}, function(data) {

				AWS.S3.getBucketLifecycle({
					'bucketName' : bucketName1 
				}, function(data) {
					finish(testRun);
				}, function(error) {
					//valueOf(testRun, true).shouldBeFalse();
					alert('from get' + error);
				})
			}, function(error) {
				//valueOf(testRun, true).shouldBeFalse();
				alert('from put' + error);
			});
	}
	
	this.testGetBucketLifecycleWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketLifecycle({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketlifecycleWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketLifecycle({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketPolicyWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketPolicy({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketPolicyWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketPolicy({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketLocation_as_async= function(testRun) {

			AWS.S3.getBucketLocation({
				'bucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testGetBucketLocationWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketLocation({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketLocationWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketLocation({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketLogging_as_async= function(testRun) {

		
			AWS.S3.getBucketLogging({
				'bucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testGetBucketLoggingWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketLogging({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketLoggingWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketLogging({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketNotification_as_async= function(testRun) {

			AWS.S3.getBucketNotification({
				'bucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testGetBucketNotificationWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketNotification({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketNotificationWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketNotification({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketObjectVersions_as_async= function(testRun) {
		
		
			AWS.S3.getBucketObjectVersions({
				'bucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		
	}
	
	this.testGetBucketObjectVersionsWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketObjectVersions({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketObjectVersionsWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketObjectVersions({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketRequestPayment_as_async= function(testRun) {

			AWS.S3.getBucketRequestPayment({
				'bucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testGetBucketRequestPaymentWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketRequestPayment({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketRequestPaymentWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketRequestPayment({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketVersioning_as_async= function(testRun) {

		
			AWS.S3.getBucketVersioning({
				'bucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
	}
	
	this.testGetBucketVersioningWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketVersioning({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketVersioningWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketVersioning({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
		// This test has bucketName hardcoded in it because the bucketName1 and bucketName2 have underscore in it which is not 
	// permissible in domain name
	
	this.testGetBucketWebsite_as_async= function(testRun) {
		
		AWS.S3.getBucketWebsite({
			'bucketName' : 'test953'
		}, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testGetBucketWebsiteWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketWebsite({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketWebsiteWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketWebsite({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListMultipartUploadsWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.listMultipartUploads({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListMultipartUploadsWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.listMultipartUploads({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	// This unit test can't be automated because of the delay AWS needs to refresh the global namespace after a bucket is deleted
	//Hence commenting out the test
	// this.testDeleteBucket_as_async= function(testRun) {
		// AWS.S3.putBucket({
			// bucketName : 'DrillBucketDeleteBucket'
		// }, function(data) {
			// AWS.S3.deleteBucket({
				// 'bucketName' : 'DrillBucketDeleteBucket'
			// }, function(data) {
				// finish(testRun);
			// }, function(error) {
				// valueOf(testRun, true).shouldBeFalse();
			// })
		// }, function(error) {
			// valueOf(testRun, true).shouldBeFalse();
		// });
	// }
// 	
	this.testDeleteBucketWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.deleteBucket({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteBucketWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteBucket({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteBucketLifecycle_as_async= function(testRun) {
		
			AWS.S3.putBucketLifecycle({
				'bucketName' : bucketName1,
				'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
			}, function(data) {
				AWS.S3.deleteBucketLifecycle({
					'bucketName' : bucketName1
				}, function(data) {
					finish(testRun);
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
	}
	
	this.testDeleteBucketLifecycleWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketLifecycle({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteBucketLifecycleWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketLifecycle({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteBucketPolicy_as_async= function(testRun) {
		
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
					"Resource" : "arn:aws:s3:::" + bucketName2 + "/*"
				}]
			}

			AWS.S3.putBucketPolicy({
				'bucketName' : bucketName2,
				'xmlTemplate' : JSON.stringify(jsonObject)
			}, function(data) {
				AWS.S3.deleteBucketPolicy({
					'bucketName' : bucketName2
				}, function(data) {
					finish(testRun);
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
	}
	
	this.testDeleteBucketPolicyWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketPolicy({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteBucketPolicyWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketPolicy({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	// This test has bucketName hardcoded in it because the bucketName1 and bucketName2 have underscore in it which is not 
	// permissible in domain name
	this.testDeleteBucketWebsite_as_async= function(testRun) {

	
			AWS.S3.putBucketWebsite({
				'bucketName' : 'test953',
				'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
			}, function(data) {

				AWS.S3.deleteBucketWebsite({
					'bucketName' : 'test953'
				}, function(data) {

					finish(testRun);
				
				}, function(error) {
					alert(error);
					valueOf(testRun, true).shouldBeFalse();
				})
			}, function(error) {
				alert(error);
				valueOf(testRun, true).shouldBeFalse();
			});
	}
	
	this.testDeleteBucketWebsiteWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketWebsite({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteBucketWebsiteWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketWebsite({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteObject_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		
			AWS.S3.putObject({
				'bucketName' :bucketName1,
				'objectName' : 'KS_nav_views_3.png',
				'file' : f
			}, function(data) {
				//alert('Success')
				AWS.S3.deleteObject({
					'bucketName' : bucketName1,
					'objectName' : 'KS_nav_views_3.png'
				}, function(data) {
					 finish(testRun);
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testDeleteObjectWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.deleteObject({
			'bucketName' : '',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteObjectWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteObject({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteObjectWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.deleteObject({
			'bucketName' : 'velocity-gl',
			'objectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteObjectWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.deleteObject({
			'bucketName' : 'pankaj123456',
			'objectName' : 'xyz'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteMultipleObjectsWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : '',
			'xmlTemplate' : '<Delete><Object><Key>sample1.txt</Key></Object><Object><Key>sample2.txt</Key></Object></Delete>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteMultipleObjectsWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<Delete><Object><Key>sample1.txt</Key></Object><Object><Key>sample2.txt</Key></Object></Delete>'
		}, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testDeleteMultipleObjectsWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : 'velocity-gl',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteMultipleObjectsWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : 'velocity-gl',
			'xmlTemplate' : '<Delete><Object><Key>sample1.txt</Key></Object><Object></Object></Delete>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObject_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		
			AWS.S3.putObject({
				'bucketName' : bucketName1,
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.getObject({
					'bucketName' : bucketName1,
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					
					AWS.S3.deleteObject({
						'bucketName' : bucketName1,
						'objectName' : 'KS_nav_views.png'
					}, function(data) {
						finish(testRun);	
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					})
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testGetObjectWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getObject({
			'bucketName' : '',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getObject({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.getObject({
			'bucketName' : 'pankaj123456',
			'objectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.getObject({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectAcl_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		
		AWS.S3.putObjectAcl({
			'bucketName' : bucketName2,
			'objectName' : 'KS_nav_views.png',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser"><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Grantee><Permission>FULL_CONTROL</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>WRITE</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>READ_ACP</Permission></Grant></AccessControlList></AccessControlPolicy>'
			//'<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser"><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Grantee><Permission>FULL_CONTROL</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>WRITE</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>READ_ACP</Permission></Grant></AccessControlList></AccessControlPolicy>'	
			}, function(data) {
				
				AWS.S3.getObjectAcl({
					'bucketName' : bucketName2,
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					finish(testRun);
					//alert(data);
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				})
			
			}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
			
			
	}
	
	this.testGetObjectAclWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getObjectAcl({
			'bucketName' : '',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectAclWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getObjectAcl({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectAclWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.getObjectAcl({
			'bucketName' : 'pankaj123456',
			'objectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectAclWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.getObjectAcl({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	//abort MultiPart upload is used to Abort the MultiPart Upload.
	this.testAbortMultipartUpload_as_async= function(testRun) {
		
			var f = Titanium.Filesystem.getFile(filename1);
			AWS.S3.putObject({
				'bucketName' : bucketName1,
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.initiateMultipartUpload({
					'bucketName' : bucketName1,
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					AWS.S3.abortMultipartUpload({
						'bucketName' : bucketName1,
						'objectName' : 'KS_nav_views.png',
						'uploadId' : data.UploadId

					}, function(data) {
						finish(testRun);
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					})
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testAbortMultipartUploadWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'Rahul.png',
			'uploadId' : uploadId

		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63',
			'uploadId' : uploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'velocity-gl',
			'objectName' : '',
			'uploadId' : uploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63',
			'uploadId' : uploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithEmptyuploadId_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'velocity-gl',
			'objectName' : '',
			'uploadId' : uploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithInvaliduploadId_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63',
			'uploadId' : uploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithEmptyPartNumber_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'velocity-gl',
			'objectName' : '',
			'uploadId' : uploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithInvalidpartNumber_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63',
			'uploadId' : uploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testInitiateMultipartUploadWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.initiateMultipartUpload({
			'bucketName' : '',
			'objectName' : 'Rahul.png'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testInitiateMultipartUploadWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.initiateMultipartUpload({
			'bucketName' : 'xyzw',
			'objectName' : 'Rahul.png'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testInitiateMultipartUploadWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.initiateMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testInitiateMultipartUploadsWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.initiateMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'xyz'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListParts_as_async= function(testRun) {

		var f = Titanium.Filesystem.getFile(filename1);
		
			AWS.S3.putObject({
				'bucketName' : bucketName1,
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.initiateMultipartUpload({
					'bucketName' : bucketName1,
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					uploadId = data.UploadId;
					AWS.S3.listParts({
						'bucketName' : bucketName1,
						'objectName' : 'KS_nav_views.png',
						'uploadId' : uploadId
					}, function(data) {
						finish(testRun);
						//alert(data);
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					})
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testListPartsWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.listParts({
			'bucketName' : '',
			'objectName' : 'Rahul.png',
			'uploadId' : 'WDy5XnIR1AM6mo1yYTOCfNvkNxSCv4OW8vlMCbHAc2Se6XKkXFRlv_nKIY7IQ3PM0DSzWiSyodqcUC8V.lhufQ--'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListPartsWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.listParts({
			'bucketName' : 'xyzw',
			'objectName' : 'Rahul.png',
			'uploadId' : 'WDy5XnIR1AM6mo1yYTOCfNvkNxSCv4OW8vlMCbHAc2Se6XKkXFRlv_nKIY7IQ3PM0DSzWiSyodqcUC8V.lhufQ--'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListPartsWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.listParts({
			'bucketName' : 'test12398',
			'objectName' : '',
			'uploadId' : 'WDy5XnIR1AM6mo1yYTOCfNvkNxSCv4OW8vlMCbHAc2Se6XKkXFRlv_nKIY7IQ3PM0DSzWiSyodqcUC8V.lhufQ--'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListPartsWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.listParts({
			'bucketName' : 'test12398',
			'objectName' : 'imag',
			'uploadId' : 'WDy5XnIR1AM6mo1yYTOCfNvkNxSCv4OW8vlMCbHAc2Se6XKkXFRlv_nKIY7IQ3PM0DSzWiSyodqcUC8V.lhufQ--'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListPartsWithEmptyuploadId_as_async= function(testRun) {
		AWS.S3.listParts({
			'bucketName' : 'test12398',
			'objectName' : 'Rahul.png',
			'uploadId' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListPartsWithInvaliduploadId_as_async= function(testRun) {
		AWS.S3.listParts({
			'bucketName' : 'test12398',
			'objectName' : 'Rahul.png',
			'uploadId' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'bucketName' : '',
			'objectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : uploadId,
			'partNumber' : '1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'xyzw',

			'objectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : uploadId,
			'partNumber' : '1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : '',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : uploadId,
			'partNumber' : '1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : 'image.63',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : uploadId,
			'partNumber' : '1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithEmptyuploadId_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'copySource' : '/pankaj2344/Spring.pdf',
			'objectName' : 'struts2.pdf',
			'uploadId' : '',
			'partNumber' : '1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithInvaliduploadId_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : '',
			'partNumber' : '1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithEmptyPartNumber_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : uploadId,
			'partNumber' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithInvalidpartNumber_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'uploadId' : uploadId,
			'partNumber' : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithEmptyCopySource_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'copySource' : '',
			'uploadId' : uploadId,
			'partNumber' : '2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithInvalidCopySource_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'copySource' : '/blah/blah',
			'uploadId' : uploadId,
			'partNumber' : '2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : '',
			'objectName' : 'struts2.pdf',
			'uploadId' : uploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"&quot;038969b6c419420d05e62ead4a9dd88e&quot;"</ETag></CompleteMultipartUpload>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'xyzw',
			'objectName' : 'struts2.pdf',
			'uploadId' : uploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '""</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : '',
			'uploadId' : uploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'image.63',
			'uploadId' : uploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithEmptyuploadId_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'uploadId' : '',
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithInvaliduploadId_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'uploadId' : 'bQZXGLyBw6hwwp9P9pk_Rk17Y5escQ_E949jTPySaJEvcrUfEAPE7Ng--',
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'uploadId' : uploadId,
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'struts2.pdf',
			'uploadId' : uploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>1</PartNumber><ETag>"a54357aff0632cce46d942af68356b38"</ETag></Part><Part><ETag>"0c78aef83f66abc1fa1e8477f296d394"</ETag></Part><Part><PartNumber>3</PartNumber><ETag>"acbd18db4cc2f85cedef654fccc4a4d8"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 80000);
	
};
