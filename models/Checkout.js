const moment = require('moment')

module.exports = function (sequelize, DataTypes) {
    const Checkout = sequelize.define('Checkout', {
        id: {type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true},
        imp_uid: {type: DataTypes.STRING}, // import 고유아이디
        merchant_uid: {type: DataTypes.STRING}, //상점 거래ID
        paid_amount: {type: DataTypes.INTEGER}, //결제금액
        apply_num: {type: DataTypes.STRING}, // 카드 승인번호

        buyer_email: {type: DataTypes.STRING},
        buyer_name: {type: DataTypes.STRING},
        buyer_tel: {type: DataTypes.STRING},
        buyer_addr: {type: DataTypes.STRING},
        buyer_postcode: {type: DataTypes.STRING},
        status: {type: DataTypes.STRING}

    }, {
        tableName: 'Checkout'
    })

    Checkout.associate = (models) => {
        Checkout.belongsToMany(models.ShopsMenu, {
            through: {
                // 교차테이블명
                model: 'CheckoutMenu',
                unique: false
            },
            as: 'Menu',
            foreignKey: 'checkout_id',
            sourceKey: 'id',
            constrains: 'false'
        })

        Checkout.belongsTo(
            models.Shops,
            {
                as: 'Shop',
                foreignKey: 'shop_id',
                targetKey: 'id'
            }
        )
    }


    Checkout.prototype.dateFormat = (date) => (
        moment(date).format('YYYY-MM-DD // h:mm')
    )

    return Checkout

}