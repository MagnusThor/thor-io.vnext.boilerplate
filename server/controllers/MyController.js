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
let MyController = class MyController extends thor_io_vnext_1.ThorIO.Controller {
    constructor(connection) {
        super(connection);
        this.size = 0;
    }
    invokeAndReturn(data) {
        // will back what sent to callee
        this.invoke(data, "invokeAndReturn");
    }
    invokeAndSendToAll(data) {
        // will send what callee passes to all clients connected to 'test' , see @ControllerProperties
        this.invokeToAll(data, "invokeAndSendToAll");
    }
    publishTemperature(temperatue) {
        this.publishToAll(temperatue, "tempChange");
    }
    invokeAndSendOthers(data) {
        // will send what callee passes to all clients connected to 'test' except 'self' , see @ControllerProperties
        this.invokeToOthers(data, "invokeAndSendOthers");
    }
    invokeToExpr(data) {
        // create an expression, send just to clients 
        // what has an age >= 10;
        let expr = function (pre) {
            return pre.size >= 10;
        };
        this.invokeTo(expr, data, "invokeToExpr");
    }
};
__decorate([
    thor_io_vnext_1.CanSet(true),
    __metadata("design:type", Number)
], MyController.prototype, "size", void 0);
__decorate([
    thor_io_vnext_1.CanInvoke(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyController.prototype, "invokeAndReturn", null);
__decorate([
    thor_io_vnext_1.CanInvoke(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyController.prototype, "invokeAndSendToAll", null);
__decorate([
    thor_io_vnext_1.CanInvoke(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyController.prototype, "publishTemperature", null);
__decorate([
    thor_io_vnext_1.CanInvoke(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyController.prototype, "invokeAndSendOthers", null);
__decorate([
    thor_io_vnext_1.CanInvoke(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyController.prototype, "invokeToExpr", null);
MyController = __decorate([
    thor_io_vnext_1.ControllerProperties("mycontroller"),
    __metadata("design:paramtypes", [thor_io_vnext_1.ThorIO.Connection])
], MyController);
exports.MyController = MyController;
