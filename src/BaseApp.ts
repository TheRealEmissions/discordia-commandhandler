import Base from "ts-modular-bot-file-design";
import { Dependencies, Dependency } from "ada-types";
import Events from "ada-events-types";
import DiscordClient from "ada-discordclient-types";

abstract class BaseApp extends Base {
  constructor() {
    super();
  }

  type = Dependency.COMMAND_HANDLER;
  name: string = "Command Handler";
  load = true;

  @Dependencies.inject(Dependency.DISCORD_CLIENT)
  static Client: typeof DiscordClient;
  public getClient() {
    return BaseApp.Client;
  }

  @Dependencies.inject(Dependency.EVENTS)
  static Events: typeof Events;
  public getEvents() {
    return BaseApp.Events;
  }

  abstract init(): Promise<void>;
  getDependencies(): Dependency[] {
    return [Dependency.EVENTS, Dependency.DISCORD_CLIENT];
  }
}

export default BaseApp;
