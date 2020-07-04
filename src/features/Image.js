const Discord = require('discord.js');
const Feature = require("./Feature");
const  Client  = require("../Bot");
const sharp = require('sharp');
const fs = require('fs');
const CryptoJS = require('crypto-js');
const request = require('request');
const { integer } = require('sharp/lib/is');
class Image extends Feature {
    constructor () {
        Client.helpEmbed.addField("Image tools",`- **${Client.prefix}resize 5x5** | *Resize an image attached on the message* 
        `);
        super();
    }
    static async handleMessage(msg) {
        
        if (msg.content.startsWith(Client.prefix+"resize")) {
            var data = msg.content.split(' ').splice(1,1).join(' ');
            data = data.split('x');
            if (data.length != 2 && !isNaN(data[0]) && !isNaN(data[1])) {
                msg.channel.send("Invalid value ! Use "+Client.prefix+"resize 5x5 with an image");
                return;
            }
            
            var width = parseInt(data[0]);
            var height = parseInt(data[1]);
            console.log(width);
            console.log(height);
            var attachment = msg.attachments.array()[0];
            if (attachment == null) {
                    return;
            }
            var extension = attachment.name.split('.');
            extension = extension[extension.length-1];
            if (extension != "png" && extension != "jpeg" &&  extension != "jpg") {
                msg.channel.send("Invalid image!");
                return
            }

            const tempfile = "tmp/"+Math.ceil(Math.random()*100)+"-"+attachment.name;
            console.log(attachment.url);
            
            request(attachment.url).pipe(fs.createWriteStream(tempfile)).on('finish',function() {

                sharp(tempfile).resize(width,height).toBuffer().then( data => { 
                    fs.unlinkSync(tempfile);
                    var imagedata = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data.subarray().join('')));
                    console.log(imagedata.length);
                    const Embed = new Discord.MessageAttachment("",data.subarray(),"object.png");
                    msg.channel.send(Embed);
                })
                .catch( err => {
                    msg.channel.send("Error: "+err); });
            });
            
            
            
        }
    }
}
module.exports = Image;