import 'event-source-polyfill'

export default class {
    constructor (api) {
        this.api = api + '/api'
        this.es = null
        this.auth = null
    }

    setAuth (token) {
        this.auth = token
    }

    register (name, onSuccess) {
        fetch(
            this.api + '/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            }
        )
            .then(response => response.json())
            .then(response => this._parseResponse(response, onSuccess))
    }

    post (message, onSuccess) {
        if (this.auth === null) {
            throw new Error('Auth required')
        }

        fetch(
            this.api + '/chat/post',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.auth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            }
        )
            .then(response => response.json())
            .then(response => this._parseResponse(response, onSuccess))
    }

    listen (onMessage) {
        if (this.es !== null) {
            this.es.close()
            this.es = null
        }

        if (this.auth === null) {
            throw new Error('Auth required')
        }

        /* global EventSourcePolyfill */
        this.es = new EventSourcePolyfill(
            this.api + '/chat/listen',
            {
                headers: {
                    'Authorization': `Bearer ${this.auth}`
                },
                heartbeatTimeout: 18000000 // Max allowed in EventSourcePolyfill
            }
        )
        this.es.addEventListener('message', data => {
            onMessage(JSON.parse(data.data))
        })
        this.es.addEventListener('error', error => {
            console.log('error', error)
        })
        this.es.addEventListener('close', data => {
            console.log('close', data)
        })
    }

    _parseResponse (response, onSuccess) {
        let status = response.status || 'error'
        if (status === 'error') {
            let error = response.reason || 'unknown error'
            alert(`Error "${error}"`)

            return
        }
        onSuccess(response.data)
    }
}
