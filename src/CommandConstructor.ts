import {
  SlashCommandBuilder,
  SlashCommandSubcommandGroupBuilder,
  ToAPIApplicationCommandOptions,
} from "@discordjs/builders";
import App from "./App.js";
import { CommandHandlerEvents } from "./events/CommonEvents.js";
import {
  APIApplicationCommandInteraction,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChannelType,
} from "discord-api-types/v10";
import BaseApp from "./BaseApp.js";

export declare enum Locale {
  Indonesian = "id",
  EnglishUS = "en-US",
  EnglishGB = "en-GB",
  Bulgarian = "bg",
  ChineseCN = "zh-CN",
  ChineseTW = "zh-TW",
  Croatian = "hr",
  Czech = "cs",
  Danish = "da",
  Dutch = "nl",
  Finnish = "fi",
  French = "fr",
  German = "de",
  Greek = "el",
  Hindi = "hi",
  Hungarian = "hu",
  Italian = "it",
  Japanese = "ja",
  Korean = "ko",
  Lithuanian = "lt",
  Norwegian = "no",
  Polish = "pl",
  PortugueseBR = "pt-BR",
  Romanian = "ro",
  Russian = "ru",
  SpanishES = "es-ES",
  Swedish = "sv-SE",
  Thai = "th",
  Turkish = "tr",
  Ukrainian = "uk",
  Vietnamese = "vi",
}

export enum CommandArguments {
  STRING,
  INTEGER,
  BOOLEAN,
  USER,
  CHANNEL,
  ROLE,
  MENTIONABLE,
  NUMBER,
  ATTACHMENT,
}

type LocaleString = `${Locale}`;

type CommandOptions = {
  dmPermission?: boolean;
  descriptionLocalization?: LocaleString;
  descriptionInLocale?: string;
  descriptionLocalizations?: Partial<Record<LocaleString, string | null>>;
  nameLocalization?: LocaleString;
  nameInLocale?: string;
  nameLocalizations?: Partial<Record<LocaleString, string | null>>;
};

type CommandArgumentChoice<T> = {
  name: string;
  value: T;
  nameLocalizations?: Partial<Record<LocaleString, string | null>>;
};

type CommandArgument =
  | {
      type: CommandArguments.STRING;
      name: string;
      nameLocalization?: LocaleString;
      nameInLocale?: string;
      nameLocalizations?: Partial<Record<LocaleString, string | null>>;
      description: string;
      descriptionLocalization?: LocaleString;
      descriptionInLocale?: string;
      descriptionLocalizations?: Partial<Record<LocaleString, string | null>>;
      required?: boolean;
      choices?: CommandArgumentChoice<string>[];
      autocomplete?: boolean;
      channelTypes?: never;
      minValue?: never;
      maxValue?: never;
    }
  | {
      type: CommandArguments.NUMBER | CommandArguments.INTEGER;
      name: string;
      nameLocalization?: LocaleString;
      nameInLocale?: string;
      nameLocalizations?: Partial<Record<LocaleString, string | null>>;
      description: string;
      descriptionLocalization?: LocaleString;
      descriptionInLocale?: string;
      descriptionLocalizations?: Partial<Record<LocaleString, string | null>>;
      required?: boolean;
      choices?: CommandArgumentChoice<number>[];
      autocomplete?: boolean;
      channelTypes?: never;
      minValue?: number;
      maxValue?: number;
    }
  | {
      type: CommandArguments.CHANNEL;
      name: string;
      nameLocalization?: LocaleString;
      nameInLocale?: string;
      nameLocalizations?: Partial<Record<LocaleString, string | null>>;
      description: string;
      descriptionLocalization?: LocaleString;
      descriptionInLocale?: string;
      descriptionLocalizations?: Partial<Record<LocaleString, string | null>>;
      required?: boolean;
      choices?: never;
      autocomplete?: never;
      channelTypes?: (
        | ChannelType.GuildText
        | ChannelType.GuildVoice
        | ChannelType.GuildCategory
        | ChannelType.GuildAnnouncement
        | ChannelType.AnnouncementThread
        | ChannelType.PublicThread
        | ChannelType.PrivateThread
        | ChannelType.GuildStageVoice
        | ChannelType.GuildForum
      )[];
      minValue?: never;
      maxValue?: never;
    }
  | {
      type: CommandArguments;
      name: string;
      nameLocalization?: LocaleString;
      nameInLocale?: string;
      nameLocalizations?: Partial<Record<LocaleString, string | null>>;
      description: string;
      descriptionLocalization?: LocaleString;
      descriptionInLocale?: string;
      descriptionLocalizations?: Partial<Record<LocaleString, string | null>>;
      required?: boolean;
      autocomplete?: never;
      choices?: never;
      channelTypes?: never;
      minValue?: never;
      maxValue?: never;
    };

