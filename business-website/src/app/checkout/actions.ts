"use server"

import { stripe } from "../../lib/stripe";

export async function createPaymentIntent(amount: number) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: { enabled: true },
            metadata: {}
        })
        return paymentIntent.client_secret

    } catch (error) {
        console.log(error);
        throw new Error(`Internal Server Error: ${error}`);
    }
};
