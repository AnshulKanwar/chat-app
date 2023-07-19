# Chat App
A Chat app built on [websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

<img src="demo/demo.png">

# Building

```shell
git clone https://github.com/AnshulKanwar/chat-app.git

# run server
cd chat-app/server
pnpm i
pnpm tsc
node build/server

# run client
cd chat-app/client
pnpm i
pnpm run dev
```

# TODO

- [ ] add unique ID field to each message
- [ ] add timestamps
- [ ] test UI on mobile devices
- [ ] deploy
- [ ] show the number of online users
