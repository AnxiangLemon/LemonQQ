///////////////////////////////////////////////////////////////////////
//// 以下是js调用go语言的核心API  这是提供的sdk 不要随意修改 version 1
///////////////////////////////////////////////////////////////////////

//待完善

class LQ {
    //发送群消息
    SendGroupMessage(quin, group, content, autoEscape) {
        let ret = LQSendGroupMessage(quin, group, content, autoEscape)
        return ret
    }
}

module.exports = new LQ();