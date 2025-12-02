import { REST, Routes } from "discord.js";
import fs from "fs";

export async function registerCommands(token) {
  const CLIENT_ID = "1445505096937898035";
  const GUILD_ID = "1330250225855758366";

  const commands = [];
  const files = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));

  for (const file of files) {
    const cmd = (await import(`./commands/${file}`)).default;
    commands.push(cmd.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(token);

  try {
    console.log("⏳ Registrando slash commands...");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log("✅ Slash commands registrados con éxito.");
  } catch (err) {
    console.error(err);
  }
}
