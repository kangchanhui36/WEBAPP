const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const serverless = require('serverless-http');

const app = express();

app.use(bodyParser.json());
app.use(cors()); 

app.post('/savePost', (req, res) => {
  const postContent = req.body.content;
  console.log('게시글 내용:', postContent);
  res.json({ message: '게시글이 서버에 저장되었습니다.' });
});

module.exports.handler = serverless(app);
