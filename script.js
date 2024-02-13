// writing prompt generator
const apikey = 'https://random-word-api.vercel.app/api?words=5'

let user_mail = 'gabeybabey@awesomeness.com'
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


function save_login(mailbox, namebox, passbox) {
    email_container = document.getElementById(mailbox)
    name_container = document.getElementById(namebox)
    password_container = document.getElementById(passbox)

    user_mail = email_container.value
    user_name = name_container.value
    user_pass = password_container.value

    alert(`Welcome, ${user_name}, you're in, with a email of ${user_mail}, and a password of ${user_pass}`)
}

function update_content() {
    let name_elements = document.getElementsByClassName('user')
    let mail_elements = document.getElementsByClassName('mail')
    console.log(name_elements)
    console.log(mail_elements)

    for (i = 0; i < name_elements.length; i++) {
        name_elements[i].innerText = user_name
    }
    for (i = 0; i < mail_elements.length; i++) {
        mail_elements[i].innerText = user_mail
    }
} 
