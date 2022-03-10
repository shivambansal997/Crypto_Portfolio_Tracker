import {loginURL, logoutURL} from '../backend'


export const Login = (user) => {
    const formData = new FormData()

    for (const name in user) {
        formData.append(name, user[name])
    }
    console.log(formData)

    return fetch(loginURL, {
        method: 'POST',
        body: formData,
        credentials: 'include',
    })
        .then(response => response.json())
        .catch(error => console.log('error', error))
}

export const logout = () => {
    fetch(logoutURL, {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => {
            window.location.reload()
        })
    document.cookie = 'csrftoken=; expires=Thu, 01-Jan-1970 00:00:01 GMT'
}


export const getCookie = (name) => {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }
    return cookieValue
}