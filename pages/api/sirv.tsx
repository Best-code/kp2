import { NextApiResponse, NextApiRequest } from "next";

'use strict';

const http = require('https');

const options = {
    'method': 'POST',
    'hostname': 'api.sirv.com',
    'path': '/v2/token',
    'headers': {
        'content-type': 'application/json'
    }
};

const clientId = process.env.SIRV_CLIENT
const clientSecret = process.env.SIRV_SECRET

let token : String;

const req = http.request(options, (res : NextApiResponse) => {
  const chunks : any = [];

  res.on('data', (chunk) => {
  chunks.push(chunk);
  });

  res.on('end', () => {
  const body = Buffer.concat(chunks);
  const apiResponse = JSON.parse(body.toString());

  token = apiResponse.token;
  console.log('token:', token);
  console.log('expiresIn:', apiResponse.expiresIn);
  console.log('scope:', apiResponse.scope);
  });
});

req.write(JSON.stringify({
  clientId,
  clientSecret
}));

req.end()

const SirvToken = (req : NextApiRequest, res:NextApiResponse) => {
    res.json([JSON.stringify(token)][0])
}

export default SirvToken;