// writing prompt generator
const apikey = 'https://random-word-api.vercel.app/api?words=5'

// api access functions!!!!

async function set_story(story) {
    try {
    const response = await fetch('writersblock.click/api/stories/add', {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(story)
    })
    return true
} catch (err) {
    console.log(err)
    return false
}
}
async function get_story(id) {
    try{
        const response = await fetch(`writersblock.click/api/stories?id=${id}`, {
            method: 'GET',
            headers : {"Content-Type" : "application/json"},
        })
        const words = await response.json()
        console.log(words)
        return words
    } catch (err) {
        console.log(err)
        return false
    }
}
let user = {
    name : "Gabey",
    email : "email",
    pass: "fdsklfsd",
    stories : [],
    joined : []
}
function Story(title, genre, content, authors, owner) {
    this.id = Math.floor(Math.random() * 9000) + 1000
    this.title = title;
    this.genre = genre;
    this.content = content ?? " ";
    this.authors = authors ?? 1;
    this.prompt = ' ';
    this.owner = owner ?? 'Gabe Pettingill';
}
let dawndark = new Story('Dawn of Darkness', 'Dark Fantasy', " ", 30)
let lovesite = new Story('Love at First Site', 'Romance', " ", 1)
let change = new Story('When it Changed', 'Fantasy', " ", 16)

