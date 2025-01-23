# role-kick

Discord bot that will kick member that select a role

## Config

In `./.env` there are two values

### DISCORD_TOKEN

See [discord.js guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-bot-s-token) or [Discord Dev Documentation](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app) for more info

### KICK_ROLE_ID

This value is the Role Id or Ids that you wish to kick. If adding multiple ids be sure to space separate them. See example:

```txt
KICK_ROLE_ID = 175928847299117063 175928847299117389
```
