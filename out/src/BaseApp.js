var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HeadFile } from "ts-modular-bot-file-design";
import { Dependencies, Dependency } from "ts-modular-bot-types";
class BaseApp extends HeadFile {
    constructor() {
        super();
    }
    type = Dependency.COMMAND_HANDLER;
    name = "Command Handler";
    load = true;
    static Client;
    static Events;
    getDependencies() {
        return [Dependency.EVENTS, Dependency.DISCORD_CLIENT];
    }
}
__decorate([
    Dependencies.inject(Dependency.DISCORD_CLIENT)
], BaseApp, "Client", void 0);
__decorate([
    Dependencies.inject(Dependency.EVENTS)
], BaseApp, "Events", void 0);
export default BaseApp;
