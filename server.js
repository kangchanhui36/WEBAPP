const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // cors 모듈 임포트

const app = express();

app.use(bodyParser.json());
app.use(cors()); // 모든 도메인에서의 요청 허용

// POST 요청을 받는 엔드포인트 설정
app.post('/savePost', (req, res) => {
  const postContent = req.body.content;
  // 여기서 postContent를 원하는 방식으로 저장하거나 활용합니다.
  console.log('게시글 내용:', postContent);
  // 클라이언트에 응답 전송 (예: 저장되었다는 메시지 전송)
  res.json({ message: '게시글이 서버에 저장되었습니다.' });
});

// 서버를 3000 포트에서 실행
app.listen(3000, () => {
  console.log('서버가 3000 포트에서 실행 중입니다.');
});
