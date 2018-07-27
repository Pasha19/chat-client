export const setToken = (state, payload) => { state.token = payload }

export const addMessage = (state, message) => state.messages.push(message)
