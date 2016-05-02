var wiki = require('../wiki');
var execPhp = require('exec-php');
var parseStack = [];
var parseCount = [];

module.exports = function(n, ba){
	var d = doNothing
	if(wiki.verbose) d = console.log;
	var wikiContent = n.replace(/\r\n/g, "\n");
	var temp;
	var currentStack = -1;
	
	for (var i = 0, len = wikiContent.length; i < len; i++) {
		if(wikiContent[i] == "=") {
			// possible title tag
			if(typeof parseStack[currentStack] != "undefined" && parseStack[currentStack] == "MONI_TITLE_OPEN") {
				//title close tag
				parseStack[++currentStack] = ("MONI_TITLE_CLOSE");
				if(typeof parseCount["MONI_TITLE_CLOSE"] == "undefined") {
					parseCount["MONI_TITLE_CLOSE"] = 0;
				}
				parseCount["MONI_TITLE_CLOSE"]++;
			} else {
				parseStack[++currentStack] = ("MONI_TITLE_OPEN");
				if(typeof parseCount["MONI_TITLE_OPEN"] == "undefined") {
					parseCount["MONI_TITLE_OPEN"] = 0;
				}
				parseCount["MONI_TITLE_OPEN"]++;
			}
		} else if(wikiContent[i] == " " || wikiContent[i] == "\n") {
			//space of new line(end of tag)
			if(typeof parseStack[currentStack] != "undefined" && parseStack[currentStack] == "MONI_TITLE_CLOSE") {
				//check tags
			}
		}
	}
}
function doNothing(a) {}
