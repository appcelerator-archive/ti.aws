/*
 * Amazon helper file
 * File contains functions which are used to generate payloads for api's
 *
 */

var awsHelper;
if( typeof exports !== 'undefined')
	awsHelper = exports;
else
	awsHelper = {}

/**
 * Routine that contructs querystring as payload without an URl with it.
 * @param - params- Its a javascript object that contains all elements required to create payload
 * @param - accessKeyId - Used to sign the payload
 * @param - secretKey - Used to sign the payload
 * @param - endpoint - contains the url which need to be hit, is used to extract the host part from it
 */
awsHelper.generatePayload = function(params, accessKeyId, secretKey, endpoint) {
	return SignAndEncodeParams(params, accessKeyId, secretKey, endpoint.replace(/.*:\/\//, ""), "POST", "/");
}
/**
 * Routine that contructs querystring as payload with an URl with it.
 * @param - params- Its a javascript object that contains all elements required to create payload
 * @param - accessKeyId - Used to sign the payload
 * @param - secretKey - Used to sign the payload
 * @param - endpoint - contains the url which need to be hit, is used to extract the host part from it
 */
awsHelper.generateSignedURL = function(actionName, params, accessKeyId, secretKey, endpoint, version) {
	var displayUri = endpoint;
	var uriPath = "/";
	params.Action = actionName;
	params.Version = version;

	//This is to append AWSAccountId along with QueueName in Endpoint for SQS
	if(params.hasOwnProperty('AWSAccountId') && params.hasOwnProperty('QueueName')) {
		var path = params.AWSAccountId + "/" + params.QueueName + "/";
		uriPath += path;
		displayUri += "/" + path;
	}

	displayUri += "?" + SignAndEncodeParams(params, accessKeyId, secretKey, endpoint.replace(/.*:\/\//, ""), "GET", uriPath);
	return displayUri;
}
/**
 * Routine that constructs the complete email and passes that back as a string
 * @param - Its a javascript object contains all elements required for creating signed string and url endpoint.
 * For More info Pls refer to : http://docs.amazonwebservices.com/ses/latest/APIReference
 */
awsHelper.generateSESParams = function(params) {
	var paramString = generateFlattenedQueryString(params);
	if (paramString && paramString.length > 0) {
		return '&' + paramString;
	}
	return '';
}
/**
 * Routine that contructs URL for SQS.
 * @param - params- Its a javascript object that contains all elements required to create payload
 * @param - accessKeyId - Used to sign the payload
 * @param - secretKey - Used to sign the payload
 * @param - endpoint - contains the url which need to be hit, is used to extract the host part from it
 */

awsHelper.generateSQSURL = function(actionName, params, accessKeyId, secretKey, endpoint, version) {
	if(params.hasOwnProperty('AWSAccountId') && params.hasOwnProperty('QueueName')) {
		endpoint += "/" + params.AWSAccountId + "/" + params.QueueName + "/";
		delete params.AWSAccountId;
		delete params.QueueName;
	}
	var url = endpoint + "?SignatureVersion=1&Action=" + actionName + "&Version=" + encodeURIComponent(version) + "&";
	for(var key in params) {
		var elementName = key;
		var elementValue = params[key];
		if(elementValue) {
			url += elementName + "=" + encodeURIComponent(elementValue) + "&";
		}
	}
	var timestamp = (new Date((new Date).getTime() + ((new Date).getTimezoneOffset() * 60000))).toISODate();
	url += "Timestamp=" + encodeURIComponent(timestamp) + "&SignatureMethod=HmacSHA1&AWSAccessKeyId=" + encodeURIComponent(accessKeyId);
	var stringToSign = generateStringToSignForSQS(url);
	var signature = sha.b64_hmac_sha1(secretKey, stringToSign);
	url += "&Signature=" + encodeURIComponent(signature);
	return url;
}
/**
 * Routine that generates the signed string based upn the params passed
 *
 * @param - Its a javascript object that contains all elements required for creating signed string
 * more on the signing string here --http://docs.amazonwebservices.com/AmazonS3/2006-03-01/dev/RESTAuthentication.html
 */
awsHelper.generateS3Params = function(params) {
	// The stringToSign and url properties of the params are created by concatenating various values to them.
	// This is really done in 2 parts:
	//   Part 1 is the base URL construction
	//   Part 2 is the query string construction

	//copySource is used by 'Put object copy and Upload part ' api's, which needs to be part of stringtosign
	var canonicalizedAmzHeaders = '';
	if (params.hasOwnProperty('copySource') && (params.hasOwnProperty('ObjectName'))) {
		canonicalizedAmzHeaders = 'x-amz-copy-source:' + params.copySource + '\n';
	}

	params.stringToSign = params.verb + '\n' + params.contentMD5 + '\n' + params.contentType + '\n' + params.curDate + '\n' + canonicalizedAmzHeaders + '/';

	// Now construct the query string part of the parameters
	var urlPart = '';

	// If there is a BucketName then we need to build it out
	if (params.hasOwnProperty('BucketName')) {
		urlPart += params.BucketName + '/';
		if (params.hasOwnProperty('ObjectName')) {
			urlPart += params.ObjectName;
		} else if (params.hasOwnProperty('key')) {
			urlPart += params.key;
		}
	}

	urlPart += params.subResource;

	// If there is a BucketName then there may be some additional query parameters to append
	if (params.hasOwnProperty('BucketName')) {
		var queryString = '';
		if (params.UploadId) {
			var queryStringArray = [];
			if (params.PartNumber) {
				queryStringArray.push('partNumber=' + params.PartNumber);
			}
			if (params.UploadId) {
				queryStringArray.push('uploadId=' + params.UploadId);
			}
			if (params.versionId) {
				queryStringArray.push('versionId=' + params.versionId);
			}
			queryString = queryStringArray.join('&');
		} else if (params.versionId) {
			queryString = 'versionId=' + params.versionId;
		}

		if (queryString.length > 0) {
			if (params.subResource === '?') {
				urlPart += queryString;
			} else if (params.subResource === '') {
				urlPart += '?' + queryString;
			} else {
				urlPart += '&' + queryString;
			}
		}

		// Append the query string parameters to the original URL
		params.url += urlPart;
	}

	params.stringToSign += urlPart;
}
/***
 * Function does the validation of apis
 * Return -- returns false in case of error else true
 * */
awsHelper.validateApi = function(thisRef, cbOnError, params) {
	if(thisRef.validations) {
		var errorResponse = sessionOBJ.utility.validateParams(params, thisRef.validations);
		if (errorResponse != "") {//means validations failed
			if(cbOnError) {
				var response = sessionOBJ.xmlToJSON.toJSON(errorResponse, true, null);
				response.message = 'Parameter validation failed';
				cbOnError(response.message, response);
			}
			return false;
		}
	}
	return true;
}
/***
 * Helper function for executors
 * */
awsHelper.prepareExecutor = function(thisRef) {
	if(thisRef.preparer && !thisRef.prepared) {
		thisRef.preparer();
		thisRef.prepared = true;
	}
}
/***
 * Function handles http error callback
 * */

awsHelper.findMessageText = function(obj) {
	if (obj.message) {
		return obj.message;
	} else if (obj.Message) {
		if (obj.Message instanceof Array) {
			return obj.Message[0];
		} else {
			return obj.Message
		}
	} else if (obj.Error) {
		if (obj.Error instanceof Array) {
			return awsHelper.findMessageText(obj.Error[0]);
		} else {
			return obj.Error;
		}
	} else if (obj.Errors) {
		if (obj.Errors instanceof Array) {
			return awsHelper.findMessageText(obj.Errors[0]);
		}
	}
	return null;
}

awsHelper.httpError = function(thisRef, jsonResponse, e, cbOnError)
{
	if(cbOnError) {
		var response = jsonResponse || {};
		response.message = awsHelper.findMessageText(response) || e.error || 'HTTP request failed';
		response.requestUri = thisRef.location;
		response.statusCode = thisRef.status;
		response.statusText = thisRef.statusText;
		response.responseText = thisRef.responseText;

		cbOnError(response.message, response);
	}
}

/***
 * Function handles http success callback
 * */
awsHelper.httpSuccess = function(thisRef, data, cbOnData)
{
	if (cbOnData) {
		var headers;
	    if (thisRef.getResponseHeaders) {
	        // iOS
	        headers = thisRef.getResponseHeaders();
		    // NOTE: The ASI HTTP library used by Titanium on iOS makes an internal call
		    // to CFHTTPMessageCopyAllHeaderFields. This ends up changing 'ETag' to 'Etag' which
		    // can cause issues with applications expecting it to be 'ETag'. This does not occur
		    // on Android. We rename it here for parity.
		    if (headers.hasOwnProperty('Etag')) {
			    headers['ETag'] = headers['Etag'];
			    delete headers['Etag'];
		    }
	    } else if (thisRef.allResponseHeaders) {
			// Android
			headers = {};
			var rawHeaders = thisRef.allResponseHeaders;
			var pairs = rawHeaders.split('\n');
			for (var p = 0; p < pairs.length; p++) {
				var keyValues = pairs[p].split(':');
				headers[keyValues.shift()] = keyValues.join(':');
			}
	    } else {
		    Ti.API.error("Unsupported platform! Don\'t know how to get headers from Ti.Network.HTTPClient!");
	    }

		var response = {
			requestUri: thisRef.location,
			statusCode: thisRef.status,
			statusText: thisRef.statusText,
			headers: headers,
			data: data
		};

		cbOnData(response.data, response);
	}
}
/***
 * Function creates HTTP request
 * Return-- Returns http object with error and success callbacks attached
 * */
awsHelper.createHttpObject = function(thisRef, cbOnData, cbOnError) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(response) {
		awsHelper.httpSuccess(this, sessionOBJ.xmlToJSON.toJSON(this.responseText, false, thisRef.arrayProps), cbOnData);
	};
	xhr.onerror = function(e) {
		awsHelper.httpError(this, sessionOBJ.xmlToJSON.toJSON(this.responseText, false, null), e, cbOnError);
	}
	return xhr;
}
/**
 *  Function creates signature and payload
 *  @param - params --  An array containing values to be signed and be part of payload
 *  @param - accessKeyId - Used to sign the payload
 *  @param - secretKey - Used to sign the payload
 *  @param - host - host uri
 *  @param - verb - http verb
 *  @param - uriPath - http endpoint
 */
function SignAndEncodeParams(params, accessKeyId, secretKey, host, verb, uriPath) {
	var signer = new AWSV2Signer(accessKeyId, secretKey);
	params = signer.sign(params, new Date(), {
		"verb" : verb,
		"host" : host,
		"uriPath" : uriPath
	});
	var encodedParams = [];
	for(var key in params) {
		if(params[key] !== null) {
			encodedParams.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
		} else {
			encodedParams.push(encodeURIComponent(key));
		}
	}
	return payload = encodedParams.join("&");
}

function generateFlattenedQueryString(obj)
{
	var items = [];
	var add = function(key, value) {
		items.push(key + '=' + value || '');
	}

	if (obj) {
		buildParams(obj, null, add);
	}

	return items.join("&");
}

function buildParams(obj, parent, add) {
	var prefix = parent ? parent + '.' : '';
	if (Object.prototype.toString.call(obj) === '[object Array]') {
		for (var i= 0, len=obj.length; i < len; i++) {
			buildParams(obj[i], prefix + 'member.' + (i+1), add);
		}
	} else if ((typeof obj.getMimeType === 'function') || (typeof obj === 'string')) {
		add(parent, obj.toString() || '');
	} else if (typeof obj == 'object') {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				buildParams(obj[key], prefix + key, add);
			}
		}
	}
}

/**
 * Routine that contructs StringToSign for SQS.
 * @param - url- Its a URL containing various paramters
 */
function generateStringToSignForSQS(url) {
	var stringToSign = "";
	var query = url.split("?")[1];
	var params = query.split("&");
	params.sort(utility.ignoreCaseSort);
	for(var i = 0; i < params.length; i++) {
		var param = params[i].split("=");
		if(param[0] == 'Signature' || undefined == param[1])
			continue;
		stringToSign += param[0] + decodeURIComponent(param[1]);
	}
	return stringToSign;
}
