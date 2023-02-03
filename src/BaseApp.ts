import Base from "ts-modular-bot-file-design";
import { Dependencies, Dependency } from "ts-modular-bot-types";
import Events from "ts-modular-bot-addon-events-types";
import DiscordClient from "ts-modular-bot-addon-discord_client-types";

abstract class BaseApp extends Base {
  constructor() {
    super();
  }

  type = Dependency.COMMAND_HANDLER;
  name: string = "Command Handler";
  load = true;

  @Dependencies.inject(Dependency.DISCORD_CLIENT)
  static Client: typeof DiscordClient;

  @Dependencies.inject(Dependency.EVENTS)
  static Events: typeof Events;

  abstract init(): Promise<void>;
  getDependencies(): Dependency[] {
    return [Dependency.EVENTS, Dependency.DISCORD_CLIENT];
  }
}

export default BaseApp;
