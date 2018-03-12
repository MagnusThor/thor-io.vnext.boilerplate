
import {
    ThorIO,
    ControllerProperties,
    CanInvoke,
    CanSet
} from 'thor-io.vnext'

@ControllerProperties("chatController", false, -1)
export class ChatController extends ThorIO.Controller {

    @CanSet(true)
    public address: string;

    constructor(connection: ThorIO.Connection) {
        super(connection);
    }

    @CanInvoke(true)
    setAddress(address: string)
    {
        this.address = address;
        console.log("Address Set - " + address);
    }

    onopen(){
        console.log("Connection Opened");
    }

    onclose(){
        console.log("Connection Closed - " + this.address);
    }

    @CanInvoke(true)
    sendMessage(data: any) {
        let expr = function (pre: ChatController) {
            return true;
        }
        console.log("Global Message: " + data.message);

        this.invokeTo(expr, data, "onMessageReceived");
    }

    @CanInvoke(true)
    sendDirectMessage(data: any) {
        let expr = function (pre: ChatController) {
            console.log("Direct Message: " + pre.address + " -> " + data.recipient);
            return pre.address == data.recipient;
        }
        this.invokeTo(expr, data, "onMessageReceived");
    }

    // @CanInvoke(true)
    // invokeAndReturn(data: any) {
    //     // will back what sent to callee
    //     this.invoke(data, "invokeAndReturn");
    // }

    // @CanInvoke(true)
    // invokeAndSendToAll(data: any) {
    //     // will send what callee passes to all clients connected to 'test' , see @ControllerProperties
    //     this.invokeToAll(data, "invokeAndSendToAll");
    // }

    // @CanInvoke(true)
    // publishTemperature(temperatue:any){
    //     this.publishToAll(temperatue, "tempChange");
    // }

    // @CanInvoke(true)
    // invokeAndSendOthers(data: any) {
    //     // will send what callee passes to all clients connected to 'test' except 'self' , see @ControllerProperties
    //     this.invokeToOthers(data, "invokeAndSendOthers");
    // }

    // @CanInvoke(true)
    // invokeToExpr(data: any) {
    //     let expr = function (pre: ChatController) {
    //         return pre.size >= 10;
    //     }
    //     this.invokeTo(expr, data, "invokeToExpr");
    // }

}