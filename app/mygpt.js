const ChatGPT = require("./plugins/chatgpt/chatgpt");

let chat = new ChatGPT({
    // PROXY_URL: 'http://127.0.0.1:7890',
    API_SECRET: '',//GPTKey
    QQ_GROUP: []//监听群号
});

function AppInfo() {
    return {
        apiVer: 1, //不应修改
        appId: 'com.lemon.gpt', //应用ID 唯一 建议用域名反写
        name: 'GPT聊天',
        ver: '1.0.1',
        authkey: '', 
        author: '青',
        description: 'TG:https://t.me/LemonQQBot',
    }
}

function _eventRecvMsg(newMsg) {
    let msgObj = JSON.parse(newMsg)
    if (msgObj.selfid === msgObj.fromqq) {
        return 1
    }
    chat.qqGroupChat(msgObj);
    return 0
}

