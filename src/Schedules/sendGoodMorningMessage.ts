import { Message } from "discord.js";
import Client from "../Client";
import { goodMorningMessages } from "../Data/goodMorningMessages";
import ScheduleHelper from "../Helpers/ScheduleHelper";
import { Schedule } from "../Interfaces";

export const schedule: Schedule = {
  name: "sendGoodMorningMessage",
  timerRules: ScheduleHelper.createTimerRule({ hour: 7, minute: 30 }),
  callback: async (client: Client) => {
    const messages = goodMorningMessages;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const sendMessage = (message: Message) => {
      message.channel.send(randomMessage);
    };

    client.once("messageCreate", sendMessage);

    const fourHoursInMilliseconds = 14400000;
    setTimeout(() => {
      client.off("messageCreate", sendMessage);
    }, fourHoursInMilliseconds);
  },
};
