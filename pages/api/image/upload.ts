import { NextApiRequest, NextApiResponse } from 'next';
const multer = require('multer')
const uuid = require('uuid').v4
const upload = multer({dest: 'uploads/'})

const Upload = (req : NextApiRequest, res : NextApiResponse) => {
    const {avatar} = req.body;
    upload.single(avatar)
    return res.json({status : 'OK'})
}

export default Upload