const { StatusCodes } = require("http-status-codes");
const { createError } = require("../../../../functions/golobal");
const { Basket } = require("../../../models/basket");
const Controller = require("../../controller");



module.exports = new class HomeController extends Controller {
    async payment(req, res, next) {
        try {
            const user = req.user;
            if (user.basketUser.length == 0) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'The shopping cart is empty')
            const payInfoBasket = await sumPay(user.basketUser)
            return res.json({
                data: payInfoBasket.Payable
            });
            if (!basket) createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Basket is not defined');
            const zarinpallOption = {
                zarinPalReq: 'https://api.zarinpal.com/pg/v4/payment/request.json',
                merchant_id: '833ac752-a2a8-4bd8-9e55-165dfec57888',
                amunt: 200000,

                descripotion: 'خرید بابت محصول تستی',
                callBackUrl: 'http://localhost:8000/api/v1'
            };

            return res.status(200).json('Payment...');
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
    for (var i = 0; i < priceProduct.length; i++) {
        Payable += priceProduct[i].totalPrice
        // console.log(priceProduct[i].totalPrice)
    }

    console.log(Payable)
    return { priceProduct, Payable }
}
