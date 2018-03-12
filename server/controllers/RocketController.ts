import {
    ThorIO,
    ControllerProperties,
    CanInvoke,
    CanSet
} from 'thor-io.vnext'


class Vector3 {
    z: number;
    y: number;
    x: number;
    constructor(x: number, y: number, z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
    }
    length(){
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);;
    }

    normalize(){
        let lengthval = this.length();
        
                    if (lengthval != 0) {
                        this.x /= lengthval;
                        this.y /= lengthval;
                        this.z /= lengthval;
                        return true;
                    } else {
                        return false;
                    }
    }
    angle(vectorB:Vector3){
            var anorm = new Vector3(this.x, this.y, this.z);
            anorm.normalize();
            var bnorm = new Vector3(vectorB.x,vectorB.y,vectorB.z);
            bnorm.normalize();
            let dot = anorm.dot(bnorm);
            return Math.acos(dot);
    }

    cross(vectorB:Vector3) {
        var tempvec = new Vector3(this.x, this.y, this.z);
        tempvec.x = (this.y * vectorB.z) - (this.z * vectorB.y);
        tempvec.y = (this.z * vectorB.x) - (this.x * vectorB.z);
        tempvec.z = (this.x * vectorB.y) - (this.y * vectorB.x);
        this.x = tempvec.x;
        this.y = tempvec.y;
        this.z = tempvec.z;
     
    }

    dot(b:Vector3){
        return this.x * b.x + this.y * b.y + this.z * b.z;
    }
  
}

class EntityDetails
{
    token: string;
    position: Vector3;
    rotation: Vector3;
}

 interface INetworkMessageEvent{
   
}

 class NetworkEventMessage<T> implements INetworkMessageEvent{
        value: T;
        ts: Number
        constructor(data:T ){
            this.value = data;
            this.ts = performance.now();
        }

}

@ControllerProperties("rocketGame", false, 50000)
export class RocketController extends ThorIO.Controller{

        public world: string

        constructor(connection:ThorIO.Connection){
            super(connection)
            // set default world;

            this.world = "map1"
        }

        onclose(){
            console.log("Disconnected - " + this.connection.id);
        }

        onopen(){
            console.log("Connected - " + this.connection.id);
        }

        onerror(){
            console.log("Error");
        }

        

        @CanInvoke(true)
        setWorld(world:NetworkEventMessage<string>){
                this.world = world.value;
                this.invoke(this.world,"onWorldSet"); // confirm that world is set.
        }

        @CanInvoke(true)
        moveRocket(entityDetails:any){ //NetworkEventMessage<
                let expression = (pre:RocketController) => {
                    return true; //pre.world == this.world;
                } // expression saying , this type of controller, but just same world!

                console.log("Moving...");
                console.log(entityDetails);
                this.invokeToAll(entityDetails, "onRocketMove");
        }

        @CanInvoke(true)
        spawnRocket(entityDetails:any) //
        {
            let expression = (pre:RocketController) => {
                return true; //pre.world == this.world;
            } // expression saying , this type of controller, but just same world!

            this.invokeToAll(entityDetails, "onSpawnRocket"); //entityDetails //Others

            console.log("Spawn called @ ");
            console.log(entityDetails);
        }
} 