class Session {
  user_id = ""

  startSession() {
    const date = new Date()
    date.setTime(date.getTime() + 2 * 24 * 60 * 60 * 1000)
    let expires = "expires=" + date.toUTCString()

    document.cookie = `user_id=${this.user_id};expires=${expires}`
  }

  getSession() {
    let name = "user_id="
    let cookieArr = document.cookie.split(";")

    for (let i = 0; i < cookieArr.length; i++) {
      let c = cookieArr[i]
      while (c.charAt(0) === " ") {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
    }

    return ""
  }

  destroySession() {
    const cookiesArr = document.cookie.split(";")

    cookiesArr.forEach((cookie) => {
      let eqPos = cookie.indexOf("=")
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = `${name}=;expires=Thu, 01, Jan 1970 00:00:00 GMT`
    })
  }
}
