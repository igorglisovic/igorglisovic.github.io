'use strict'

let session = new Session()
let session_id = session.getSession()

if (session_id === '') {
  window.location.href = '/index.html'
} else {
  const populateUserData = async function () {
    const user = new User()
    const userData = await user.getUser(session_id)

    document.getElementById('username').textContent = userData.username
    document.getElementById('email').textContent = userData.email

    document.getElementById('edit-username').value = userData.username
    document.getElementById('edit-email').value = userData.email
  }

  populateUserData()
}

document.getElementById('logout').addEventListener('click', e => {
  e.preventDefault()

  session.destroySession()
  window.location.href = '/'
})

document.getElementById('edit-account').addEventListener('click', e => {
  e.preventDefault()

  document.querySelector('.izmeni-modal').classList.remove('hidden')
})

document.getElementById('btn-close').addEventListener('click', () => {
  document.querySelector('.izmeni-modal').classList.add('hidden')
})

document.getElementById('edit-form').addEventListener('submit', e => {
  e.preventDefault()

  const user = new User()
  user.username = document.getElementById('edit-username').value
  user.email = document.getElementById('edit-email').value
  user.editUser()
})

document.querySelector('.delete-profile').addEventListener('click', e => {
  const text = 'Da li ste sigurni da zelite da obrisete profil?'

  if (confirm(text) === true) {
    const user = new User()
    user.deleteUser()
  }
})

document.getElementById('post-form').addEventListener('submit', e => {
  e.preventDefault()

  const createPost = async function () {
    const content = document.getElementById('post-content').value
    document.getElementById('post-content').value = ''

    let post = new Post()
    post.post_content = content
    post = await post.createPost()

    let current_user = new User()
    current_user = await current_user.getUser(session_id)

    const html = document.getElementById('allPostsWrapper').innerHTML

    let deletePostHtml = ''

    if (session_id === post.user_id) {
      deletePostHtml =
        '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>'
    }

    document.getElementById('allPostsWrapper').innerHTML =
      `
      <div class="single-post" data-post-id="${post.id}">
        <div class="post-content">${post.content}</div>

        <div class="post-actions">
          <p><b>Author: </b>${current_user.username}</p>
          <div>
            <button onclick="likePost(this)" class="like-post like-btn"><span>${post.likes}</span><span> Likes</span></button>
            <button onclick="commentPost(this)" class="comment-btn">Comments</button>
            ${deletePostHtml}
          </div>
        </div>

        <div class="post-comments hidden">
          <form>
            <input placeholder="Write comment..." type="text">
            <button onclick="commentPostSubmit(event)">Comment</button>
          </form>
        </div>
      </div>
    ` + html
  }

  createPost()
})

let comments_html = ''
const getAllPosts = async function () {
  let all_posts = new Post()
  all_posts = await all_posts.getAllPosts()

  all_posts.forEach(post => {
    async function getPostUser() {
      let user = new User()
      user = await user.getUser(post.user_id)

      let comments = new Comment()
      comments = await comments.getComments(post.id)

      if (comments.length > 0) {
        for (let i = 0; i < comments.length; i++) {
          const getUser = async function () {
            let user = new User()
            let userData2 = await user.getUser(comments[i].user_id)

            comments_html += `<div class="single-comment"><b>${userData2.username}</b>: ${comments[i].content}</div>`
            if (i === comments.length - 1) return comments_html
          }
          var a = await getUser()
        }
      }

      let html = document.getElementById('allPostsWrapper').innerHTML

      let deletePostHtml = ''

      if (session_id === post.user_id) {
        deletePostHtml =
          '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>'
      }

      document.getElementById('allPostsWrapper').innerHTML =
        html +
        `
        <div class="single-post" data-post-id="${post.id}">
          <div class="post-content">${post.content}</div>

          <div class="post-actions">
            <p><b>Author: </b>${user.username}</p>
            <div>
              <button onclick="likePost(this)" class="like-post like-btn">
                <span>${post.likes}</span><span> Likes</span>
              </button>
              <button onclick="commentPost(this)" class="comment-btn">
                Comments
              </button>
              ${deletePostHtml}
            </div>
          </div>

          <div class="post-comments hidden">
          <form>
          <input placeholder="Napisi komentar...." type="text" />
          <button onclick="commentPostSubmit(event)">Comment</button>
          </form>
          ${comments_html}
          </div>
        </div>
      `
    }
    getPostUser()
  })
}
getAllPosts()

const commentPostSubmit = e => {
  e.preventDefault()

  const btn = e.target
  btn.setAttribute('disabled', 'true')

  const mainPostEl = btn.closest('.single-post')
  const postId = mainPostEl.getAttribute('data-post-id')

  const commentValue = mainPostEl.querySelector('input').value

  mainPostEl.querySelector('input').value = ''

  let username_comment = ''
  const getUser2 = async function () {
    let user = new User()
    user = await user.getUser(session_id)
    username_comment = user.username

    mainPostEl.querySelector(
      '.post-comments'
    ).innerHTML += `<div class="single-comment"><b>${username_comment}</b>: ${commentValue}</div>`
  }
  getUser2()

  const comment = new Comment()
  comment.content = commentValue
  comment.user_id = session_id
  comment.post_id = postId
  comment.createComment()
}
const removeMyPost = el => {}
const likePost = el => {}
const commentPost = btn => {
  const mainPostEl = btn.closest('.single-post')
  const postId = mainPostEl.getAttribute('data-post-id')

  mainPostEl.querySelector('.post-comments').classList.remove('hidden')
}
