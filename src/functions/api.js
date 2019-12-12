export const registerUser = (name, email, password, callback) => {
    fetch('http://api.d0018e.pndro.se/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'email': email,
                'password': password
            })
        }).then(response => {
            response.json().then(json => {
                callback(response.status, json);
            })
        })
}