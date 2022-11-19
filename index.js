const express = require('express')
const bodyParser = require('body-parser')
const Razorpay = require('razorpay');
var { validatePaymentVerification, validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const crypto = require('crypto');
const razorPayKey = 'rzp_test_rgKzMXHYtFumYv';
const razorPaySecret = 'GLZ1qQd768tyYEY4HEiOSCkL';

const app = express()
const port = 4000

// parse application/json
app.use(bodyParser.json())

const instance = new  Razorpay({ key_id: razorPayKey, key_secret: razorPaySecret });




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/create-order', (req, res) => {
    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: req.body.currency,
        receipt: req.body.receipt
      };
      instance.orders.create(options, function(err, order) {
        console.log(order);
        if(err){
            res.send(err);
        }else {
            res.send(order);
        }
      });
    
})

app.post('/verify-payment', (req, res) => {
    const result = validatePaymentVerification({"order_id": req.body.razorpayOrderId, "payment_id": req.body.razorpayPaymentId }, req.body.signature, razorPaySecret);
    res.send(result);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})