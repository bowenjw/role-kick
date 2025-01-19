import { Client, Events, GatewayIntentBits, PermissionFlagsBits } from 'discord.js';

// Check is kickRoleId is undefined
const kickRoleId = process.env.KICK_ROLE_ID;
if (kickRoleId == undefined) {throw Error('env.KICK_ROLE_ID is undefined');}

// Create Client
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

// Event triggers when bot is ready
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.username}`);
});

client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {

    // Check is kickRole is in guild or undefined
    const kickRole = oldMember.guild.roles.cache.get(kickRoleId) ?? await oldMember.guild.roles.fetch(kickRoleId);
    if (kickRole == undefined) {throw Error('kickRole does not exist in server');}

    // Kick member if the kick role was added and user is not have manage role perm or admin
    else if (
        newMember.permissions.has(PermissionFlagsBits.ManageRoles, true)
            && newMember.roles.cache.has(kickRole.id) == true) {
        void newMember.kick(`User selected ${kickRole.name}`);
    }
});

client.login(process.env.DISCORD_TOKEN);