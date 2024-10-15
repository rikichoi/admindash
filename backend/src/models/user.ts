import { model, Schema } from "mongoose";

const User = model(
    "User",
    new Schema(
        {
            email: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true
            },
            passwordHashed: {
                type: String,
                required: true
            }
            // as const is optional, im keeping it here because i am a noob and this was the boilerplate code provided by lucia auth documentation
        } as const,
        { timestamps: true },

    )
);

export default User;