const { Router } = require('express')
const router = Router()
const ctrl = require('./shops.ctrl')

// url을 숫자만 받을수 있게 설정
router.get('/:id(\\d+)',ctrl.get_shops_detail)
// router.get('/det',ctrl.get_shops_detail)
// (req, res) =>{
// res.send('12314214124214')}



module.exports = router