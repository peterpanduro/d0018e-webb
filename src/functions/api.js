const api_url = `http://api.d0018e.pndro.se`;

export const registerUser = (name, email, password, callback) => {
    fetch(`${api_url}/user`, {
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

export const getProducts = (append, callback) => {
    fetch(`${api_url}/products${append}`, {
        method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
    }).then(response => {
        response.json().then(json => {
            callback(response.status, json);
        })
    })
}

export const getCategories = (callback) => {
    fetch(`${api_url}/categories`, {
        method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
    }).then(response => {
        response.json().then(json => {
            callback(response.status, json);
        })
    })
}

export const getComments = (postID, callback) => {
    const query = `${api_url}/comments/${postID}`;
    console.log(query);
    fetch(query, {
        method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
    }).then(response => {
        response.json().then(json => {
            callback(response.status, json);
        })
    })
}

export const loginUser = (email, password, callback) => {
    fetch(`${api_url}/user/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'email': email,
                'password': password
            }
        }).then(response => {
            response.json().then(json => {
                callback(response.status, json);
            })
        })
}