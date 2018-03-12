"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const thor_io_vnext_1 = require("thor-io.vnext");
let ChatController = class ChatController extends thor_io_vnext_1.ThorIO.Controller {
    constructor(connection) {
        super(connection);
    }
    setAddress(address) {
        this.address = address;
        console.log("Address Set - " + address);
    }
    onopen() {
        console.log("Connection Opened");
    }
    onclose() {
        console.log("Connection Closed - " + this.address);
    }
    sendMessage(data) {
        let expr = function (pre) {
            return true;
        };
        console.log("Global Message: " + data.message);
        this.invokeTo(expr, data, "onMessageReceived");
    }
    sendDirectMessage(data) {
        let expr = function (pre) {
            console.log("Direct Message: " + pre.address + " -> " + data.recipient);
            return pre.address == data.recipient;
        };
        this.invokeTo(expr, data, "onMessageReceived");
    }
};
__decorate([
    thor_io_vnext_1.CanSet(true),
    __metadata("design:type", String)
], ChatController.prototype, "address", void 0);
__decorate([
    thor_io_vnext_1.CanInvoke(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "setAddress", null);
__decorate([
    thor_io_vnext_1.CanInvoke(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "sendMessage", null);
__decorate([
    thor_io_vnext_1.CanInvoke(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "sendDirectMessage", null);
ChatController = __decorate([
    thor_io_vnext_1.ControllerProperties("chatController", false, -1),
    __metadata("design:paramtypes", [thor_io_vnext_1.ThorIO.Connection])
], ChatController);
exports.ChatController = ChatController;
