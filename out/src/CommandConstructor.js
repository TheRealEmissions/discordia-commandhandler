import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandHandlerEvents } from "./events/CommonEvents.js";
import { ApplicationCommandOptionType, } from "discord-api-types/v10";
import BaseApp from "./BaseApp.js";
class CommandConstructor {
    App;
    constructor(App) {
        this.App = App;
    }
    static builders = [];
    static command(name, description, options) {
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
            BaseApp.Events.events.on(CommandHandlerEvents.APPLICATION_COMMAND_USE, (interaction, ...args) => {
                if (interaction.data.name === name &&
                    this.builders.find((x) => x.name === name)?.options.length === 0)
                    descriptor.value(interaction, ...args);
            });
        };
    }
    static subcommandGroup(commandName, name, description, options) {
        if (!this.builders.some((x) => x.name === commandName)) {
            throw new Error(`Command with name ${commandName} doesn't exist (Make sure commands appear first in your code so they compile in order!)`);
        }
        const builder = this.builders.find((x) => x.name === commandName);
        if (!builder) {
            throw new Error(`Command with name ${commandName} doesn't exist (Make sure commands appear first in your code so they compile in order!)`);
        }
        if (builder.options.some((x) => x.toJSON().type === ApplicationCommandOptionType.SubcommandGroup &&
            x.toJSON().name === name)) {
            throw new Error(`Command with name ${commandName} already has a subcommand group!`);
        }
        builder.addSubcommandGroup((x) => {
            x.setName(name).setDescription(description);
            if (options) {
                if (options.descriptionLocalization && options.descriptionInLocale)
                    x.setDescriptionLocalization(options.descriptionLocalization, options.descriptionInLocale);
                if (options.descriptionLocalizations)
                    x.setDescriptionLocalizations(options.descriptionLocalizations);
                if (options.nameLocalization && options.nameInLocale)
                    x.setNameLocalization(options.nameLocalization, options.nameInLocale);
                if (options.nameLocalizations)
                    x.setNameLocalizations(options.nameLocalizations);
            }
            return x;
        });
    }
}
export default CommandConstructor;
