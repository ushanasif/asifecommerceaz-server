const stripe = require('../../config/stripe');
const OrderModel = require('../../models/orderProductModel');

const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET_KEY;

const getLineItems = async(lineItems) => {
    let productItems = [];

    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await stripe.products.retrieve(item.price.product);
            const productId = product.metadata.productId;

            const productData = {
                productId: productId,
                name: product.name,
                price: item.price.unit_amount / 100,
                quantity: item.quantity,
                image: product.image
            };

            productItems.push(productData);
        }
    }

    return productItems;
}

const webhooks = async(req, res) => {
    const sig = req.headers['stripe-signature'];

    const payloadString = JSON.stringify(req.body);
    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret
    });

    let event;
    try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
      }
      catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      switch (event.type) {
        case 'payment_intent.completed':
          const session = event.data.object;
          
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
          const productDetails = await getLineItems(lineItems);

          const orderDetails = {
            productDetails: productDetails,
            email: session.customer_email,
            userId: session.metadata.userId,
            paymentDetails: {
              paymentId: session.payment_intent,
              payment_method_types: session.payment_method_types,
              payment_status: session.payment_status
            },
            shipping_options: session.shipping_options,
            totalAmount: session.amount_total
          };

          const order = await OrderModel(orderDetails);
          const saveOrder = await order.save();
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.status(200).send();
};

module.exports = webhooks;

