import "./loadEnvironment";
import connectDB from "./database";
import startServer from "./server/startServer";

const http = require("http");

const port = +process.env.PORT || 3100;

const mongoURL = process.env.MONGODB_URL;

(async () => {
    setInterval(() => {
        http.get("http://apartmanage.onrender.com");
    }, 300000);

    try {
        await connectDB(mongoURL);
        await startServer(port);
    } catch (error) {
        process.exit(1);
    }
})();
