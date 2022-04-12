
import { _decorator, Component, Node, Vec3, ERigidBodyType, RigidBody, SystemEvent, systemEvent, Collider, ICollisionEvent, director, sys, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Main
 * DateTime = Fri Oct 08 2021 23:51:25 GMT+0800 (中国标准时间)
 * Author = tsuki2478
 * FileBasename = main.ts
 * FileBasenameNoExtension = main
 * URL = db://assets/Scene/main.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('Main')
export class Main extends Component {
    @property(Node)
    public dices: Node = null;
    public audio: Node = null;
    public dice: any = null;
    public power: any = 4;
    public rb = null;
    public vel = null;
    start () {

            this.subjectTouch();
    }

    onTouchStart (e) {
        for (let i = 0; i < this.dice.length; i++) {
            let dice = this.dice[i];
            let rb = dice.getComponent(RigidBody); // 遍历骰子节点，获取节点上的刚体组件
            rb.setLinearVelocity(new Vec3(0,0,0)); // 把刚体的速度设置为0
            setTimeout(() => {
                rb.type = ERigidBodyType.KINEMATIC; 
                // 把刚体类型设置为运动学刚体，动态刚体不能通过脚本干预运动方式，在操控骰子时要先把刚体类型设置为KINEMATIC
            }, 0);
            // 刚体类型修改在当前帧不生效，所以加了个setTimeout强制在下一帧执行
            dice.setPosition(0, 5, 0); //只改变Y的值，骰子定位到正上方
        }
    }
  
    onTouchMove (e) {
        // 拖拽骰子
        var delta = e.getDelta();
        for (var i = 0; i < this.dice.length; i++) {
            let dice = this.dice[i];
            dice.setPosition((dice.position.x + delta.y / 50) || 1, 5,( dice.position.z + delta.x / 50)  || 1) ;
        }
    }
    
    onTouchEnd (e) {
        // 释放骰子，并加上一个随机的速度和角速度冲量
        for (var i = 0; i < this.dice.length; i++) {
            let dice = this.dice[i];
            let rb = dice.getComponent(RigidBody);
            setTimeout(() => {
                rb.type = ERigidBodyType.DYNAMIC;  // 将RigidBody设置回动态
                let r = (Math.random() - 0.5) * this.power;
                let ry = -(Math.random() + 0.2) * this.power;
                let rt = (Math.random() - 0.5) * this.power * 30;
                rb.applyImpulse(new Vec3(r, ry, r), new Vec3(0,0,0));
                rb.applyTorque(new Vec3(rt, rt, rt));
            }, 0);
        }
    }

    moveAll(){
        for (var i = 0; i < this.dice.length; i++) {
            this.dice[i].pauseSystemEvents(true);
            }
        // systemEvent.off(SystemEvent.EventType.TOUCH_START);
        // systemEvent.off(SystemEvent.EventType.TOUCH_MOVE);
        // systemEvent.off(SystemEvent.EventType.TOUCH_END);
    }

    subjectTouch() {
        this.dice = this.dices.children; // 保存获取到的6个骰子节点
        systemEvent.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
        systemEvent.on(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
        console.log(this.dice,'-----');
    }
    
 
}
