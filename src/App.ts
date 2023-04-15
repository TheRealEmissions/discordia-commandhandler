import Logger from "ts-logger";
import BaseApp from "./BaseApp.js";
import CommandConstructor, {
  Command,
  Subcommand,
  SubcommandGroup,
} from "./CommandConstructor.js";
import { SettingsConfig } from "../config/internal/SettingsConfig.js";
import { Routes } from "discord-api-types/v10";
class App extends BaseApp {
  private CommandConstructor: CommandConstructor;
  constructor() {
    super();
    this.CommandConstructor = new CommandConstructor(this);
  }

  getCommandConstructor() {
    return this.CommandConstructor;
  }

  async init() {
    BaseApp.Events.getEventEmitter().emit(
      BaseApp.Events.GeneralEvents.INFO,
      "Command Handler Loaded"
    );

    if (BaseApp.Client.getSharded()) return;

    const commands = this.CommandConstructor.getBuilders();
    const data = commands.map((x) => x.toJSON());
    const rest = BaseApp.Client.getRest();

    if (SettingsConfig.commands.global) {
      try {
        await rest.put(
          Routes.applicationCommands(
            BaseApp.Client.getClient().user?.id ?? "Unknown"
          ),
          { body: data }
        );
      } catch (e) {
        Logger.internalError(
          "Cannot push global commands to Discord!",
          "DISCORD ERROR",
          (e as Error).message,
          (e as Error).stack
        );
      }
      Logger.log("Pushed global commands to Discord!", "COMMANDS");
    }
    if (SettingsConfig.commands.allGuilds) {
      const guilds = await BaseApp.Client.getClient().guilds.fetch();
      for (const guild of guilds) {
        try {
          await rest.put(
            Routes.applicationGuildCommands(
              BaseApp.Client.getClient().user?.id ?? "Unknown",
              guild[1].id
            ),
            { body: data }
          );
        } catch (e) {
          Logger.internalError(
            `Cannot push commands to guild ${guild[1].id}!`,
            "DISCORD ERROR",
            (e as Error).message,
            (e as Error).stack
          );
          continue;
        }
        Logger.log(`Pushed commands to guild ${guild[1].id}!`, "COMMANDS");
      }
    } else if (SettingsConfig.commands.guilds.length > 0) {
      for (const guild of SettingsConfig.commands.guilds) {
        try {
          await rest.put(
            Routes.applicationGuildCommands(
              BaseApp.Client.getClient().user?.id ?? "Unknown",
              guild
            ),
            { body: data }
          );
        } catch (e) {
          Logger.internalError(
            `Cannot push commands to guild ${guild}!`,
            "DISCORD ERROR",
            (e as Error).message,
            (e as Error).stack
          );
          continue;
        }
        Logger.log(`Pushed commands to guild ${guild}!`, "COMMANDS");
      }
    }
  }

  command(obj: Command) {
    return CommandConstructor.command.call(CommandConstructor, obj);
  }

  subcommand(obj: Subcommand) {
    return CommandConstructor.subcommand.call(CommandConstructor, obj);
  }

  subcommandGroup(obj: SubcommandGroup) {
    return CommandConstructor.subcommandGroup.call(CommandConstructor, obj);
  }
}

export default App;
