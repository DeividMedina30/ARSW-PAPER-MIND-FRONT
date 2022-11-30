import axios from "axios";

const URL = 'http://localhost:8080';
var instance = axios.create({
    baseURL: URL
});


export const get = (path, params) => {
    return new Promise((resolve, reject) => {
        instance.get(path, params)
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err)
            });
    });
}

export const post = (path, data, params) => {
    return new Promise((resolve, reject) => {
        instance.post(path, data, params)
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err)
            });
    });
}