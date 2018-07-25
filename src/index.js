import 'event-source-polyfill'

let es = new EventSourcePolyfill(
    '/api/chat/listen',
    {
        headers: {
            'Authorization': 'TOKEN',
        },
    },
)
es.addEventListener("message", console.log)
