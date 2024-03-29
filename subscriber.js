const redis = require("redis");
const subscriber = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

subscriber.on("pmessage", function(pattern, channel, message) {
  console.log("Subscriber received message in channel '" + channel + "': " + message);
});

subscriber.psubscribe('*');