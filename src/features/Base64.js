const CryptoJS = require('crypto-js');
const bot = require('../Bot').bot;
var  Client = require('../Bot');
const Feature = require('./Feature');
const prefix = require('../Bot').prefix;
class Base64 extends Feature {
    constructor () {
        Client.helpEmbed.addField('> Base64 Commands',`- **${Client.prefix}b64encode** [data] | *Encode text to base64*
        **- ${Client.prefix}b64decode** [data] | *Decode text from base64*`);
        super();
    }
   static handleMessage(msg) {
        
        if (msg.content.startsWith(Client.prefix+"b64encode")) {
            //Get data
            var data = msg.content.split(' ').splice(1,1).join(' ');
            if (data == "") {
                msg.channel.send('Data in is empty !');
                return;
            }
            if (data.length > 1000) {
                msg.channel.send('Data in is upper 1000 characters !');
                return;
            }
            
            msg.channel.send("Encoding text ... (Length: "+data.length+")");
            var code = "";
            try {
                var words = CryptoJS.enc.Utf8.parse(data);
                code = CryptoJS.enc.Base64.stringify(words);
            } catch(e) {
                console.log(e);
                
                msg.channel.send('Error: '+e);
                return;
            }
            if (code.length > 2000) {
                msg.channel.send('Data out is upper 2000 characters !');
                return;
            }
            msg.channel.send('```'+code+'```')
        }
        if (msg.content.startsWith(prefix+"b64decode")) {
            var data = msg.content.split(' ').splice(1,1).join(' ');
            if (data == "") {
                msg.channel.send('Data in is empty !');
                return;
            }
            if (data.length > 1000) {
                msg.channel.send('Data in is upper 1000 characters !');
                return;
            }
            msg.channel.send("Decoding text ... (Length: "+data.length+")");
            var code = "";
            try {
                var words = CryptoJS.enc.Base64.parse(data);
                code = CryptoJS.enc.Utf8.stringify(words);
            } catch(e) {
                console.log(e);
                
                msg.channel.send('Error: '+e);
                return;
            }
            if (code.length > 2000) {
                msg.channel.send('Data out is upper 2000 characters !');
                return;
            }
            msg.channel.send('```'+code+'```')
        }
    }
}
module.exports = Base64;