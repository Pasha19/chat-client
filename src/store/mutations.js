export const setToken = (state, payload) => {
    state.token = payload
    if (state.token === null) {
        state.user = null

        return
    }

    const user = JSON.parse(atob(payload.split('.')[1]))
    state.user = {
        name: user.name,
        uid: user.uid
    }
}

export const addMessage = (state, message) => state.messages.push(message)
