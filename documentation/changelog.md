# Change Log
<pre>
<p>v1.1.5  Fixed iOS platform detection to include iPad and iPhone [MOD-1321]</p>
<p>v1.1.4  Added documentation for all the existing AWS services, along with Sample Code Snippets.</p>
<p>v1.1.3  Fixed issue with JSON data returned in XML payloads (e.g., ReceiveMessage body) [MOD-1016]</p>
<p>v1.1.2  Updated all top-level property names to use uppercase CamelCase naming convention [MOD-974]</p>
<p>v1.1.1  Fixed getPresignedUrl method to properly handle objects inside buckets [MOD-1001]
        Improved logic for extracting error message string from response [MOD-1012]
        Data parameter of success callback for GetObject/GetObjectTorrent is now a blob object [MOD-1005]</p>
<p>v1.1.0  Refactored data object parsing to remove unnecessary array references for single value elements [MOD-980]
        Fix in example application for locating files on Android [MOD-963][MOD-977]
        Fix in example application for namespace collision [MOD-972]
        Fix in example application for sendRawEmail [MOD-955]
        Refactored SES code to properly generate query parameters for email messages [MOD-973]
        Updated all property names to match names in AWS documentation [MOD-974]
        Added code to rename 'Etag' header property name to 'ETag' on iOS for parity/consistency with Android [MOD-963]
        Added support for specifying properties that are always converted to arrays [MOD-985]
        Updated DDB success callback to return converted JSON object instead of JSOn string [MOD-987]</p>
<p>v1.0.3  Fix for S3:headObject not returning any data [MOD-950]
        Fix for S3:headBucket not returning any data [MOD-951]
        Refactored success and error callbacks to match other enterprise formats [MOD-953]
        Fix for S3:ListDomains not catching invalid parameters [MOD-922]
        Fix for signature mismatch in S3:uploadPartCopy [MOD-948]
        Fix for signature mismatch in S3:uploadPart [MOD-947]
        Fix for exception thrown in S3:getBucket and S3:headBucket [MOD-954]
        Fix for S3:completeMultiPartUpload failing with 'method not allowed' error [MOD-952]
        Fix for runtime error on Android with DynamoDB APIs [MOD-961]
        Fix for runtime errors on Android with most APIs [MOD-959]
        Fix for S3:putObject uploading zero-length file on Android [MOD-962]</p>
<p>v1.0.0  Initial Release</p>
</pre>