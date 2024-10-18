//NOTE: THIS IS SEPARATION IS OPTIONAL. WE COULD INSTEAD INITIALIZE THIS STRIPE INSTANCE IN THE PAYMENTFORM AND SEND THROUGH SECRET KEY VIA PROPS

import Stripe from "stripe";

export const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: "2024-09-30.acacia",
    typescript: true,
})