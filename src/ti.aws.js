/**
 * Ti.Aws Module
 * Copyright (c) 2011-2013 by Appcelerator, Inc. All Rights Reserved.
 * Please see the LICENSE included with this distribution for details.
 */

/*
* Amazon WebServices Module
* A framework for exposing the Amazon QueryAPIs to Appcelerator Titanium Mobile.
*
* This framework is designed for QueryAPIs provided by AWS. Each service is represented
* as a NameSpace, within which each operation is exposed.
*
* This framework requires you to refer to the AWS API reference for handling request, and
* responses recieved from the service.
*   i.e. refer to : http://aws.amazon.com/documentation/
*
*
*/

//#include:lib/hmacsha1.js
//#include:lib/awssigner.js
//#include:lib/awshelper.js
//#include:lib/md5.js
//#include:lib/utf8.js
//#include:lib/bedframe.js
//#include:lib/xmlToJson.js
//#include:lib/util.js
//#include:lib/hmacsha256.js

//Session variables used across all methods
var sessionOBJ = {
	utility : utility, // variable declared in utils.js
	bedFrame : BedFrame, // variable declared in bedframe.js
	xmlToJSON : xmlToJS, // variable declared in xmlToJson.js
	awsHelper : awsHelper,
	utf8 : utf8, //Used for S3 only
	sha256 : sha256,
	sha : sha,
	md5 : md5,
	accessKeyId : null, //To be initalized via the authorize method
	secretKey : null	//To be initalized via the authorize method
};

//Custom UsrAgent
//aws-sdk-appcelerator <tisdk-version> <os-version> <os-platform> <locale>
var customUserAgent = 'aws-sdk-appcelerator ' + Titanium.version + ' ' + Titanium.Platform.version + ' ' + Titanium.Platform.osname + ' ' + Titanium.Locale.currentLocale;
//this._httpClient.setRequestHeader('User-Agent', customUserAgent);
Titanium.userAgent = customUserAgent;

var regionEndpoint = 'us-east-1';
//us-west-1

