# Photostreamer server

**Work in progress...** Description will go here.

## Sending photos to the server

#### Pushing thumbnails

To push a photo the server, upload a thumbnail to the Web, then send a `POST` with a JSON-encoded body with the following information to `http://SERVER/photo/thumb`:

```javascript
{
	'created': '2014-05-25T18:18:17.056Z', // set by sender or auto-created
	'sender': '',
	'filesize': 108731131,
	'fileid': 'some string',
	'dimensions': {
		width: 1700,
		height: 300
	},
	'thumbnail': 'http://aws.amazon.com/file.jpg'
}
```

Assuming everything worked OK and the request was formatted properly, you should receive a `200`.

#### Sending high-resolution photos

The point of only sending thumbnails of all files is that only the high-resolution photos you want are transmitted. So the sending device needs to periodically do a `GET` for `http://SERVER/requests/SENDER`, which will return an array of `fileid`s:

```javascript
[
	'file.jpg',
	'file1.jpg',
	'file2.jpg'
]
```
If no high-resolution photos have been requested, the server will return an empty array.

For each requested photo, repeat the process followed with the thumbnails. Upload the file to the Web then `POST` a JSON-encoded body to `http://SERVER/photo/full` with the following information:

```javascript
{
	'sender': '',
	'fileid': 'some string',
	'full': 'http://aws.amazon.com/file.jpg'
}
```

You'll receive a `200` back on success.