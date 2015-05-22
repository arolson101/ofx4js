var fs = require("fs");
var path = require('path');

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};


var locationList = {};

walk("src", function(err,results) {
	if(err) throw err;
  
  var indices = {};
	for(var i in results) {
		var result = results[i];
    var dir = path.dirname(result);
    if(!(dir in indices)) {
      indices[dir] = [];
    }
    var name = path.basename(result, ".ts");
    indices[dir].push(name);
	}
  
  for(var dir in indices) {
    var names = indices[dir];
    var indexPath = dir + "\\index.ts";
    
    console.log(dir, names);
  }
});


function buildLocations(path) {
	//console.log(path);
	var data = fs.readFileSync(path);
  
  var ns = "";
  var nspattern = /module (ofx4js[.\w]*)\s*{/;
  var match = nspattern.exec(data);
  if(match) {
    ns = match[1] + ".";
  }
  
	var pattern = /export\s+(?:\/\*[^\*]*\*\/\s+)?(?:function|class|enum|interface)\s+(\w+)/g;
	while(match = pattern.exec(data)) {
		var name = ns + match[1];
    //console.log(name);
		locationList[name] = path;
	}
}
