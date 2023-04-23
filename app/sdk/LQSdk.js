///////////////////////////////////////////////////////////////////////
//// 以下是js调用go语言的核心API  这是提供的sdk 不要随意修改 version 1
///////////////////////////////////////////////////////////////////////

class LQ {
    constructor() {
    }

    // 懒得没写  等待叭  需要的功能Tg 留言
    log(data) {
        console.log("log: %j", data);
        console.log("log json: ", JSON.stringify(data, null, 2));
    }

    //发送群消息
    SendGroupMessage(quin, group, content, autoEscape) {
        let ret = LQSendGroupMessage(quin, group, content, autoEscape)
        return ret
    }

    sleep(s) {
        jsSleep(s)
    }

}

module.exports = new LQ();