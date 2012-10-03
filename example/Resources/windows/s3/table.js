Ti.include(
    's3Api.js'
    
);

windowFunctions['S3'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    var table = Ti.UI.createTableView({
        backgroundColor: '#fff',
        top: offset + u,
        data: createRows([
        		'putBucket',
        		'putBucketPolicy',
        		'putObject',
        		'getObject',
        		'putObjectCopy',
        		'headObject',
        		'headBucket',
        		'deleteObject',
        		'deleteMultipleObjects',
        		'deleteBucket',
        		'getObjectTorrent',
        		'initiateMultipartUpload',
        		'listParts',
        		'uploadPart',
        		'uploadPartCopy',
        		'getBucket'
        		
        		
        		
        		
        		
        		//'getSessionToken',
        ])
    });
    table.addEventListener('click', handleOpenWindow);
    win.add(table);
    win.open();
};