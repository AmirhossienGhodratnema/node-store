const { StatusCodes } = require("http-status-codes");
const { createError } = require("../../../../functions/golobal");
const { Basket } = require("../../../models/basket");
const Controller = require("../../controller");
const axios = require('axios');


module.exports = new class HomeController extends Controller {
    async payment(req, res, next) {
        try {
            const user = req.user;
            if (user.basketUser.length == 0) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'The shopping cart is empty')
            const payInfoBasket = await sumPay(user.basketUser);
            // return res.json({
            //     data: payInfoBasket.Payable
            // });
            // if (!basket) createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Basket is not defined');
            const zarinPalReqUrl = 'https://api.zarinpal.com/pg/v4/payment/request.json';
            const gatewayURL = 'https://www.zarinpal.com/pg/StartPay/'
            const zarinpallOption = {
                merchant_id: '833ac752-a2a8-4bd8-9e55-165dfec57888',
                // amount: payInfoBasket.Payable,
                amount: 2000,
                description: 'خرید بابت محصول تستی',
                callback_url: 'http://localhost:8000/api/v1',
                metadata: {
                    email: user.email || 'example@gmail.com',
                    mobile: user.phone
                },
            };

            console.log('payInfoBasket', payInfoBasket.priceProduct)

            const resultData = await axios.post(zarinPalReqUrl, zarinpallOption).then(result => result.data);
            console.log(resultData)
            if (resultData.data.code === 100 && resultData?.data?.authority) {
                console.log('ok')
                return res.json({
                    status: StatusCodes.OK,
                    Url: `${gatewayURL}${resultData.data.authority}`
                })
            }
            throw new createError(StatusCodes.INTERNAL_SERVER_ERROR, 'In the payment of a problem')
        } catch (error) {
            next(error);
        };
    };
};

const sumPay = async (basket) => {
    let priceProduct = []
    const basketUnArray = basket.map(async item => {
        return await item.product.map(async productIn => {
            console.log(productIn.count)
            console.log('productIn', productIn.product.price);
            await priceProduct.push({ title: productIn.product.title, price: productIn.product.price, count: productIn.count, totalPrice: (productIn.count * productIn.product.price) })
        })
    })
    let Payable = 0;
    let test = 0;
    for (var i = 0; i < priceProduct.length; i++) {
        Payable += priceProduct[i].totalPrice
    }
    return { priceProduct, Payable }
}
