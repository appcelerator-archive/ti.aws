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
	var UploadId = '';
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
		UploadId = '';
		ETag = '';
		
		// We are creating two buckets here that we will use in the rest of tests 
		AWS.S3.putBucket({
			BucketName : bucketName1
		}, function(data) {},
		   function(error){
		   //	alert('Failure to create required buckets as test initializing - We must exit');
		   	
		   });
		AWS.S3.putBucket({
			BucketName : bucketName2
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
				'BucketName' : bucketName1,
				'ObjectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
			//	alert('success PutObject  + ');
				AWS.S3.headObject({
					'BucketName' : bucketName1,
					'ObjectName' : 'KS_nav_views.png'
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
			'BucketName' : '',
			'ObjectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}//end testHeadObjectWithEmptybucketName_as_async
	
	this.testHeadObjectWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.headObject({
			'BucketName' : 'xyzw',
			'ObjectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}//end testHeadObjectWithEmptybucketName_as_async
	
	this.testHeadObjectWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.headObject({
			'BucketName' : 'test12398',
			'ObjectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}//end testHeadObjectWithEmptybucketName_as_async
	
	this.testHeadObjectWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.headObject({
			'BucketName' : 'velocity-gl',
			'ObjectName' : 'image.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}//end testHeadObjectWithEmptybucketName_as_async

	
	this.testHeadBucketWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.headBucket({
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}//end testHeadObjectWithEmptybucketName_as_async
	
	this.testHeadBucketWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.headBucket({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}//end testHeadObjectWithEmptybucketName_as_async
	

	this.testPutObjectCopy_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		
		
			AWS.S3.putObjectCopy({
						'BucketName' : bucketName2,
						'ObjectName' : 'xyz',
						'copySource' : '/' + bucketName1 + '/' + 'KS_nav_views.png',
					}, function(data) {
						//finish(testRun);
						AWS.S3.deleteObject({
							'BucketName' : bucketName2,
							'ObjectName' : 'xyz'
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
			'BucketName' : 'invalid',
			'ObjectName' : 'xyz',
			'copySource' : '/test12398/strus2.pdf'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectCopyWithEmptyBucketName_as_async= function(testRun) {
		AWS.S3.putObjectCopy({
			'BucketName' : '',
			'ObjectName' : 'xyz',
			'copySource' : '/test12398/strus2.pdf'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectCopyWithEmptyObjectName_as_async= function(testRun) {
		AWS.S3.putObjectCopy({
			'BucketName' : bucketName1,
			'ObjectName' : '',
			'copySource' : '/test12398/strus2.pdf'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectCopyWithEmptyCopySource_as_async= function(testRun) {
		AWS.S3.putObjectCopy({
			'BucketName' : bucketName1,
			'ObjectName' : 'validname',
			'copySource' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectCopyWithInvalidCopySource_as_async= function(testRun) {
		AWS.S3.putObjectCopy({
			'BucketName' : bucketName1,
			'ObjectName' : 'validname',
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
					'BucketName' : bucketName1,
					'ObjectName' : 'KS_nav_views.png'
				}, function(data) {
					finish(testRun);
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
	}
	
	this.testGetObjectTorrentWithEmptyBucketName_as_async= function(testRun) {
		AWS.S3.getObjectTorrent({
			'BucketName' : '',
			'ObjectName' : 'Spring.pdf'
		}, function(data) {

			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectTorrentWithInvalidBucketName_as_async= function(testRun) {
		AWS.S3.getObjectTorrent({
			'BucketName' : 'xyzw',
			'ObjectName' : 'Spring.pdf'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectTorrentWithEmptyObjectName_as_async= function(testRun) {
		AWS.S3.getObjectTorrent({
			'BucketName' : bucketName1,
			'ObjectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);

		});
	}
	
	this.testGetObjectTorrentWithInvalidObjectName_as_async= function(testRun) {
		AWS.S3.getObjectTorrent({
			'BucketName' : bucketName1,
			'ObjectName' : 'image'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testInitiateMultipartUpload_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		
			
				AWS.S3.initiateMultipartUpload({
					'BucketName' : bucketName1,
					'ObjectName' : 'KS_nav_views.png'
				}, function(data) {
					finish(testRun);
				}, function(error) {
					valueOf(testRun, true).shouldBeFalse();
				});
		
	}
		
	this.testUploadPart_as_async= function(testRun) {
		// var f =Titanium.Filesystem.getFile(filename2);
		
				AWS.S3.initiateMultipartUpload({
					'BucketName' : bucketName1,
					'ObjectName' : 'testfile.pdf'
				}, function(data) {
					UploadId = data.UploadId;
					var f1 =Titanium.Filesystem.getFile(filename2);
					AWS.S3.uploadPart({
						'BucketName' : bucketName1,
						'ObjectName' : 'testfile.pdf',
						'file' : f1,
						'UploadId' : UploadId,
						'PartNumber' : '2'
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
							'BucketName' : bucketName1,
							'ObjectName' : 'testfile.pdf'
						}, function(data) {
							UploadId = data.UploadId;
							AWS.S3.uploadPartCopy({
								'BucketName' : bucketName1,
								'ObjectName' : 'testfile.pdf',
								'copySource' : '/' + bucketName2 + '/testfile_1.pdf',
								'UploadId' : UploadId,
								'PartNumber' : '3'
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
	
	 this.testCompleteMultipartUpload_as_async= function(testRun) {
 		
			 var f = Titanium.Filesystem.getFile('testfile_3.pdf');
			 AWS.S3.putObject({
				 'BucketName' : bucketName1,
				 'ObjectName' : 'testfile_3.pdf',
				 'file' : f
			 }, function(data) {
 				
					 var f1 = Titanium.Filesystem.getFile('testfile_4.pdf');
					 AWS.S3.putObject({
						 'BucketName' : bucketName2,
						 'ObjectName' : 'testfile_4.pdf',
						 'file' : f
					 }, function(data) {
						// alert('putObject success');
						 AWS.S3.initiateMultipartUpload({
							 'BucketName' : bucketName1,
							 'ObjectName' : 'testfile_3.pdf'
						 }, function(data) {
							// alert('initiateMultipartUpload success');
							 test = data.UploadId;
							 AWS.S3.uploadPartCopy({
								 'BucketName' : bucketName1,
								 'ObjectName' : 'testfile_3.pdf',
								 'copySource' : '/' + bucketName2 +  '/testfile_4.pdf',
								 'UploadId' : data.UploadId,
								 'PartNumber' : '2'
							 }, function(data) {
								// alert('uploadPartCopy success' + data.ETag);
								 Ti.API.info(JSON.stringify(data));
								 AWS.S3.completeMultipartUpload({
									 'BucketName' : bucketName1,
									 'ObjectName' : 'testfile_3.pdf',
									 'UploadId' : test,
									 'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>' + data.ETag + '</ETag></Part></CompleteMultipartUpload>'
								 }, function(data) {
									 alert('completeMultipartUpload success' + data);
									 Ti.API.info(JSON.stringify(data));
									 finish(testRun);
								 }, function(error) {
									 //alert('Some error occured' + JSON.stringify(error));
									valueOf(testRun, true).shouldBeFalse();
								 });
							 }, function(error) {
								 //alert('Some error occured' + JSON.stringify(error));
								 valueOf(testRun, true).shouldBeFalse();
							 });
						 }, function(error) {
							 // alert('Some error occured' + JSON.stringify(error));
							 valueOf(testRun, true).shouldBeFalse();
						 });
					 }, function(error) {
						 // alert('Some error occured' + JSON.stringify(error));
						 valueOf(testRun, true).shouldBeFalse();
					 });
 				
			 }, function(error) {
				 // alert('Some error occured' + JSON.stringify(error));
				 valueOf(testRun, true).shouldBeFalse();
			 });
	 }
 	
	
	this.testPutObject_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		
			AWS.S3.putObject({
				'BucketName' :  bucketName1,
				'ObjectName' : 'KS_nav_views_putObject.png',
				'file' : f
			}, function(data) {
				//finish(testRun);
				AWS.S3.deleteObject({
					'BucketName' :  bucketName1,
					'ObjectName' : 'KS_nav_views_putObject.png'
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
				'BucketName' : bucketName1
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
				'BucketName' : bucketName2,
				'ObjectName' : 'KS_nav_views_1.png',
				'file' : f
			}, function(data) {
				var f1 = Titanium.Filesystem.getFile(filename3);
				AWS.S3.putObject({
					'BucketName' : bucketName2,
					'ObjectName' : 'KS_nav_ui_1.png',
					'file' : f1
				}, function(data) {
					AWS.S3.deleteMultipleObjects({
						'BucketName' : bucketName2,
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
				'BucketName' : bucketName2,
				'xmlTemplate' : JSON.stringify(jsonObject)
			}, function(data) {

				AWS.S3.getBucketPolicy({
					'BucketName' : bucketName2
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
			// BucketName : 'DrillBitPutBucket'
		// }, function(data) {
// 
			// finish(testRun);
			// AWS.S3.deleteBucket({
				// 'BucketName' : 'DrillBitPutBucket'
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
			BucketName : ''
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
				'BucketName' : bucketName2,
				'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser"><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Grantee><Permission>FULL_CONTROL</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI xmlns="">http://acs.amazonaws.com/groups/global/AllUsers</URI></Grantee><Permission xmlns="">READ</Permission></Grant></AccessControlList></AccessControlPolicy>'			
			}, function(data) {
				finish(testRun);
			}, function(error) {

				valueOf(testRun, true).shouldBeFalse();
			});
		
	}
	
	this.testPutEmptyBucketACL_as_async= function(testRun) {
		AWS.S3.putBucketAcl({
			'BucketName' : '',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketACLWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketAcl({
			'BucketName' : 'xyzw',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketACLWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketAcl({
			'BucketName' : 't16est12354',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketACLWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketAcl({
			'BucketName' : 'xyzw',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName></DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLifeCycle_as_async= function(testRun) {
		
			AWS.S3.putBucketLifecycle({
				'BucketName' : bucketName1,
				'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
			}, function(data) {
				
				AWS.S3.deleteBucketLifecycle({
					'BucketName' : bucketName1
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
			'BucketName' : '',
			'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLifeCycleWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketLifecycle({
			'BucketName' : 'xyzw',
			'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLifeCycleWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketLifecycle({
			'BucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLifeCycleWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketLifecycle({
			'BucketName' : 'xyzw',
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
				'BucketName' : bucketName1,
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
			'BucketName' : '',
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
			'BucketName' : 'xyzw',
			'xmlTemplate' : JSON.stringify(jsonObject)
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketPolicyWithEmptyXmlTemplate_as_async= function(testRun) {

		AWS.S3.putBucketPolicy({
			'BucketName' : '',
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
			'BucketName' : 'xyzw',
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
				'BucketName' : bucketName2,
				'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser"><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Grantee><Permission>FULL_CONTROL</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>WRITE</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>READ_ACP</Permission></Grant></AccessControlList></AccessControlPolicy>'			
			}, function(data) {
				//pass and move on to BucketLogging
				//alert( ' success in ACL' + data);
						
						AWS.S3.putBucketLogging({
						'BucketName' : bucketName2,
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
			'BucketName' : '',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>pankaj1234567</TargetBucket><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLoggingWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketLogging({
			'BucketName' : 'xyzw',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>pankaj1234567</TargetBucket><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLoggingWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketLogging({
			'BucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketLoggingWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketLogging({
			'BucketName' : 'xyzw',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketNotification_as_async= function(testRun) {
		
			AWS.S3.putBucketNotification({
				'BucketName' : bucketName2,
				'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:723565023896:Appcel_AWS_TestTopic_1</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}
	
	this.testPutEmptyBucketNotification_as_async= function(testRun) {
		AWS.S3.putBucketNotification({
			'BucketName' : '',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687501311:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketNotificationWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketNotification({
			'BucketName' : 'xyzw',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687501311:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketNotificationWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketNotification({
			'BucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketNotificationWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketNotification({
			'BucketName' : 'xyzw',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutEmptyBucketRequestPayment_as_async= function(testRun) {
		AWS.S3.putBucketRequestPayment({
			'BucketName' : '',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Payer>Requester</Payer></RequestPaymentConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketRequestPaymentWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketRequestPayment({
			'BucketName' : 'xyzw',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Payer>Requester</Payer></RequestPaymentConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketRequestPaymentWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketRequestPayment({
			'BucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketRequestPaymentWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketRequestPayment({
			'BucketName' : 'xyzw',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"></RequestPaymentConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketVersioning_as_async= function(testRun) {
		
			AWS.S3.putBucketVersioning({
				'BucketName' : bucketName2,
				'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
	}
	
	this.testPutEmptyBucketVersioning_as_async= function(testRun) {
		AWS.S3.putBucketVersioning({
			'BucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketVersioningWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketVersioning({
			'BucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketVersioningWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketVersioning({
			'BucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketVersioningWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketVersioning({
			'BucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status></VersioningConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketWebsite_as_async= function(testRun) {

	
			AWS.S3.putBucketWebsite({
				BucketName : 'test953',
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
			'BucketName' : '',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketWebsiteWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketWebsite({
			'BucketName' : 'xyzw',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketWebsiteWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketWebsite({
			'BucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutBucketWebsiteWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketWebsite({
			'BucketName' : 'xyzw',
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
			'BucketName' : '',
			'ObjectName' : 'KS_nav_ui.png',
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
			'BucketName' : 'xyzw',
			'ObjectName' : 'KS_nav_ui.png',
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
			'BucketName' : 'pankaj12345',
			'ObjectName' : '',
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
			'BucketName' : bucketName2,
			'ObjectName' : 'KS_nav_views.png',
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
			'BucketName' : '',
			'ObjectName' : 'myFile1.png',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectAclWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putObjectAcl({
			'BucketName' : 'xyzw',
			'ObjectName' : 'myFile1.png',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectAclWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.putObjectAcl({
			'BucketName' : 'pankaj12345',
			'ObjectName' : '',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testPutObjectAclWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putObjectAcl({
			'BucketName' : 'test12354',
			'ObjectName' : '',
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
	
	 this.testGetBucket_as_async= function(testRun) {
			 AWS.S3.getBucket({
				 'BucketName' : 'test953'
			 }, function(data) {
				 finish(testRun);
			 }, function(error) {
				 //valueOf(testRun, true).shouldBeFalse();
				 alert(error);
			 });
	 }
 	
	this.testGetBucketWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucket({
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucket({
			'BucketName' : 'xyzwxyzwxyzwxyzwxyzwxyzwxyzwxyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketAcl_as_async= function(testRun) {

		
			AWS.S3.getBucketAcl({
				'BucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testGetBucketAclWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketAcl({
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketAclWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketAcl({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketLifecycle_as_async= function(testRun) {
		

			AWS.S3.putBucketLifecycle({
				'BucketName' : bucketName1 ,
				'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
			}, function(data) {

				AWS.S3.getBucketLifecycle({
					'BucketName' : bucketName1
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
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketlifecycleWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketLifecycle({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketPolicyWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketPolicy({
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketPolicyWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketPolicy({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketLocation_as_async= function(testRun) {

			AWS.S3.getBucketLocation({
				'BucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testGetBucketLocationWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketLocation({
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketLocationWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketLocation({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketLogging_as_async= function(testRun) {

		
			AWS.S3.getBucketLogging({
				'BucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testGetBucketLoggingWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketLogging({
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketLoggingWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketLogging({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketNotification_as_async= function(testRun) {

			AWS.S3.getBucketNotification({
				'BucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testGetBucketNotificationWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketNotification({
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketNotificationWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketNotification({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketObjectVersions_as_async= function(testRun) {
		
		
			AWS.S3.getBucketObjectVersions({
				'BucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		
	}
	
	this.testGetBucketObjectVersionsWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketObjectVersions({
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketObjectVersionsWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketObjectVersions({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketRequestPayment_as_async= function(testRun) {

			AWS.S3.getBucketRequestPayment({
				'BucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
	}
	
	this.testGetBucketRequestPaymentWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketRequestPayment({
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketRequestPaymentWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketRequestPayment({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketVersioning_as_async= function(testRun) {

		
			AWS.S3.getBucketVersioning({
				'BucketName' : bucketName2
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
	}
	
	this.testGetBucketVersioningWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketVersioning({
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketVersioningWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketVersioning({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
		// This test has BucketName hardcoded in it because the bucketName1 and bucketName2 have underscore in it which is not
	// permissible in domain name
	
	this.testGetBucketWebsite_as_async= function(testRun) {
		
		AWS.S3.getBucketWebsite({
			'BucketName' : 'test953'
		}, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testGetBucketWebsiteWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketWebsite({
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetBucketWebsiteWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketWebsite({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListMultipartUploadsWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.listMultipartUploads({
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListMultipartUploadsWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.listMultipartUploads({
			'BucketName' : 'xyzw'
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
			// BucketName : 'DrillBucketDeleteBucket'
		// }, function(data) {
			// AWS.S3.deleteBucket({
				// 'BucketName' : 'DrillBucketDeleteBucket'
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
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteBucketWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteBucket({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteBucketLifecycle_as_async= function(testRun) {
		
			AWS.S3.putBucketLifecycle({
				'BucketName' : bucketName1,
				'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
			}, function(data) {
				AWS.S3.deleteBucketLifecycle({
					'BucketName' : bucketName1
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
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteBucketLifecycleWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketLifecycle({
			'BucketName' : 'xyzw'
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
				'BucketName' : bucketName2,
				'xmlTemplate' : JSON.stringify(jsonObject)
			}, function(data) {
				AWS.S3.deleteBucketPolicy({
					'BucketName' : bucketName2
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
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteBucketPolicyWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketPolicy({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	// This test has BucketName hardcoded in it because the bucketName1 and bucketName2 have underscore in it which is not
	// permissible in domain name
	this.testDeleteBucketWebsite_as_async= function(testRun) {

	
			AWS.S3.putBucketWebsite({
				'BucketName' : 'test953',
				'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
			}, function(data) {

				AWS.S3.deleteBucketWebsite({
					'BucketName' : 'test953'
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
			'BucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteBucketWebsiteWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketWebsite({
			'BucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteObject_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		
			AWS.S3.putObject({
				'BucketName' :bucketName1,
				'ObjectName' : 'KS_nav_views_3.png',
				'file' : f
			}, function(data) {
				//alert('Success')
				AWS.S3.deleteObject({
					'BucketName' : bucketName1,
					'ObjectName' : 'KS_nav_views_3.png'
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
			'BucketName' : '',
			'ObjectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteObjectWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteObject({
			'BucketName' : 'xyzw',
			'ObjectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteObjectWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.deleteObject({
			'BucketName' : 'velocity-gl',
			'ObjectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteObjectWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.deleteObject({
			'BucketName' : 'pankaj123456',
			'ObjectName' : 'xyz'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteMultipleObjectsWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.deleteMultipleObjects({
			'BucketName' : '',
			'xmlTemplate' : '<Delete><Object><Key>sample1.txt</Key></Object><Object><Key>sample2.txt</Key></Object></Delete>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteMultipleObjectsWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteMultipleObjects({
			'BucketName' : 'xyzw',
			'xmlTemplate' : '<Delete><Object><Key>sample1.txt</Key></Object><Object><Key>sample2.txt</Key></Object></Delete>'
		}, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testDeleteMultipleObjectsWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.deleteMultipleObjects({
			'BucketName' : 'velocity-gl',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testDeleteMultipleObjectsWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.deleteMultipleObjects({
			'BucketName' : 'velocity-gl',
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
				'BucketName' : bucketName1,
				'ObjectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.getObject({
					'BucketName' : bucketName1,
					'ObjectName' : 'KS_nav_views.png'
				}, function(data) {
					
					AWS.S3.deleteObject({
						'BucketName' : bucketName1,
						'ObjectName' : 'KS_nav_views.png'
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
			'BucketName' : '',
			'ObjectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getObject({
			'BucketName' : 'xyzw',
			'ObjectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.getObject({
			'BucketName' : 'pankaj123456',
			'ObjectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.getObject({
			'BucketName' : 'velocity-gl',
			'ObjectName' : 'image.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectAcl_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile(filename1);
		
		AWS.S3.putObjectAcl({
			'BucketName' : bucketName2,
			'ObjectName' : 'KS_nav_views.png',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser"><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Grantee><Permission>FULL_CONTROL</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>WRITE</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>READ_ACP</Permission></Grant></AccessControlList></AccessControlPolicy>'
			//'<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser"><ID>440390190d411a6be128269cc1ff8db1694bec5fa9c198e8c7d941065eb711ad</ID></Grantee><Permission>FULL_CONTROL</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>WRITE</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group"><URI>http://acs.amazonaws.com/groups/s3/LogDelivery</URI></Grantee><Permission>READ_ACP</Permission></Grant></AccessControlList></AccessControlPolicy>'	
			}, function(data) {
				
				AWS.S3.getObjectAcl({
					'BucketName' : bucketName2,
					'ObjectName' : 'KS_nav_views.png'
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
			'BucketName' : '',
			'ObjectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectAclWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getObjectAcl({
			'BucketName' : 'xyzw',
			'ObjectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectAclWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.getObjectAcl({
			'BucketName' : 'pankaj123456',
			'ObjectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectAclWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.getObjectAcl({
			'BucketName' : 'velocity-gl',
			'ObjectName' : 'image.63'
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
				'BucketName' : bucketName1,
				'ObjectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.initiateMultipartUpload({
					'BucketName' : bucketName1,
					'ObjectName' : 'KS_nav_views.png'
				}, function(data) {
					AWS.S3.abortMultipartUpload({
						'BucketName' : bucketName1,
						'ObjectName' : 'KS_nav_views.png',
						'UploadId' : data.UploadId

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
			'BucketName' : 'test12398',
			'ObjectName' : 'Rahul.png',
			'UploadId' : UploadId

		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'BucketName' : 'xyzw',
			'ObjectName' : 'image.part.63',
			'UploadId' : UploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'BucketName' : 'velocity-gl',
			'ObjectName' : '',
			'UploadId' : UploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'BucketName' : 'velocity-gl',
			'ObjectName' : 'image.63',
			'UploadId' : UploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithEmptyuploadId_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'BucketName' : 'velocity-gl',
			'ObjectName' : '',
			'UploadId' : UploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithInvaliduploadId_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'BucketName' : 'velocity-gl',
			'ObjectName' : 'image.63',
			'UploadId' : UploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithEmptyPartNumber_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'BucketName' : 'velocity-gl',
			'ObjectName' : '',
			'UploadId' : UploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testAbortMultipartUploadWithInvalidpartNumber_as_async= function(testRun) {
		AWS.S3.abortMultipartUpload({
			'BucketName' : 'velocity-gl',
			'ObjectName' : 'image.63',
			'UploadId' : UploadId
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testInitiateMultipartUploadWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.initiateMultipartUpload({
			'BucketName' : '',
			'ObjectName' : 'Rahul.png'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testInitiateMultipartUploadWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.initiateMultipartUpload({
			'BucketName' : 'xyzw',
			'ObjectName' : 'Rahul.png'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testInitiateMultipartUploadWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.initiateMultipartUpload({
			'BucketName' : 'test12398',
			'ObjectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testInitiateMultipartUploadsWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.initiateMultipartUpload({
			'BucketName' : 'test12398',
			'ObjectName' : 'xyz'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListParts_as_async= function(testRun) {

		var f = Titanium.Filesystem.getFile(filename1);
		
			AWS.S3.putObject({
				'BucketName' : bucketName1,
				'ObjectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.initiateMultipartUpload({
					'BucketName' : bucketName1,
					'ObjectName' : 'KS_nav_views.png'
				}, function(data) {
					UploadId = data.UploadId;
					AWS.S3.listParts({
						'BucketName' : bucketName1,
						'ObjectName' : 'KS_nav_views.png',
						'UploadId' : UploadId
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
			'BucketName' : '',
			'ObjectName' : 'Rahul.png',
			'UploadId' : 'WDy5XnIR1AM6mo1yYTOCfNvkNxSCv4OW8vlMCbHAc2Se6XKkXFRlv_nKIY7IQ3PM0DSzWiSyodqcUC8V.lhufQ--'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListPartsWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.listParts({
			'BucketName' : 'xyzw',
			'ObjectName' : 'Rahul.png',
			'UploadId' : 'WDy5XnIR1AM6mo1yYTOCfNvkNxSCv4OW8vlMCbHAc2Se6XKkXFRlv_nKIY7IQ3PM0DSzWiSyodqcUC8V.lhufQ--'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListPartsWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.listParts({
			'BucketName' : 'test12398',
			'ObjectName' : '',
			'UploadId' : 'WDy5XnIR1AM6mo1yYTOCfNvkNxSCv4OW8vlMCbHAc2Se6XKkXFRlv_nKIY7IQ3PM0DSzWiSyodqcUC8V.lhufQ--'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListPartsWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.listParts({
			'BucketName' : 'test12398',
			'ObjectName' : 'imag',
			'UploadId' : 'WDy5XnIR1AM6mo1yYTOCfNvkNxSCv4OW8vlMCbHAc2Se6XKkXFRlv_nKIY7IQ3PM0DSzWiSyodqcUC8V.lhufQ--'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListPartsWithEmptyuploadId_as_async= function(testRun) {
		AWS.S3.listParts({
			'BucketName' : 'test12398',
			'ObjectName' : 'Rahul.png',
			'UploadId' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testListPartsWithInvaliduploadId_as_async= function(testRun) {
		AWS.S3.listParts({
			'BucketName' : 'test12398',
			'ObjectName' : 'Rahul.png',
			'UploadId' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'BucketName' : '',
			'ObjectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'UploadId' : UploadId,
			'PartNumber' : '1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'BucketName' : 'xyzw',

			'ObjectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'UploadId' : UploadId,
			'PartNumber' : '1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'BucketName' : 'test12398',
			'ObjectName' : '',
			'copySource' : '/pankaj2344/Spring.pdf',
			'UploadId' : UploadId,
			'PartNumber' : '1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'BucketName' : 'test12398',
			'ObjectName' : 'image.63',
			'copySource' : '/pankaj2344/Spring.pdf',
			'UploadId' : UploadId,
			'PartNumber' : '1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithEmptyuploadId_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'BucketName' : 'test12398',
			'copySource' : '/pankaj2344/Spring.pdf',
			'ObjectName' : 'struts2.pdf',
			'UploadId' : '',
			'PartNumber' : '1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithInvaliduploadId_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'BucketName' : 'test12398',
			'ObjectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'UploadId' : '',
			'PartNumber' : '1'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithEmptyPartNumber_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'BucketName' : 'test12398',
			'ObjectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'UploadId' : UploadId,
			'PartNumber' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithInvalidpartNumber_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'BucketName' : 'test12398',
			'ObjectName' : 'struts2.pdf',
			'copySource' : '/pankaj2344/Spring.pdf',
			'UploadId' : UploadId,
			'PartNumber' : 'xy'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithEmptyCopySource_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'BucketName' : 'test12398',
			'ObjectName' : 'struts2.pdf',
			'copySource' : '',
			'UploadId' : UploadId,
			'PartNumber' : '2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testUploadPartCopyWithInvalidCopySource_as_async= function(testRun) {
		AWS.S3.uploadPartCopy({
			'BucketName' : 'test12398',
			'ObjectName' : 'struts2.pdf',
			'copySource' : '/blah/blah',
			'UploadId' : UploadId,
			'PartNumber' : '2'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'BucketName' : '',
			'ObjectName' : 'struts2.pdf',
			'UploadId' : UploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"&quot;038969b6c419420d05e62ead4a9dd88e&quot;"</ETag></CompleteMultipartUpload>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'BucketName' : 'xyzw',
			'ObjectName' : 'struts2.pdf',
			'UploadId' : UploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '""</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'BucketName' : 'test12398',
			'ObjectName' : '',
			'UploadId' : UploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'BucketName' : 'test12398',
			'ObjectName' : 'image.63',
			'UploadId' : UploadId,
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithEmptyuploadId_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'BucketName' : 'test12398',
			'ObjectName' : 'struts2.pdf',
			'UploadId' : '',
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithInvaliduploadId_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'BucketName' : 'test12398',
			'ObjectName' : 'struts2.pdf',
			'UploadId' : 'bQZXGLyBw6hwwp9P9pk_Rk17Y5escQ_E949jTPySaJEvcrUfEAPE7Ng--',
			'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>"' + ETag + '"</ETag></Part></CompleteMultipartUpload>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'BucketName' : 'test12398',
			'ObjectName' : 'struts2.pdf',
			'UploadId' : UploadId,
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testCompleteMultipartUploadWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.completeMultipartUpload({
			'BucketName' : 'test12398',
			'ObjectName' : 'struts2.pdf',
			'UploadId' : UploadId,
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
