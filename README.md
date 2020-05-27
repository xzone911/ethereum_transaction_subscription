## Ethereum Transaction Subscription
Ethereum Transaction Subscription allows clients to subscribe 
to pending Ethereum blockchain transactions using a Pub/Sub mechanism powered by Redis.

### Getting Started
1) Install docker, nodejs and npm

2) Install Redis

   ```
   docker pull redis:6.0.3-alpine3.11
   docker container run --name redis -d -p 6379:6379 redis:6.0.3-alpine3.11  
   ```

3) Clone repo

   ```
   git clone https://github.com/viraja1/ethereum_transaction_subscription.git 
   ```
   
4) Change directory

   ```
   cd ethereum_transaction_subscription
   ``` 
   
5) Create .env file based on .env_sample

   ```
   cp .env_sample .env 
   ```
   
6) Update the following environment variables in .env

   ``` 
   WEBSOCKET_ENDPOINT
   HTTP_ENDPOINT
   REDIS_HOST
   REDIS_PORT
   ```
   
   For WEBSOCKET_ENDPOINT and HTTP_ENDPOINT, you can either host a 
   full Ethereum node or signup for an INFURA account at https://infura.io/
   
7) Start the publisher server
   
   ```
   npm start 
   ```
   
   This script will fetch the latest pending Ethereum transactions and publish 
   them to the Redis Channel named {from}/{to}/{amount} where from and to are the
   sender and the receiver of the Ethereum transaction.
   
8) Start the subscriber script

   ```
   node subscriber.js
   ```
   
   Right now the subscriber script subscribes to all the channels using a * glob
   pattern. However it can be updated to subscribe to the transactions of a specific 
   sender / receiver or transactions between a particular sender & receiver or  
   transactions between a particular sender & receiver for a specific amount.
   
   e.g.
   
   ```
   {sender_address}/*/*
   
   */{receiver_address}/*
   
   {sender_address}/{receiver_address}/*
   
   {sender_address}/{receiver_address}/{amount}
   ```

   
   
   
   
   
   
   