const api_url = `http://api.d0018e.pndro.se`;

export const registerUser = (name, email, password, emailToken, callback) => {
    fetch(`${api_url}/user`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'email': email,
                'password': password,
                'emailToken' : emailToken
            })
        }).then(response => {
            response.json().then(json => {
                callback(response.status, json);
            })
        })
}

export const getProducts = async (append, callback) => {
    const response = await fetch(`${api_url}/products${append}`, {
        method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
    });
    const json = await (await response).json();
    callback(response.status, json);
    return json;
}

export const getProduct = async (id, callback) => {
    const response= await fetch(`${api_url}/product/${id}`, {
        method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        const json = await response.json();
        callback(response.status, json);
        return json;
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
    return json;
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

export const deleteComment = async(jwt, id, callback) => {
    fetch(`${api_url}/comments/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'jwt' : jwt
        }
    }).then(response => {
        response.json().then(json=> {
            callback(response.status, json)
        })
    })
}

export const postComment = async (jwt, id, opinion, rating, callback) => {
    fetch(`${api_url}/comments/${id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'jwt' : jwt
        },
        body: JSON.stringify({
            'opinion' : opinion,
            'rating' : rating
        })
    }).then(response => {
        response.json().then(json=> {
            callback(response.status, json)
        })
    })
}

export const getOrders = (jwt, callback) => {
    fetch(`${api_url}/orders`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'jwt': jwt
        }
    }).then(response => {
        response.json().then(json=> {
            callback(response.status, json)
        })
    })
}

export const postOrder = (jwt, body, callback) => {
    fetch(`${api_url}/orders`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'jwt': jwt
        },
        body: body
    }).then(response => {
        console.log({response});
        response.json().then(json => {
            callback(response.status, json)
        })
    })
}

