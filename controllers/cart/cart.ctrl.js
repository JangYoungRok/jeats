exports.cart_index = (req, res) =>{
    let totalAmount = 0
    let cartList = {}
    // cartList = []
    if (typeof(req.cookies.cartList) !== 'undefined'){
        cartList = JSON.parse(unescape(req.cookies.cartList))
        for(const key in cartList){
            totalAmount += parseInt(cartList[key].menu_price)
        }
    }
    res.render('cart/index.html',{cartList, totalAmount})
}