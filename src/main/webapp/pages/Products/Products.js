/* perform any action on widgets/variables within this block */

Page.onReady = function () {
    /*
     * variables can be accessed through 'Page.Variables' property here
     * e.g. to get dataSet in a staticVariable named 'loggedInUser' use following script
     * Page.Variables.loggedInUser.getData()
     *
     * widgets can be accessed through 'Page.Widgets' property here
     * e.g. to get value of text widget named 'username' use following script
     * 'Page.Widgets.username.datavalue'
     */

};

Page.SelectedProductDataonSuccess = function (variable, data) {
    Page.Variables.BreadCrumb_Var.setItem(1, {
        "PageName": data[0].category,
        "Link": "#/" + data[0].category
    });

    Page.Variables.BreadCrumb_Var.setItem(2, {
        "PageName": data[0].productName
    });

};

Page.LV_Cart_InfoonSuccess = function (variable, data) {
    if (data.length) {
        Page.Variables.LV_UpdateCartItems_Quantity.updateRecord();
    } else {
        Page.Variables.Insert_into_Cart.createRecord();
    }
};

