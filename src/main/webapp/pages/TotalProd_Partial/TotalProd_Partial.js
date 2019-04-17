/* perform any action on widgets/variables within this block */

Partial.onReady = function () {
    /*
     * variables can be accessed through 'Partial.Variables' property here
     * e.g. to get dataSet in a staticVariable named 'loggedInUser' use following script
     * Partial.Variables.loggedInUser.getData()
     *
     * widgets can be accessed through 'Partial.Widgets' property here
     * e.g. to get value of text widget named 'username' use following script
     * 'Partial.Widgets.username.datavalue'
     */

};

/*
 * This method is called before fetching the records.
 */

Partial.LV_ProductDataonBeforeListRecords = function (variable, dataFilter, options) {
    var data = variable._downgradeInputData(dataFilter);
    //Please make your changes to the existing old callbacks.
    var response = Partial.LV_ProductDataonBeforeUpdate(variable, data, options);
    if (response === false) {
        return false;
    }
    return variable._upgradeInputData(response, data);
};

Partial.LV_ProductDataonBeforeUpdate = function (variable, data) {
    var cat = App.activePageName == 'AllProducts' ? '' : App.activePageName;
    data.category = {
        'value': cat
    };

    App.setStatusData(data, _.get(Partial, ['pageParams', 'GetTotalStock']));
    Partial.Variables.LV_ProductData.orderBy = _.get(Partial, ['pageParams', 'Sorting']);
};

Partial.anchor_viewClick = function ($event, widget, item, currentItemWidgets) {
    Partial.Widgets.dialog_prodSpec.open(Partial);
};

Partial.dialog_prodSpec_dialog_prodSpecClose = function ($event, widget) {
    Partial.Widgets.AllProducts.selecteditem = undefined;
};

