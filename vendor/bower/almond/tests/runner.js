var page = require('webpage').create();

page.onAlert = function () {
    if (page.evaluate(function () { return doh._doneForPhantom; })) {
        var problems = page.evaluate(function () {
            return doh._errorCount + doh._failureCount;
        });
        phantom.exit(problems ? 1 : 0);
    }
};

var first = true;
page.onLoadFinished = function (status) {
    if (first) {
        first = false;
        page.evaluate(function () {
            var oldReport = doh._report;
            doh._report = function () {
            	oldReport.apply(doh, arguments);
            	this._doneForPhantom = true;
            	alert();
            };
            doh.run();
        });
    }
};

page.onConsoleMessage = function () {
    console.log.apply(console, arguments);
};

page.open('http://localhost:1986/tests/doh/runner.html?testUrl=../all');
