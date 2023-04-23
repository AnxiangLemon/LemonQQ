const ChatGPT = require("./plugins/chatgpt/chatgpt");

let chat = new ChatGPT({
    // PROXY_URL: 'http://127.0.0.1:7890',
    API_SECRET: '',
    QQ_GROUP: []
});
chat.qqGroupChat(msgObj);

//插件信息模板
function AppInfo() {
    return {
        apiVer: 1, //不应修改
        appId: 'com.baidu.lemon', //应用ID 唯一 建议用域名反写
        name: 'DemoApp',
        ver: '1.0.1',
        authkey: '', //开发者id 预留
        author: '柠檬',
        description: 'TG:https://t.me/LemonQQBot',
    }
}


//收到新的聊天消息
function _eventRecvMsg(newMsg) {
    console.log('收到新的消息 这是Js打印的数据>>> ', newMsg)
    let msgObj = JSON.parse(newMsg)
    //不处理自己发的消息
    if (msgObj.selfid === msgObj.fromqq) {
        return 1
    }
    chat.qqGroupChat(msgObj);
    return 0
}

//收到全量的消息 自行解析
function _eventTipsMsg(newMsg) {
    //var msgObj = JSON.parse(newMsg)
    console.log('_eventTipsMsg 这是Js打印的数据>>> ', newMsg)
    return 0
}

