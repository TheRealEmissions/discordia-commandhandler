import { HeadFile } from "ts-modular-bot-file-design";
import { Dependencies, Dependency } from "ts-modular-bot-types";
import Events from "events-types";

abstract class BaseApp extends HeadFile {
  constructor() {
    super();
  }

  type = Dependency.COMMAND_HANDLER;
  name: string = "Command Handler";
  load = true;

  @Dependencies.inject(Dependency.DISCORD_CLIENT)
  static Client: object;

  @Dependencies.inject(Dependency.EVENTS)
  static Events: typeof Events;

  abstract init(): void;
  getDependencies(): Dependency[] {
    return [Dependency.EVENTS, Dependency.DISCORD_CLIENT];
  }
}

export default BaseApp;
