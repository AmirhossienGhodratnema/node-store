const { StatusCodes } = require("http-status-codes");
const { createError, invoiceNumberGenerator } = require("../../../../functions/golobal");
const { Basket } = require("../../../models/basket");
const Controller = require("../../controller");
const axios = require('axios');
const { Payment } = require("../../../models/payments");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
module.exports = new class HomeController extends Controller {
    async payment(req, res, next) {
        try {

            const user = req.user;
            console.log(user)
            if (user.basketUser.length == 0) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'The shopping cart is empty')
            const payInfoBasket = await sumPay(user.basketUser);
            const description = 'خرید بابت محصول تستی';
            console.log('payInfoBasket', payInfoBasket)

            const zarinPalReqUrl = 'https://api.zarinpal.com/pg/v4/payment/request.json';
            const gatewayURL = 'https://www.zarinpal.com/pg/StartPay/'
            const zarinpallOption = {
                merchant_id: '833ac752-a2a8-4bd8-9e55-165dfec57888',
                amount: payInfoBasket.Payable,
                description,
                callback_url: 'http://localhost:8000/api/v1/verify',
                metadata: {
                    email: user.email || 'example@gmail.com',
                    mobile: user.phone
                },
            };
            const resultData = await axios.post(zarinPalReqUrl, zarinpallOption).then(result => result.data);
            const invoiceNumber = await invoiceNumberGenerator()

            const paymentCreate = await Payment.create({
                user,
                amount: payInfoBasket.Payable,
                description,
                basket: user.basketUser,
                authority: resultData.data.authority,
                verify: false,
                invoiceNumber
            });
            if (resultData.data.code === 100 && resultData?.data?.authority) {
                console.log('ok')
                return res.json({
                    status: StatusCodes.OK,
                    Url: `${gatewayURL}${resultData.data.authority}`
                })
            };
            throw new createError(StatusCodes.INTERNAL_SERVER_ERROR, 'In the payment of a problem');
        } catch (error) {
            next(error);
        };
    };

    async verify(req, res, next) {
        try {
            const { Authority, Status } = req.query;
            const verifyUrl = 'https://api.zarinpal.com/pg/v4/payment/verify.json';
            const payment = await Payment.findOne({ authority: Authority, verify: false });
            if (!payment) await createError(StatusCodes.NOT_FOUND, 'There is no such payment');
            if (payment.verify) await createError(StatusCodes.FORBIDDEN, 'There is no such payment');
            const verifyResult = await (await fetch(verifyUrl, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    merchant_id: '833ac752-a2a8-4bd8-9e55-165dfec57888',
                    authority: Authority,
                    amount: payInfoBasket.Payable,
                })
            })).json();


            if (verifyResult?.data?.code === 100) {

                await Payment.updateOne({ authority: Authority }, {
                    $set: {
                        cardHash: verifyResult?.data?.card_hash,
                        refId: verifyResult?.data?.ref_id,
                    }
                });

                return res.json({
                    status: StatusCodes.OK,
                    success: true,
                    message: 'The payment operation was completed successfully',
                });
            } else {
                return res.json({
                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                    success: false,
                    message: 'Payment operation failed',
                });
            }

        } catch (error) {
            next(error);
        };
    }
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
