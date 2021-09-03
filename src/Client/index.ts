import { Client, Collection } from "discord.js";
import { connect } from "mongoose";
import path from "path";
import { readdirSync } from "fs";
import { Command, Config, Event } from "../Interfaces";
import Schedule from "../Core/Schedule";

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public aliases: Collection<string, Command> = new Collection();
  private schedule: Schedule = new Schedule();

  private config: Config = {
    environment: process.env.ENVIRONMENT || "development",
    botToken: process.env.BOT_TOKEN || "",
    dbHost: process.env.DB_HOST || "",
    dbUser: process.env.DB_USER || "",
    dbPass: process.env.DB_PASS || "",
  };

  public async init() {
    this.login(this.config.botToken);

    const mongURI = `mongodb+srv://${this.config.dbUser}:${this.config.dbPass}@${this.config.dbHost}/${this.config.environment}`;
    connect(mongURI);

    const commandPath = path.join(__dirname, "..", "Commands");
    readdirSync(commandPath).forEach(file => {
      const { command } = require(`${commandPath}/${file}`);
      this.commands.set(command.name, command);
      command.aliases.forEach((aliases: string) => {
        this.aliases.set(aliases, command);
      });
    });

    const eventPath = path.join(__dirname, "..", "Events");
    readdirSync(eventPath).forEach(async file => {
      const { event } = await import(`${eventPath}/${file}`);
      this.events.set(event.name, event);
      this.on(event.name, event.run.bind(null, this));
    });

    const schedulePath = path.join(__dirname, "..", "Schedules");
    readdirSync(schedulePath).forEach(async file => {
      const { schedule } = await import(`${schedulePath}/${file}`);
      this.schedule.add(
        schedule.name,
        schedule.timerRules,
        schedule.callback.bind(null, this)
      );
    });
  }
}

export default ExtendedClient;
