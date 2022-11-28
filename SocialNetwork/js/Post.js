class Post {
  post_id = ''
  post_content = ''
  user_id = ''
  likes = ''
  api_url = 'https://62dfb8d8976ae7460bf21ce5.mockapi.io/'

  async createPost() {
    const session = new Session()
    session_id = session.getSession()

    let data = {
      user_id: session_id,
      content: this.post_content,
      likes: 0,
    }

    data = JSON.stringify(data)

    const response = await fetch(`${this.api_url}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })

    data = await response.json()

    return data
  }

  async getAllPosts() {
    const response = await fetch(`${this.api_url}/posts`)
    const data = await response.json()

    return data
  }
}
