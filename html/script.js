// writing prompt generator
const apikey = 'https://random-word-api.vercel.app/api?words=5'
let mostrecent = []
const host = 'https://writersblock.click'

let displayed = true
let user = {
  name: 'Gabe',
  mail: 'roochy@sauce.com',
  pass: '12345',
  notifications: [],
}

const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss'
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`)
socket.onopen = () => {
  console.log('connected')
}
socket.onmessage = async (event) => {
  update_content()
  console.log(event.data)
  const msg = JSON.parse(event.data)
  if (msg.destination) {
    if (msg.destination == user._id) {
      send_alert(msg.user, msg.type, msg.title)
    } else {
      return
    }
  } else {
    send_alert(msg.user, msg.type, msg.title)
  }
}

function broadcast(data) {
  socket.send(JSON.stringify(data))
}
//websocket functionality
async function send_alert(name, type, title) {
  if (displayed) {
    let scream = document.createElement('div')
    scream.style.width = '30vw'
    scream.style.height = 'auto'
    scream.style.opacity = '0.8'
    scream.classList.add('alert', 'alert-secondary')
    if (type == 'create') {
      scream.classList.remove('alert-secondary')
      scream.classList.add('alert-success')
      scream.textContent = `${name} created a new story titled ${title}`
    } else if (type == 'delete') {
      scream.classList.remove('alert-secondary')
      scream.classList.add('alert-danger')
      scream.textContent = `${name} deleted a story titled ${title}`
    } else if (type == 'pester') {
      scream.classList.remove('alert-secondary')
      scream.classList.add('alert-danger')
      scream.textContent = `${name} pestered you to work on ${title}`
    } else {
      scream.textContent = `${name} added content to ${title}, go and finish their work!`
    }
    update_content()

    if (!user.notifications) {
      user.notifications = []
    } else if (user.notifications.length > 5) {
      do {
        user.notifications.splice(0, 1)
      } while (user.notifications.length > 5)
    }
    user.notifications.push(scream.textContent)

    const responseTwo = await fetch(`${host}/api/users/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    document.getElementById('alertContainer').appendChild(scream)

    setTimeout(() => {
      scream.classList.add('fade-out')
      setTimeout(() => {
        scream.remove()
      }, 500)
    }, 10000)
    displayed = true
  }
}

