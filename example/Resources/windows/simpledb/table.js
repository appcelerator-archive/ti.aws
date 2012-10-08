Ti.include(
    'simpledbApi.js'
);

windowFunctions['SimpleDb'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    var table = Ti.UI.createTableView({
        backgroundColor: '#fff',
        top: offset + u,
        data: createRows([
            'List Domains',
            'createDomain',
            'domainMetadata',
            'getAttributes I1',
            'getAttributes I2',
            'putAttributes I1',
            'batchPutAttributes I1, I2',
            'batchDeleteAttributes I1, I2',
            'deleteAttributes I1',
            'deleteAttributes I2',
            'select',
            'deleteDomain'
        ])
    });
    table.addEventListener('click', handleOpenWindow);
    win.add(table);
    win.open();
};