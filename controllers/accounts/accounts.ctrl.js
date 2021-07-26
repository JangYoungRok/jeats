const models = require('../../models')
// const passwordHash = require('../../helpers/passwordHash.js')
exports.get_join = (req, res) => {
    res.render('accounts/join.html')
}

exports.get_login = (req, res) => {
    res.render('accounts/login.html', {flashMessage: req.flash().error})
}

exports.post_join = async (req, res) => {
    // res.body.password = passwordHash(password)
    // models.User.create(req.body)
    try {
        await models.User.create(req.body)
        res.send('<script>alert("회원가입 성공");location.href="/accounts/login"</script>')
    } catch (e) {

    }
}

exports.post_login = async (req, res) => {
    res.send('<script>alert("로그인 성공");location.href="/"</script>')
}

exports.get_success = async (req, res) => {
    res.send(req.user)
}

exports.get_logout = (req, res) => {
    req.logout()
    res.redirect('/accounts/login')
}