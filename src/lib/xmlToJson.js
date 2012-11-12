/**
 * xmlToJS Module 0.1
 *
 * To use:
 * var xmlToJS = require('xmlToJS');
 * var jsObject = xmlToJS.convert(xml);
 *
 * This will take XMl like the following:
 *
 <atom:feed xmlns:atom="http://www.w3.org/2005/Atom">
 <atom:title>someTitle</atom:title>
 <atom:updated>2012-03-22T15:47:54Z</atom:updated>
 <atom:entry>
 <atom:value>value one</atom:value>
 </atom:entry>
 <atom:entry>
 <atom:value>value two</atom:value>
 <atom:readonly />
 </atom:entry>
 <atom:entry>
 <atom:value>value three</atom:value>
 </atom:entry>
 </atom:feed>
 *
 * and turn it in to a predictable, easily used form:
 *
 {
 title: [ 'someTitle' ],
 updated: [ '2012-03-22T15:47:54Z' ],
 entry: [
 { value: [ 'value one' ] },
 { value: [ 'value two' ], readonly: [ null ] },
 { value: [ 'value three' ] }
 ]
 }
 *
 * Note that nodes always result in arrays, even if there is only a single value inside of them.
 */

var xmlToJS;
if(typeof exports !== 'undefined')
	xmlToJS = exports;
else
	xmlToJS = {}

//Adding a trim function in String prototype for removing the whitespaces
String.prototype.trim = function() {
	return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

/**
 * Recursively converts a Titanium XML document or node in to a JSON representation of it.
 */
xmlToJS.convert = function convert(xml, arrayProps) {
	var retVal = {};
	function cleanName(name) {
		return name.split(':').join('_');
	}
	var attrs = xml.attributes;
	if(attrs && attrs.length) {
		for(var i1 = 1, l1 = attrs.length; i1 < l1; i1++) {
			var attr = attrs.item(i1);
			retVal[cleanName(attr.name)] = attr.getValue();
		}
	}
	var nodes = xml.childNodes;
	if(nodes && nodes.length) {
		for(var i2 = 0, l2 = nodes.length; i2 < l2; i2++) {
			var node = nodes.item(i2);
			switch (node.nodeType) {
				case node.ELEMENT_NODE:
					var name = cleanName(node.nodeName);
					if (typeof(retVal[name]) == 'undefined') {
						if (arrayProps && arrayProps[name]) {
							retVal[name] = [ convert(node, arrayProps) ];
						} else {
							retVal[name] = convert(node, arrayProps);
						}
					} else {
						if (typeof(retVal[name].push) == 'undefined') {
							var old = retVal[name];
							retVal[name] = [];
							retVal[name].push(old);
						}
						retVal[name].push(convert(node, arrayProps));
					}
					break;
				case node.TEXT_NODE:
					// If data is a JSON formatted string then parse it. Note that we must get the full
					// textContent from the parent node as the XML parser will break the JSON string
					// into multiple text nodes. We want the full text value for the element. [MOD-1016]
					var result = node.nodeValue;
					try {
						if (result.substr(0, 1) === '{') {
							result = JSON.parse(node.parentNode.textContent);
						}
					} catch (e) {
					}
					return result;
					break;
			}
		}
	}
	if(!(attrs && attrs.length) && !(nodes && nodes.length)) {
		// empty node
		return null;
	}
	return retVal;
};
/**
 * Routine that handles the response provided by the Service.
 *
 * @param response - the XML response returned from the service.
 * @param isClean - Boolean variable indicating the structure of the response XML.
 */

xmlToJS.toJSON = function toJSON(response, isClean, arrayProps) {
	if(( typeof response === 'string') && (response !== null && response !== '')) {
		//For a clean xml string
		if(isClean) {
			//Returning the JSON response after calling the convert function with Titanium XML document of service response
			return xmlToJS.convert(Ti.XML.parseString(response).documentElement, arrayProps);
		} else {//For an unclean XML
			var xml = "";
			//Iterating through the xml by slicing tags
			while(response.indexOf('<') > -1) {
				//Removing the whitespaces between the tags and concatenating the XML for traversing
				xml = xml + response.slice(response.indexOf('<'), response.indexOf('>') + 1);
				xml = xml + response.slice(response.indexOf('>') + 1, response.indexOf('<', response.indexOf('>'))).trim();
				response = response.substring(response.indexOf('>') + 1);
			}
			//Returning the JSON response after calling the convert function with Titanium XML document of service response
			return xmlToJS.convert(Ti.XML.parseString(xml).documentElement, arrayProps);
		}
	} else {
		return {};
	}

}
