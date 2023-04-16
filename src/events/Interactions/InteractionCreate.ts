import {
  APIInteraction,
  ComponentType,
  InteractionType,
} from "discord-api-types/v10";
import BaseApp from "../../BaseApp.js";
import { CommandHandlerEvents } from "../CommonEvents.js";

class InteractionCreateEvent {
  @BaseApp.Events.bind(
    BaseApp.Events.DiscordEvents.INTERACTION_CREATE,
    BaseApp.Events.EventTypes.ON
  )
  static async commandUse(int: APIInteraction) {
    if (int.type === InteractionType.ApplicationCommand) {
      BaseApp.Events.getEventEmitter().emit(
        CommandHandlerEvents.APPLICATION_COMMAND_USE,
        int
      );
    }
  }

  @BaseApp.Events.bind(
    BaseApp.Events.DiscordEvents.INTERACTION_CREATE,
    BaseApp.Events.EventTypes.ON
  )
  static async buttonClick(int: APIInteraction) {
    if (
      int.type === InteractionType.MessageComponent &&
      int.data.component_type === ComponentType.Button
    ) {
      BaseApp.Events.getEventEmitter().emit(
        CommandHandlerEvents.BUTTON_CLICK,
        int
      );
    }
  }

  @BaseApp.Events.bind(
    BaseApp.Events.DiscordEvents.INTERACTION_CREATE,
    BaseApp.Events.EventTypes.ON
  )
  static async selectMenuClick(int: APIInteraction) {
    if (
      int.type === InteractionType.MessageComponent &&
      int.data.component_type === ComponentType.StringSelect
    ) {
      BaseApp.Events.getEventEmitter().emit(
        CommandHandlerEvents.SELECT_MENU_CLICK,
        int
      );
    }
  }

  @BaseApp.Events.bind(
    BaseApp.Events.DiscordEvents.INTERACTION_CREATE,
    BaseApp.Events.EventTypes.ON
  )
  static async modalSubmit(int: APIInteraction) {
    if (int.type === InteractionType.ModalSubmit) {
      BaseApp.Events.getEventEmitter().emit(
        CommandHandlerEvents.MODAL_SUBMIT,
        int
      );
    }
  }
}

export default InteractionCreateEvent;
