import { Client, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs";
import { registerCommands } from "./deploy-commands.js";

// ============================================
// LISTA DE VALORES MM2
// ============================================

const mm2Values = {
  "elderwood scythe": 45, "hallowscythe": 35, "eternal iii": 14, "cotton candy": 35,
  "latte": 100, "peppermint": 9, "eggblade": 9, "golden": 13, "swirly blade": 15,
  "battleaxe ii": 14, "icewing": 6, "icebreaker": 55, "gemstone": 10, "chroma shark": 45,
  "iceflake": 14, "rainbow gun": 195, "chroma cookiecane": 50, "evergun": 3320,
  "eternal iv": 14, "swirly axe": 95, "cookiecane": 25, "waves": 75, "splitter": 8,
  "chroma elderwood blade": 50, "candy": 146, "chroma gemstone": 50, "jinglegun": 14,
  "chroma lightbringer": 80, "amerilaser": 11, "minty": 12, "lightbringer": 35,
  "sparkle 4": 12, "america": 9, "laser": 13, "chroma luger": 75, "vampires gun": 498,
  "chroma watergun": 1660, "chroma fang": 23, "elite": 3, "vintage blood": 5, "spectre": 68,
  "frostbite": 7, "vintage prince": 6, "vintage phaser": 10, "spirit": 199, "soul": 250,
  "vampires axe": 620, "constellation": 996, "saw": 8, "hallows edge": 11,
  "chroma darkbringer": 89, "sparkle 5": 11, "ocean": 85, "winters edge": 11,
  "xmas": 9, "sugar": 30, "gingerscope": 14110, "elderwood revolver": 39,
  "hallow gun": 30, "rainbow": 195, "vampires edge": 9, "gingerblade": 8, "batwing": 57,
  "chroma swirly gun": 45, "elderwood blade": 45, "old glory": 15, "iceblaster": 50,
  "plasmabeam": 25, "icepiercer": 664, "candleflame": 55, "jd": 45, "phantom": 45,
  "darksword": 664, "logchopper": 25, "nebula": 12, "blue elite": 7, "glitch2": 49,
  "snowflake": 9, "chroma gingerblade": 24, "spider": 9, "nobledragon": 3,
  "chroma candleflame": 68, "watergun": 29, "flowerwood knife": 49, "flowerwood gun": 49,
  "pearlshine": 49, "chroma vampires gun": 19920, "bauble": 166, "chroma bauble": 14442,
  "australis": 150, "borealis": 150, "celestial": 996, "flora": 150, "bloom": 150,
  "bat": 166, "deathshard": 14, "pumpking": 7, "eternal ii": 14
};

// ============================================
// CLIENT SETUP
// ============================================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

// Cargar slash commands
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
  const cmd = (await import(`./commands/${file}`)).default;
  client.commands.set(cmd.data.name, cmd);
}

client.once("ready", async () => {
  console.log(`Bot iniciado como ${client.user.tag}`);
  await registerCommands(process.env.TOKEN); // Registro automático
});

// ============================================
// HANDLERS (interacciones)
// ============================================

client.on("interactionCreate", async interaction => {
  if (interaction.isChatInputCommand()) {
    const cmd = client.commands.get(interaction.commandName);
    if (cmd) cmd.run(interaction, client);
  }

  if (interaction.isStringSelectMenu()) {
    const handler = (await import("./menus/selectMenuHandler.js")).default;
    handler(interaction);
  }

  if (interaction.isButton()) {
    const handler = (await import("./buttons/buttonHandler.js")).default;
    handler(interaction);
  }
});

// ============================================
// MENSAJE: mm2: (CALCULADOR REAL)
// ============================================

client.on("messageCreate", msg => {
  if (msg.author.bot) return;

  if (msg.content.startsWith("mm2:")) {
    const armasRaw = msg.content.replace("mm2:", "").trim().toLowerCase();
    const armas = armasRaw.split(",").map(a => a.trim());

    let total = 0;
    let respuesta = "🗡 **Armas detectadas:**\n";

    for (const arma of armas) {
      if (mm2Values[arma]) {
        total += mm2Values[arma];
        respuesta += `• ${arma} → **${mm2Values[arma]} Robux**\n`;
      } else {
        respuesta += `• ${arma} → ❓ No está en la lista\n`;
      }
    }

    if (total === 0) {
      return msg.reply("❌ Ninguna de las armas está en la lista.");
    }

    msg.reply(
      `${respuesta}\n\n💰 **Total: ${total} Robux**\nCrea un pase por esa cantidad y envíalo aquí.\n🔄 Contactando a un trader…`
    );
  }
});

// ============================================

client.login(process.env.TOKEN);
