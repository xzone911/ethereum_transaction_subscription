const Web3 = require('web3');
const dotEnv = require('dotenv-safe');
dotEnv.config({example: '.env'});

const redis = require("redis");
const publisher = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.WEBSOCKET_ENDPOINT));
const subscription = web3.eth.subscribe('pendingTransactions');


subscription.subscribe((error, result) => {
    if (error) {
        console.log(error);
    }
})
    .on('data', async (txHash) => {
        try {
            const web3Http = new Web3(process.env.HTTP_ENDPOINT);
            const tx = await web3Http.eth.getTransaction(txHash);
            console.log(tx);
            const from = tx["from"];
            const to = tx["to"];
            const value = tx["value"];
            console.log(`Publishing transaction data to ${from}/${to}/${value}`);
            publisher.publish(`${from}/${to}/${value}`, JSON.stringify(tx));
        } catch (error) {
            console.log(error)
        }
    });
