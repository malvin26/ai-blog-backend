import app from "./src/app.js"
import { PORT } from "./src/constant.js"
import { dbConnect } from "./src/dbConfig/dbConfig.js";


dbConnect
    ();


app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})