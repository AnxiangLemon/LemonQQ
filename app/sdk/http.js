// go http连接池操作
class http {
    Get(url, headers = {}, cookies = {}, body = null, timeout = 10, proxyUrl = null) {
        return jsHttp(url, "GET", headers, cookies, body, timeout, proxyUrl);
    }

    Post(url, headers = {}, cookies = {}, body = null, timeout = 10, proxyUrl = null) {
        return jsHttp(url, "POST", headers, cookies, body, timeout, proxyUrl);
    }
}

module.exports = new http();