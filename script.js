// writing prompt generator
const apikey = 'https://random-word-api.vercel.app/api?words=5'

let user = {
    name : "",
    email : "",
    pass: "",
    stories : []
}
function Story(title, genre, content) {
    this.title = title;
    this.genre = genre;
    this.content = content ?? " ";
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

    user.email = email_container.value
    user.name = name_container.value
    user.pass = password_container.value

    localStorage.setItem('user', JSON.stringify(user));

    const newAlert = document.createElement('div')
        newAlert.style.alignSelf = 'center';
        newAlert.innerHTML = "<p class='alert alert-success'>Account Created</p>"
        const parent = document.getElementById('login')
        parent.appendChild(newAlert);
        setTimeout(() => newAlert.style.display = "none", 300)
        window.location.href = "friends.html"
}

function update_content() {
    let name_elements = document.getElementsByClassName('user')
    let mail_elements = document.getElementsByClassName('mail')

    user = JSON.parse(localStorage.getItem('user'))

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
    console.log(JSON.stringify(user))
    localStorage.setItem('user', JSON.stringify(user))

    window.location.href = 'write.html'

}
function retrieve_story(story_loc) {

    update_content();

    if(!story_loc) {story_loc = user.stories.length - 1;}
    let title = document.getElementById("title")
    console.clear()
    console.log(user.stories)

    let current_story = user.stories[story_loc];
    title.innerHTML = current_story.title;


    let box = document.getElementById('writersblock');

    box.innerHTML = current_story.content;

    save_story(story_loc)
}

function save_story(story_loc) {
    if(!story_loc) {story_loc = user.stories.length - 1};
    user.stories[story_loc].content = document.getElementById('writersblock').value;
    localStorage.setItem('user', JSON.stringify(user))
}

function gen_story_list(list) {
    let count = 0;
    ul = document.getElementById(list);
    
    console.log(`HEY THERE, ${user.stories}`);

    stories = user.stories
    
    stories.forEach((item) => {
        curr_item = document.createElement('li')
        ul.appendChild(curr_item)
        curr_item.classList.add('list-group-item')
        curr_item.innerHTML = `<em>${item.title}</em> (${item.genre}). <button class="btn" onclick="retrieve_story(${count})">Write?</button><button onclick="dlt(${count})" class="btn btn-outline-danger">Delete?</button>`
        count++
    })
    if(stories.length === 0) {
        console.log('trippepd just don"t work')
        p = document.createElement('p')
        p.classList.add('alert')
        p.classList.add('alert-secondary')
        p.style.width = "50%"
        let empty = document.getElementById('empty');
        empty.style.display = 'flex'
        empty.style.flexDirection = 'column'
        empty.style.justifyContent = 'center'
        p.style.alignSelf = "center"
        document.getElementById('empty').appendChild(p)

        p.innerHTML = `Don't see anything here? <a href='create.html'>Create</a> a story!`
    }

}

function dlt(count) {
    update_content();
    user.stories.splice(count, 1);
    localStorage.setItem('user', JSON.stringify(user))
    location.reload()
}