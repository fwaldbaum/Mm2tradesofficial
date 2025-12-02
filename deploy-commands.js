import { REST, Routes } from "discord.js";
import fs from "fs";
import "dotenv/config";

// Cargar todos los comandos desde /commands
const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const cmd = (await import(`./commands/${file}`)).default;
  commands.push(cmd.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// ⚠️ REEMPLAZAR ESTOS 2 DATOS ⚠️
const CLIENT_ID = "1445505096937898035";
const GUILD_ID = "ID_de_tu_servidor";

async function register() {
  try {
    console.log("⏳ Registrando slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log("✅ Comandos registrados con éxito.");
  } catch (err) {
    console.error(err);
  }
}

register();
