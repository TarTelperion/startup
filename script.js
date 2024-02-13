// writing prompt generator
const apikey = 'https://random-word-api.vercel.app/api?words=5'

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
            console.log(temp)
            item.innerText = temp;
        })
        .catch(error => {
            console.error('Error: ', error)
        })
    btn = document.getElementById(button)
    btn.innerText = "Regenerate!"
}
gen_prompt([])