/**
 * Uses the AWS Query API to invoke an Action specified by the method, along with the parameters,
 * returns the response returned by the Service, and raises an Error callback in case of a failure.
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 */
var defaultQueryExecutor = function(params, cbOnData, cbOnError) {
	awsHelper.prepareExecutor(this);

	if (awsHelper.validateApi(this, cbOnError, params) == false)
		return false;

	//Calling generateSQSURL function for SQS and generateSignedURL for others
	if (this.property === 'SQS') {
		sUrl = sessionOBJ.awsHelper.generateSQSURL(this.action, params, sessionOBJ.accessKeyId, sessionOBJ.secretKey, this.endpoint, this.version);
	} else {
		sUrl = sessionOBJ.awsHelper.generateSignedURL(this.action, params, sessionOBJ.accessKeyId, sessionOBJ.secretKey, this.endpoint, this.version);
	}
	var xhr = awsHelper.createHttpObject(this, cbOnData, cbOnError);
	xhr.open(this.verb, sUrl);
	xhr.setRequestHeader('User-Agent', customUserAgent);
	xhr.send();
}
/**
 * Uses the AWS Query API to invoke an Action specified by the method, along with the parameters,
 * returns the response returned by the Service, and raises an Error callback in case of a failure.
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 */
var snsExecutor = function(params, cbOnData, cbOnError) {
	awsHelper.prepareExecutor(this);

	if (awsHelper.validateApi(this, cbOnError, params) == false)
		return false;

	var xhr = awsHelper.createHttpObject(this, cbOnData, cbOnError);
	//generates complete querystring without url
	params.Action = this.action;
	params.Version = this.version;
	payload = sessionOBJ.awsHelper.generatePayload(params, sessionOBJ.accessKeyId, sessionOBJ.secretKey, this.endpoint)

	if (Ti.Platform.osname === 'iphone') {
		xhr.open(this.verb, this.endpoint + '?' + payload);
	} else {
		xhr.open(this.verb, this.endpoint);
	}

	xhr.setRequestHeader('User-Agent', customUserAgent);
	xhr.setRequestHeader('Host', 'sns.'+regionEndpoint+'.amazonaws.com');

	if (Ti.Platform.osname === 'iphone') {
		xhr.send();
	} else {
		xhr.send(payload);
	}

}
/**
 * Uses the AWS Query API to invoke an Action specified by the method, along with the parameters,
 * returns the response returned by the Service, and raises an Error callback in case of a failure.
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 */
var s3Executor = function(params, cbOnData, cbOnError) {

	awsHelper.prepareExecutor(this);

	if (awsHelper.validateApi(this, cbOnError, params) == false)
		return false;

	var xhr = Ti.Network.createHTTPClient();
	params.contentType = this.contentType || '';

	if (this.computeMD5 && params.XMLTemplate) {
		params.contentMD5 = sessionOBJ.md5.b64_md5(params.XMLTemplate);
	} else {
		params.contentMD5 = '';
	}

	if (!params.hasOwnProperty('subResource')) {
		params.subResource = this.subResource;
	}
	var curDate = (new Date()).toUTCString();
	params.verb = this.verb;
	params.curDate = curDate;
	params.url = this.endpoint;
	params.stringToSign = '';
	//params.method = this.method;
	if (this.method == 'getPresignedUrl') {
		params.curDate = params.Expires;
	}
	//get the file mime type and size from the file object passed by client
	if (this.uploadFile) {
		var fileContents = params.File.read();
		if (fileContents) {
			params.contentType = fileContents.mimeType;
		}
		params.contentLength = params.File.size;
	}

	sessionOBJ.awsHelper.generateS3Params(params);
	//generates stringTosign string and passes it back as part of 'params' parameter
	var signature = sessionOBJ.sha.b64_hmac_sha1(sessionOBJ.utf8.encode(sessionOBJ.secretKey), sessionOBJ.utf8.encode(params.stringToSign));

	if (this.method == 'listVersions') {
		params.url = 'https://' + params.BucketName + this.endpoint + params.subResource;
	} else if (this.method == 'deleteVersion') {
		params.url = 'https://' + params.BucketName + this.endpoint + params.Key + '?versionId=' + params.VersionId;
	} else if (this.method == 'getPresignedUrl') {
		var url = params.url + '?AWSAccessKeyId=' + sessionOBJ.accessKeyId + '&Expires=' + params.Expires + '&Signature=' + encodeURIComponent(signature);
		cbOnData(url, null);
		return;
	}

	var awsAuthHeader = "AWS " + sessionOBJ.accessKeyId + ":" + signature;
	xhr.open(this.verb, params.url);
	xhr.setRequestHeader('User-Agent', customUserAgent);
	xhr.setRequestHeader('Authorization', awsAuthHeader);
	xhr.setRequestHeader('Date', curDate);

	if (this.method == 'listVersions' || this.method == 'deleteVersion') {
		xhr.setRequestHeader('Host', params.BucketName + '.s3.amazonaws.com');
	} else {
		xhr.setRequestHeader('Host', 's3.amazonaws.com');
	}
	//set the content type if its required by the api.
	if (this.contentType) {
		xhr.setRequestHeader('Content-Type', params.contentType);
	}
	// For api's that upload files we need to pass content type and content length
	if (this.uploadFile) {

		xhr.setRequestHeader('Content-Type', params.contentType);
		// Setting 'Content-Length' on Android will generate an exception (duplicate header)
		// Setting 'Content-Length' on iOS is not required as the platform will add it
		// Setting 'Content-Length' on MobileWeb ???
		if(Ti.Platform.osname !== 'android') {// with android content length is already present
			xhr.setRequestHeader('Content-Length', params.contentLength);
		}
	}
	if (this.computeMD5 && params.contentMD5) {
		xhr.setRequestHeader('Content-MD5', params.contentMD5)
	}
	//used for apis like Put object copy and upload part-copy
	if (params.hasOwnProperty('CopySource')) {
		xhr.setRequestHeader('x-amz-copy-source', params.CopySource);
		// will be passed by client
	}

	var method = this.method;

	var self = this;
	xhr.onload = function(response) {
		//For Get and POST xml is returned as response hence converting it to javascript object and passing back to user

		if (this.connectionType == "GET" || this.connectionType == "POST" || method == "uploadPartCopy") {// Api's other then GET and POST does not return any xml as part of response object so passing the complete obect back to client
			if (method === "getObjectTorrent" || method === "getObject") {
				awsHelper.httpSuccess(this, this.responseData, cbOnData);
			} else if (method === "getBucketPolicy") {
				awsHelper.httpSuccess(this, this.responseText, cbOnData);
			} else {
				awsHelper.httpSuccess(this, sessionOBJ.xmlToJSON.toJSON(this.responseText, true, self.arrayProps), cbOnData);
			}
		} else {// Api's other then GET and POST does not return any xml as part of response object so passing the complete obect back to client
			awsHelper.httpSuccess(this, this.responseText, cbOnData);
		}
	};

	xhr.onerror = function(e) {
		awsHelper.httpError(this, sessionOBJ.xmlToJSON.toJSON(this.responseText, false, null), e, cbOnError);
	}
	if (params.hasOwnProperty('XMLTemplate')) {//for sending xml in request object
		xhr.send(params.XMLTemplate);
	} else if (fileContents && (params.contentLength > 0)) {// for sending file in request object
		xhr.send(fileContents);
	} else {
		xhr.send();
	}
}
/**
 * Uses the AWS Query API to invoke an Action specified by the method, along with the parameters,
 * returns the response returned by the Service, and raises an Error callback in case of a failure.
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 */
var sesExecutor = function(params, cbOnData, cbOnError) {
	awsHelper.prepareExecutor(this);
	if (awsHelper.validateApi(this, cbOnError, params) == false)
		return false;

	var paramString = sessionOBJ.awsHelper.generateSESParams(params);
	var curDate = (new Date()).toUTCString();
	var requestBody = sessionOBJ.utf8.encode('AWSAccessKeyId=' + sessionOBJ.accessKeyId + '&Action=' + this.action + paramString + '&Timestamp=' + curDate);

	var authorization = 'AWS3-HTTPS AWSAccessKeyId=' + sessionOBJ.accessKeyId + ',Algorithm=' + this.algorithm + ',Signature=' + sessionOBJ.sha.b64_hmac_sha1(sessionOBJ.secretKey, curDate);
	var xhr = awsHelper.createHttpObject(this, cbOnData, cbOnError);

	xhr.open(this.verb, this.endpoint);
	xhr.setRequestHeader('User-Agent', customUserAgent);
	xhr.setRequestHeader('Content-Type', this.contentType);
	xhr.setRequestHeader('Host', this.host);
	xhr.setRequestHeader('Date', curDate);
	xhr.setRequestHeader('X-Amzn-Authorization', authorization);
	xhr.send(requestBody);
}
/**
 * Generates session token, temperary access key and temperary secret key, to be used with calls to dynamodb api's
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 * */
var stsExecutor = function(params, cbOnData, cbOnError) {
	awsHelper.prepareExecutor(this);

	params.Action = this.action;
	params.Version = this.version;
	var self = this;
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(response) {

		jsResp = sessionOBJ.xmlToJSON.toJSON(this.responseText, false, self.arrayProps);

		Ti.App.Properties.setString('tempSessionToken', jsResp["GetSessionTokenResult"]["Credentials"]["SessionToken"]);
		Ti.App.Properties.setString('tempSecretAccessKey', jsResp["GetSessionTokenResult"]["Credentials"]["SecretAccessKey"]);
		Ti.App.Properties.setString('tempAccessKeyID', jsResp["GetSessionTokenResult"]["Credentials"]["AccessKeyId"]);
		Ti.App.Properties.setString('tempExpiration', jsResp["GetSessionTokenResult"]["Credentials"]["Expiration"]);

		awsHelper.httpSuccess(this, jsResp, cbOnData);
	};
	xhr.onerror = function(e) {
		awsHelper.httpError(this, sessionOBJ.xmlToJSON.toJSON(this.responseText, false, null), e, cbOnError);
	}
	sUrl = sessionOBJ.awsHelper.generatePayload(params, sessionOBJ.accessKeyId, sessionOBJ.secretKey, this.endpoint);

	if (Ti.Platform.osname === 'iphone') {
		xhr.open(this.verb, this.endpoint + '?' + payload);
	} else {
		xhr.open(this.verb, this.endpoint);
	}
	xhr.setRequestHeader('User-Agent', customUserAgent);
	xhr.setRequestHeader('Host', 'sts.amazonaws.com');

	if (Ti.Platform.osname === 'iphone') {
		xhr.send();
	} else {
		xhr.send(payload);
	}
}
/**
 * Uses the AWS Query API to invoke an Action specified by the method, along with the parameters,
 * returns the response returned by the Service, and raises an Error callback in case of a failure.
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 */
var dynamoDbExecutor = function(params, cbOnData, cbOnError) {

	awsHelper.prepareExecutor(this);

	if (awsHelper.validateApi(this, cbOnError, params) == false)
		return false;

	var expirationTime = (new Date((new Date).getTime() + ((new Date).getTimezoneOffset() * 60000))).toISODate();

	var thisRef = this;

	if ((Ti.App.Properties.getString('tempExpiration') == null) || ((Ti.App.Properties.getString('tempExpiration') != null) && sessionOBJ.utility.compareTime(expirationTime, Ti.App.Properties.getString('tempExpiration'), 300))) {
		AWS.STS.getSessionToken({

		}, function(response) {

			dynamoDBCall(thisRef, params, cbOnData, cbOnError);
		}, function(error) {
			cbOnError(this.responseText, null);
		});
	} else {
		dynamoDBCall(thisRef, params, cbOnData, cbOnError);
	}
}
/**
 * Uses the AWS Query API to invoke an Action specified by the method, along with the parameters,
 * returns the response returned by the Service, and raises an Error callback in case of a failure.
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 */
var dynamoDBCall = function(thisRef, params, cbOnData, cbOnError) {
	var curDate = (new Date()).toUTCString();
	// temperary access key
	var tempAccessKeyId = Ti.App.Properties.getString('tempAccessKeyID');
	// session token generated by sts
	var sessionToken = Ti.App.Properties.getString('tempSessionToken');
	// temperary secret key
	var secretAccessKey = Ti.App.Properties.getString('tempSecretAccessKey');

	var host = 'dynamodb.'+regionEndpoint+'.amazonaws.com';
	//var dtStr = (new Date).toUTCString();
	var canonicalHeader = 'host:' + thisRef.host + '\n' + 'x-amz-date:' + curDate + '\n' + 'x-amz-security-token:' + sessionToken + '\n' + 'x-amz-target:DynamoDB_20111205.' + thisRef.action + '\n';
	var signedHeaders = 'Host;X-Amz-Date;x-amz-security-token;X-Amz-Target';
	var stringToSign = thisRef.verb + '\n' + '/' + '\n' + '' + '\n' + canonicalHeader + '\n' + JSON.stringify(params.RequestJSON);

	var signature = sessionOBJ.sha256.b64_hmac_sha256_sha256(secretAccessKey, stringToSign);
	if (signature.substring(signature.length - 1) !== "=") {
		signature = signature + "=";
	}

	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(response) {
		awsHelper.httpSuccess(this, JSON.parse(this.responseText), cbOnData);
	};
	xhr.onerror = function(e) {
		awsHelper.httpError(this, JSON.parse(this.responseText), e, cbOnError);
	}

	xhr.open(thisRef.verb, thisRef.endpoint);
	xhr.setRequestHeader('User-Agent', customUserAgent);

	var auth = ('AWS3 AWSAccessKeyId=' + tempAccessKeyId + ',Algorithm=' + thisRef.algorithm + ',SignedHeaders=' + signedHeaders + ',Signature=' + signature);

	xhr.setRequestHeader('X-Amz-Target', 'DynamoDB_20111205.' + thisRef.action);
	xhr.setRequestHeader('Content-Type', thisRef.contentType);
	xhr.setRequestHeader('x-amz-security-token', sessionToken);
	xhr.setRequestHeader('Date', curDate);
	xhr.setRequestHeader('X-Amz-Date', curDate);
	xhr.setRequestHeader('Host', thisRef.host);
	xhr.setRequestHeader('X-Amzn-Authorization', auth);

	xhr.send(JSON.stringify(params.RequestJSON));
}
var AWS = {};

