var fs = require('fs');

//require('./take-screenshots.js').then (function() {

    var PNGDiff = require('png-diff');

    var urls = [
        "http://localhost/PayzaDotCom/available-currencies",
        "http://localhost/PayzaDotCom/personal",
        "http://localhost/PayzaDotCom/features",
    ]

    var sourceFolderName = 'screenshots-for-processing/source-versions/';
    var targetFolderName = 'screenshots-for-processing/target-versions/';
    var diffFolderName = 'screenshots-for-processing/diff-versions/';

    for (var i in urls) {

        var screenshotName = urls[i].split('/').pop() + '.png';


        var image2Stream = fs.createReadStream(targetFolderName + screenshotName);
        PNGDiff.outputDiff(sourceFolderName + screenshotName, image2Stream, diffFolderName + screenshotName, function (err, diffMetric ) {
            if (err) throw err;
            console.log(diffMetric === 1 ? screenshotName + ': Difference detected.' : 'No difference');
        });

    }

//})


