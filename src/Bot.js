const Discord = require('discord.js');
const features = [];
const Bot = new Discord.Client();
class Client {
	static prefix = "kode!";
	static dcolor = "#1989fa";
	static bot = Bot;
	static helpEmbed = new Discord.MessageEmbed();
	invoke () {
		console.log("Bot invoked")
		/**
		 * Invoke constructor here of all the features
		 */

		Client.helpEmbed.setTitle("EnkodeBot v0.4 by whispered");
		Client.helpEmbed.setColor(Client.dcolor);
		Client.helpEmbed.addField('Info','EnkodeBot est un utilitaire discord permettant de gérer des chaînes de caractères\n')
		Client.helpEmbed.addField('Prefix','Le prefix par default est ``'+Client.prefix+"``, il pourra être changé dans l'avenir.")
		
		features.push(require('./features/Image'));
		features.push(require('./features/Base64'));
		features.push(require('./features/Hashing'));
		features.push(require('./features/God'));
		for (var key in features) {
			new features[key]();
		}
	}
	//Get members number of every servers
	getMemberCount() {
		var guilds = Client.bot.guilds.cache.array();
		var already_checked = [];
		var memberCount = 0;
		
		for (var key in guilds) {
			for (var key2 in guilds[key].members.cache.array()){
				var member = guilds[key].members.cache.array()[key2];
				//Dont count if the player already exist in already_checked
				if (member.user.id != null && !member.user.bot && !already_checked.includes(member.user.id)) {
					memberCount += 1;
					already_checked.push(member.user.id) ;
				}
			}

		}
		return memberCount;
	}
	/**
	 * WARNING: dont send message to all players
	 * lmao
	 */
	static getAllMembers() {
		var guilds = Client.bot.guilds.cache.array();
		var user_members = [];
		var already_checked = [];
		for (var key in guilds) {
			for (var key2 in guilds[key].members.cache.array()){
				var member = guilds[key].members.cache.array()[key2];
				//Dont count if the player already exist in already_checked
				if (!member.user.bot && member.user.id != null && !already_checked.includes(member.id)) {
					already_checked.push(member.id);
					user_members.push(member);
				}
			}

		}
		return user_members;
	}
	constructor () {
		Bot.on('ready', () => {
			Client.bot.user.setActivity(Client.prefix+"help | "+Client.bot.guilds.cache.size+" servers | "+this.getMemberCount()+" members", {
			type: "PLAYING"
		  });
		  this.invoke();
		  
		  console.log(`Client connected`);
		  
		});
		
		Bot.on('message', msg => {
			if (!msg.guild || msg.member.user.bot) return;
			if (msg.content === Client.prefix+'help') {
				msg.channel.send(Client.helpEmbed);
			}
			for (var key in features) {
				features[key].handleMessage(msg);
			}
		})
		
		Bot.on('messageReactionAdd', (reaction, user) => {
			console.log(`${user.username} reacted with "${reaction.emoji.identifier}".`);
		});
		
		Bot.login('NzI4NTM0MjMxMzMyMDI4NDI4.Xv9w9g.zMhDPR83K6QB1RV0l0e4O4zcuNM');
	}
}
 
const ClientInstance = new Client();

module.exports = Client;