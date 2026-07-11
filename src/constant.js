import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const DBURI = process.env.DBURI;
const JWT_SECRET = process.env.JWT_SECRET;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;



export {
    PORT, DBURI, JWT_SECRET, GEMINI_API_KEY

}