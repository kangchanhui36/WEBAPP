const postForm = document.getElementById('postForm');
        const postContent = document.getElementById('postContent');
        const postsContainer = document.getElementById('posts');

        postForm.addEventListener('submit', (event) => {
            event.preventDefault();
            createPost(postContent.value, getRating());
            postContent.value = ''; // 게시글 작성 후 입력 필
        });
        
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const postContent = document.getElementById('postContent').value;
    if (postContent.trim() !== '') {
      fetch('webapp-pearl-ten.vercel.app/savePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: postContent }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data.message);
          // 서버로부터 받은 응답 처리
          alert(data.message);  // 서버의 응답을 사용자에게 알림

          // 게시글을 화면에 추가
          const postElement = document.createElement('p');
          postElement.textContent = postContent;
          document.getElementById('posts').appendChild(postElement);
        })
        .catch(error => {
          console.error('게시글을 서버에 전송하는 중 오류가 발생했습니다:', error);
          // 오류 처리
          alert('게시글을 서버에 전송하는 중 오류가 발생했습니다.');
        });
      document.getElementById('postContent').value = ''; // 게시글 작성 후 입력 필드 초기화
    }
  });