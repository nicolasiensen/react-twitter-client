class ChangeTab extends Helper {

  waitTabsLoading(ammountOfTabs, timeout) {
        timeout = timeout || 15;
        let client = this.helpers['WebDriverIO'].browser;
        return client
            .waitUntil(function () {
                return this.getTabIds().then(function (handles) {
                    return handles.length === ammountOfTabs
                });
            }, timeout * 1000, "The number of tabs hasn't changed to " + ammountOfTabs);
    }

    changeTab(num) {
        let client = this.helpers['WebDriverIO'].browser;
        return client
            .getTabIds().then(function (handles) {
                return this.switchTab(handles[num - 1]);
            });
    }

}

module.exports = ChangeTab;
