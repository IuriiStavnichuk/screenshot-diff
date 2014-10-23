var fs = require('fs');
function prepaireInfoForScreenshot(png, testName) {
    var browserName="";
    var formattedTime="";
    var url_="";
    browser.getCapabilities().then(function (capabilities) {
        browserName = capabilities.caps_.browserName;
        formattedTime = capabilities.currentTime;
    });
    browser.getCurrentUrl().then(function (currentUrl) {
        url_= currentUrl.split('/').pop();
        url_=url_.replace(".",'_'); url_=url_.replace("#",'');
        var dt = new Date();
        var formattedTime=dt.getFullYear() + "." + (1+dt.getMonth()) + "." + dt.getDate()+ "-" + dt.getHours()+ "." + dt.getMinutes();
        var folderName = 'screenshots/'+formattedTime;
        fs.mkdir( folderName , 0777, true, function (err) { if (err) { console.log(err);} else { console.log('Directory created >>>'); } });
        var folderName = 'screenshots/'+formattedTime+'/'+url_;
        fs.mkdir( folderName , 0777, true, function (err) { if (err) { console.log(err);} else { console.log('Directory created >>>'); } });
        writeScreenShot(png, folderName+'/'+browserName+'-'+testName+'.png');
    });
}
function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(buf = new Buffer(data, 'base64'));
    stream.end();
}
var browser = protractor.getInstance();


var urls=[
    "http://localhost/PayzaDotCom/",
    "http://localhost/PayzaDotCom/personal",
    "http://localhost/PayzaDotCom/features",
]

for (var i in urls) {
    browser.get(urls[i]);
    browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png, 'test1'); } );
}

