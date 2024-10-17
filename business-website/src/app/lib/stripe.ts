import Stripe from "stripe";

export const stripe = new Stripe("sk_test_51PidBlLfYyqCWpgttsTEkz4cykbjdDKxj6TVJ3ELyilJSYhtbPorbRphGLswKknM4GtuWtnJ6ZOVy035ymjZUNir00YuAr2lYY", {
    apiVersion: "2024-09-30.acacia",
    typescript: true,
})