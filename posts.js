// ฟังก์ชันดึงข้อมูลโพสต์และความคิดเห็น
async function fetchPostsAndComments() {
    try {
      // ดึงข้อมูลโพสต์
      const postsResponse = await fetch('https://jsonplaceholder.typicode.com/users/1/posts');
      if (!postsResponse.ok) throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลโพสต์');
      const posts = await postsResponse.json();
  
      // ดึงข้อมูลความคิดเห็น
      const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
      if (!commentsResponse.ok) throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลความคิดเห็น');
      const comments = await commentsResponse.json();
  
      // แสดงผลโพสต์และความคิดเห็น
      displayPostsAndComments(posts, comments);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // ฟังก์ชันแสดงผลโพสต์และความคิดเห็น
  function displayPostsAndComments(posts, comments) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // ล้างข้อมูลเก่าก่อนแสดงผลใหม่
  
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <button onclick="toggleComments(this)">แสดงความคิดเห็น</button>
        <div class="comments" style="display: none;">
          ${comments.map(comment => `
            <div class="comment">
              <strong>${comment.email}</strong>
              <p>${comment.body}</p>
            </div>
          `).join('')}
        </div>
      `;
      postsContainer.appendChild(postElement);
    });
  }
  
  // ฟังก์ชันสลับการแสดงความคิดเห็น
  function toggleComments(button) {
    const commentsDiv = button.nextElementSibling;
    if (commentsDiv.style.display === 'none') {
      commentsDiv.style.display = 'block';
      button.textContent = 'ซ่อนความคิดเห็น';
    } else {
      commentsDiv.style.display = 'none';
      button.textContent = 'แสดงความคิดเห็น';
    }
  }
  
  // เรียกฟังก์ชันดึงข้อมูลเมื่อหน้าเว็บโหลดเสร็จ
  window.onload = fetchPostsAndComments;