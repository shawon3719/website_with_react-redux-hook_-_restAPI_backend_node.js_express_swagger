require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const sliderRouter = require("./api/sliders/slider.router");
const pageRouter = require("./api/dynamicPage/page.router");
const cors = require('cors')
const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");


app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/sliders", sliderRouter);
app.use("/api/pages", pageRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running on port :", process.env.APP_PORT);
});
