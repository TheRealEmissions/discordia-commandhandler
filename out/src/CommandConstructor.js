import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandHandlerEvents } from "./events/CommonEvents.js";
class CommandConstructor {
    App;
    constructor(App) {
        this.App = App;
    }
    builders = [];
    command(name, description, options) {
        if (this.builders.some((x) => x.name === name)) {
            throw new Error(`Command with name ${name} already exists`);
        }
        const builder = new SlashCommandBuilder()
            .setName(name)
            .setDescription(description);
        if (options) {
            if (options.dmPermission)
                builder.setDMPermission(false);
            if (options.descriptionLocalization && options.descriptionInLocale)
                builder.setDescriptionLocalization(options.descriptionLocalization, options.descriptionInLocale);
            if (options.descriptionLocalizations)
                builder.setDescriptionLocalizations(options.descriptionLocalizations);
            if (options.nameLocalization && options.nameInLocale)
                builder.setNameLocalization(options.nameLocalization, options.nameInLocale);
            if (options.nameLocalizations)
                builder.setNameLocalizations(options.nameLocalizations);
        }
        this.builders.push(builder);
        return (target, propertyKey, descriptor) => {
            const event = this.App.Events.events.on(CommandHandlerEvents.APPLICATION_COMMAND_USE, (interaction, ...args) => {
                if (interaction.data.name === name &&
                    this.builders.find((x) => x.name === name)?.options.length === 0)
                    target[propertyKey](interaction, ...args);
            });
        };
    }
}
export default CommandConstructor;
