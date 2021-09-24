import { Command } from "../Interfaces";
import ThoughtRepository from "../Repositories/ThoughtRepository";

export const command: Command = {
  name: "pensamento",
  description: "Leia um pensamento para motivar seu dia (ou não).",
  options: [],
  run: async () => {
    const thought = await new ThoughtRepository().getAll();
    const randomThought = thought[Math.floor(Math.random() * thought.length)];
    const year = new Date(randomThought.created_at).getFullYear();

    return `${randomThought.message} \nAutor: **${randomThought.author}**, ${year}`;
  },
};
