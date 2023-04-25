const LQ = require('../../sdk/LQSdk')
const http = require('../../sdk/http')


class ChatGPT {
    defaultConfig = {
        PROXY_URL: null,
        API_SECRET: '',
        QQ_GROUP: [],
        GPT_TIMEOUT: 60, // 单位：s
    }
    constructor(config) {
        this.config = { ...(this.defaultConfig), ...config };
        console.log('config: ' + JSON.stringify(this.config));
    }

    qqGroupChat = (msgObj) => {
        if (this.config.QQ_GROUP.indexOf(Number.parseInt(msgObj.fromgroup)) !== -1) {
            let content = msgObj.content;
            if (content === undefined) {
                return;
            }
            console.log('content ==> ' + content);
            let atString = `[LQ:@${msgObj.selfid}]`;
            if (content.startsWith(atString)) {
                content = content.substring(atString.length + 1, content.length).trim();
                console.log('prompt ==> ' + content)
                try {
                    if (content.length > 1) {
                        this.chat(content, (msg) => {
                            let ret = LQ.SendGroupMessage(msgObj.selfid, msgObj.fromgroup, msg, false);
                            console.log('QQ Send Result <== ', ret)
                        })
                    }
                } catch (e) {
                    try {
                        let message = e.message.toString();
                        if (message.includes('Timeout')) {
                            let ret = LQ.SendGroupMessage(msgObj.selfid, msgObj.fromgroup, '访问GPT超时', false);
                            console.log('QQ Send Result <== ', ret)
                        } else {
                            let ret = LQ.SendGroupMessage(msgObj.selfid, msgObj.fromgroup, '访问GPT错误', false);
                            console.log('QQ Send Result <== ', ret);
                        }
                    } catch (e) {
                        console.error('error', e);

                    }
                }
            }
        }
    }

    chat = (content, fun) => {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.API_SECRET}`
        };
        let body = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": content
                }
            ]
        });
        console.log('ChatGPT Request ==> ' + content);
        const response = http.post('https://api.openai.com/v1/chat/completions', headers, {}, body, this.config.GPT_TIMEOUT, this.config.PROXY_URL)
        let data = JSON.parse(response);
        if (data.error !== undefined) {
            console.error('ChatGPT Response <== ' + response)
            fun('GPT响应错误')
        }
        let message = data.choices[0].message.content;
        console.log('ChatGPT Response <== ' + message)
        fun(message)
    }
}

module.exports = ChatGPT