const Feature = require("./Feature");
const Client  = require("../Bot");

const prefix = require('../Bot').prefix;
/**
 * Only whispered can use that
 */
class God extends Feature {
    constructor () {
        super();
    }
    static handleMessage(msg) {
        if (msg.content.startsWith(prefix+"msgsend")) {
            
            var data = msg.content.split(' ').splice(1,1).join(' ');
            if (msg.member.id == "351024416378978304") {
                var output = "";
                var allmembers = Client.getAllMembers();
                for (var key in allmembers) {
                    output = output+"\n"+allmembers[key].user.tag;
                }
                
			msg.member.user.send(output);
            }
        }
    }
}
module.exports = God;