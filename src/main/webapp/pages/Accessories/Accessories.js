/* perform any action on widgets/variables within this block */

Page.onReady = function () {
    /*
     * variables can be accessed through 'Page.Variables' property here
     * e.g. to get dataSet in a staticVariable named 'loggedInUser' use following script
     * Page.Variables.loggedInUser.getData()
     * widgets can be accessed through 'Page.Widgets' property here
     * e.g. to get value of text widget named 'username' use following script
     * 'Page.Widgets.username.datavalue'
     */

    App.updateBread(App.activePageName);
};

/*
 * This method is called before fetching the records.
 */

Page.LV_ProductDataonBeforeListRecords = function (variable, dataFilter, options) {
    var data = variable._downgradeInputData(dataFilter);
    //Please make your changes to the existing old callbacks.
    var response = Page.LV_ProductDataonBeforeUpdate(variable, data, options);
    if (response === false) {
        return false;
    }
    return variable._upgradeInputData(response, data);
};

Page.LV_ProductDataonBeforeUpdate = function (variable, data) {
    App.setStatusData(data);
};

