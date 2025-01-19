import { Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.GuildMemberUpdate, (oldMember, newMember) => {
    const kickRoleId = process.env.KICK_ROLE_ID

    if(kickRoleId == undefined)
        throw Error('env.KICK_ROLE_ID is undefined') 

    const kickRole = oldMember.guild.roles.cache.get(kickRoleId)
    
    if(kickRole == undefined)
        throw Error('kickRole does not exist in server');

    else if(newMember.roles.cache.has(kickRole.id) == true)
        newMember.kick(`User selected ${kickRole.name}`);
})

client.login(process.env.DISCORD_TOKEN)