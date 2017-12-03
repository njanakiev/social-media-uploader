var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');
var upload = require('./upload.js');
var YAML = require('yamljs')

// Check arguments
isDebug     =  (process.argv.indexOf('-d') > -1);
isHelp      =  (process.argv.indexOf('-h') > -1);
if(isHelp){
	console.log('-h :        Help');
	console.log('-d :        Debug');
	console.log('-f [file] : upload file');
	process.exit();
}

fileIdx = process.argv.indexOf('-f') + 1
if((process.argv.indexOf('-f') > -1) && fileIdx < process.argv.length){
	console.log('Uploading file : ' + process.argv[fileIdx]);
	output_file = process.argv[fileIdx];
		
	// Check file size to be under 2 MB for tumblr
	var stats = fs.statSync(process.argv[fileIdx])
	if((stats["size"] / 1048576.0) < 2.0){  // 2^20
		switch(path.extname(output_file).toLowerCase()){
			case ".jpg":
			case ".png":
				isAnimation = false;
				break;
			case ".gif":
				isAnimation = true;
				break;
		}
	}else{
		console.log('File size over 2MB : ' + (stats["size"] / 1048576.0));
		process.exit()
	}
}else{
	console.log('No file specified');
	process.exit()
}

// Load configuration file
config_file = 'config.yml'
YAML.load(config_file, function(params){
	if(params){
		if(!isDebug){
			if(params.tumblr.upload){
				console.log("Posting image on tumblr ...");
				upload.tumblr(output_file, params.tumblr);
			}
			if(params.twitter.upload){
				console.log("Posting image on twitter ...");
				upload.twitter(output_file, params.twitter);
			}
		}else{
			console.log(params.tumblr);
			console.log(params.twitter);
		}
	}else{
		console.log('ERROR reading ' + config_file);
		process.exit();
	}
});
