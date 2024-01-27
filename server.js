import express from "express";
import bodyParser from "body-parser";

const PORT = 4000;
const app = express();

app.use(bodyParser.urlencoded({ urlencoded: true })) ;
app.use(bodyParser.json());
