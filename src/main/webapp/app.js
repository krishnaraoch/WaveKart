App.onPageReady = function (activePageName, activePageScope, $activePageEl) {
    App.onAppVariablesReady();
};

/* perform any action on the variables within this block(on-page-load) */

App.onAppVariablesReady = function () {
    /*
     * variables can be accessed through 'App.Variables' property here
     * e.g. App.Variables.staticVariable1.getData()
     */

};

App.updateBread = function (pageName) {
    App.Variables.BreadCrumb_Var.setItem(1, {
        "PageName": pageName,
        "Link": "#/" + pageName
    });

    App.Variables.BreadCrumb_Var.removeItem(2);
};

App.setStatusData = function (data, value) {
    var stat = value ? '' : 'Available';
    data['productInventory.status'] = {
        'value': stat
    };

};

App.loginVariableonSuccess = function (variable, data) {
    if (_.includes(App.Variables.loggedInUser.dataSet.roles, 'admin')) {
        App.Actions.goToPage_Admin.invoke();
    } else if (_.includes(App.Variables.loggedInUser.dataSet.roles, 'user')) {
        location.reload();
    }
};

