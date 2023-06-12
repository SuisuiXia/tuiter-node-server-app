// const express = require('express')

import express from 'express';
import cors from 'cors'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./controllers/users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import AuthController from "./controllers/users/auth-controller.js";

const app = express();
app.use(
 session({
   secret: "any string",
   resave: false,
   saveUninitialized: true,
 })
);
app.use(cors({
   credentials: true,
   origin: "http://localhost:3000",
 })
)
app.use(express.json());
TuitsController(app);
HelloController(app);
AuthController(app);
UserController(app);
app.listen(process.env.PORT || 4000);