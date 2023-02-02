import { SettingsConfig } from "./interfaces/Settings";

export const Config: SettingsConfig = {
  commands: {
    // Push all commands to global commands!
    global: false,
    // Ignored if allGuilds is true, otherwise push commands to these guilds (Takes Guild IDs)
    guilds: [],
    // Push commands to all guilds the bot is in
    allGuilds: false,
  },
};
