// writing prompt generator
const apikey = 'https://random-word-api.vercel.app/api?words=5'

let user_mail = 'gabrielbabriel@gmail.com'
let user_name = 'Gabe Pettingill'
let user_pass = 'fjdkal;jda;ldsa'


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

    if (user_name === namey && user_pass == passy) {
        return true;
    }
    else if (user_mail == mailey && user_pass == passy) {
        return true;
    }
    else {
        const newAlert = document.createElement('div')
        newAlert.textContent = "<p>Login failed, check credentials</p>"
        const parent = document.getElementById('login')
        parent.appendChild(newAlert);
        return false;
    }
}

function save_login(mailbox, namebox, passbox) {
    email_container = document.getElementById(mailbox)
    name_container = document.getElementById(namebox)
    password_container = document.getElementById(passbox)

    user_mail = email_container.value
    user_name = name_container.value
    user_pass = password_container.value

    localStorage.setItem('name', user_name);
    localStorage.setItem('mail', user_mail);
    localStorage.setItem('pass', user_pass);
}

function update_content() {
    let name_elements = document.getElementsByClassName('user')
    let mail_elements = document.getElementsByClassName('mail')
    user_name = localStorage.getItem('name')
    user_mail = localStorage.getItem('mail')
    user_pass = localStorage.getItem('pass')
    console.log(name_elements)
    console.log(mail_elements)

    for (i = 0; i < name_elements.length; i++) {
        name_elements[i].innerText = user_name
    }
    for (i = 0; i < mail_elements.length; i++) {
        mail_elements[i].innerText = user_mail
    }
} 
