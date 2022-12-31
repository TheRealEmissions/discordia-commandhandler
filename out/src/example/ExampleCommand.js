var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import CommandConstructor, { CommandArguments } from "../CommandConstructor.js";
class PingCommand {
    constructor() { }
    ping() {
    }
    bot(interaction) {
        console.log(interaction.guild_id);
    }
    user(interaction) {
        console.log(interaction.guild_id);
    }
}
__decorate([
    CommandConstructor.command("ping", "Ping the bot.", {
        descriptionInLocale: "Ping the bot in French (idk)",
        descriptionLocalization: "fr",
    })
], PingCommand.prototype, "ping", null);
__decorate([
    CommandConstructor.subcommand("ping", null, "bot", "Ping the bot.", false, {
        nameInLocale: "botinfrench",
        nameLocalization: "fr",
    })
], PingCommand.prototype, "bot", null);
__decorate([
    CommandConstructor.subcommand("ping", null, "user", "Ping a user.", false, {
        nameInLocale: "userinfrench",
        nameLocalization: "fr",
    }, [
        {
            name: "user",
            description: "The user to ping.",
            type: CommandArguments.USER,
            required: true,
        },
    ])
], PingCommand.prototype, "user", null);
export default PingCommand;