let globe = {
    mostrecent : [],
    stories : []
}
function build_login() {
    let ref = localStorage.getItem('ref')
    let title = document.getElementById('ref')
    if (ref === 'login') {
        title.innerText = "Log in:"
    }
    else if (ref === 'create') {
        title.innerText = "Create an account:"
    }
    else {
        title.innerText = "Create an account:"
    }
}
function gen_prompt(output, button) {
    fetch(apikey)
        .then(response => {
            if (!response.ok) {
                throw new Error('API call failed, response not ok')
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            let item = document.getElementById(output)
            let temp = ""
            for(i = 0; i < data.length; i++) {
                if (i < data.length - 1) {
                temp = temp.concat(data[i])
                temp = temp.concat(", ")
                }
                else {
                    temp = temp.concat(data[i])
                    temp = temp.concat(".")
                }
            }
            first = temp.charAt(0).toUpperCase()
            rest = temp.replace(temp.charAt(0), "")
            console.log(first)
            first = first.concat(rest)
            item.innerText = first;
        })
        .catch(error => {
            console.error('Error: ', error)
        })
    btn = document.getElementById(button)
    btn.innerText = "Regenerate!"
}



// LOGIN STUFF

function check_login(name, email, pass) {
    namey = document.getElementById(name).value;
    mailey = document.getElementById(email).value;
    passy = document.getElementById(pass).value;
    localStorage.setItem('ref', "login");


    update_content();
    try {
    if (user.name === namey && user.pass == passy) {
        const newAlert = document.createElement('div')
        newAlert.style.alignSelf = 'center';
        newAlert.innerHTML = "<p class='alert alert-success'>Success, redirecting...</p>"
        const parent = document.getElementById('login')
        parent.appendChild(newAlert);
        setTimeout(() => window.location.href = "home.html", 300)
        
    }
    else if (user.email == mailey && user.pass == passy) {
        const newAlert = document.createElement('div')
        newAlert.style.alignSelf = 'center';
        newAlert.innerHTML = "<p class='alert alert-success'>Success, redirecting...</p>"
        const parent = document.getElementById('login')
        parent.appendChild(newAlert);

        setTimeout(() => window.location.href = "home.html", 300)
    }
    else {
        const newAlert = document.createElement('div')
        newAlert.style.alignSelf = 'center';
        newAlert.innerHTML = "<p class='alert alert-danger'>Login failed, check credentials</p>"
        const parent = document.getElementById('login')
        parent.appendChild(newAlert);
        setTimeout(() => newAlert.style.display = "none", 3000)
        return false;
    }
}
catch (err) {
    const newAlert = document.createElement('div')
        newAlert.style.alignSelf = 'center';
        newAlert.innerHTML = "<p class='alert alert-danger'>Login failed, create an account</p>"
        const parent = document.getElementById('login')
        parent.appendChild(newAlert);
        setTimeout(() => newAlert.style.display = "none", 3000)
        return false;
}
}

function save_login(mailbox, namebox, passbox) {
    update_content();
    email_container = document.getElementById(mailbox)
    name_container = document.getElementById(namebox)
    password_container = document.getElementById(passbox)
    localStorage.setItem('ref', "create");

    function fail() {
        const newAlert = document.createElement('div')
        newAlert.style.alignSelf = 'center';
        newAlert.innerHTML = "<p class='alert alert-danger'>Fill out all fields!</p>"
        const parent = document.getElementById('login')
        parent.appendChild(newAlert);
        setTimeout(() => newAlert.style.display = "none", 300)
    }

    user.email = email_container.value
    user.name = name_container.value 
    user.pass = password_container.value 

    if (!user.pass || !user.email || !user.name) {
        fail()
        return
    }
    localStorage.setItem('user', JSON.stringify(user));
    let to_add = [lovesite, change, dawndark]
    to_add.forEach((item) => {
        let in_array = false
        globe.stories.forEach((story) => {
            if (story.title === item.title) {
                in_array = true
            }
        })
        if (!in_array) {
            globe.stories.push(item.id)
            localStorage.setItem(item.id, JSON.stringify(item))
        }
    })
    localStorage.setItem('globe', JSON.stringify(globe))
    const newAlert = document.createElement('div')
        newAlert.style.alignSelf = 'center';
        newAlert.innerHTML = "<p class='alert alert-success'>Account Created</p>"
        const parent = document.getElementById('login')
        parent.appendChild(newAlert);
        setTimeout(() => newAlert.style.display = "none", 3000)
        window.location.href = "friends.html"
}



// UPDATE CONTENT

function update_content() {
    let name_elements = document.getElementsByClassName('user')
    let mail_elements = document.getElementsByClassName('mail')

    if (JSON.parse(localStorage.getItem('user'))) {
        user = JSON.parse(localStorage.getItem('user'))
    }
    if (JSON.parse(localStorage.getItem('globe'))) {
        globe = JSON.parse(localStorage.getItem('globe'))
    }

    for (i = 0; i < name_elements.length; i++) {
        name_elements[i].innerText = `--> ${user.name} <--`
    }
    for (i = 0; i < mail_elements.length; i++) {
        mail_elements[i].innerText = `Email: ${user.email}`
    }
} 



//Story generation. Fixed

function generate_story(title, genre) {

    update_content()
    if (!document.getElementById(title).value || !document.getElementById(genre).value) {
        const newAlert = document.createElement('div')
        newAlert.style.alignSelf = 'center';
        newAlert.innerHTML = "<p class='alert alert-danger'>All fields must be filled</p>"
        const parent = document.getElementById('list')
        parent.appendChild(newAlert);
        setTimeout(() => newAlert.style.display = "none", 3000)
        return
    }
    let current = new Story(document.getElementById(title).value, document.getElementById(genre).value, " ", 1, user.name)
    user.stories.push(current.id)
    try {
    user.joined.push(current.id)
    } catch (err) {
        user.joined = []
        user.joined.push(current.id)
    }
    console.log(JSON.stringify(user))
    localStorage.setItem('story', current.id)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem(current.id, JSON.stringify(current))
    globe.stories.push(current.id)
    localStorage.setItem('globe', JSON.stringify(globe))
    window.location.href = 'write.html'

}
function go_write(loc) {
    localStorage.setItem('story', loc)
    window.location.href = 'write.html'
}

function retrieve_story() {
    update_content();
    let story_loc = localStorage.getItem('story')

    console.log(`This is the count: ${story_loc}`)

    let title = document.getElementById("title")
    console.log(user.stories)
    
    let current_story = JSON.parse(localStorage.getItem(story_loc));
    console.log(current_story)
    title.innerHTML = current_story.title ?? 'Untitled';


    let box = document.getElementById('writersblock');

    box.innerHTML = current_story.content;

    save_story(story_loc)
}

//USE IDS
function save_story() {
    update_content();
    let story_loc = localStorage.getItem('story')
    let thing = JSON.parse(localStorage.getItem(story_loc))
    thing.content = document.getElementById('writersblock').value;
    localStorage.setItem('user', JSON.stringify(user))

    globe.mostrecent = []
    globe.mostrecent.push(user.name)
    globe.mostrecent.push(user.stories[user.stories.indexOf(thing.id)])
    localStorage.setItem(story_loc, JSON.stringify(thing))
    localStorage.setItem('globe', JSON.stringify(globe))
}

// GEN STORY LIST
function gen_story_list(list, joined) {
    update_content()
    let count = 0;
    ul = document.getElementById(list);
    
    console.log(`HEY THERE, ${user.stories}`);

    stories = []
    user.stories.forEach((story) => {
        stories.push(JSON.parse(localStorage.getItem(story)))
    })
    
    stories.forEach((item) => {
        curr_item = document.createElement('li')
        ul.appendChild(curr_item)
        curr_item.classList.add('list-group-item')
        try {
        curr_item.innerHTML = `<p><em>${item.title}</em> (${item.genre}). </p><button onclick="go_write(${item.id})" class="btn">Write</button><button onclick="dlt(${item.id})" class="btn btn-outline-danger">Delete</button>`}
        catch (err) {
            curr_item.style.display = 'none'
        }
        count++
    })
    if(stories.length === 0) {
        console.log('trippepd just don"t work')
        p = document.createElement('p')
        p.classList.add('alert')
        p.classList.add('alert-light')
        p.style.width = "50%"
        let empty = document.getElementById('empty');
        empty.style.display = 'flex'
        empty.style.flexDirection = 'column'
        empty.style.justifyContent = 'center'
        p.style.alignSelf = "center"
        document.getElementById('empty').appendChild(p)

        p.innerHTML = `Don't see anything here? <a href='create.html'>Create</a> a story!`
    }

    count = 0
    try {
    user.joined.forEach((item) => {
        item = JSON.parse(localStorage.getItem(item))
        curr_item = document.createElement('li')
        ul = document.getElementById('joined')
        ul.appendChild(curr_item)
        curr_item.classList.add('list-group-item')
        curr_item.innerHTML = `<p><em>${item.title}</em> (${item.genre}).</p>`
        count++
    
    })
    if (user.joined.length == 0) {
        throw new Error
    }
}
catch (err) {
    p = document.createElement('p')
        p.classList.add('alert')
        p.classList.add('alert-light')
        p.style.width = "50%"
        let empty = document.getElementById('empty2');
        empty.style.display = 'flex'
        empty.style.flexDirection = 'column'
        empty.style.justifyContent = 'center'
        p.style.alignSelf = "center"
        empty.appendChild(p)

        p.innerHTML = `Don't see anything here? <a href='join.html'>Join</a> a story!`
}
}

function dlt(id) {
    update_content();
    let actual = JSON.parse(localStorage.getItem(id))
    for (i = 0; i < globe.stories.length; i++) {
        if (id === JSON.parse(localStorage.getItem(globe.stories[i])).id && user.name === JSON.parse(localStorage.getItem(globe.stories[i])).owner) {
            globe.stories.splice(i, 1)
            localStorage.removeItem(id)
            break
        }
    }
    actual.authors -= 1
    user.stories.splice(user.stories.indexOf(id), 1);
    let index = user.joined.indexOf(id)
    console.log(id)
    user.joined.splice(index, 1)
    if (localStorage.getItem(id)) {
    localStorage.setItem(id, JSON.stringify(actual))
    }
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('globe', JSON.stringify(globe))
    window.location.reload()
}
// POSSIBLE ERROR EXISTS
// DO I EVEN NEED IT?
// function go_to_write(count) {
//     update_content();
//     let story = localStorage.getItem(count);
//     console.log(story.content);
//     localStorage.setItem('story', count);
//     window.location.href = "write.html";
// }
// MOST RECENT
function update_most_recent(id, titleid) {
    update_content();
    body = document.getElementById(id)
    title_doc = document.getElementById(titleid)
    if (globe.mostrecent.length != 0) {
    update_content();
    title_doc.innerText = `${JSON.parse(localStorage.getItem(globe.mostrecent[1])).title} (Last Edited By ${globe.mostrecent[0]})`
    body.innerHTML = `<p style="float: left;">${JSON.parse(localStorage.getItem(globe.mostrecent[1])).content}</p>`
    }
    else {
        body.innerHTML = `<p style="float: left;">Once upon a time there was a new user with no stories...</p>`
        title_doc.innerText = `Writers' Block (Last Edited By Tristan Fay)`
    }
}

function generate_list(table) {
    update_content()
    sort_global()
    let table_obj = document.getElementById(table)
    let top_count = globe.stories.length - 1
    globe.stories.forEach((item) => {
        item = JSON.parse(localStorage.getItem(item))
        let row = document.createElement('tr')
        for (i = 0; i < 4; i++) {
            let curr_data = document.createElement('td')
            row.appendChild(curr_data)
        }
        let count = 0;
        [...row.children].forEach((child) => {
            if (count === 0) {
                child.innerText = `${item.title}`
                if (item.authors > 20) {
                    child.innerText += " 🔥🔥🔥"
                }
            }
            else if (count === 1) {
                child.innerText = `(${item.genre})`
            }
            else if (count === 2) {
                if (item.authors > 1) {
                child.innerText = `${item.authors} Authors`
                }
                else {
                    child.innerText = `${item.authors} Author`
                }
            }
            else {
                child.innerHTML = `<button class="btn btn-secondary-outline" onclick="join(${item.id})" id="join${item.id}">Join?</button>`
            }
            count++
        })
        top_count--
        table_obj.prepend(row)
    })
}

function exchange_items(index1, index2) {
    let temp = globe.stories[index1]
    globe.stories[index1] = globe.stories[index2]
    globe.stories[index2] = temp
}
function sort_global() {
    update_content()
    for(i = 0; i < globe.stories.length; i++) {
        if (i != 0) {
        if (JSON.parse(localStorage.getItem(globe.stories[i])).authors < JSON.parse(localStorage.getItem(globe.stories[i - 1])).authors) {
            let j = i
            try {
            while (JSON.parse(localStorage.getItem(globe.stories[j])).authors < JSON.parse(localStorage.getItem(globe.stories[j - 1])).authors) {
                exchange_items(j, j - 1)
                j--
            }
        }
        catch (err) {
            console.log('unknown error caught. You may want to look at that eventually ')
            console.log(err)
        }
        }
    }
    }
    localStorage.setItem('globe', JSON.stringify(globe))
}
function same(item, thing) {
    try {
    if (JSON.parse(localStorage.getItem(item)).title === JSON.parse(localStorage.getItem(thing).title)) {
        return true
    }
    else {
        return false
    }
}
catch (err) {
    console.log('invalid story? Check that out')
    console.log(err)
    return false
}
    
}
function join(count) {
    update_content()
    let story = count
    let good = true
    user.stories.forEach((item) => {
        if (story === item) {
            good = false
        }
    })
    if (good) {
    document.getElementById(`join${count}`).textContent = 'Joined!'
    user.stories.push(story)
    user.joined.push(story)
    let story_loc = JSON.parse(localStorage.getItem(story))
    story_loc.authors += 1
    localStorage.setItem(story, JSON.stringify(story_loc))
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('globe', JSON.stringify(globe))
    }
    else {
        const newAlert = document.createElement('div')
        newAlert.style.alignSelf = 'center';
        newAlert.innerHTML = "<p class='alert alert-danger'>You cannot pass! (You cannot join a story more than once)</p>"
        const parent = document.getElementById('alert')
        parent.appendChild(newAlert);
        setTimeout(() => newAlert.style.display = "none", 3000)
    }
}