require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const sliderRouter = require("./api/sliders/slider.router");
const galleryRouter = require("./api/gallery/gallery.router");
const pageRouter = require("./api/dynamicPage/page.router");
const noticeRouter = require("./api/notice/notice.router");
const systemRouter = require("./api/systemSettings/system.router");
const calendarRouter = require("./api/academicCalendar/calendar.router");
const employeeCategoryRouter = require("./api/employeeCategory/employee.category.router");
const employeeRouter = require("./api/employee/employee.router");
const cors = require('cors')
const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");


app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/sliders", sliderRouter);
app.use("/api/galleries", galleryRouter);
app.use("/api/pages", pageRouter);
app.use("/api/notices", noticeRouter);
app.use("/api/system-settings", systemRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/employee-category", employeeCategoryRouter);
app.use("/api/employee", employeeRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running on port :", process.env.APP_PORT);
});