class CommandConstructor {
  App: App;
  constructor(App: App) {
    this.App = App;
  }

  private static builders: SlashCommandBuilder[] = [];

  public static command(
    name: string,
    description: string,
    options?: CommandOptions,
    args?: CommandArgument[]
  ) {
    if (this.builders.some((x) => x.name === name)) {
      throw new Error(`Command with name ${name} already exists`);
    }
    const builder = new SlashCommandBuilder()
      .setName(name)
      .setDescription(description);
    if (options) {
      if (options.dmPermission) builder.setDMPermission(false);
      if (options.descriptionLocalization && options.descriptionInLocale)
        builder.setDescriptionLocalization(
          options.descriptionLocalization,
          options.descriptionInLocale
        );
      if (options.descriptionLocalizations)
        builder.setDescriptionLocalizations(options.descriptionLocalizations);
      if (options.nameLocalization && options.nameInLocale)
        builder.setNameLocalization(
          options.nameLocalization,
          options.nameInLocale
        );
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
                  y.setDescriptionLocalization(
                    arg.descriptionLocalization,
                    arg.descriptionInLocale
                  );
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
                  y.addChoices(
                    ...arg.choices.map((x) => {
                      return {
                        name: x.name,
                        value: x.value,
                        name_localizations: x.nameLocalizations,
                      };
                    })
                  );
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
                  y.setDescriptionLocalization(
                    arg.descriptionLocalization,
                    arg.descriptionInLocale
                  );
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
                  y.addChoices(
                    ...arg.choices.map((x) => {
                      return {
                        name: x.name,
                        value: x.value,
                        name_localizations: x.nameLocalizations,
                      };
                    })
                  );
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
                  y.setDescriptionLocalization(
                    arg.descriptionLocalization,
                    arg.descriptionInLocale
                  );
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
                  y.setDescriptionLocalization(
                    arg.descriptionLocalization,
                    arg.descriptionInLocale
                  );
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
                  y.setDescriptionLocalization(
                    arg.descriptionLocalization,
                    arg.descriptionInLocale
                  );
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
                  y.setDescriptionLocalization(
                    arg.descriptionLocalization,
                    arg.descriptionInLocale
                  );
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
                  y.setDescriptionLocalization(
                    arg.descriptionLocalization,
                    arg.descriptionInLocale
                  );
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
                  y.setDescriptionLocalization(
                    arg.descriptionLocalization,
                    arg.descriptionInLocale
                  );
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
                  y.addChoices(
                    ...arg.choices.map((x) => {
                      return {
                        name: x.name,
                        value: x.value,
                        name_localizations: x.nameLocalizations,
                      };
                    })
                  );
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
                  y.setDescriptionLocalization(
                    arg.descriptionLocalization,
                    arg.descriptionInLocale
                  );
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

    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) => {
      BaseApp.Events.getEventEmitter().on(
        CommandHandlerEvents.APPLICATION_COMMAND_USE,
        (interaction: APIApplicationCommandInteraction, ...args: any[]) => {
          if (
            interaction.data.name === name &&
            this.builders.find((x) => x.name === name)?.options.length === 0
          )
            descriptor.value(interaction, ...args);
        }
      );
    };
  }

