const Discord = require('discord.js');
const Feature = require("./Feature");
const  Client  = require("../Bot");
const sharp = require('sharp');
const fs = require('fs');
const CryptoJS = require('crypto-js');
const request = require('request');
const { integer } = require('sharp/lib/is');
const { default: Axios } = require('axios');
class Image extends Feature {
    constructor () {
        Client.helpEmbed.addField("Image tools",`- **${Client.prefix}resize 5x5** | *Resize an image attached on the message* 
        `);
        super();
    }
    static async handleMessage(msg) {
        //Resize image
        if (msg.content.startsWith(Client.prefix+"resize")) {
            var data = msg.content.split(' ').splice(1,1).join(' ');
            data = data.split('x');
            try {
            if (data.length != 2 || isNaN(data[0]) || isNaN(data[1])) {
                msg.channel.send("Invalid value ! Use "+Client.prefix+"resize 5x5 with an image");
                return;
            }

            var width = parseInt(data[0]);
            var height = parseInt(data[1]);
		}
		catch (e) {
                msg.channel.send("there is no integer values");

		}
            if (width < 1 || height < 1 ||width > 3000 || height > 3000) {
                msg.channel.send("The size must be in this range : 1x1 - 3000x3000");
                return;
            }
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

            const tempdir = __dirname+"/tmp/";
            var tempname = CryptoJS.SHA1(Math.ceil(new Date().getTime() * Math.random()))+attachment.name;
            const encodedfile = tempdir+"ec_"+tempname;
            const tempfile = tempdir+tempname;
            if (!fs.existsSync(tempdir)) {
                fs.mkdirSync(tempdir);
            }
            msg.channel.send("Downloading image ...");
            Axios({
                url: attachment.url,
                type:"get",
                responseType: "stream"
            }).then(function (reponse) {
                try {

                    reponse.data.pipe(fs.createWriteStream(tempfile)).on('finish',function() {

                        msg.channel.send("Converting ...");
                        sharp(tempfile).resize(width,height).toFile(encodedfile).then( function () { 
                        //fs.unlink(tempfile);
                        msg.channel.send("Uploading (Size "+Math.ceil(fs.statSync(encodedfile).size/1000)+"kb) ...");
                            msg.channel.send("", { files: [encodedfile] }).then(function (data) {
                                
                              //  fs.unlink(encodedfile);
                            }).catch(function (e) {

                                 msg.channel.send("Cant send file");
                            })
                        })
                        .catch( err => {
                            console.log(err)
                            msg.channel.send("Error: "+err); });
                    });
                } catch (e) {
                    console.log(e)
                    msg.channel.send("Error: "+e);
                }
            })
            
            
            
        }
    }
}
module.exports = Image;
