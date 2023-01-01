import BaseApp from "./BaseApp.js";
class App extends BaseApp {
  constructor() {
    super();
  }
  init() {
    BaseApp.Events.getEventEmitter().emit(
      BaseApp.Events.GeneralEvents.INFO,
      "Command Handler Loaded"
    );
  }
}

export default App;
