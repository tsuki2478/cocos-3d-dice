
import { _decorator, Component, Node, RigidBody, Vec3, Collider, ICollisionEvent, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Pong
 * DateTime = Sat Oct 09 2021 18:30:46 GMT+0800 (中国标准时间)
 * Author = tsuki2478
 * FileBasename = pong.ts
 * FileBasenameNoExtension = pong
 * URL = db://assets/Scene/pong.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('Pong')
export class Pong extends Component {
    public rb = null;
    public vel = null;
    audioSource:any =null;
    public lastTime = 0;
    
    start () {
            this.rb = this.getComponent(RigidBody);
            this.vel = new Vec3(0,0,0);
            let Cld = this.getComponent(Collider);
            this.audioSource = this.getComponent(AudioSource);
            Cld.on('onCollisionEnter', this.onCollision, this); // 碰撞事件监听
    }
    // 音效
    private onCollision (event: ICollisionEvent) {
        let curTime = new Date().getTime();
        if (curTime - this.lastTime > 50) {
            // 过渡50ms内的连续碰撞
            this.rb.getLinearVelocity(this.vel); // 获取碰撞时刚体的相对速度
            this.audioSource.volume = Math.pow(Vec3.len(this.vel), 2) / 100; //根据相对速度设置音量
            this.audioSource.play();
        }
        this.lastTime = curTime;
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
