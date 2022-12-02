class User {
  username = ''
  email = ''
  password = ''
  apiUrl = 'https://62dfb8d8976ae7460bf21ce5.mockapi.io/'

  createUser() {
    let data = {
      username: this.username,
      email: this.email,
      password: this.password,
    }

    data = JSON.stringify(data)

    fetch(`${this.apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then(res => res.json())
      .then(d => {
        const session = new Session()
        session.user_id = d.id
        session.startSession()
        window.location.href = 'SocialNetwork/hexa.html'
      })
  }

  async getUser(user_id) {
    const response = await fetch(`${this.apiUrl}/users/${user_id}`)
    const data = await response.json()
    return data
  }

  editUser() {
    let data = {
      username: this.username,
      email: this.email,
    }

    data = JSON.stringify(data)

    const session = new Session()
    session_id = session.getSession()

    fetch(`${this.apiUrl}/users/${session_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        window.location.href = 'SocialNetwork/hexa.html'
      })
  }

  deleteUser() {
    const session = new Session()
    session_id = session.getSession()

    fetch(`${this.apiUrl}/users/${session_id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        const session = new Session()
        session.destroySession()
        window.location.href = '/SocialNetwork'
      })
  }

  loginUser() {
    fetch(`${this.apiUrl}/users`)
      .then(res => res.json())
      .then(data => {
        {
          let loggedIn = 0

          data.forEach(obj => {
            if (this.email === obj.email && this.password === obj.password) {
              const session = new Session()
              session.user_id = obj.id
              session.startSession()
              loggedIn = 1
              window.location.href = 'SocialNetwork/hexa.html'
            }
          })

          if (!loggedIn) alert('Incorrect password or e-mail.')
        }
      })
  }
}
