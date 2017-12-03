var tumblr = require('tumblr.js');

// TODO add Twitter
// TODO add statistics
// Tumblr setup
var client = tumblr.createClient(require('./tumblr_config'));
blogName = 'parametriccookie';

client.userInfo(function(err, data){
	if(err != null){
		console.log(err);
		process.exit();
	}
	
	data.user.blogs.forEach(function(blog){
		client.blogPosts(blog.name, function(err, data){
			console.log(blog.name);
			if(err != null){
				console.log(err);
			}else{
				data.posts.forEach(function(post){
					console.log(post.date)
					console.log(post.type)
					console.log(post.summary)
				});
			}
		});
	});
});

