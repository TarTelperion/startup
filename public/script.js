// writing prompt generator
const apikey = 'https://random-word-api.vercel.app/api?words=5'
let mostrecent = []
// api access functions!!!!
async function incrememnt_author(amount, id) {
    // https://writersblock.click
    try {
        const response = await fetch(`https://writersblock.click/api/stories/authors?id=${id}&ct=${amount}`, {
            method: 'PUT',
            headers: {"Content-Type" : "application/json"}
        })

    } catch(err) {
        console.log(err)
    }
}
async function create_globe_stories() {
    try {
        const response = await fetch('https://writersblock.click/api/stories/leaders', {
            method: 'GET',
            headers: {"Content-Type" : "application/json"}
        })
        const words = await response.json()
        let stories = [...words]
        return words
    } catch(err) {
        console.log(err)
    }
}
async function delete_story(id) {
    try {
        const response = await fetch(`https://writersblock.click/api/stories?id=${id}`, {
            method: 'DELETE',
            headers: {"Content-Type" : "application/json"},
        })
    } catch(err) {
        console.log(err)
        return false;
    }
}
async function set_story(story) {
    try {
    const response = await fetch('https://writersblock.click/api/stories/add', {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(story)
    })
    return true
} catch (error) {
    console.log(error)
    return false
}
}
async function get_story(id) {
    try{
        const response = await fetch(`https://writersblock.click/api/stories?id=${id}`, {
            method: 'GET',
            headers : {"Content-Type" : "application/json"}
        })
        const words = await response.json()
        console.log(words)
        if (Object.keys(words)[0] === "error") {
            return false
        } 
        return words
    } catch (error) {
        console.log(error)
        return false
    }
}
async function send_content(id, content) {
    try {
        const response = await fetch(`https://writersblock.click/api/stories/update?id=${id}`, {
            method: 'PUT',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({id : content})
        })
    } catch(err) {
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
    let namey = document.getElementById(name).value;
    let mailey = document.getElementById(email).value;
    let passy = document.getElementById(pass).value;
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
    mostrecent = localStorage.getItem('mostrecent') ?? []
    let name_elements = document.getElementsByClassName('user')
    let mail_elements = document.getElementsByClassName('mail')

    if (JSON.parse(localStorage.getItem('user'))) {
        user = JSON.parse(localStorage.getItem('user'))
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
    await set_story(current)
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

    

    window.location.href = 'write.html'

}
function go_write(loc) {
    localStorage.setItem('story', loc)
    window.location.href = 'write.html'
}


async function retrieve_story() {
    update_content();
    let story_loc = localStorage.getItem('story')

    console.log(`This is the count: ${story_loc}`)

    let title = document.getElementById("title")
    console.log(user.stories)
    
    let current_story = await get_story(story_loc);
    console.log(current_story)
    title.innerHTML = current_story.title ?? 'Untitled';


    let box = document.getElementById('writersblock');

    box.innerHTML = current_story.content;

}

//USE IDS
async function save_story() {
    update_content();
    let story = undefined;
    async function waiting() {
    let story_loc = JSON.parse(localStorage.getItem('story'))

    story  = await get_story(parseInt(story_loc))

    let stuff = document.getElementById('writersblock').value

    await send_content(story_loc, stuff)
}

    await waiting()

    localStorage.setItem('user', JSON.stringify(user))

    mostrecent = []
    mostrecent.push(user.name)
    mostrecent.push(JSON.stringify(story))
    localStorage.setItem('mostrecent', JSON.stringify(mostrecent))

    window.location.href = 'blocked.html'
}

// GEN STORY LIST
async function gen_story_list(list, joined) {
    update_content()
    let count = 0;
    ul = document.getElementById(list);
    

    let stories = await Promise.all(user.stories.map(async (story)=>{
        const item = await get_story(story)
        return item !== false ? item : null
    }))
    stories = stories.filter(story => story !== null);
    console.log('your story down there')
    console.log(stories)
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
    let joined = await Promise.all(user.joined.map(async (story)=>{
        const item = await get_story(story)
        return item !== false ? item : null
    }))
    joined = joined.filter(story => story !== null);
    joined.forEach((item) => {
        curr_item = document.createElement('li')
        ul = document.getElementById('joined')
        ul.appendChild(curr_item)
        curr_item.classList.add('list-group-item')
        curr_item.innerHTML = `<p><em>${item.title}</em> (${item.genre}).</p>`
        count++
    
    })
    if (joined.length == 0) {
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

async function dlt(id) {
    update_content();
    let actual = await get_story(id)
    if (actual.owner === user.name) {
        await delete_story(actual.id)
        user.stories.splice(user.stories.indexOf(actual.id), 1)
    }
    else {
    await incrememnt_author(-1, actual.id)
    user.stories.splice(user.stories.indexOf(id), 1);
    let index = user.joined.indexOf(id)
    console.log(id)
    user.joined.splice(index, 1)
    localStorage.setItem('user', JSON.stringify(user))
    window.location.reload()
}
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
    if (mostrecent.length != 0) {
    update_content();
    mostrecent[1] = JSON.parse(mostrecent[1])
    title_doc.innerText = `${mostrecent[1].title} (Last Edited By ${mostrecent[0]})`
    body.innerHTML = `<p style="float: left;">${mostrecent[1].content}</p>`
    }
    else {
        body.innerHTML = `<p style="float: left;">Once upon a time there was a new user with no stories...</p>`
        title_doc.innerText = `Writers' Block (Last Edited By Tristan Fay)`
    }
}

async function generate_list(table) {
    update_content()
    const content = await sort_global()
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
    let temp = globe[index1]
    globe[index1] = globe[index2]
    globe[index2] = temp
}
async function sort_global() {
    update_content()
    let globe = []
    const stories = await create_globe_stories()
    stories.forEach((story) => globe.push(story))
    for(i = 0; i < globe.length; i++) {
        if (i != 0) {
        if (globe[i].authors < globe[i - 1].authors) {
            let j = i
            try {
            while (globe[j].authors < globe[j - 1].authors) {
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
    return globe
}
    
async function join(count) {
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
    let story_loc = get_story(story)
    await incrememnt_author(1, count)
    localStorage.setItem('user', JSON.stringify(user))
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