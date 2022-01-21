import { request } from "http";
import fs from "fs"

fs.readFile('/path/to/local-file.jpg', (err, data) => {
 if (err) throw err;

 const token = fetch("/api/sirv").then(x=>json.stringify(x))

 var options = {
  method: 'POST',
  url: 'https://api.sirv.com/v2/files/upload',
  qs: {filename: '/path/to/uploaded-image.jpg'},
  headers: {
   'content-type': 'image/jpeg',
   authorization: `Bearer ${token}` 
  },
  body: data
 };

 request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
 });

});