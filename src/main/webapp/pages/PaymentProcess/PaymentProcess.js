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

Page.getCurrentYear = function () {
    var yr = new Date().getFullYear();
    return yr;
};


function successFn(orderId, i) {
    var dataObj = Page.Variables.LV_CartItemsData.dataSet[i];
    if (i < Page.Variables.LV_CartItemsData.dataSet.length) {
        Page.Variables.LV_InsertOrderLineItems.setInput({
            "productId": dataObj.productId,
            "quantity": dataObj.productQuantity,
            "pricePerUnit": dataObj.currentPrice,
            "productLineAmount": dataObj.totalPrice,
            "orderId": orderId
        });

        Page.Variables.LV_InsertOrderLineItems.createRecord({}, function (data) {
            Page.Variables.SV_UpdateQuantityFromPI.setInput({
                "qty": data.quantity,
                "productId": data.productId
            });

            Page.Variables.SV_UpdateQuantityFromPI.invoke({}, function () {
                successFn(orderId, ++i);
            });

        });

    } else {
        Page.Actions.goToPage_Orders.invoke();
    }
}
Page.LV_InsertOrdersonSuccess = function (variable, data) {
    successFn(data.orderId, 0);
};

Page.wizard_paymentDone = function (widget, steps) {
    Page.Variables.LV_InsertOrders.setInput('orderDate', Date.now());
};

Page.form_field14Keypress = function ($event, widget) {
    var charCode = ($event.which) ? $event.which : $event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        $event.preventDefault();
    }
};

Page.SV_getInventoryDetailsonBeforeUpdate = function (variable, inputData) {
    var pids = _.map(Page.Variables.LV_CartItemsData.dataSet, 'productId');
    inputData.productIds = pids.join(',');
};

Page.SV_getInventoryDetailsonSuccess = function (variable, data) {
    var requiredQuantities = _.map(Page.Variables.LV_CartItemsData.dataSet, 'productQuantity'),
        quantities = _.map(data, 'quantity'),
        validOrder = _.every(quantities, function (item, index) {
            return item >= requiredQuantities[index];
        });

    if (validOrder) {
        Page.Variables.LV_InsertOrders.setInput('orderDate', Date.now());
        Page.Variables.LV_InsertOrders.createRecord();
    } else {
        Page.Actions.Cancel_outOfStock.invoke();
    }
};

Page.radioset5Change = function ($event, widget, newVal, oldVal) {
    Page.Widgets.select4.datavalue = undefined;
};

