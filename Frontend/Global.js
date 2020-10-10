import axios from 'axios'

export var http = axios.create({
    baseURL: 'http://10.0.2.2:8080/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }
})

export var setAuthorizationToken = (token) => {
    http.defaults.headers['Authorization'] = 'Bearer ' + token;
}