  public static subcommandGroup(
    commandName: string,
    name: string,
    description: string,
    options?: Omit<CommandOptions, "dmPermission">
  ) {
    if (!this.builders.some((x) => x.name === commandName)) {
      throw new Error(
        `Command with name ${commandName} doesn't exist (Make sure commands appear first in your code so they compile in order!)`
      );
    }
    const builder = this.builders.find((x) => x.name === commandName);
    if (!builder) {
      throw new Error(
        `Command with name ${commandName} doesn't exist (Make sure commands appear first in your code so they compile in order!)`
      );
    }
    if (
      builder.options.some(
        (x) =>
          x.toJSON().type === ApplicationCommandOptionType.SubcommandGroup &&
          x.toJSON().name === name
      )
    ) {
      throw new Error(
        `Command with name ${commandName} already has a subcommand group!`
      );
    }
    builder.addSubcommandGroup((x) => {
      x.setName(name).setDescription(description);
      if (options) {
        if (options.descriptionLocalization && options.descriptionInLocale)
          x.setDescriptionLocalization(
            options.descriptionLocalization,
            options.descriptionInLocale
          );
        if (options.descriptionLocalizations)
          x.setDescriptionLocalizations(options.descriptionLocalizations);
        if (options.nameLocalization && options.nameInLocale)
          x.setNameLocalization(options.nameLocalization, options.nameInLocale);
        if (options.nameLocalizations)
          x.setNameLocalizations(options.nameLocalizations);
      }
      return x;
    });

    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) => {};
  }

  public static subcommand(
    commandName: string,
    subcommandGroupName: string | null,
    subcommandName: string,
    description: string,
    isSubcommandGroup: boolean,
    options?: Omit<CommandOptions, "dmPermission">,
    args?: CommandArgument[]
  ) {
    if (!this.builders.some((x) => x.name === commandName)) {
      throw new Error(
        `Command with name ${commandName} doesn't exist (Make sure commands appear first in your code so they compile in order!)`
      );
    }

    let builder: SlashCommandBuilder | SlashCommandSubcommandGroupBuilder =
      this.builders.find((x) => x.name === commandName) as SlashCommandBuilder;
    if (isSubcommandGroup) {
      const innerBuilder = (builder as SlashCommandBuilder)?.options.find(
        (x) =>
          x.toJSON().type === ApplicationCommandOptionType.SubcommandGroup &&
          x.toJSON().name === subcommandGroupName
      ) as SlashCommandSubcommandGroupBuilder;
      if (!innerBuilder) {
        throw new Error(
          `Command with name ${commandName} doesn't have a subcommand group with name ${subcommandGroupName}!`
        );
      }
      builder = innerBuilder;
    }

    builder.addSubcommand((x) => {
      x.setName(subcommandName).setDescription(description);
      if (options) {
        if (options.descriptionLocalization && options.descriptionInLocale)
          x.setDescriptionLocalization(
            options.descriptionLocalization,
            options.descriptionInLocale
          );
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
                    y.setDescriptionLocalization(
                      arg.descriptionLocalization,
                      arg.descriptionInLocale
                    );
                  }
                  if (arg.descriptionLocalizations) {
                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                  }
                  if (arg.nameLocalization && arg.nameInLocale) {
                    y.setNameLocalization(
                      arg.nameLocalization,
                      arg.nameInLocale
                    );
                  }
                  if (arg.nameLocalizations) {
                    y.setNameLocalizations(arg.nameLocalizations);
                  }
                  if (arg.choices && arg.choices.length > 0) {
                    y.addChoices(
                      ...arg.choices.map((x) => {
                        return {
                          name: x.name,
                          value: x.value,
                          name_localizations: x.nameLocalizations,
                        };
                      })
                    );
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
                    y.setDescriptionLocalization(
                      arg.descriptionLocalization,
                      arg.descriptionInLocale
                    );
                  }
                  if (arg.descriptionLocalizations) {
                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                  }
                  if (arg.nameLocalization && arg.nameInLocale) {
                    y.setNameLocalization(
                      arg.nameLocalization,
                      arg.nameInLocale
                    );
                  }
                  if (arg.nameLocalizations) {
                    y.setNameLocalizations(arg.nameLocalizations);
                  }
                  if (arg.choices && arg.choices.length > 0) {
                    y.addChoices(
                      ...arg.choices.map((x) => {
                        return {
                          name: x.name,
                          value: x.value,
                          name_localizations: x.nameLocalizations,
                        };
                      })
                    );
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
                    y.setDescriptionLocalization(
                      arg.descriptionLocalization,
                      arg.descriptionInLocale
                    );
                  }
                  if (arg.descriptionLocalizations) {
                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                  }
                  if (arg.nameLocalization && arg.nameInLocale) {
                    y.setNameLocalization(
                      arg.nameLocalization,
                      arg.nameInLocale
                    );
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
                    y.setDescriptionLocalization(
                      arg.descriptionLocalization,
                      arg.descriptionInLocale
                    );
                  }
                  if (arg.descriptionLocalizations) {
                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                  }
                  if (arg.nameLocalization && arg.nameInLocale) {
                    y.setNameLocalization(
                      arg.nameLocalization,
                      arg.nameInLocale
                    );
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
                    y.setDescriptionLocalization(
                      arg.descriptionLocalization,
                      arg.descriptionInLocale
                    );
                  }
                  if (arg.descriptionLocalizations) {
                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                  }
                  if (arg.nameLocalization && arg.nameInLocale) {
                    y.setNameLocalization(
                      arg.nameLocalization,
                      arg.nameInLocale
                    );
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
                    y.setDescriptionLocalization(
                      arg.descriptionLocalization,
                      arg.descriptionInLocale
                    );
                  }
                  if (arg.descriptionLocalizations) {
                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                  }
                  if (arg.nameLocalization && arg.nameInLocale) {
                    y.setNameLocalization(
                      arg.nameLocalization,
                      arg.nameInLocale
                    );
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
                    y.setDescriptionLocalization(
                      arg.descriptionLocalization,
                      arg.descriptionInLocale
                    );
                  }
                  if (arg.descriptionLocalizations) {
                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                  }
                  if (arg.nameLocalization && arg.nameInLocale) {
                    y.setNameLocalization(
                      arg.nameLocalization,
                      arg.nameInLocale
                    );
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
                    y.setDescriptionLocalization(
                      arg.descriptionLocalization,
                      arg.descriptionInLocale
                    );
                  }
                  if (arg.descriptionLocalizations) {
                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                  }
                  if (arg.nameLocalization && arg.nameInLocale) {
                    y.setNameLocalization(
                      arg.nameLocalization,
                      arg.nameInLocale
                    );
                  }
                  if (arg.nameLocalizations) {
                    y.setNameLocalizations(arg.nameLocalizations);
                  }
                  if (arg.choices && arg.choices.length > 0) {
                    y.addChoices(
                      ...arg.choices.map((x) => {
                        return {
                          name: x.name,
                          value: x.value,
                          name_localizations: x.nameLocalizations,
                        };
                      })
                    );
                  }
                  if (
                    arg.autocomplete &&
                    arg.choices &&
                    arg.choices.length > 0
                  ) {
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
                    y.setDescriptionLocalization(
                      arg.descriptionLocalization,
                      arg.descriptionInLocale
                    );
                  }
                  if (arg.descriptionLocalizations) {
                    y.setDescriptionLocalizations(arg.descriptionLocalizations);
                  }
                  if (arg.nameLocalization && arg.nameInLocale) {
                    y.setNameLocalization(
                      arg.nameLocalization,
                      arg.nameInLocale
                    );
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

    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) => {
      BaseApp.Events.getEventEmitter().on(
        CommandHandlerEvents.APPLICATION_COMMAND_USE,
        (interaction: APIApplicationCommandInteraction, ...args: any[]) => {}
      );
    };
  }
}

export default CommandConstructor;
