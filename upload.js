var fs = require('fs');
var tumblr = require('tumblr.js');
var Twit = require('twit');


var client_tumblr = tumblr.createClient(require('./tumblr_config'));  // Tumblr setup
var client_twitter = new Twit(require('./twitter_config'));  // Twitter setup

module.exports = {
	tumblr: function(output_file, params){
		var b64content = fs.readFileSync(output_file, {encoding: 'base64'});
		client_tumblr.createPhotoPost(params.blogName,
			{
				caption: params.caption,
				tags: params.tags,
				data64: b64content
			}, 
			function(err, json) {
				if(err != null){
					console.log(err);
				} else {
					console.log('Image posted on Tumblr');
					console.log(json);
				}
			}
		);
	},
	twitter: function(output_file, params) {
		var b64content = fs.readFileSync(output_file, {encoding: 'base64'});
		// first we must post the media to Twitter
		client_twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
			// now we can assign alt text to the media, for use by screen readers and
			// other text-based presentations and interpreters
			var mediaIdStr = data.media_id_string
			var altText = params.altText
			var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

			client_twitter.post('media/metadata/create', meta_params, function (err, data, response) {
				if (!err) {
					// now we can reference the media and post a tweet (media will attach to the tweet)
					client_twitter.post('statuses/update', 
						{ status: params.caption, media_ids: [mediaIdStr] }, 
						function (err, data, response) {
							console.log('Image posted on Twitter');
							console.log(data.created_at);
							console.log(data.user.screen_name);
							console.log('Number of statuses : ' + data.user.statuses_count);
						}
					);
				} else {
					console.log(err);
				}
			});
		});
	}
}