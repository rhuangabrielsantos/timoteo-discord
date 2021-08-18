import { Client, Collection } from "discord.js";
import { connect } from "mongoose";
import path from "path";
import { readdirSync } from "fs";
import { Command, Config, Event } from "../Interfaces";

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public aliases: Collection<string, Command> = new Collection();

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
    connect(mongURI, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });

    const commandPath = path.join(__dirname, "..", "Commands");
    readdirSync(commandPath).forEach(file => {
      const { command } = require(`${commandPath}/${file}`);
      this.commands.set(command.name, command);
    });

    const eventPath = path.join(__dirname, "..", "Events");
    readdirSync(eventPath).forEach(async file => {
      const { event } = await import(`${eventPath}/${file}`);
      this.events.set(event.name, event);
      this.on(event.name, event.run.bind(null, this));
    });
  }
}

export default ExtendedClient;
