import { Client, Events, GatewayIntentBits } from 'discord.js';

// Check is kickRoleId is undefined

if (process.env.KICK_ROLE_ID == undefined) {throw Error('env.KICK_ROLE_ID is undefined');}

const kickRoleId = process.env.KICK_ROLE_ID.includes(' ') ? process.env.KICK_ROLE_ID.split(' ') : process.env.KICK_ROLE_ID;


// Create Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
});

// Event triggers when bot is ready
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.username}`);
});

client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {

    const kickrole = newMember.roles.cache.find((_role, key) => {
        return kickRoleId === key || kickRoleId.includes(key);
    });
    // Kick member if the kick role was added and user is not have manage role perm or admin
    if (kickrole !== undefined) {void newMember.kick(`User selected ${kickRole.name}`);}
});

client.login(process.env.DISCORD_TOKEN);