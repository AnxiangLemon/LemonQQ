// http 请求操作
class Http {
    request(method, url, headers = {}, cookies = {}, body = null, timeout = 10, proxyUrl = null) {
        return jsHttp(url, method, headers, cookies, body, timeout, proxyUrl);
    }

    get(url, headers = {}, cookies = {}, body = null, timeout = 10, proxyUrl = null) {
        return this.request("GET", url, headers, cookies, body, timeout, proxyUrl);
    }

    post(url, headers = {}, cookies = {}, body = null, timeout = 10, proxyUrl = null) {
        return this.request("POST", url, headers, cookies, body, timeout, proxyUrl);
    }
}

module.exports = new Http();
