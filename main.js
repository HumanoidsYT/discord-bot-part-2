const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!";


//this is the real code

client.login('Nzc2MjA2MTk4OTIzNTkxNzAx.X6xgWw.mYNwMAw0M5yjrMoav9rqhFIsmCo');


client.on('ready', () =>{
    console.log('Yay! You Made Your Bot!');
    client.user.setActivity('Y O U', { type: 'PLAYING'}).catch(console.error);
})

const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

 
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot || message.channel.type === "dm") return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'help'){
        client.commands.get('help').execute(message, args);
    } else if(command === "ping") {
        message.channel.send('Pinging... :ping_pong:').then(m => {
            m.edit(`:ping_pong: Pong! :smile:\n\nLatency is ${Date.now() - message.createdTimestamp}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`)
        })
    }
});