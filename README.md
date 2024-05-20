# webhook-adapter
```bash
node index.js --port=8080 --adapter=./prometheusalert/wx.js=/wx=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key={key} --adapter=./prometheusalert/dingtalk.js=/dingtalk=https://oapi.dingtalk.com/robot/send?access_token={token}#{secret}
```

## docker
```bash
docker run --name webhook-adapter -p 8080:80 -d guyongquan/webhook-adapter --adapter=/app/prometheusalert/wx.js=/wx=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key={key} --adapter=/app/prometheusalert/dingtalk.js=/dingtalk=https://oapi.dingtalk.com/robot/send?access_token={token}#{secret}
```
## docker-lzmh
```bash
docker run --name webhook-lzmh -p 18080:80 -d webhook-lzmh:1.3 --adapter=/app/prometheusalert/lzmh.js=/lzmh=https://im.zdxlz.com/im-api/v1/webHook/send?key={key}
```