// writing prompt generator
const apikey = 'https://random-word-api.vercel.app/api?words=5'

let user = {
    name : "",
    email : "",
    pass: "",
    stories : [],
    joined : []
}
function Story(title, genre, content, authors) {
    this.title = title;
    this.genre = genre;
    this.content = content ?? " ";
    this.authors = authors ?? 1;
    this.prompt = ' ';
}
let dawndark = new Story('Dawn of Darkness', 'Dark Fantasy', " ", 30)
let lovesite = new Story('Love at First Site', 'Romance', " ", 1)
let change = new Story('When it Changed', 'Fantasy', " ", 16)

let globe = {
    mostrecent : [],
    stories : []
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

function check_login(name, email, pass) {
    namey = document.getElementById(name).value;
    mailey = document.getElementById(email).value;
    passy = document.getElementById(pass).value;

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
    email_container = document.getElementById(mailbox)
    name_container = document.getElementById(namebox)
    password_container = document.getElementById(passbox)

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
        if (!globe.stories.includes(item)) {
            globe.stories.push(item)
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

function update_content() {
    let name_elements = document.getElementsByClassName('user')
    let mail_elements = document.getElementsByClassName('mail')

    user = JSON.parse(localStorage.getItem('user'))
    globe = JSON.parse(localStorage.getItem('globe'))

    for (i = 0; i < name_elements.length; i++) {
        name_elements[i].innerText = `--> ${user.name} <--`
    }
    for (i = 0; i < mail_elements.length; i++) {
        mail_elements[i].innerText = `Email: ${user.email}`
    }
} 


// Important page stuff I guess

function generate_story(title, genre) {

    update_content()

    let current = new Story(document.getElementById(title).value, document.getElementById(genre).value)
    user.stories.push(current)
    user.joined.push(current)
    console.log(JSON.stringify(user))
    localStorage.setItem('story', user.stories.length - 1)
    localStorage.setItem('user', JSON.stringify(user))
    globe.stories.push(current)
    localStorage.setItem('globe', JSON.stringify(globe))
    window.location.href = 'write.html'

}
function retrieve_story(story_loc) {

    update_content();

    let count = localStorage.getItem('story') ?? user.stories.length - 1;

    console.log(count)

    let title = document.getElementById("title")
    console.log(user.stories)
    
    let current_story = user.stories[count];
    console.log(current_story)
    title.innerHTML = current_story.title ?? 'Untitled';


    let box = document.getElementById('writersblock');

    box.innerHTML = current_story.content;

    save_story(story_loc)
}

function save_story() {
    update_content();
    story_loc = localStorage.getItem('story') ?? user.stories.length - 1;
    user.stories[story_loc].content = document.getElementById('writersblock').value;
    localStorage.setItem('user', JSON.stringify(user))

    globe.mostrecent = []
    globe.mostrecent.push(user.name)
    globe.mostrecent.push(user.stories[story_loc])
    localStorage.setItem('globe', JSON.stringify(globe))
}

function gen_story_list(list, joined) {
    let count = 0;
    ul = document.getElementById(list);
    
    console.log(`HEY THERE, ${user.stories}`);

    stories = user.stories
    
    stories.forEach((item) => {
        curr_item = document.createElement('li')
        ul.appendChild(curr_item)
        curr_item.classList.add('list-group-item')
        curr_item.innerHTML = `<p><em>${item.title}</em> (${item.genre}). </p><button onclick="go_to_write(${count})" class="btn">Write</button><button onclick="dlt(${count})" class="btn btn-outline-danger">Delete</button>`
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
        curr_item = document.createElement('li')
        ul.appendChild(curr_item)
        curr_item.classList.add('list-group-item')
        curr_item.innerHTML = `<p><em>${item.title}</em> (${item.genre}).</p>`
        count++
    
    })
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

function dlt(count) {
    update_content();
    user.stories.splice(count, 1);
    localStorage.setItem('user', JSON.stringify(user))
    location.reload()
}

function go_to_write(count) {
    update_content();
    let story = user.stories[count];
    console.log(story.content);
    localStorage.setItem('story', count);
    window.location.href = "write.html";
}

function update_most_recent(id, titleid) {
    update_content();
    body = document.getElementById(id)
    title_doc = document.getElementById(titleid)
    if (globe.mostrecent.length != 0) {
    update_content();
    title_doc.innerText = `${globe.mostrecent[1].title} (Last Edited By ${globe.mostrecent[0]})`
    body.innerHTML = `<p style="float: left;">${globe.mostrecent[1].content}</p>`
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
    let top_count = 0
    globe.stories.forEach((item) => {
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
                child.innerHTML = `<button class="btn btn-secondary-outline" onclick="join(${top_count})">Join?</button>`
            }
            count++
        })
        top_count++
        table_obj.prepend(row)
    })
}
function exchange_items(item1, item2) {
    let temp = globe.stories[item1]
    globe.stories[item1] = globe.stories[item2]
    globe.stories[item2] = temp
}
function sort_global() {
    update_content()
    for(i = 0; i < globe.stories.length; i++) {
        if (i != 0) {
        if (globe.stories[i].authors < globe.stories[i - 1].authors) {
            let j = i
            while (globe.stories[j].authors < globe.stories[j - 1].authors) {
                exchange_items(j, j - 1)
                j--
            }
        }
    }
    }
}
function join(count) {

}