const express = require('express');
const bodyParser = require('body-parser');
const Consul = require('consul');
const app = express();
const port = 3000;

const consul = new Consul({
    host: '127.0.0.1',
    port: 8500,
    promisify: true,
});

function registeringService() {
    let address = '172.16.10.21';
    let serviceName = 'service1';
    consul.agent.service.register({
        name: serviceName,
        address,
        port,
        check: {
            http: `http://${address}:${port}/health`,
            interval: '10s',
            timeout: '5s',
        }
    }, function(err, result) {
        if (err) {
            console.error(err);
            throw err;
        }
    
        console.log(serviceName + ' 注册成功！');
    })
}

registeringService();

app.use(bodyParser.json({
    limit: '10mb'
}));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/health', (req, res) => {
    res.send('ok');
});

app.get('/api/service', (req, res) => {
    res.send('service1');
});

app.get('/api/user/:id', async (req, res) => {
    let id = parseInt(req.params.id) || 0;
    const result = await consul.kv.get("user/" + id);
    if (!result) {
        res.json({code: 0, data: null});
        return;
    }
    let value = JSON.parse(result.Value);
    res.json({code: 0, data: value});
});

app.post('/api/user/:id', async (req, res) => {
    let id = parseInt(req.params.id) || 0;
    let user = req.body || {};
    await consul.kv.set('user/' + id, JSON.stringify(user))
    res.json({code: 0 });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});