import { APIApplicationCommandInteraction } from "discord-api-types/v10";
import CommandConstructor, { CommandArguments } from "../CommandConstructor.js";

class PingCommand {
  constructor() {}

  @CommandConstructor.command("ping", "Ping the bot.", {
    descriptionInLocale: "Ping the bot in French (idk)",
    descriptionLocalization: "fr",
  })
  public ping() {
    // no code needed as subcommands are created
  }

  @CommandConstructor.subcommand("ping", null, "bot", "Ping the bot.", false, {
    nameInLocale: "botinfrench",
    nameLocalization: "fr",
  })
  public bot(interaction: APIApplicationCommandInteraction) {
    console.log(interaction.guild_id);
  }

  @CommandConstructor.subcommand(
    "ping",
    null,
    "user",
    "Ping a user.",
    false,
    {
      nameInLocale: "userinfrench",
      nameLocalization: "fr",
    },
    [
      {
        name: "user",
        description: "The user to ping.",
        type: CommandArguments.USER,
        required: true,
      },
    ]
  )
  public user(interaction: APIApplicationCommandInteraction) {
    console.log(interaction.guild_id);
  }
}

export default PingCommand;
