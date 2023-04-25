///////////////////////////////////////////////////////////////////////
//// 以下是go语言调用js的函数 请勿更改函数名 入参 不需要的事件可以删除 需保留核心函数 AppInfo
///////////////////////////////////////////////////////////////////////
//这是一个简单的NTQQ插件开发demo
const LQ = require('./sdk/LQSdk')
const http = require('./sdk/http')
const db = require('./sdk/db')
const { sleep } = require('./sdk/utils');

//这是一个 插件信息模板 如果你想写插件 请把文件名改成自定义的 不建议和我们提供的的同名为app.js

function AppInfo() {
    return {
        apiVer: 1, //不应修改
        appId: 'com.lemon.demo', //应用ID 唯一 建议用域名反写
        name: 'DemoApp', //需要改 尽量唯一
        ver: '1.0.1', //版本号
        authkey: '', //开发者id 预留
        author: 'Lemon',//作者
        description: 'TG:https://t.me/LemonQQBot', //插件释义
    }
}

//收到新的聊天消息  不需要可删除
function _eventRecvMsg(newMsg) {
    console.log('收到新的消息 这是Js打印的数据>>> ', newMsg)
    let msgObj = JSON.parse(newMsg)
    //不处理自己发的消息
    if (msgObj.selfid == msgObj.fromqq) {
        return 1
    }
    //'🐱 🐭 🐹 🐰 🦊 🦝 🐼 ' 特殊表情直接发送
    if (msgObj.fromgroup == 123456789) {
        sleep(1000)
        let ret = LQ.SendGroupMessage(msgObj.selfid, msgObj.fromgroup, msgObj.content, false)
        console.log('打印发送返回值>> ', ret)
    }
    return 0
}

//收到全量的消息 自行解析 不需要可删除
function _eventTipsMsg(newMsg) {
    //var msgObj = JSON.parse(newMsg)
    console.log('_eventTipsMsg 这是Js打印的数据>>> ', newMsg)
    return 0
}

//////////////////////////////////////////////////
//以下是自定义的函数
/////////////////////////////////////////////////


//这个是一个简单的HTTPdemo 调用go的高性能请求池去操作
function demohttp() {
    const headers = {
        'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        'Content-Type': 'application/json',
    }

    const cookies = {
        cookie1: 'value1',
        cookie2: 'value2',
    }
    const proxyUrl = "http://127.0.0.1:7890"
    const body = JSON.stringify({ key: 'value' })
    const timeout = 10
    const response = http.get('http://baidu.com/', headers, cookies, body, timeout, proxyUrl)
    console.log(response)
}

//这是一个数据库使用的demo
function demodb() {
    console.log(db.get("testkey001"))
    console.log(db.has("testkey001"))
    console.log(db.put("testkey001", "这是存放的数据"))
    console.log(db.put("testkey002", "这是存放的数据2"))
    console.log(db.delete("testkey001"))
    console.log(db.get("testkey001"))
    console.log(db.get("testkey002"))
}