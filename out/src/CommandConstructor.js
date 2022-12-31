import { SlashCommandBuilder, } from "@discordjs/builders";
import { CommandHandlerEvents } from "./events/CommonEvents.js";
import { ApplicationCommandOptionType, } from "discord-api-types/v10";
import BaseApp from "./BaseApp.js";
export var CommandArguments;
(function (CommandArguments) {
    CommandArguments[CommandArguments["STRING"] = 0] = "STRING";
    CommandArguments[CommandArguments["INTEGER"] = 1] = "INTEGER";
    CommandArguments[CommandArguments["BOOLEAN"] = 2] = "BOOLEAN";
    CommandArguments[CommandArguments["USER"] = 3] = "USER";
    CommandArguments[CommandArguments["CHANNEL"] = 4] = "CHANNEL";
    CommandArguments[CommandArguments["ROLE"] = 5] = "ROLE";
    CommandArguments[CommandArguments["MENTIONABLE"] = 6] = "MENTIONABLE";
    CommandArguments[CommandArguments["NUMBER"] = 7] = "NUMBER";
    CommandArguments[CommandArguments["ATTACHMENT"] = 8] = "ATTACHMENT";
})(CommandArguments || (CommandArguments = {}));
class CommandConstructor {
    App;
    constructor(App) {
        this.App = App;
    }
    static builders = [];
    static command(name, description, options, args) {
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
            if (args && args.length > 0) {
                for (const arg of args) {
                    switch (arg.type) {
                        case CommandArguments.STRING:
                            builder.addStringOption((y) => {
                                y.setName(arg.name)
                                    .setDescription(arg.description)
                                    .setRequired(arg.required ?? false);
                                if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                    y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                }
                                if (arg.descriptionLocalizations) {
                                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                }
                                if (arg.nameLocalization && arg.nameInLocale) {
                                    y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                }
                                if (arg.nameLocalizations) {
                                    y.setNameLocalizations(arg.nameLocalizations);
                                }
                                if (arg.choices && arg.choices.length > 0) {
                                    y.addChoices(...arg.choices.map((x) => {
                                        return {
                                            name: x.name,
                                            value: x.value,
                                            name_localizations: x.nameLocalizations,
                                        };
                                    }));
                                }
                                if (arg.autocomplete && arg.choices && arg.choices.length > 0) {
                                    y.setAutocomplete(arg.autocomplete);
                                }
                                return y;
                            });
                            break;
                        case CommandArguments.INTEGER:
                            builder.addIntegerOption((y) => {
                                y.setName(arg.name)
                                    .setDescription(arg.description)
                                    .setRequired(arg.required ?? false);
                                if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                    y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                }
                                if (arg.descriptionLocalizations) {
                                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                }
                                if (arg.nameLocalization && arg.nameInLocale) {
                                    y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                }
                                if (arg.nameLocalizations) {
                                    y.setNameLocalizations(arg.nameLocalizations);
                                }
                                if (arg.choices && arg.choices.length > 0) {
                                    y.addChoices(...arg.choices.map((x) => {
                                        return {
                                            name: x.name,
                                            value: x.value,
                                            name_localizations: x.nameLocalizations,
                                        };
                                    }));
                                }
                                if (arg.autocomplete) {
                                    y.setAutocomplete(arg.autocomplete);
                                }
                                if (typeof arg.minValue === "number") {
                                    y.setMinValue(arg.minValue);
                                }
                                if (typeof arg.maxValue === "number") {
                                    y.setMaxValue(arg.maxValue);
                                }
                                return y;
                            });
                            break;
                        case CommandArguments.BOOLEAN:
                            builder.addBooleanOption((y) => {
                                y.setName(arg.name)
                                    .setDescription(arg.description)
                                    .setRequired(arg.required ?? false);
                                if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                    y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                }
                                if (arg.descriptionLocalizations) {
                                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                }
                                if (arg.nameLocalization && arg.nameInLocale) {
                                    y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                }
                                if (arg.nameLocalizations) {
                                    y.setNameLocalizations(arg.nameLocalizations);
                                }
                                return y;
                            });
                            break;
                        case CommandArguments.USER:
                            builder.addUserOption((y) => {
                                y.setName(arg.name)
                                    .setDescription(arg.description)
                                    .setRequired(arg.required ?? false);
                                if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                    y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                }
                                if (arg.descriptionLocalizations) {
                                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                }
                                if (arg.nameLocalization && arg.nameInLocale) {
                                    y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                }
                                if (arg.nameLocalizations) {
                                    y.setNameLocalizations(arg.nameLocalizations);
                                }
                                return y;
                            });
                            break;
                        case CommandArguments.CHANNEL:
                            builder.addChannelOption((y) => {
                                y.setName(arg.name)
                                    .setDescription(arg.description)
                                    .setRequired(arg.required ?? false);
                                if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                    y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                }
                                if (arg.descriptionLocalizations) {
                                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                }
                                if (arg.nameLocalization && arg.nameInLocale) {
                                    y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                }
                                if (arg.nameLocalizations) {
                                    y.setNameLocalizations(arg.nameLocalizations);
                                }
                                if (arg.channelTypes && arg.channelTypes.length > 0) {
                                    y.addChannelTypes(...arg.channelTypes);
                                }
                                return y;
                            });
                            break;
                        case CommandArguments.ROLE:
                            builder.addRoleOption((y) => {
                                y.setName(arg.name)
                                    .setDescription(arg.description)
                                    .setRequired(arg.required ?? false);
                                if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                    y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                }
                                if (arg.descriptionLocalizations) {
                                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                }
                                if (arg.nameLocalization && arg.nameInLocale) {
                                    y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                }
                                if (arg.nameLocalizations) {
                                    y.setNameLocalizations(arg.nameLocalizations);
                                }
                                return y;
                            });
                            break;
                        case CommandArguments.MENTIONABLE:
                            builder.addMentionableOption((y) => {
                                y.setName(arg.name)
                                    .setDescription(arg.description)
                                    .setRequired(arg.required ?? false);
                                if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                    y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                }
                                if (arg.descriptionLocalizations) {
                                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                }
                                if (arg.nameLocalization && arg.nameInLocale) {
                                    y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                }
                                if (arg.nameLocalizations) {
                                    y.setNameLocalizations(arg.nameLocalizations);
                                }
                                return y;
                            });
                            break;
                        case CommandArguments.NUMBER:
                            builder.addNumberOption((y) => {
                                y.setName(arg.name)
                                    .setDescription(arg.description)
                                    .setRequired(arg.required ?? false);
                                if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                    y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                }
                                if (arg.descriptionLocalizations) {
                                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                }
                                if (arg.nameLocalization && arg.nameInLocale) {
                                    y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                }
                                if (arg.nameLocalizations) {
                                    y.setNameLocalizations(arg.nameLocalizations);
                                }
                                if (arg.choices && arg.choices.length > 0) {
                                    y.addChoices(...arg.choices.map((x) => {
                                        return {
                                            name: x.name,
                                            value: x.value,
                                            name_localizations: x.nameLocalizations,
                                        };
                                    }));
                                }
                                if (arg.autocomplete) {
                                    y.setAutocomplete(arg.autocomplete);
                                }
                                if (typeof arg.minValue === "number") {
                                    y.setMinValue(arg.minValue);
                                }
                                if (typeof arg.maxValue === "number") {
                                    y.setMaxValue(arg.maxValue);
                                }
                                return y;
                            });
                            break;
                        case CommandArguments.ATTACHMENT:
                            builder.addAttachmentOption((y) => {
                                y.setName(arg.name)
                                    .setDescription(arg.description)
                                    .setRequired(arg.required ?? false);
                                if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                    y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                }
                                if (arg.descriptionLocalizations) {
                                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                }
                                if (arg.nameLocalization && arg.nameInLocale) {
                                    y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                }
                                if (arg.nameLocalizations) {
                                    y.setNameLocalizations(arg.nameLocalizations);
                                }
                                return y;
                            });
                            break;
                    }
                }
            }
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
    static subcommand(commandName, subcommandGroupName, subcommandName, description, isSubcommandGroup, options, args) {
        if (!this.builders.some((x) => x.name === commandName)) {
            throw new Error(`Command with name ${commandName} doesn't exist (Make sure commands appear first in your code so they compile in order!)`);
        }
        let builder = this.builders.find((x) => x.name === commandName);
        if (isSubcommandGroup) {
            const innerBuilder = builder?.options.find((x) => x.toJSON().type === ApplicationCommandOptionType.SubcommandGroup &&
                x.toJSON().name === subcommandGroupName);
            if (!innerBuilder) {
                throw new Error(`Command with name ${commandName} doesn't have a subcommand group with name ${subcommandGroupName}!`);
            }
            builder = innerBuilder;
        }
        builder.addSubcommand((x) => {
            x.setName(subcommandName).setDescription(description);
            if (options) {
                if (options.descriptionLocalization && options.descriptionInLocale)
                    x.setDescriptionLocalization(options.descriptionLocalization, options.descriptionInLocale);
                if (options.descriptionLocalizations)
                    x.setDescriptionLocalizations(options.descriptionLocalizations);
                if (options.nameLocalization && options.nameInLocale)
                    x.setNameLocalization(options.nameLocalization, options.nameInLocale);
                if (options.nameLocalizations)
                    x.setNameLocalizations(options.nameLocalizations);
                if (args && args.length > 0) {
                    for (const arg of args) {
                        switch (arg.type) {
                            case CommandArguments.STRING:
                                x.addStringOption((y) => {
                                    y.setName(arg.name)
                                        .setDescription(arg.description)
                                        .setRequired(arg.required ?? false);
                                    if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                        y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                    }
                                    if (arg.descriptionLocalizations) {
                                        y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                    }
                                    if (arg.nameLocalization && arg.nameInLocale) {
                                        y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                    }
                                    if (arg.nameLocalizations) {
                                        y.setNameLocalizations(arg.nameLocalizations);
                                    }
                                    if (arg.choices && arg.choices.length > 0) {
                                        y.addChoices(...arg.choices.map((x) => {
                                            return {
                                                name: x.name,
                                                value: x.value,
                                                name_localizations: x.nameLocalizations,
                                            };
                                        }));
                                    }
                                    if (arg.autocomplete) {
                                        y.setAutocomplete(arg.autocomplete);
                                    }
                                    return y;
                                });
                                break;
                            case CommandArguments.INTEGER:
                                x.addIntegerOption((y) => {
                                    y.setName(arg.name)
                                        .setDescription(arg.description)
                                        .setRequired(arg.required ?? false);
                                    if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                        y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                    }
                                    if (arg.descriptionLocalizations) {
                                        y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                    }
                                    if (arg.nameLocalization && arg.nameInLocale) {
                                        y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                    }
                                    if (arg.nameLocalizations) {
                                        y.setNameLocalizations(arg.nameLocalizations);
                                    }
                                    if (arg.choices && arg.choices.length > 0) {
                                        y.addChoices(...arg.choices.map((x) => {
                                            return {
                                                name: x.name,
                                                value: x.value,
                                                name_localizations: x.nameLocalizations,
                                            };
                                        }));
                                    }
                                    if (arg.autocomplete) {
                                        y.setAutocomplete(arg.autocomplete);
                                    }
                                    if (typeof arg.minValue === "number") {
                                        y.setMinValue(arg.minValue);
                                    }
                                    if (typeof arg.maxValue === "number") {
                                        y.setMaxValue(arg.maxValue);
                                    }
                                    return y;
                                });
                                break;
                            case CommandArguments.BOOLEAN:
                                x.addBooleanOption((y) => {
                                    y.setName(arg.name)
                                        .setDescription(arg.description)
                                        .setRequired(arg.required ?? false);
                                    if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                        y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                    }
                                    if (arg.descriptionLocalizations) {
                                        y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                    }
                                    if (arg.nameLocalization && arg.nameInLocale) {
                                        y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                    }
                                    if (arg.nameLocalizations) {
                                        y.setNameLocalizations(arg.nameLocalizations);
                                    }
                                    return y;
                                });
                                break;
                            case CommandArguments.USER:
                                x.addUserOption((y) => {
                                    y.setName(arg.name)
                                        .setDescription(arg.description)
                                        .setRequired(arg.required ?? false);
                                    if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                        y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                    }
                                    if (arg.descriptionLocalizations) {
                                        y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                    }
                                    if (arg.nameLocalization && arg.nameInLocale) {
                                        y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                    }
                                    if (arg.nameLocalizations) {
                                        y.setNameLocalizations(arg.nameLocalizations);
                                    }
                                    return y;
                                });
                                break;
                            case CommandArguments.CHANNEL:
                                x.addChannelOption((y) => {
                                    y.setName(arg.name)
                                        .setDescription(arg.description)
                                        .setRequired(arg.required ?? false);
                                    if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                        y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                    }
                                    if (arg.descriptionLocalizations) {
                                        y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                    }
                                    if (arg.nameLocalization && arg.nameInLocale) {
                                        y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                    }
                                    if (arg.nameLocalizations) {
                                        y.setNameLocalizations(arg.nameLocalizations);
                                    }
                                    if (arg.channelTypes && arg.channelTypes.length > 0) {
                                        y.addChannelTypes(...arg.channelTypes);
                                    }
                                    return y;
                                });
                                break;
                            case CommandArguments.ROLE:
                                x.addRoleOption((y) => {
                                    y.setName(arg.name)
                                        .setDescription(arg.description)
                                        .setRequired(arg.required ?? false);
                                    if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                        y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                    }
                                    if (arg.descriptionLocalizations) {
                                        y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                    }
                                    if (arg.nameLocalization && arg.nameInLocale) {
                                        y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                    }
                                    if (arg.nameLocalizations) {
                                        y.setNameLocalizations(arg.nameLocalizations);
                                    }
                                    return y;
                                });
                                break;
                            case CommandArguments.MENTIONABLE:
                                x.addMentionableOption((y) => {
                                    y.setName(arg.name)
                                        .setDescription(arg.description)
                                        .setRequired(arg.required ?? false);
                                    if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                        y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                    }
                                    if (arg.descriptionLocalizations) {
                                        y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                    }
                                    if (arg.nameLocalization && arg.nameInLocale) {
                                        y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                    }
                                    if (arg.nameLocalizations) {
                                        y.setNameLocalizations(arg.nameLocalizations);
                                    }
                                    return y;
                                });
                                break;
                            case CommandArguments.NUMBER:
                                x.addNumberOption((y) => {
                                    y.setName(arg.name)
                                        .setDescription(arg.description)
                                        .setRequired(arg.required ?? false);
                                    if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                        y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                    }
                                    if (arg.descriptionLocalizations) {
                                        y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                    }
                                    if (arg.nameLocalization && arg.nameInLocale) {
                                        y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                    }
                                    if (arg.nameLocalizations) {
                                        y.setNameLocalizations(arg.nameLocalizations);
                                    }
                                    if (arg.choices && arg.choices.length > 0) {
                                        y.addChoices(...arg.choices.map((x) => {
                                            return {
                                                name: x.name,
                                                value: x.value,
                                                name_localizations: x.nameLocalizations,
                                            };
                                        }));
                                    }
                                    if (arg.autocomplete &&
                                        arg.choices &&
                                        arg.choices.length > 0) {
                                        y.setAutocomplete(arg.autocomplete);
                                    }
                                    if (typeof arg.minValue === "number") {
                                        y.setMinValue(arg.minValue);
                                    }
                                    if (typeof arg.maxValue === "number") {
                                        y.setMaxValue(arg.maxValue);
                                    }
                                    return y;
                                });
                                break;
                            case CommandArguments.ATTACHMENT:
                                x.addAttachmentOption((y) => {
                                    y.setName(arg.name)
                                        .setDescription(arg.description)
                                        .setRequired(arg.required ?? false);
                                    if (arg.descriptionLocalization && arg.descriptionInLocale) {
                                        y.setDescriptionLocalization(arg.descriptionLocalization, arg.descriptionInLocale);
                                    }
                                    if (arg.descriptionLocalizations) {
                                        y.setDescriptionLocalizations(arg.descriptionLocalizations);
                                    }
                                    if (arg.nameLocalization && arg.nameInLocale) {
                                        y.setNameLocalization(arg.nameLocalization, arg.nameInLocale);
                                    }
                                    if (arg.nameLocalizations) {
                                        y.setNameLocalizations(arg.nameLocalizations);
                                    }
                                    return y;
                                });
                                break;
                        }
                    }
                }
            }
            return x;
        });
    }
}
export default CommandConstructor;
