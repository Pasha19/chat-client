import 'event-source-polyfill'

let es = null

export const register = ({ commit }, name) => {
    let request = fetch(
        process.env.API + '/api/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        }
    )
    request
        .then(response => response.json())
        .then(response => {
            let status = response.status || 'error'
            if (status === 'error') {
                let error = response.reason || 'unknown error'
                alert(`Error "${error}"`)

                return
            }
            let token = response.data.auth_token
            localStorage.setItem('auth_token', token)
            commit('setToken', token)
        })
}

export const listen = ({ commit, state }) => {
    if (es !== null) {
        return
    }
    /* global EventSourcePolyfill */
    es = new EventSourcePolyfill(
        process.env.API + '/api/chat/listen',
        {
            headers: {
                'Authorization': state.token
            },
            withCredentials: true,
            heartbeatTimeout: 18000000
        }
    )
    es.addEventListener('message', data => {
        let message = JSON.parse(data.data)
        commit('addMessage', message.data)
    })
    es.addEventListener('error', error => {
        console.log('error', error)
    })
    es.addEventListener('close', data => {
        console.log('close', data)
    })
}

export const post = ({ commit, state }, message) => {
    let request = fetch(
        process.env.API + '/api/chat/post',
        {
            method: 'POST',
            headers: {
                'Authorization': state.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        }
    )
    request
        .then(response => response.json())
        .then(response => {
            let status = response.status || 'error'
            if (status === 'error') {
                let error = response.reason || 'unknown error'
                alert(`Error "${error}"`)

                return
            }
            let time = response.data.time
            commit('addMessage', {
                user: { name: 'me' },
                message,
                time
            })
        })
}
