const Feature = require("./Feature");


const prefix = require('../Bot').prefix;
const CryptoJS = require('crypto-js');
var  Client = require('../Bot');
class Hashing extends Feature {
    constructor () {
        Client.helpEmbed.addField('> Hashing Commands',
        `- **${Client.prefix}md5** [data] | *Hash text to md5*`);
        super();
    }
    static handleMessage(msg) {
        if (msg.content.startsWith(prefix+"md5")) {
            var data = msg.content.split(' ').splice(1,1).join(' ');
            msg.channel.send("Hashing MD5 ...");
            var output = "";
            try {
                output = CryptoJS.MD5(data.toString())
            } catch(e) {
                msg.channel.send("Error: "+e);
                return;
            }
            msg.channel.send("```"+output+"```");
        }
    }
} 
module.exports = Hashing;