import BaseApp from "./BaseApp.js";
class App extends BaseApp {
    constructor() {
        super();
    }
    init() {
        this.Events.events.emit(this.Events.GeneralEvents.INFO, "Command Handler Loaded");
    }
}
export default App;
