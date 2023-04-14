import { APIApplicationCommandInteraction } from "discord-api-types/v10";
import CommandConstructor, { CommandArguments } from "../CommandConstructor.js";

class PingCommand {
  constructor() {}

  @CommandConstructor.command({
    name: "ping",
    description: "Ping the bot.",
    options: {
      descriptionInLocale: "Ping the bot in French (idk)",
      descriptionLocalization: "fr",
    },
  })
  public ping() {
    // no code needed as subcommands are created
    // this must be first in the class
    // to ensure commands compile in order!
  }

  @CommandConstructor.subcommand({
    commandName: "ping",
    subcommandName: "bot",
    description: "Ping the bot.",
    options: {
      nameInLocale: "botinfrench",
      nameLocalization: "fr",
    },
  })
  public bot(interaction: APIApplicationCommandInteraction) {
    console.log(interaction.guild_id);
  }

  @CommandConstructor.subcommand({
    commandName: "ping",
    subcommandName: "user",
    description: "Ping a user.",
    options: {
      nameInLocale: "userinfrench",
      nameLocalization: "fr",
    },
    args: [
      {
        name: "user",
        description: "The user to ping.",
        type: CommandArguments.USER,
        required: true,
      },
    ],
  })
  public user(interaction: APIApplicationCommandInteraction) {
    console.log(interaction.guild_id);
  }
}

export default PingCommand;
