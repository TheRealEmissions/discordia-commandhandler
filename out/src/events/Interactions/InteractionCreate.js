var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ComponentType, InteractionType, } from "discord-api-types/v10";
import BaseApp from "../../BaseApp";
import { DiscordEvents } from "events-types/events/src/enums/CommonEvents";
import { EventTypes } from "events-types/events/src/enums/EventTypes";
import { CommandHandlerEvents } from "../CommonEvents";
class InteractionCreateEvent {
    static async commandUse(int) {
        if (int.type === InteractionType.ApplicationCommand) {
            BaseApp.Events.events.emit(CommandHandlerEvents.APPLICATION_COMMAND_USE, int);
        }
    }
    static async buttonClick(int) {
        if (int.type === InteractionType.MessageComponent &&
            int.data.component_type === ComponentType.Button) {
            BaseApp.Events.events.emit(CommandHandlerEvents.BUTTON_CLICK, int);
        }
    }
    static async selectMenuClick(int) {
        if (int.type === InteractionType.MessageComponent &&
            int.data.component_type === ComponentType.StringSelect) {
            BaseApp.Events.events.emit(CommandHandlerEvents.SELECT_MENU_CLICK, int);
        }
    }
    static async modalSubmit(int) {
        if (int.type === InteractionType.ModalSubmit) {
            BaseApp.Events.events.emit(CommandHandlerEvents.MODAL_SUBMIT, int);
        }
    }
}
__decorate([
    BaseApp.Events.bind(DiscordEvents.INTERACTION_CREATE, EventTypes.ON)
], InteractionCreateEvent, "commandUse", null);
__decorate([
    BaseApp.Events.bind(DiscordEvents.INTERACTION_CREATE, EventTypes.ON)
], InteractionCreateEvent, "buttonClick", null);
__decorate([
    BaseApp.Events.bind(DiscordEvents.INTERACTION_CREATE, EventTypes.ON)
], InteractionCreateEvent, "selectMenuClick", null);
__decorate([
    BaseApp.Events.bind(DiscordEvents.INTERACTION_CREATE, EventTypes.ON)
], InteractionCreateEvent, "modalSubmit", null);
export default InteractionCreateEvent;
