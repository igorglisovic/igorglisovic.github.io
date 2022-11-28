class Comment {
  post_id = ''
  user_id = ''
  content = ''
  apiUrl = 'https://62dfb8d8976ae7460bf21ce5.mockapi.io/'

  createComment() {
    let data = {
      post_id: this.post_id,
      user_id: this.user_id,
      content: this.content,
    }

    data = JSON.stringify(data)

    fetch(`${this.apiUrl}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then(res => res.json())
      .then(d => {})
  }

  async getComments(post_id) {
    const res = await fetch(`${this.apiUrl}/comments`)
    const data = await res.json()

    const post_comments = []

    let i = 0

    data.forEach(item => {
      if (item.post_id === post_id) {
        post_comments[i] = item
        i++
      }
    })

    return post_comments
  }
}
