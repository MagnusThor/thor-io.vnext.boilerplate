"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let express = require("express");
let app = express();
var thorio = require("thor-io.vnext").ThorIO;
// import your controllers gere
const ChatController_1 = require("../server/controllers/ChatController");
const RocketController_1 = require("../server/controllers/RocketController");
const MyController_1 = require("../server/controllers/MyController");
var thorIO = new thorio.Engine([
    ChatController_1.ChatController,
    RocketController_1.RocketController,
    MyController_1.MyController
]);
var expressWs = require("express-ws")(app);
app.use("/", express.static("debug"));
app.use("/lib", express.static("node_modules"));
app.ws("/", function (ws, req) {
    thorIO.addWebSocket(ws, req);
});
var port = process.env.PORT || 1337;
app.listen(port);
console.log("thor-io is serving on ", port.toString());
