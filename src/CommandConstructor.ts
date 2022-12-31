import { SlashCommandBuilder } from "@discordjs/builders";
import App from "./App.js";
import { CommandHandlerEvents } from "./events/CommonEvents.js";
import {
  APIApplicationCommandInteraction,
  ApplicationCommandOptionType,
  ApplicationCommandType,
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

class CommandConstructor {
  App: App;
  constructor(App: App) {
    this.App = App;
  }

  private static builders: SlashCommandBuilder[] = [];

  public static command(
    name: string,
    description: string,
    options?: CommandOptions
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
    }
    this.builders.push(builder);

    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) => {
      BaseApp.Events.events.on(
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
  }
}

export default CommandConstructor;
