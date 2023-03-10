import express from "express";
import router from "./router.js";
import main from "./database.js";
import cors from "cors";

const port = process.env.PORT ?? 5000;

const app = express();

//Middlewares

app.use(express.json());
app.use(cors());

app.use(router);

//connect db

try {
  main();
} catch (error) {
  console.error(error);
}

//Start server

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
