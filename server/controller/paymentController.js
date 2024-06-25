const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

module.exports.makePayment = async (req, res) => {
  try {
    const { totalItems, subtotal, shipping } = req.body;

    // Validate the presence of required order details
    if (!totalItems || !subtotal || !shipping) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or missing order details in the request",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Order Summary",
            },
            unit_amount: (subtotal + shipping) * 100, // Total amount in cents
          },
          quantity: 1, // Quantity is set to 1 for the total amount
        },
      ],
      success_url: "http://localhost:5173/order",
      cancel_url: "http://localhost:5173/cancelOrder",
    });

    res.json({
      status: "success",
      message: "Payment initiated successfully",
      url: session.url,
    });
  } catch (error) {
    console.error("Error making payment:", error);

    if (error.type === "StripeCardError") {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }

    if (error.type === "StripeInvalidRequestError") {
      return res.status(400).json({
        status: "error",
        message: "Invalid request to Stripe API",
      });
    }

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
