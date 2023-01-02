import BaseApp from "./BaseApp.js";
import CommandConstructor from "./CommandConstructor.js";
class App extends BaseApp {
  CommandConstructor: CommandConstructor;
  constructor() {
    super();
    this.CommandConstructor = new CommandConstructor(this);
  }

  init() {
    BaseApp.Events.getEventEmitter().emit(
      BaseApp.Events.GeneralEvents.INFO,
      "Command Handler Loaded"
    );
    const commands = this.CommandConstructor.getBuilders();
    const data = commands.map((x) => x.toJSON());
    const rest = new BaseApp.Client.getClient().REST({ version: "9" }).setToken(

    // push commands to Discord
    // - make commands global
    // - push to certain guilds
    // - push to all guilds
    // https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration
  }
}

export default App;
