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

export const getProduct = (id, callback) => {
    fetch(`${api_url}/product/${id}`, {
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

export const getUser = async (jwt, callback) => {
    const response = await fetch(`${api_url}/user`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'jwt': jwt
        }
    });
    const json = await response.json();
    callback(response.status, json);
}

export const updateUser = async (jwt, name, email, callback) => {
    fetch(`${api_url}/user`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'jwt' : jwt
        },
        body: JSON.stringify({
            'name': name,
            'email': email,
        })
    }).then(response => {
        response.json().then(json => {
            callback(response.status, json);
        })
    })
}