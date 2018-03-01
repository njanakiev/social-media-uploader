# social-media-uploader
This is a simple uploader for social media for Twitter and Tumblr via their API. 

In order to run the upload the following three files are necessary, where the first two files consist of the API keys. The keys for the Twitter upload can be obtained at [Twitter Developers](https://dev.twitter.com/), by creating a new app. They need to be added in the file

__twitter_config.js__

```
module.exports = {
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...'
}
```

Similarly the keys for the Tumblr upload can be obtained at [Tumblr Developers](https://www.tumblr.com/developers). Again they need to be added in the file

__tumblr_config.js__

```js
module.exports = {
  consumer_key:     '...',
  consumer_secret:  '...',
  token:            '...',
  token_secret:     '...'
}
```

The last file is the configurations for upload, which are set in the following [YAML](https://en.wikipedia.org/wiki/YAML) file

__config.yml__

```yaml
---
twitter:
  caption: 'Caption #tag'
  altText: 'altText'
  upload: true

tumblr:
  blogName: 'blogName'
  caption: 'Caption'
  tags: 'tag,tag,tag'
  upload: true
```

Finally in order to upload an image or GIF animation run the command

```
node index.js -f [FILE]
```
