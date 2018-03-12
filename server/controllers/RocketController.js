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
class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        ;
    }
    normalize() {
        let lengthval = this.length();
        if (lengthval != 0) {
            this.x /= lengthval;
            this.y /= lengthval;
            this.z /= lengthval;
            return true;
        }
        else {
            return false;
        }
    }
    angle(vectorB) {
        var anorm = new Vector3(this.x, this.y, this.z);
        anorm.normalize();
        var bnorm = new Vector3(vectorB.x, vectorB.y, vectorB.z);
        bnorm.normalize();
        let dot = anorm.dot(bnorm);
        return Math.acos(dot);
    }
    cross(vectorB) {
        var tempvec = new Vector3(this.x, this.y, this.z);
        tempvec.x = (this.y * vectorB.z) - (this.z * vectorB.y);
        tempvec.y = (this.z * vectorB.x) - (this.x * vectorB.z);
        tempvec.z = (this.x * vectorB.y) - (this.y * vectorB.x);
        this.x = tempvec.x;
        this.y = tempvec.y;
        this.z = tempvec.z;
    }
    dot(b) {
        return this.x * b.x + this.y * b.y + this.z * b.z;
    }
}
class EntityDetails {
}
class NetworkEventMessage {
    constructor(data) {
        this.value = data;
        this.ts = performance.now();
    }
}
let RocketController = class RocketController extends thor_io_vnext_1.ThorIO.Controller {
    constructor(connection) {
        super(connection);
        // set default world;
        this.world = "map1";
    }
    onclose() {
        console.log("Disconnected - " + this.connection.id);
    }
    onopen() {
        console.log("Connected - " + this.connection.id);
    }
    onerror() {
        console.log("Error");
    }
    setWorld(world) {
        this.world = world.value;
        this.invoke(this.world, "onWorldSet"); // confirm that world is set.
    }
    moveRocket(entityDetails) {
        let expression = (pre) => {
            return true; //pre.world == this.world;
        }; // expression saying , this type of controller, but just same world!
        console.log("Moving...");
        console.log(entityDetails);
        this.invokeToAll(entityDetails, "onRocketMove");
    }
    spawnRocket(entityDetails) {
        let expression = (pre) => {
            return true; //pre.world == this.world;
        }; // expression saying , this type of controller, but just same world!
        this.invokeToAll(entityDetails, "onSpawnRocket"); //entityDetails //Others
        console.log("Spawn called @ ");
        console.log(entityDetails);
    }
};
__decorate([
    thor_io_vnext_1.CanInvoke(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NetworkEventMessage]),
    __metadata("design:returntype", void 0)
], RocketController.prototype, "setWorld", null);
__decorate([
    thor_io_vnext_1.CanInvoke(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RocketController.prototype, "moveRocket", null);
__decorate([
    thor_io_vnext_1.CanInvoke(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RocketController.prototype, "spawnRocket", null);
RocketController = __decorate([
    thor_io_vnext_1.ControllerProperties("rocketGame", false, 50000),
    __metadata("design:paramtypes", [thor_io_vnext_1.ThorIO.Connection])
], RocketController);
exports.RocketController = RocketController;