async function user_notifications() {
  await update_content()
  const house = document.getElementById('notifications')
  user.notifications.forEach((notification) => {
    let curr_notification = document.createElement('li')
    curr_notification.classList.add('list-group-item')
    curr_notification.innerHTML = notification
    house.appendChild(curr_notification)
  })
  const responseTwo = await fetch(`${host}/api/users/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
}

async function pester(element_id) {
  await update_content()
  const pester_button = document.getElementById(element_id)
  pester_button.disabled = true

  const thing = await JSON.parse(localStorage.getItem('mostrecent'))
  const story = await get_story(thing[1])
  console.log(story)

  const writer = story.writer
  broadcast({
    user: user.name,
    type: 'pester',
    title: story.title,
    destination: writer,
  })
}
// api access functions!!!!
async function incrememnt_author(amount, id) {
  // ${host}
  try {
    const response = await fetch(
      `${host}/api/stories/authors?id=${id}&ct=${amount}&usr=${user._id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (err) {
    console.log(err)
  }
}

async function create_globe_stories() {
  try {
    const response = await fetch('${host}/api/stories/global', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const words = await response.json()
    let stories = [...words]
    return words
  } catch (err) {
    console.log(err)
  }
}

async function delete_story(id) {
  await update_content()
  try {
    const to_delete = await get_story(id)
    const response = await fetch(
      `${host}/api/stories?id=${id}&ws=${socket.id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    console.log(`ATTEMPTING DELETE ON --> ${id}`)
    broadcast({ user: user.name, type: 'delete', title: to_delete.title })
    displayed = false
  } catch (err) {
    return false
  }
}

async function set_story(story) {
  await update_content()

  user.stories.push(story._id)
  user.joined.push(story._id)
  story.joined.push(user._id)

  const sstory = await fetch(`${host}/api/stories/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(story),
  })
  const response = await fetch(`${host}/api/users/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  broadcast({ user: user.name, type: 'create', title: story.title })
  const newAlert = document.createElement('div')
  newAlert.style.alignSelf = 'center'
  newAlert.innerHTML = "<p class='alert alert-success'>Story Created!</p>"
  const parent = document.getElementById('alertarea')
  parent.appendChild(newAlert)
  setTimeout(() => (newAlert.style.display = 'none'), 3000)
  await Promise.all([sstory, response])
  window.location.href = 'write.html'
}

async function get_story(id) {
  try {
    const response = await fetch(`${host}/api/stories?id=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const words = await response.json()
    console.log(words)
    return words
  } catch (error) {
    console.log(error)
    return false
  }
}

async function send_content(story) {
  await update_content()
  try {
    console.log(`SENDING IN FOR UPDATE ---> ${story}`)
    displayed = false
    const response = await fetch(`${host}/api/stories/update?ws=${socket.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(story),
    })
    broadcast({ user: user.name, type: 'update', title: story.title })
  } catch (err) {
    console.log(err)
    return false
  }
}

function Story(title, genre, content, authors, owner) {
  this._id = Math.floor(Math.random() * 9000) + 1000
  this.title = title
  this.genre = genre
  this.content = content ?? ' '
  this.authors = authors ?? 1
  this.prompt = ' '
  this.joined = []
  this.owner = owner ?? 'Gabe Pettingill'
  this.writer = owner ?? 'Gabe Pettingill'
}

function build_login() {
  let ref = localStorage.getItem('ref')
  let title = document.getElementById('ref')
  if (ref === 'login') {
    title.innerText = 'Log in:'
  } else if (ref === 'create') {
    title.innerText = 'Create an account:'
  } else {
    title.innerText = 'Create an account:'
  }
}

function gen_prompt(output, button) {
  fetch(apikey)
    .then((response) => {
      if (!response.ok) {
        throw new Error('API call failed, response not ok')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      let item = document.getElementById(output)
      let temp = ''
      for (i = 0; i < data.length; i++) {
        if (i < data.length - 1) {
          temp = temp.concat(data[i])
          temp = temp.concat(', ')
        } else {
          temp = temp.concat(data[i])
          temp = temp.concat('.')
        }
      }
      first = temp.charAt(0).toUpperCase()
      rest = temp.replace(temp.charAt(0), '')
      console.log(first)
      first = first.concat(rest)
      item.innerText = first
    })
    .catch((error) => {
      console.error('Error: ', error)
    })
  btn = document.getElementById(button)
  btn.innerText = 'Regenerate!'
}

// LOGIN STUFF

async function check_login(name, email, pass) {
  let namey = document.getElementById(name).value ?? 'unknown'
  let mailey = document.getElementById(email).value ?? 'unknown'
  let passy = document.getElementById(pass).value
  user.name = namey
  user.mail = mailey
  user.pass = passy
  localStorage.setItem('ref', 'login')
  update_content()
  if (user.mail === 'unknown' && user.name === 'unknown') {
    throw new Error('must have either username or mail')
  }
  console.log(user)
  try {
    let usr = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    usr = await usr.json()
    if (usr == 'unknown' || usr == 'unauthorized') {
      throw new Error('unknown')
    }
    window.location.href = 'home.html'
  } catch (error) {
    console.log(error)
    const newAlert = document.createElement('div')
    newAlert.style.alignSelf = 'center'
    newAlert.innerHTML = "<p class='alert alert-danger'>Login Failed</p>"
    const parent = document.getElementById('login')
    parent.appendChild(newAlert)
    setTimeout(() => (newAlert.style.display = 'none'), 3000)
  }
}

async function save_login(name, email, pass) {
  await update_content()
  localStorage.setItem('ref', 'create')

  function fail() {
    const newAlert = document.createElement('div')
    newAlert.style.alignSelf = 'center'
    newAlert.innerHTML =
      "<p class='alert alert-danger'>Fill out all fields!</p>"
    const parent = document.getElementById('login')
    parent.appendChild(newAlert)
    setTimeout(() => (newAlert.style.display = 'none'), 300)
  }

  let namey = document.getElementById(name)
  let mailey = document.getElementById(email)
  let passy = document.getElementById(pass)
  localStorage.setItem('ref', 'login')
  await update_content()

  const usr = await fetch(`${host}/api/auth/create`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })

  console.log(usr)

  const newAlert = document.createElement('div')
  newAlert.style.alignSelf = 'center'
  newAlert.innerHTML = "<p class='alert alert-success'>Account Created</p>"
  const parent = document.getElementById('login')
  parent.appendChild(newAlert)
  setTimeout(() => (newAlert.style.display = 'none'), 3000)
  window.location.href = 'friends.html'
}

// UPDATE CONTENT

async function update_content() {
  mostrecent = JSON.parse(localStorage.getItem('mostrecent')) ?? []
  let name_elements = document.getElementsByClassName('user')
  let mail_elements = document.getElementsByClassName('mail')
  try {
    let preuser = await fetch(`${host}/api/auth`)
    const working = await preuser.json()
    if (working) {
      user = working
    }
  } catch (err) {
    console.log(err)
    user = undefined
  }

  for (i = 0; i < name_elements.length; i++) {
    name_elements[i].innerText = `--> ${user.name} <--`
  }
  for (i = 0; i < mail_elements.length; i++) {
    mail_elements[i].innerText = `Email: ${user.email}`
  }
  mostrecent = JSON.parse(localStorage.getItem('mostrecent'))
}

//Story generation. Fixed

async function generate_story(title, genre) {
  await update_content()
  if (
    !document.getElementById(title).value ||
    !document.getElementById(genre).value
  ) {
    const newAlert = document.createElement('div')
    newAlert.style.alignSelf = 'center'
    newAlert.innerHTML =
      "<p class='alert alert-danger'>All fields must be filled</p>"
    const parent = document.getElementById('list')
    parent.appendChild(newAlert)
    setTimeout(() => (newAlert.style.display = 'none'), 3000)
    return
  }
  let current = new Story(
    document.getElementById(title).value,
    document.getElementById(genre).value,
    ' ',
    1,
    user.name
  )
  await set_story(current)
  // user.stories.push(current.id)
  // try {
  // user.joined.push(current.id)
  // } catch (err) {
  //     user.joined = []
  //     user.joined.push(current.id)
  // }
  // console.log(JSON.stringify(user))
}

async function retrieve_story() {
  await update_content()
  let story_loc = user.stories[user.stories.length - 1]

  console.log(`This is the count: ${story_loc}`)

  let title = document.getElementById('title')
  console.log(user.stories)

  let current_story = await get_story(user.stories[user.stories.length - 1])
  console.log(current_story)
  title.innerHTML = current_story.title ?? 'Untitled'

  let box = document.getElementById('writersblock')

  box.innerHTML = current_story.content
}

//USE IDS
async function save_story() {
  await update_content()
  let _id = user.stories[user.stories.length - 1]
  const words = await fetch(`${host}/api/stories?id=${_id}`)
  const story = await words.json()
  story.content = document.getElementById('writersblock').value
  story.most_recent = user.name

  await send_content(story)

  mostrecent = []
  mostrecent.push(user.name)
  mostrecent.push(story._id)
  localStorage.setItem('mostrecent', JSON.stringify(mostrecent))

  window.location.href = 'blocked.html'
}

// GEN STORY LIST
async function gen_story_list(list, joined) {
  await update_content()
  let count = 0
  ul = document.getElementById(list)

  let stories = await Promise.all(
    user.stories.map(async (story) => {
      const item = await get_story(story)
      return item !== false ? item : null
    })
  )
  stories = stories.filter((story) => story !== 'failed')
  console.log('your story down there')
  console.log(stories)
  stories.forEach((item) => {
    curr_item = document.createElement('li')
    ul.appendChild(curr_item)
    curr_item.classList.add('list-group-item')
    try {
      if (item.owner === user.name) {
        if (item.writer == user._id) {
          curr_item.innerHTML = `<p><em>${item.title}</em> (${item.genre}). </p><button onclick="go_write(${item._id})" class="btn">Write</button><button onclick="dlt(${item._id})" class="btn btn-outline-danger">Delete</button>`
        } else {
          curr_item.innerHTML = `<p><em>${item.title}</em> (${item.genre}). </p><button onclick="" class="btn" disabled>Write</button><button onclick="dlt(${item._id})" class="btn btn-outline-danger">Delete</button>`
        }
      } else {
        if (item.writer == user._id) {
          curr_item.innerHTML = `<p><em>${item.title}</em> (${item.genre}). </p><button onclick="go_write(${item._id})" class="btn">Write</button><button onclick="dlt(${item._id})" class="btn btn-outline-danger">Leave</button>`
        } else {
          curr_item.innerHTML = `<p><em>${item.title}</em> (${item.genre}). </p><button onclick="" class="btn" disabled>Write</button><button onclick="dlt(${item._id})" class="btn btn-outline-secondary">Leave</button>`
        }
      }
    } catch (err) {
      curr_item.style.display = 'none'
    }
    count++
  })
  if (stories.length === 0) {
    console.log('trippepd just don"t work')
    p = document.createElement('p')
    p.classList.add('alert')
    p.classList.add('alert-light')
    p.style.width = '50%'
    let empty = document.getElementById('empty')
    empty.style.display = 'flex'
    empty.style.flexDirection = 'column'
    empty.style.justifyContent = 'center'
    p.style.alignSelf = 'center'
    document.getElementById('empty').appendChild(p)

    p.innerHTML = `Don't see anything here? <a href='create.html'>Create</a> a story!`
  }

  count = 0
  try {
    let joined = await Promise.all(
      user.joined.map(async (story) => {
        const item = await get_story(story)
        return item !== false ? item : null
      })
    )
    joined = joined.filter((story) => story !== 'failed')
    joined.forEach((item) => {
      curr_item = document.createElement('li')
      ul = document.getElementById('joined')
      ul.appendChild(curr_item)
      curr_item.classList.add('list-group-item')
      curr_item.innerHTML = `<p><em>${item.title}</em> (${item.genre}).</p>`
      count++
    })
    user_notifications()
    if (joined.length == 0) {
      throw new Error()
    }
  } catch (err) {
    p = document.createElement('p')
    p.classList.add('alert')
    p.classList.add('alert-light')
    p.style.width = '50%'
    let empty = document.getElementById('empty2')
    empty.style.display = 'flex'
    empty.style.flexDirection = 'column'
    empty.style.justifyContent = 'center'
    p.style.alignSelf = 'center'
    empty.appendChild(p)

    p.innerHTML = `Don't see anything here? <a href='join.html'>Join</a> a story!`
  }
}

async function dlt(id) {
  await update_content()
  let actual = await get_story(id)
  console.log(`story to be deleted --> ${actual}`)
  if (actual.owner === user.name) {
    await delete_story(id)
    user.stories.splice(user.stories.indexOf(id), 1)
  } else {
    await incrememnt_author(-1, actual._id)
    user.stories.splice(user.stories.indexOf(id), 1)
    let index = user.joined.indexOf(id)
    console.log(id)
    user.joined.splice(index, 1)
    const responseTwo = await fetch(`${host}/api/users/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
  }
  window.location.reload()
}

async function go_write(id) {
  await update_content()
  const index = user.stories.indexOf(id)
  user.stories.splice(index, 1)
  user.stories.push(id)
  const just = user.joined.indexOf(id)
  user.joined.splice(just, 1)
  user.joined.push(id)
  const responseTwo = await fetch(`${host}/api/users/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  window.location.href = 'write.html'
}
async function update_most_recent(id, titleid) {
  await update_content()
  let body = document.getElementById(id)
  let title_doc = document.getElementById(titleid)
  mostrecent = []
  const story = await get_story(user.stories[user.stories.length - 1])
  if (story) {
    mostrecent.push(story.most_recent)
    mostrecent.push(story)
    console.log(mostrecent)
    let lines = mostrecent[1].content.split('\n')
    const htmlcontent = lines.map((line) => line + '<br>').join('')
    title_doc.innerHTML = `${mostrecent[1].title} (Last Edited By ${mostrecent[0]})`
    body.innerHTML = `<p style="float: left;">${htmlcontent}</p>`
  } else {
    body.innerHTML = `<p style="float: left; text-align: left;">Once upon a time there was a new user with no stories...</p>`
    title_doc.innerText = `Writers' Block (Last Edited By Tristan Fay)`
  }
}

async function generate_list(table) {
  await update_content()
  const response = await fetch(`${host}/api/stories/globa`)
  const content = await response.json()
  let stories = []
  content.forEach((item) => stories.push(item))
  console.log(stories)
  let table_obj = document.getElementById(table)
  let top_count = stories.length - 1
  stories.forEach((item) => {
    let row = document.createElement('tr')
    for (i = 0; i < 4; i++) {
      let curr_data = document.createElement('td')
      row.appendChild(curr_data)
    }
    let count = 0
    ;[...row.children].forEach((child) => {
      if (count === 0) {
        child.innerText = `${item.title}`
        if (item.authors > 20) {
          child.innerText += ' 🔥🔥🔥'
        }
      } else if (count === 1) {
        child.innerText = `(${item.genre})`
      } else if (count === 2) {
        if (item.authors > 1) {
          child.innerText = `${item.authors} Authors`
        } else {
          child.innerText = `${item.authors} Author`
        }
      } else {
        child.innerHTML = `<button class="btn btn-secondary-outline" onclick="join(${item._id})" id="join${item._id}">Join?</button>`
      }
      count++
    })
    top_count--
    table_obj.prepend(row)
  })
}

function exchange_items(index1, index2) {
  let temp = globe[index1]
  globe[index1] = globe[index2]
  globe[index2] = temp
}
async function sort_global() {
  await update_content()
  let globe = []
  const stories = await create_globe_stories()
  stories.forEach((story) => globe.push(story))
  for (i = 0; i < globe.length; i++) {
    if (i != 0) {
      if (globe[i].authors < globe[i - 1].authors) {
        let j = i
        try {
          while (globe[j].authors < globe[j - 1].authors) {
            exchange_items(j, j - 1)
            j--
          }
        } catch (err) {
          console.log(
            'unknown error caught. You may want to look at that eventually '
          )
          console.log(err)
        }
      }
    }
  }
  return globe
}

async function join(count) {
  await update_content()
  let story = await get_story(count)
  let good = true
  user.stories.forEach((item) => {
    if (story._id == item) {
      good = false
    }
  })
  if (good) {
    document.getElementById(`join${count}`).textContent = 'Joined!'
    user.stories.push(count)
    user.joined.push(count)
    await incrememnt_author(1, count)
    const responseTwo = await fetch(`${host}/api/users/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
  } else {
    const newAlert = document.createElement('div')
    newAlert.style.alignSelf = 'center'
    newAlert.innerHTML =
      "<p class='alert alert-danger'>You cannot pass! (You cannot join a story more than once)</p>"
    const parent = document.getElementById('alert')
    parent.appendChild(newAlert)
    setTimeout(() => (newAlert.style.display = 'none'), 3000)
  }
}

async function logout() {
  await fetch(`${host}/api/auth/logout`, {
    method: 'DELETE',
  })
  window.location.href = 'index.html'
}
