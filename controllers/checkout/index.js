const { Router } = require('express')
const router = Router()
const ctrl = require('./checkout.ctrl')

router.get('/', ctrl.index)
router.post('/complete', ctrl.post_complete)
router.get('/success', ctrl.get_success)

module.exports = router

/*
 아임포트 결제 중계 서비스 사용
 잡다한 PG 모듈을 서버에 직접 설치할 필요 없이
 아임포트 통해서 통신 가능
 간편
 http://www.iamport.kr/getstarted

 postman 서비스를 이용하면 보내는 데이터 타입이 만드는 request를 볼수 있다.
*/