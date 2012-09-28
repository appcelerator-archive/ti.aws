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
	var bucketName1 = 'test131testaws_M_1';
	var bucketName2 = 'test131testaws_M_2';
	this.init = function(testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws.key'), Titanium.App.Properties.getString('aws.secret'));
		
		emailId = Titanium.App.Properties.getString('email-id');
		uploadId = '';
		ETag = '';
		AWS.S3.putBucket({
			bucketName : bucketName1
		}, function(data) {},
		   function(error){
		   });
		AWS.S3.putBucket({
			bucketName : bucketName2
		}, function(data) {},
		   function(error){
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
		var f = Titanium.Filesystem.getFile('KS_nav_views1.png');
		
		alert(Titanium.App.Properties.getString('aws.key'));
		alert(Titanium.App.Properties.getString('aws.secret'));
		alert('in call before valuof' + f);
		valueOf(testRun, f).shouldNotBeNull();
		alert('in call');	
		AWS.S3.putObject({
				'bucketName' : bucketName1,
				'objectName' : 'KS_nav_views1.png',
				'file' : f
			}, function(data) {
				AWS.S3.headObject({
					'bucketName' : bucketName1,
					'objectName' : 'KS_nav_views1.png'
				}, function(data) {
					
					AWS.S3.deleteObject({
						'bucketName' : bucketName1,
						'objectName' : 'KS_nav_views1.png'
					}, function(data) {
						
					}, function(error) {

					});
				}, function(error) {
					//valueOf(testRun, true).shouldBeFalse();
					alert('from put object  ' + error);
				});
			}, function(error) {
				alert(error);
				//valueOf(testRun, true).shouldBeFalse();
			});
	
	
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
	
	this.testPutObjectCopy_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		
		
			AWS.S3.putObjectCopy({
						'bucketName' : 'test131testaws_M_2',
						'objectName' : 'xyz',
						'copySource' : '/test131testaws_M_1/KS_nav_views1.png'
					}, function(data) {
						//finish(testRun);
						AWS.S3.deleteObject({
							'bucketName' : 'test131testaws_M_2',
							'objectName' : 'xyz'
						}, function(data) {
							AWS.S3.deleteObject({
								'bucketName' : 'test131testaws_M_1',
								'objectName' : 'KS_nav_views.png'
							}, function(data) {
								
							}, function(error) {	
								alert('in delete Object M_1 Copy' + error)
							});
						}, function(error) {
							alert('in delete Object M_2 Copy' + error)
						});
					}, function(error) {
						alert('in put Object Copy' + error)
					});
		
	}
	
	this.testputObjectCopyWithInvalidBucketName_as_async= function(testRun) {
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
	
	this.testputObjectCopyWithEmptyBucketName_as_async= function(testRun) {
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
	
	this.testputObjectCopyWithEmptyObjectName_as_async= function(testRun) {
		AWS.S3.putObjectCopy({
			'bucketName' : 'pankaj2344',
			'objectName' : '',
			'copySource' : '/test12398/strus2.pdf'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputObjectCopyWithEmptyCopySource_as_async= function(testRun) {
		AWS.S3.putObjectCopy({
			'bucketName' : 'pankaj2344',
			'objectName' : 'validname',
			'copySource' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputObjectCopyWithInvalidCopySource_as_async= function(testRun) {
		AWS.S3.putObjectCopy({
			'bucketName' : 'pankaj2344',
			'objectName' : 'validname',
			'copySource' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testGetObjectTorrent_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'test453'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'test453',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.getObjectTorrent({
					'bucketName' : 'test453',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					finish(testRun);
					AWS.S3.deleteObject({
						'bucketName' : 'test453',
						'objectName' : 'KS_nav_views.png'
					}, function(data) {
						AWS.S3.deleteBucket({
							'bucketName' : 'test453'
						}, function(data) {

						}, function(error) {

						});
					}, function(error) {

					});
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
	
	this.testgetObjectTorrentWithEmptyBucketName_as_async= function(testRun) {
		AWS.S3.getObjectTorrent({
			'bucketName' : '',
			'objectName' : 'Spring.pdf'
		}, function(data) {

			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetObjectTorrentWithInvalidBucketName_as_async= function(testRun) {
		AWS.S3.getObjectTorrent({
			'bucketName' : 'xyzw',
			'objectName' : 'Spring.pdf'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetObjectTorrentWithEmptyObjectName_as_async= function(testRun) {
		AWS.S3.getObjectTorrent({
			'bucketName' : 'pankaj2344',
			'objectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);

		});
	}
	
	this.testgetObjectTorrentWithInvalidObjectName_as_async= function(testRun) {
		AWS.S3.getObjectTorrent({
			'bucketName' : 'pankaj2344',
			'objectName' : 'image'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testInitiateMultipartUpload_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'test572'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'test572',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.initiateMultipartUpload({
					'bucketName' : 'test572',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					finish(testRun);
					AWS.S3.deleteObject({
						'bucketName' : 'test572',
						'objectName' : 'KS_nav_views.png'
					}, function(data) {
						AWS.S3.deleteBucket({
							'bucketName' : 'test572'
						}, function(data) {

						}, function(error) {

						});
					}, function(error) {

					});
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
	
	this.testUploadPart_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'test692'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'test692',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.initiateMultipartUpload({
					'bucketName' : 'test692',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					uploadId = data.UploadId;
					var f1 = Titanium.Filesystem.getFile('KS_nav_ui.png');
					AWS.S3.uploadPart({
						'bucketName' : 'test692',
						'objectName' : 'KS_nav_views.png',
						'file' : f1,
						'uploadId' : uploadId,
						'partNumber' : '2'
					}, function(data) {
						finish(testRun);
						AWS.S3.deleteObject({
							'bucketName' : 'test692',
							'objectName' : 'KS_nav_views.png'
						}, function(data) {
							AWS.S3.deleteBucket({
								'bucketName' : 'test692'
							}, function(data) {

							}, function(error) {

							});
						}, function(error) {

						});
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					});
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
	
	this.testUploadPartCopy_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'test794'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'test794',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				var f1 = Titanium.Filesystem.getFile('KS_nav_ui.png');
				AWS.S3.putBucket({
					bucketName : 'test835'
				}, function(data) {
					AWS.S3.putObject({
						'bucketName' : 'test835',
						'objectName' : 'KS_nav_ui.png',
						'file' : f1
					}, function(data) {
						AWS.S3.initiateMultipartUpload({
							'bucketName' : 'test794',
							'objectName' : 'KS_nav_views.png'
						}, function(data) {
							uploadId = data.UploadId;
							AWS.S3.uploadPartCopy({
								'bucketName' : 'test794',
								'objectName' : 'KS_nav_views.png',
								'copySource' : '/test835/KS_nav_ui.png',
								'uploadId' : uploadId,
								'partNumber' : '2'
							}, function(data) {
								finish(testRun);
								AWS.S3.deleteObject({
									'bucketName' : 'test794',
									'objectName' : 'KS_nav_views.png'
								}, function(data) {
									AWS.S3.deleteBucket({
										'bucketName' : 'test794'
									}, function(data) {
										AWS.S3.deleteObject({
											'bucketName' : 'test835',
											'objectName' : 'KS_nav_ui.png'
										}, function(data) {
											AWS.S3.deleteBucket({
												'bucketName' : 'test835'
											}, function(data) {

											}, function(error) {

											});
										}, function(error) {

										});
									}, function(error) {

									});
								}, function(error) {

								});
							}, function(error) {
								valueOf(testRun, true).shouldBeFalse();
							});
						}, function(error) {
							valueOf(testRun, true).shouldBeFalse();
						});
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					});
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
	
	
	// Complete MultiPart Upload is used for completing the process of uploading in MultiPart.

	this.testCompleteMultipartUpload_as_async= function(testRun) {
		AWS.S3.putBucket({
			bucketName : 'test953'
		}, function(data) {
			alert('putBucket success');
			var f = Titanium.Filesystem.getFile('ATC.pdf');
			Ti.App.AWS.S3.putObject({
				'bucketName' : 'test953',
				'objectName' : 'ATC.pdf',
				'file' : f
			}, function(data) {
				alert('putObject success');
				Ti.App.AWS.S3.putBucket({
					bucketName : 'test1087890'
				}, function(data) {
					alert('putBucket success');
					var f1 = Titanium.Filesystem.getFile('Sxml.pdf');
					Ti.App.AWS.S3.putObject({
						'bucketName' : 'test1087890',
						'objectName' : 'Sxml.pdf',
						'file' : f
					}, function(data) {
						alert('putObject success');
						Ti.App.AWS.S3.initiateMultipartUpload({
							'bucketName' : 'test953',
							'objectName' : 'ATC.pdf'
						}, function(data) {
							alert('initiateMultipartUpload success');
							test = data.UploadId;
							Ti.App.AWS.S3.uploadPartCopy({
								'bucketName' : 'test953',
								'objectName' : 'ATC.pdf',
								'copySource' : '/test1087890/Sxml.pdf',
								'uploadId' : data.UploadId,
								'partNumber' : '2'
							}, function(data) {
								alert('uploadPartCopy success');
								Ti.API.info(JSON.stringify(data));
								Ti.App.AWS.S3.completeMultipartUpload({
									'bucketName' : 'test953',
									'objectName' : 'ATC.pdf',
									'uploadId' : test,
									'xmlTemplate' : '<CompleteMultipartUpload><Part><PartNumber>2</PartNumber><ETag>' + data.ETag + '</ETag></Part></CompleteMultipartUpload>'
								}, function(data) {
									alert('completeMultipartUpload success');
									Ti.API.info(JSON.stringify(data));
									//finish(testRun);
									Ti.App.AWS.S3.deleteObject({
										'bucketName' : 'test953',
										'objectName' : 'ATC.pdf'
									}, function(data) {
										alert('deleteObject success');
										Ti.App.AWS.S3.deleteBucket({
											'bucketName' : 'test953'
										}, function(data) {
											alert('deleteBucket success');
											Ti.App.AWS.S3.deleteObject({
												'bucketName' : 'test1087890',
												'objectName' : 'Sxml.pdf'
											}, function(data) {
												alert('deleteObject success');
												Ti.App.AWS.S3.deleteBucket({
													'bucketName' : 'test1087890'
												}, function(data) {
													alert('deleteBucket success');
												}, function(error) {
													alert('Some error occured' + JSON.stringify(error));
												});
											}, function(error) {
												alert('Some error occured' + JSON.stringify(error));
											});
										}, function(error) {
											alert('Some error occured' + JSON.stringify(error));
										});
									}, function(error) {
										alert('Some error occured' + JSON.stringify(error));
									});
								}, function(error) {
									alert('Some error occured' + JSON.stringify(error));
									//callback.failed('Some error occured'+JSON.stringify(error));
								});
							}, function(error) {
								alert('Some error occured' + JSON.stringify(error));
							});
						}, function(error) {
							alert('Some error occured' + JSON.stringify(error));
						});
					}, function(error) {
						alert('Some error occured' + JSON.stringify(error));
					});
				}, function(error) {
					alert('Some error occured' + JSON.stringify(error));
				});
			}, function(error) {
				alert('Some error occured' + JSON.stringify(error));
			});
		}, function(error) {
			alert('Some error occured' + JSON.stringify(error));
		});
	},
	
	
	this.testPutObject_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'test535'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'test535',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteObject({
					'bucketName' : 'test535',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					AWS.S3.deleteBucket({
						'bucketName' : 'test535'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {

				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testListMultipartUploads_as_async= function(testRun) {

		AWS.S3.putBucket({
			bucketName : 'test723'
		}, function(data) {
			AWS.S3.listMultipartUploads({
				'bucketName' : 'test723'
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteBucket({
					'bucketName' : 'test723'
				}, function(data) {

				}, function(error) {

				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}

	 //delete Multiple Objects is used for deleting multiple Objects from a Single Bucket.
	this.testDeleteMultipleObjects_as_async= function(testRun) {
		AWS.S3.putBucket({
			bucketName : 'test024'
		}, function(data) {
			var f = Titanium.Filesystem.getFile('KS_nav_views.png');
			AWS.S3.putObject({
				'bucketName' : 'test024',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				var f1 = Titanium.Filesystem.getFile('KS_nav_ui.png');
				AWS.S3.putObject({
					'bucketName' : 'test024',
					'objectName' : 'KS_nav_ui.png',
					'file' : f1
				}, function(data) {
					AWS.S3.deleteMultipleObjects({
						'bucketName' : 'test024',
						'xmlTemplate' : '<Delete><Object><Key>KS_nav_views.png</Key></Object><Object><Key>KS_nav_ui.png</Key></Object></Delete>'
					}, function(data) {
						finish(testRun);
						AWS.S3.deleteBucket({
							'bucketName' : 'test024'
						}, function(data) {

						}, function(error) {

						});
					}, function(error) {
						valueOf(testRun, true).shouldBeFalse();
					});
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

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketPolicy'
		}, function(data) {

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
					"Resource" : "arn:aws:s3:::DrillBitGetBucketPolicy/*"
				}]
			}

			AWS.S3.putBucketPolicy({
				'bucketName' : 'DrillBitGetBucketPolicy',
				'xmlTemplate' : JSON.stringify(jsonObject)
			}, function(data) {

				AWS.S3.getBucketPolicy({
					'bucketName' : 'DrillBitGetBucketPolicy'
				}, function(data) {

					finish(testRun);
					AWS.S3.deleteBucket({
						'bucketName' : 'DrillBitGetBucketPolicy'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {

					valueOf(testRun, true).shouldBeFalse();
				});

			}, function(error) {

				callback.failed('Some error occured' + JSON.stringify(error));
			});
		}, function(error) {

			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	//Start Test Cases for put Bucket
	this.testPutBucket_as_async= function(testRun) {
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutBucket'
		}, function(data) {

			finish(testRun);
			AWS.S3.deleteBucket({
				'bucketName' : 'DrillBitPutBucket'
			}, function(data) {

			}, function(error) {

			});
		}, function(error) {

			valueOf(testRun, true).shouldBeFalse();
		});

	}
	
	this.testputEmptyBucket_as_async= function(testRun) {
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
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutBucketAcl'
		}, function(data) {

			AWS.S3.putBucketAcl({
				'bucketName' : 'DrillBitPutBucketAcl',
				'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonAWS.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
			}, function(data) {
				finish(testRun);

				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitPutBucketAcl'
				}, function(data) {

				}, function(error) {

				});
			}, function(error) {

				callback.failed('Some error occured' + JSON.stringify(error));
			});
		}, function(error) {

			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testputEmptyBucketACL_as_async= function(testRun) {
		AWS.S3.putBucketAcl({
			'bucketName' : '',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketACLWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketAcl({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketACLWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketAcl({
			'bucketName' : 't16est12354',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketACLWithInvalidXmlTemplate_as_async= function(testRun) {
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
		AWS.S3.putBucket({
			bucketName : 'test17'
		}, function(data) {
			AWS.S3.putBucketLifecycle({
				'bucketName' : 'test17',
				'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteBucketLifecycle({
					'bucketName' : 'test17'
				}, function(data) {
					AWS.S3.deleteBucket({
						'bucketName' : 'test17'
					}, function(data) {

					}, function(error) {
					});
				}, function(error) {

				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testputEmptyBucketLifeCycle_as_async= function(testRun) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : '',
			'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketLifeCycleWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketLifeCycleWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketLifeCycleWithInvalidXmlTemplate_as_async= function(testRun) {
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
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutBucketPolicy'
		}, function(data) {

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
					"Resource" : "arn:aws:s3:::DrillBitPutBucketPolicy/*"
				}]
			}

			AWS.S3.putBucketPolicy({
				'bucketName' : 'DrillBitPutBucketPolicy',
				'xmlTemplate' : JSON.stringify(jsonObject)
			}, function(data) {

				finish(testRun);
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitPutBucketPolicy'
				}, function(data) {

				}, function(error) {

				});
			}, function(error) {

				callback.failed('Some error occured' + JSON.stringify(error));
			});
		}, function(error) {

			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testputEmptyBucketPolicy_as_async= function(testRun) {
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
	
	this.testputBucketPolicyWithInvalidbucketName_as_async= function(testRun) {
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
	
	this.testputBucketPolicyWithEmptyXmlTemplate_as_async= function(testRun) {

		AWS.S3.putBucketPolicy({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketPolicyWithInvalidXmlTemplate_as_async= function(testRun) {
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
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutBucketLogging'
		}, function(data) {
			AWS.S3.putBucketLogging({
				'bucketName' : 'DrillBitPutBucketLogging',
				'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>global123</TargetBucket><TargetPrefix>global123-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitPutBucketLogging'
				}, function(data) {
				}, function(error) {
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testputEmptyBucketLogging_as_async= function(testRun) {
		AWS.S3.putBucketLogging({
			'bucketName' : '',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>pankaj1234567</TargetBucket><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketLoggingWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketLogging({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>pankaj1234567</TargetBucket><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketLoggingWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketLogging({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketLoggingWithInvalidXmlTemplate_as_async= function(testRun) {
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
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutBucketNotification'
		}, function(data) {
			AWS.S3.putBucketNotification({
				'bucketName' : 'DrillBitPutBucketNotification',
				'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687501311:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitPutBucketNotification'
				}, function(data) {
				}, function(error) {
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testputEmptyBucketNotification_as_async= function(testRun) {
		AWS.S3.putBucketNotification({
			'bucketName' : '',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687501311:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketNotificationWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketNotification({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687501311:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketNotificationWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketNotification({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketNotificationWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketNotification({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputEmptyBucketRequestPayment_as_async= function(testRun) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : '',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Payer>Requester</Payer></RequestPaymentConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketRequestPaymentWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Payer>Requester</Payer></RequestPaymentConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketRequestPaymentWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketRequestPaymentWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"></RequestPaymentConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketVersioning_as_async= function(testRun) {
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutBucketVersioning'
		}, function(data) {
			AWS.S3.putBucketVersioning({
				'bucketName' : 'DrillBitPutBucketVersioning',
				'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitPutBucketVersioning'
				}, function(data) {
				}, function(error) {
				});
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testputEmptyBucketVersioning_as_async= function(testRun) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketVersioningWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketVersioningWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketVersioningWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status></VersioningConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketWebsite_as_async= function(testRun) {

		AWS.S3.putBucket({
			bucketName : 'test12345987'
		}, function(data) {

			AWS.S3.putBucketWebsite({
				bucketName : 'test12345987',
				'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
			}, function(data) {

				finish(testRun);
				AWS.S3.deleteBucketWebsite({
					bucketName : 'test12345987'
				}, function(data) {

					AWS.S3.deleteBucket({
						bucketName : 'test12345987'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {

				});
			}, function(error) {

				valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {

			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testputBucketWebsitewithEmptyBucketName_as_async= function(testRun) {
		AWS.S3.putBucketWebsite({
			'bucketName' : '',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketWebsiteWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.putBucketWebsite({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketWebsiteWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketWebsite({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputBucketWebsiteWithInvalidXmlTemplate_as_async= function(testRun) {
		AWS.S3.putBucketWebsite({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testputObjectWithEmptybucketName_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile('KS_nav_ui.png');
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
	
	this.testputObjectWithInvalidbucketName_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile('KS_nav_ui.png');
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
	
	this.testputObjectWithEmptyobjectName_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile('KS_nav_ui.png');
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
	
	this.testputObjectAcl_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'DrillBitPutObjectAcl'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'DrillBitPutObjectAcl',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.putObjectAcl({
					'bucketName' : 'DrillBitPutObjectAcl',
					'objectName' : 'KS_nav_views.png',
					'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>' + emailId + '</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>' + emailId + '</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
				}, function(data) {
					finish(testRun);
					AWS.S3.deleteObject({
						'bucketName' : 'DrillBitPutObjectAcl',
						'objectName' : 'KS_nav_views.png'
					}, function(data) {
						AWS.S3.deleteBucket({
							'bucketName' : 'DrillBitPutObjectAcl'
						}, function(data) {

						}, function(error) {

						})
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
	
	this.testputObjectAclWithEmptybucketName_as_async= function(testRun) {
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
	
	this.testputObjectAclWithInvalidbucketName_as_async= function(testRun) {
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
	
	this.testputObjectAclWithEmptyobjectName_as_async= function(testRun) {
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
	
	this.testputObjectAclWithEmptyXmlTemplate_as_async= function(testRun) {
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
	
	this.testgetService_as_async= function(testRun) {
		AWS.S3.getService({}, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testgetBucket_as_async= function(testRun) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucket'
		}, function(data) {
			AWS.S3.getBucket({
				'bucketName' : 'DrillBitGetBucket'
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucket'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testgetBucketWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucket({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucket({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketAcl_as_async= function(testRun) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketAcl'
		}, function(data) {
			AWS.S3.getBucketAcl({
				'bucketName' : 'DrillBitGetBucketAcl'
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketAcl'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testgetBucketAclWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketAcl({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketAclWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketAcl({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketLifecycle_as_async= function(testRun) {
		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketLifecycle'
		}, function(data) {

			AWS.S3.putBucketLifecycle({
				'bucketName' : 'DrillBitGetBucketLifecycle',
				'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
			}, function(data) {

				AWS.S3.getBucketLifecycle({
					'bucketName' : 'DrillBitGetBucketLifecycle'
				}, function(data) {
					finish(testRun);

					AWS.S3.deleteBucket({
						'bucketName' : 'DrillBitGetBucketLifecycle'
					}, function(data) {

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
	
	this.testgetBucketLifecycleWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketLifecycle({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketlifecycleWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketLifecycle({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketPolicyWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketPolicy({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketPolicyWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketPolicy({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketLocation_as_async= function(testRun) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketLocation'
		}, function(data) {
			AWS.S3.getBucketLocation({
				'bucketName' : 'DrillBitGetBucketLocation'
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketLocation'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testgetBucketLocationWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketLocation({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketLocationWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketLocation({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketLogging_as_async= function(testRun) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketLogging'
		}, function(data) {
			AWS.S3.getBucketLogging({
				'bucketName' : 'DrillBitGetBucketLogging'
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketLogging'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testgetBucketLoggingWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketLogging({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketLoggingWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketLogging({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketNotification_as_async= function(testRun) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketNotification'
		}, function(data) {
			AWS.S3.getBucketNotification({
				'bucketName' : 'DrillBitGetBucketNotification'
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketNotification'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testgetBucketNotificationWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketNotification({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketNotificationWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketNotification({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketObjectVersions_as_async= function(testRun) {
		
		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketObjectVersions'
		}, function(data) {
			AWS.S3.getBucketObjectVersions({
				'bucketName' : 'DrillBitGetBucketObjectVersions'
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketObjectVersions'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testgetBucketObjectVersionsWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketObjectVersions({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketObjectVersionsWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketObjectVersions({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketRequestPayment_as_async= function(testRun) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketRequestPayment'
		}, function(data) {
			AWS.S3.getBucketRequestPayment({
				'bucketName' : 'DrillBitGetBucketRequestPayment'
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketRequestPayment'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testgetBucketRequestPaymentWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketRequestPayment({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketRequestPaymentWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketRequestPayment({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketVersioning_as_async= function(testRun) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitGetBucketVersioning'
		}, function(data) {
			AWS.S3.getBucketVersioning({
				'bucketName' : 'DrillBitGetBucketVersioning'
			}, function(data) {
				finish(testRun);
				AWS.S3.deleteBucket({
					'bucketName' : 'DrillBitGetBucketVersioning'
				}, function(data) {

				}, function(error) {

				})
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testgetBucketVersioningWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketVersioning({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketVersioningWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketVersioning({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketWebsite_as_async= function(testRun) {
		AWS.S3.putBucket({
			bucketName : 'test543219876'
		}, function(data) {
			AWS.S3.putBucketWebsite({
				bucketName : 'test543219876',
				'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
			}, function(data) {
				AWS.S3.getBucketWebsite({
					'bucketName' : 'test543219876'
				}, function(data) {
					finish(testRun);
					AWS.S3.deleteBucket({
						bucketName : 'test543219876'
					}, function(data) {
					}, function(error) {
					});
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
	
	this.testgetBucketWebsiteWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getBucketWebsite({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetBucketWebsiteWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getBucketWebsite({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testlistMultipartUploadsWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.listMultipartUploads({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testlistMultipartUploadsWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.listMultipartUploads({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteBucket_as_async= function(testRun) {
		AWS.S3.putBucket({
			bucketName : 'DrillBucketDeleteBucket'
		}, function(data) {
			AWS.S3.deleteBucket({
				'bucketName' : 'DrillBucketDeleteBucket'
			}, function(data) {
				finish(testRun);
			}, function(error) {
				valueOf(testRun, true).shouldBeFalse();
			})
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testdeleteBucketWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.deleteBucket({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteBucketWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteBucket({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteBucketLifecycle_as_async= function(testRun) {

		AWS.S3.putBucket({
			bucketName : 'DrillBitDeleteBucketLifecycle'
		}, function(data) {
			AWS.S3.putBucketLifecycle({
				'bucketName' : 'DrillBitDeleteBucketLifecycle',
				'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
			}, function(data) {
				AWS.S3.deleteBucketLifecycle({
					'bucketName' : 'DrillBitDeleteBucketLifecycle'
				}, function(data) {
					finish(testRun);
					AWS.S3.deleteBucket({
						'bucketName' : 'DrillBitDeleteBucketLifecycle'
					}, function(data) {
					}, function(error) {
					});
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
	
	this.testdeleteBucketLifecycleWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketLifecycle({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteBucketLifecycleWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketLifecycle({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteBucketPolicy_as_async= function(testRun) {
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
				"Resource" : "arn:aws:s3:::DrillBitDeleteBucketPolicy/*"
			}]
		}

		AWS.S3.putBucket({
			bucketName : 'DrillBitDeleteBucketPolicy'
		}, function(data) {
			AWS.S3.putBucketPolicy({
				'bucketName' : 'DrillBitDeleteBucketPolicy',
				'xmlTemplate' : JSON.stringify(jsonObject)
			}, function(data) {
				AWS.S3.deleteBucketPolicy({
					'bucketName' : 'DrillBitDeleteBucketPolicy'
				}, function(data) {
					finish(testRun);
					AWS.S3.deleteBucket({
						'bucketName' : 'DrillBitDeleteBucketPolicy'
					}, function(data) {
					}, function(error) {
					});
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
	
	this.testdeleteBucketPolicyWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketPolicy({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteBucketPolicyWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketPolicy({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteBucketWebsite_as_async= function(testRun) {

		AWS.S3.putBucket({
			bucketName : 'test987654321'
		}, function(data) {

			AWS.S3.putBucketWebsite({
				'bucketName' : 'test987654321',
				'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
			}, function(data) {

				AWS.S3.deleteBucketWebsite({
					'bucketName' : 'test987654321'
				}, function(data) {

					finish(testRun);
					AWS.S3.deleteBucket({
						'bucketName' : 'test987654321'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {

					valueOf(testRun, true).shouldBeFalse();
				})
			}, function(error) {

			valueOf(testRun, true).shouldBeFalse();
			});
		}, function(error) {

			valueOf(testRun, true).shouldBeFalse();
		});

	}
	
	this.testdeleteBucketWebsiteWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketWebsite({
			'bucketName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteBucketWebsiteWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteBucketWebsite({
			'bucketName' : 'xyzw'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteObject_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'DrillBitDeleteObject'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'DrillBitDeleteObject',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.deleteObject({
					'bucketName' : 'DrillBitDeleteObject',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					finish(testRun);
					AWS.S3.deleteBucket({
						'bucketName' : 'DrillBitDeleteObject'
					}, function(data) {

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
	
	this.testdeleteObjectWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.deleteObject({
			'bucketName' : '',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteObjectWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteObject({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteObjectWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.deleteObject({
			'bucketName' : 'velocity-gl',
			'objectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteObjectWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.deleteObject({
			'bucketName' : 'pankaj123456',
			'objectName' : 'xyz'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteMultipleObjectsWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : '',
			'xmlTemplate' : '<Delete><Object><Key>sample1.txt</Key></Object><Object><Key>sample2.txt</Key></Object></Delete>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteMultipleObjectsWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<Delete><Object><Key>sample1.txt</Key></Object><Object><Key>sample2.txt</Key></Object></Delete>'
		}, function(data) {
			finish(testRun);
		}, function(error) {
			valueOf(testRun, true).shouldBeFalse();
		});
	}
	
	this.testdeleteMultipleObjectsWithEmptyXmlTemplate_as_async= function(testRun) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : 'velocity-gl',
			'xmlTemplate' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testdeleteMultipleObjectsWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : 'velocity-gl',
			'xmlTemplate' : '<Delete><Object><Key>sample1.txt</Key></Object><Object></Object></Delete>'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetObject_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'DrillBitGetObject'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'DrillBitGetObject',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.getObject({
					'bucketName' : 'DrillBitGetObject',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					finish(testRun);
					AWS.S3.deleteObject({
						'bucketName' : 'DrillBitGetObject',
						'objectName' : 'KS_nav_views.png'
					}, function(data) {
						AWS.S3.deleteBucket({
							'bucketName' : 'DrillBitGetObject'
						}, function(data) {

						}, function(error) {

						})
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
	
	this.testgetObjectWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getObject({
			'bucketName' : '',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetObjectWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getObject({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetObjectWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.getObject({
			'bucketName' : 'pankaj123456',
			'objectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetObjectWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.getObject({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetObjectAcl_as_async= function(testRun) {
		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'DrillBitAcl'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'DrillBitAcl',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.getObjectAcl({
					'bucketName' : 'DrillBitAcl',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					finish(testRun);
					AWS.S3.deleteObject({
						'bucketName' : 'DrillBitAcl',
						'objectName' : 'KS_nav_views.png'
					}, function(data) {
						AWS.S3.deleteBucket({
							'bucketName' : 'DrillBitAcl'
						}, function(data) {

						}, function(error) {

						})
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
	
	this.testgetObjectAclWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.getObjectAcl({
			'bucketName' : '',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetObjectAclWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.getObjectAcl({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetObjectAclWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.getObjectAcl({
			'bucketName' : 'pankaj123456',
			'objectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testgetObjectAclWithInvalidobjectName_as_async= function(testRun) {
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
	this.testabortMultipartUpload_as_async= function(testRun) {
		AWS.S3.putBucket({
			bucketName : 'DrillBitUpload'
		}, function(data) {
			var f = Titanium.Filesystem.getFile('KS_nav_views.png');
			AWS.S3.putObject({
				'bucketName' : 'DrillBitUpload',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.initiateMultipartUpload({
					'bucketName' : 'DrillBitUpload',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					AWS.S3.abortMultipartUpload({
						'bucketName' : 'DrillBitUpload',
						'objectName' : 'KS_nav_views.png',
						'uploadId' : data.UploadId

					}, function(data) {
						finish(testRun);
						AWS.S3.deleteObject({
							'bucketName' : 'DrillBitUpload',
							'objectName' : 'KS_nav_views.png'
						}, function(data) {
							AWS.S3.deleteBucket({
								'bucketName' : 'DrillBitUpload'
							}, function(data) {

							}, function(error) {

							})
						}, function(error) {

						});
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
	
	this.testabortMultipartUploadWithEmptybucketName_as_async= function(testRun) {
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
	
	this.testabortMultipartUploadWithInvalidbucketName_as_async= function(testRun) {
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
	
	this.testabortMultipartUploadWithEmptyobjectName_as_async= function(testRun) {
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
	
	this.testabortMultipartUploadWithInvalidobjectName_as_async= function(testRun) {
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
	
	this.testabortMultipartUploadWithEmptyuploadId_as_async= function(testRun) {
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
	
	this.testabortMultipartUploadWithInvaliduploadId_as_async= function(testRun) {
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
	
	this.testabortMultipartUploadWithEmptyPartNumber_as_async= function(testRun) {
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
	
	this.testabortMultipartUploadWithInvalidpartNumber_as_async= function(testRun) {
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
	
	this.testinitiateMultipartUploadWithEmptybucketName_as_async= function(testRun) {
		AWS.S3.initiateMultipartUpload({
			'bucketName' : '',
			'objectName' : 'Rahul.png'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testinitiateMultipartUploadWithInvalidbucketName_as_async= function(testRun) {
		AWS.S3.initiateMultipartUpload({
			'bucketName' : 'xyzw',
			'objectName' : 'Rahul.png'
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testinitiateMultipartUploadWithEmptyobjectName_as_async= function(testRun) {
		AWS.S3.initiateMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : ''
		}, function(data) {
			valueOf(testRun, true).shouldBeFalse();
		}, function(error) {
			finish(testRun);
		});
	}
	
	this.testinitiateMultipartUploadsWithInvalidobjectName_as_async= function(testRun) {
		AWS.S3.initiateMultipartUpload({
			'bucketName' : 'test12398',
			'objectName' : 'xyz'
		}, function(data) {
			finish(testRun);
		}, function(error) {
			callback.failed('Some error occured ' + JSON.stringify(error));
		});
	}
	
	this.testlistParts_as_async= function(testRun) {

		var f = Titanium.Filesystem.getFile('KS_nav_views.png');
		AWS.S3.putBucket({
			bucketName : 'DrillBitlist123'
		}, function(data) {
			AWS.S3.putObject({
				'bucketName' : 'DrillBitlist123',
				'objectName' : 'KS_nav_views.png',
				'file' : f
			}, function(data) {
				AWS.S3.initiateMultipartUpload({
					'bucketName' : 'DrillBitlist123',
					'objectName' : 'KS_nav_views.png'
				}, function(data) {
					uploadId = data.UploadId;
					AWS.S3.listParts({
						'bucketName' : 'DrillBitlist123',
						'objectName' : 'KS_nav_views.png',
						'uploadId' : uploadId
					}, function(data) {
						finish(testRun);
						AWS.S3.deleteObject({
							'bucketName' : 'DrillBitlist123',
							'objectName' : 'KS_nav_views.png'
						}, function(data) {
							AWS.S3.deleteBucket({
								'bucketName' : 'DrillBitlist123'
							}, function(data) {

							}, function(error) {

							})
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
	
	this.testlistPartsWithEmptybucketName_as_async= function(testRun) {
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
	
	this.testlistPartsWithInvalidbucketName_as_async= function(testRun) {
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
	
	this.testlistPartsWithEmptyobjectName_as_async= function(testRun) {
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
	
	this.testlistPartsWithInvalidobjectName_as_async= function(testRun) {
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
	
	this.testlistPartsWithEmptyuploadId_as_async= function(testRun) {
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
	
	this.testlistPartsWithInvaliduploadId_as_async= function(testRun) {
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
	
	this.testuploadPartCopyWithEmptybucketName_as_async= function(testRun) {
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
	
	this.testuploadPartCopyWithInvalidbucketName_as_async= function(testRun) {
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
	
	this.testuploadPartCopyWithEmptyobjectName_as_async= function(testRun) {
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
	
	this.testuploadPartCopyWithInvalidobjectName_as_async= function(testRun) {
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
	
	this.testuploadPartCopyWithEmptyuploadId_as_async= function(testRun) {
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
	
	this.testuploadPartCopyWithInvaliduploadId_as_async= function(testRun) {
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
	
	this.testuploadPartCopyWithEmptyPartNumber_as_async= function(testRun) {
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
	
	this.testuploadPartCopyWithInvalidpartNumber_as_async= function(testRun) {
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
	
	this.testuploadPartCopyWithEmptyCopySource_as_async= function(testRun) {
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
	
	this.testuploadPartCopyWithInvalidCopySource_as_async= function(testRun) {
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
	
	this.testcompleteMultipartUploadWithEmptybucketName_as_async= function(testRun) {
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
	
	this.testcompleteMultipartUploadWithInvalidbucketName_as_async= function(testRun) {
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
	
	this.testcompleteMultipartUploadWithEmptyobjectName_as_async= function(testRun) {
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
	
	this.testcompleteMultipartUploadWithInvalidobjectName_as_async= function(testRun) {
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
	
	this.testcompleteMultipartUploadWithEmptyuploadId_as_async= function(testRun) {
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
	
	this.testcompleteMultipartUploadWithInvaliduploadId_as_async= function(testRun) {
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
	
	this.testcompleteMultipartUploadWithEmptyXmlTemplate_as_async= function(testRun) {
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
	
	this.testcompleteMultipartUploadWithInvalidXmlTemplate_as_async= function(testRun) {
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
	this.tests = require('hammer').populateTests(this, 30000);
	
};
