require('./removeByValue')()

module.exports = (io) => {
    let userList = []
    io.on('connection', (socket) => {
        const session = socket.request.session.passport
        const user = (typeof session !== 'undefined') ? (session.user) : ''

        if (!userList.includes(user.displayname)) {
            userList.push(user.displayname)
        }
        console.log(userList)
        io.emit('join', userList)

        // disconnect는 예약어
        socket.on('disconnect', () => {
            userList.removeByValue(user.displayname)
            io.emit('leave', userList)

        })

        // console.log(`소켓서버 접속`)
        socket.on('client message', (data) => {
            // console.log(data.message)
            io.emit('server message', {
                message: data.message,
                displayname: user.displayname
            })
        })
    })
}