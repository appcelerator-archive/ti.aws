# Change Log
<pre>
v1.0.3  Fix for S3:headObject not returning any data [MOD-950]
        Fix for S3:headBucket not returning any data [MOD-951]
        Refactored success and error callbacks to match other enterprise formats [MOD-953]
        Fix for S3:ListDomains not catching invalid parameters [MOD-922]
        Fix for signature mismatch in S3:uploadPartCopy [MOD-948]
        Fix for signature mismatch in S3:uploadPart [MOD-947]
        Fix for exception thrown in S3:getBucket and S3:headBucket [MOD-954]
        Fix for S3:completeMultiPartUpload failing with 'method not allowed' error [MOD-952]
        Fix for runtime error on Android with DynamoDB APIs [MOD-961]
        Fix for runtime errors on Android with most APIs [MOD-959]
        Fix for S3:putObject uploading zero-length file on Android [MOD-962]

v1.0.0	Initial Release
