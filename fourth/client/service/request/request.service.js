const axios = require('axios');

let instance = axios.create({
    headers: {
        "Content-Type": "application/json",
    }
});

export async function requestGet(url, param, onSuccess, onFailed) {
    instance.get(url, {
        params: param
    })
        .then(onSuccess)
        .catch(onFailed)
}

export async function requestPost(url, param, onSuccess, onFailed) {
    try {
        await instance.post(url, {
            params: param
        })
            .then(onSuccess)
            .catch(onFailed)
    } catch (err) {
        console.log("call to api requestpost err")
    }
}