const { Router } = require('express')
const router = Router()

router.get('/', (req, res) =>{
    // res.render('chat/index.html')
    if(!req.isAuthenticated()){
        res.send('<script>alert("로그인이 필요한 서비스입니다.");location.href="/accounts/login";</script>')
    }else{
        res.render('chat/index.html')
    }
})

module.exports = router