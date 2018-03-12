let express = require("express");

let app = express();
 
var thorio = require("thor-io.vnext").ThorIO;

// import your controllers gere
import {ChatController} from '../server/controllers/ChatController'
import {RocketController} from '../server/controllers/RocketController'
import {MyController} from '../server/controllers/MyController'

var thorIO = new thorio.Engine(
    [
        ChatController,
        RocketController,
        MyController
    ]
); 

var expressWs = require("express-ws")(app);

app.use("/", express.static("debug"));
app.use("/lib", express.static("node_modules")); 

app.ws("/", function (ws, req) {    
       thorIO.addWebSocket(ws,req);
});

var port = process.env.PORT || 1337;
app.listen(port);

console.log("thor-io is serving on ", port.toString());