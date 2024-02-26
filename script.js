// writing prompt generator
const apikey = 'https://random-word-api.vercel.app/api?words=5'

let user = {
    name : "Gabe Pettingill",
    email : "gaberielbabriel@sauce.com",
    pass: "restricted",
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

    console.log(name_elements)
    console.log(mail_elements)

    for (i = 0; i < name_elements.length; i++) {
        name_elements[i].innerText = user.name
    }
    for (i = 0; i < mail_elements.length; i++) {
        mail_elements[i].innerText = user.email
    }
} 


// Important page stuff I guess

function generate_story(title, genre) {

    update_content();

    let current = new Story(document.getElementById(title).value, document.getElementById(genre).value);
    user.stories.push(JSON.stringify(current))
    
    localStorage.setItem('user', JSON.stringify(user))

    window.location.href = 'write.html'

    retrieve_story(user.stories.length - 1)

}
function retrieve_story(story_loc) {

    update_content();

    if(!story_loc) {story_loc = user.stories.length - 1;}
    let title = document.getElementById("title")
    console.clear()
    console.log(user.stories)

    let current_story = user.stories[story_loc];
    current_story = JSON.parse(current_story)
    console.log(current_story.title)
    console.log(current_story)
    title.innerHTML = current_story.title;


    let box = document.getElementById('writersblock');

    box.innerHTML = current_story.content;
}

function save_story() {
    
}
