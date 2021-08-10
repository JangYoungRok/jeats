const models = require('../../models')

exports.get_shops_detail = async (req, res) => {
    try{
        const shop = await models.Shops.findOne({
            where: {
                id: req.params.id
            },
            include: ['Menu']
        })

        let cartList = {}
        let cartLength = 0
        let sameShops = true

        if (typeof(req.cookies.cartList) !== 'undefined') {
            cartList = JSON.parse(unescape(req.cookies.cartList))
            cartLength = Object.keys(cartList).length

            for(let key in cartList){
                if(parseInt(cartList[key].shop_id) !== parseInt(req.params.id)) sameShops = false
            }
            console.log(sameShops)
        }
        // console.log(shop)
        res.render('shops/detail.html', {shop, cartLength, sameShops})
    }catch (e) {
        console.log(e)
    }
}