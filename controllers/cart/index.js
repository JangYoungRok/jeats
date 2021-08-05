const { Router } = require('express')
const router = Router()
const ctrl = require('./cart.ctrl')

router.get('/', ctrl.cart_index)

module.exports = router