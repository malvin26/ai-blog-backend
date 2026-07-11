import mongoose from "mongoose";
import { DBURI } from "../constant.js";


export const dbConnect = async () => {
    try {

        const result = await mongoose.connect(DBURI);

        if (result) {
            console.log("db connect successfully");

        }

    } catch (error) {
        console.log("db connect fn err: ", error)
    }
}



