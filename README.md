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
	'thumbnail': 'http://aws.amazon.com/file.jpg',
	'exif': { // optional
		'EXIF ColorSpace': 'sRGB',
		'EXIF FocalLength': 24,
		'Image make': 'Canon'
		// etc.
	}
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

## License

The MIT License (MIT)

Copyright (c) 2014 Andrew Chavez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.