/**
 * Stores the security credentials in the Module Session scope
 *
 * @param accessKeyId - AccessKey provided by the user
 * @param secretKey - SecretKey provided by the user
 */
AWS.authorize = function(accessKeyId, secretKey) {
	sessionOBJ.accessKeyId = accessKeyId;
	sessionOBJ.secretKey = secretKey;
}

sessionOBJ.bedFrame.build(AWS, {
	verb : 'GET',
	version : "2009-04-15",
	executor : defaultQueryExecutor,
	preparer : function() {
		if (!this.action) {
			initCap = this.method.substr(0, 1).toUpperCase();
			this.action = initCap + this.method.substr(1);
			// Action is Usually same as Method Name, unless explicitly stated
		}
	},
	children : [{
		property : 'SimpleDB',
		endpoint : "https://sdb.amazonaws.com",
		children : [
			{
				method : 'batchDeleteAttributes',
				validations : {
					required : { params : ['DomainName'] }
				}
			}, {
				method : 'batchPutAttributes',
				validations : {
					required : { params : ['DomainName'] }
				}
			}, {
				method : 'createDomain',
				validations : {
					required : { params : ['DomainName'] },
					rangeValidator : { min : 3,	max : 255, params : ['DomainName'] }
				}
			}, {
				method : 'deleteAttributes',
				validations : {
					required : { params : ['DomainName', 'ItemName'] }
				}
			}, {
				method : 'deleteDomain',
				validations : {
					required : { params : ['DomainName'] }
				}
			}, {
				method : 'domainMetadata',
				validations : {
					required : { params : ['DomainName'] }
				}
			}, {
				method : 'getAttributes',
				arrayProps : { 'Attribute': 1 },
				validations : {
					required : { params : ['DomainName', 'ItemName'] }
				}
			}, {
				method : 'listDomains',
				arrayProps : { 'DomainName': 1 }
			}, {
				method : 'putAttributes',
				validations : {
					required : { params : ['DomainName', 'ItemName'] }
				}
			}, {
				method : 'select',
				arrayProps : { 'Item' : 1, 'Attribute' : 1 },
				validations : {
					required : { params : ['SelectExpression'] }
				}
			}
		]
	}, {
		property : 'S3',
		endpoint : 'https://s3.amazonaws.com/',
		executor : s3Executor,
		uploadFile : false,
		subResource : '',
		children : [
			{
				method : 'deleteBucket', verb : 'DELETE',
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'deleteBucketLifecycle', verb : 'DELETE', subResource : '?lifecycle',
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'deleteBucketPolicy', verb : 'DELETE', subResource : '?policy',
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'deleteBucketTagging', verb : 'DELETE', subResource : '?tagging',
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'deleteBucketWebsite', verb : 'DELETE', subResource : '?website',
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'getBucket',
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'getBucketAcl', subResource : '?acl',
				arrayProps : { 'Grant' : 1 },
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'getBucketLifecycle', subResource : '?lifecycle',
				arrayProps : { 'Rule' : 1 },
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'getBucketPolicy', subResource : '?policy',
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'getBucketLocation', subResource : '?location',
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'getBucketLogging', subResource : '?logging',
				arrayProps : { 'Grant' : 1 },
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'getBucketNotification', subResource : '?notification',
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'getBucketTagging', subResource : '?tagging',
				arrayProps : { 'Tag' : 1 },
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'getBucketObjectVersions',	subResource : '?versions',
				arrayProps : { 'Version' : 1, 'DeleteMarker' : 1 },
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'getBucketRequestPayment',	subResource : '?requestPayment',
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'getBucketVersioning',	subResource : '?versioning',
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'getBucketWebsite', subResource : '?website',
				arrayProps : { 'Key' : 1 },
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'headBucket', verb : 'HEAD',
				validations : {
					required : { params : ['BucketName']
					}
				}
			}, {
				method : 'listMultipartUploads', subResource : '?uploads',
				arrayProps : { 'Upload' : 1 },
				validations : {
					required : { params : ['BucketName']
					}
				}
			}, {
				method : 'putBucket', verb : 'PUT',
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'putBucketAcl', verb : 'PUT', subResource : '?acl', contentType : 'application/xml',
				validations : {
					required : { params : ['BucketName', 'XMLTemplate']	}
				}
			}, {
				method : 'putBucketLifecycle', verb : 'PUT', subResource : '?lifecycle', contentType : 'application/xml', computeMD5 : true,
				validations : {
					required : { params : ['BucketName', 'XMLTemplate'] }
				}
			}, {
				method : 'putBucketPolicy', verb : 'PUT', subResource : '?policy', contentType : 'application/json',
				validations : {
					required : { params : ['BucketName', 'XMLTemplate']	}
				}
			}, {
				method : 'putBucketLogging', verb : 'PUT', subResource : '?logging', contentType : 'application/xml',
				validations : {
					required : { params : ['BucketName', 'XMLTemplate']	}
				}
			}, {
				method : 'putBucketNotification', verb : 'PUT',	subResource : '?notification', contentType : 'application/xml',
				validations : {
					required : { params : ['BucketName', 'XMLTemplate']
					}
				}
			}, {
				method : 'putBucketTagging', verb : 'PUT',	subResource : '?tagging', contentType : 'application/xml',
				validations : {
					required : { params : ['BucketName', 'XMLTemplate']
					}
				}
			}, {
				method : 'putBucketRequestPayment', verb : 'PUT', subResource : '?requestPayment', contentType : 'application/xml',
				validations : {
					required : { params : ['BucketName', 'XMLTemplate']	}
				}
			}, {
				method : 'putBucketVersioning',	verb : 'PUT', subResource : '?versioning', contentType : 'application/xml',
				validations : {
					required : { params : ['BucketName', 'XMLTemplate']	}
				}
			}, {
				method : 'putBucketWebsite', verb : 'PUT', subResource : '?website', contentType : 'application/xml',
				validations : {
					required : { params : ['BucketName', 'XMLTemplate']	}
				}
			}, {
				method : 'getService',
				arrayProps : { 'Bucket' : 1 }
			}, {
				method : 'deleteObject', verb : 'DELETE',
				validations : {
					required : { params : ['BucketName', 'ObjectName'] }
				}
			}, {
				method : 'deleteMultipleObjects', verb : 'POST', subResource : '?delete', contentType : 'application/xml', computeMD5 : true,
				arrayProps : { 'Deleted' : 1, 'Error' : 1 },
				validations : {
					required : { params : ['BucketName', 'XMLTemplate']	}
				}
			}, {
				method : 'getObject', // Returning Blob Data.
				validations : {
					required : { params : ['BucketName', 'ObjectName'] }
				}
			}, {
				method : 'getObjectAcl', subResource : '?acl',
				arrayProps : { 'Grant' : 1 },
				validations : {
					required : { params : ['BucketName', 'ObjectName'] }
				}
			}, {
				method : 'getObjectTorrent',
				validations : {
					required : { params : ['BucketName', 'ObjectName'] }
				}
			}, {
				method : 'headObject', verb : 'HEAD',
				validations : {
					required : { params : ['BucketName', 'ObjectName'] }
				}
			}, {
				method : 'putObject', verb : 'PUT',	uploadFile : true,
				validations : {
					required : { params : ['BucketName', 'ObjectName'] }
				}
			}, {
				method : 'putObjectAcl', verb : 'PUT', subResource : '?acl', contentType : 'application/xml',
				validations : {
					required : { params : ['BucketName', 'ObjectName', 'XMLTemplate'] }
				}
			}, {
				method : 'putObjectCopy', verb : 'PUT',
				validations : {
					required : { params : ['BucketName', 'ObjectName', 'CopySource']
					}
				}
			}, {
				method : 'initiateMultipartUpload',	verb : 'POST', subResource : '?uploads',
				validations : {
					required : { params : ['BucketName', 'ObjectName']
					}
				}
			}, {
				method : 'uploadPart',	verb : 'PUT', uploadFile : true,
				validations : {
					required : { params : ['BucketName', 'ObjectName', 'UploadId', 'PartNumber', 'File'] }
				}
			}, {
				method : 'uploadPartCopy', verb : 'PUT',
				validations : {
					required : { params : ['BucketName', 'ObjectName', 'UploadId', 'PartNumber'] }
				}
			}, {
				method : 'completeMultipartUpload',	verb : 'POST', contentType : 'application/xml',
				validations : {
					required : { params : ['BucketName', 'ObjectName', 'UploadId', 'XMLTemplate'] }
				}
			}, {
				method : 'abortMultipartUpload', verb : 'DELETE',
				validations : {
					required : { params : ['BucketName', 'ObjectName', 'UploadId'] }
				}
			}, {
				method : 'listParts',
				arrayProps : { 'Part' : 1 },
				validations : {
					required : { params : ['BucketName', 'ObjectName', 'UploadId']
					}
				}
			}, {
				method : 'getObjectMetadata', verb : 'HEAD',
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'listVersions', verb : 'GET', endpoint : '.s3.amazonaws.com/',	subResource : '?versions',
				arrayProps : { 'Version' : 1 },
				validations : {
					required : { params : ['BucketName'] }
				}
			}, {
				method : 'deleteVersion', verb : 'DELETE', endpoint : '.s3.amazonaws.com/',
				validations : {
					required : { params : ['BucketName', 'Key', 'VersionId'] }
				}
			}, {
				method : 'getPresignedUrl',
				validations : {
					required : { params : ['BucketName', 'Expires']
					}
				}
			}
		]
	}, {
		property : 'SES',
		endpoint : "https://email."+regionEndpoint+".amazonaws.com",
		verb : 'POST',
		host : 'email.'+regionEndpoint+'.amazonaws.com',
		algorithm : 'HmacSHA1',
		contentType : 'application/x-www-form-urlencoded',
		executor : sesExecutor,
		children : [
			{
				method : 'deleteVerifiedEmailAddress',
				validations : {
					required : { params : ['EmailAddress'] }
			}
			}, {
				method : 'getSendQuota'
			}, {
				method : 'getSendStatistics',
				arrayProps : { 'member' : 1 }
			}, {
				method : 'listVerifiedEmailAddresses',
				arrayProps : { 'member' : 1 }
			}, {
				method : 'sendEmail',
				validations : {
					required : { params : ['Source', 'Destination', 'Message'] }
				}
			}, {
				method : 'sendRawEmail',
				validations : {
					required : { params : ['RawMessage'] }
				}
			}, {
				method : 'verifyEmailAddress',
				validations : {
					required : { params : ['EmailAddress'] }
				}
			}
		]
	}, {
		property : 'SQS',
		endpoint : "http://sqs."+regionEndpoint+".amazonaws.com",
		version : '2009-02-01',
		children : [
			{
				method : 'addPermission', version : '2011-10-01'
			}, {
				method : 'changeMessageVisibility',
				validations : {
					required : { params : ['AWSAccountId', 'QueueName', 'ReceiptHandle', 'VisibilityTimeout'] }
				}
			}, {
				method : 'changeMessageVisibilityBatch', version : '2011-10-01',
				arrayProps : { 'ChangeMessageVisibilityBatchResultEntry' : 1 },
				validations : {
					required : { params : ['AWSAccountId', 'QueueName']	}
				}
			}, {
				method : 'createQueue',	version : '2011-10-01',
				validations : {
					required : { params : ['QueueName']	}
				}
			}, {
				method : 'deleteMessage',
				validations : {
					required : { params : ['ReceiptHandle', 'AWSAccountId', 'QueueName'] }
				}
			}, {
				method : 'deleteMessageBatch', version : '2011-10-01',
				arrayProps : { 'DeleteMessageBatchResultEntry' : 1 },
				validations : {
					required : { params : ['AWSAccountId', 'QueueName']	}
				}
			}, {
				method : 'deleteQueue',
				validations : {
					required : { params : ['AWSAccountId', 'QueueName']	}
				}
			}, {
				method : 'getQueueAttributes',
				arrayProps : { 'Attribute' : 1 },
				validations : {
					required : { params : ['AWSAccountId', 'QueueName'] }
				}
			}, {
				method : 'getQueueUrl', 	version : '2011-10-01',
				validations : {
					required : { params : ['QueueName']	}
				}
			}, {
				method : 'listQueues', version : '2011-10-01',
				arrayProps : { 'QueryUrl' : 1 }
			}, {
				method : 'receiveMessage',
				arrayProps : { 'Attribute' : 1, 'Message' : 1 },
				validations : {
					required : { params : ['AWSAccountId', 'QueueName' ] }
				}
			}, {
				method : 'removePermission',
				validations : {
					required : { params : ['AWSAccountId', 'QueueName', 'Label'] }
				}
			}, {
				method : 'sendMessage',	version : '2011-10-01',
				validations : {
					required : { params : ['AWSAccountId', 'QueueName', 'MessageBody'] }
				}
			}, {
				method : 'sendMessageBatch', version : '2011-10-01',
				arrayProps : { 'SendMessageBatchResultEntry' : 1 },
				validations : {
					required : { params : ['AWSAccountId', 'QueueName']	}
				}
			}, {
				method : 'setQueueAttributes',
				validations : {
					required : { params : ['AWSAccountId', 'QueueName', 'Attribute.Name', 'Attribute.Value'] }
				}
			}
		]
	}, {
		property : 'SNS',
		endpoint : "http://sns."+regionEndpoint+".amazonaws.com",
		verb : 'POST',
		executor : snsExecutor,
		version : '2010-03-31',
		children : [
			{
				method : 'addPermission',
				validations : {
					required : { params : ['Label', 'TopicArn']	}
				}
			}, 	{
				method : 'confirmSubscription',
				validations : {
					required : { params : ['Token', 'TopicArn']	}
				}
			}, {
				method : 'createTopic',
				validations : {
					required : { params : ['Name'] }
				}
			}, {
				method : 'deleteTopic',
				validations : {
					required : { params : ['TopicArn'] }
				}
			}, {
				method : 'getSubscriptionAttributes',
				arrayProps : { 'entry' : 1 },
				validations : {
					required : { params : ['SubscriptionArn'] }
				}
			}, {
				method : 'getTopicAttributes',
				arrayProps : { 'entry' : 1 },
				validations : {
					required : { params : ['TopicArn'] }
				}
			}, {
				method : 'listSubscriptions',
				arrayProps : { 'member' : 1 }
			}, {
				method : 'listSubscriptionsByTopic',
				arrayProps : { 'member' : 1 },
				validations : {
					required : { params : ['TopicArn'] }
				}
			}, {
				method : 'listTopics',
				arrayProps : { 'member' : 1 }
			}, {
				method : 'publish',
				validations : {
					required : { params : ['TopicArn', 'Message'] }
				}
			}, {
				method : 'removePermission',
				validations : {
					required : { params : ['Label', 'TopicArn'] }
				}
			}, {
				method : 'setSubscriptionAttributes',
				validations : {
					required : { params : ['AttributeName', 'AttributeValue', 'SubscriptionArn'] }
				}
			}, {
				method : 'setTopicAttributes',
				validations : {
					required : { params : ['AttributeName', 'AttributeValue', 'TopicArn'] }
				}
			}, {
				method : 'subscribe',
				validations : {
					required : { params : ['TopicArn', 'Endpoint', 'Protocol'] }
				}
			}, {
				method : 'unsubscribe',
				validations : {
					required : { params : ['SubscriptionArn'] }
				}
			}
		]
	}, {
		property : "STS",
		endpoint : "https://sts.amazonaws.com",
		verb : 'POST',
		version : "2011-06-15",
		host : "sts.amazonaws.com",
		executor : stsExecutor,
		children : [
			{
				method : 'getSessionToken'
			}
		]
	}, {
		property : "DDB",
		endpoint : "https://dynamodb."+regionEndpoint+".amazonaws.com/",
		verb : 'POST',
		host : "dynamodb."+regionEndpoint+".amazonaws.com",
		algorithm : "HmacSHA256",
		contentType : "application/x-amz-json-1.0",
		validations : {
			required : { params : ['RequestJSON'] }
		},
		executor : dynamoDbExecutor,
		children : [
			{
				method : 'listTables'
			}, {
				method : 'batchWriteItem'
			}, {
				method : 'describeTable'
			}, {
				method : 'updateTable'
			}, {
				method : 'updateItem'
			}, {
				method : 'deleteTable'
			}, {
				method : 'getItem'
			}, {
				method : 'putItem'
			}, {
				method : 'scan'
			}, {
				method : 'query'
			}, {
				method : 'deleteItem'
			}, {
				method : 'batchGetItem'
			}, {
				method : 'createTable'
			}
		]
	}]
});

module.exports = AWS;
