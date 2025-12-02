export default async function (interaction) {
  if (interaction.customId === "confirm_mm2") {
    return interaction.reply("🔗 Un trader te enviará un servidor privado MM2.");
  }

  if (interaction.customId === "confirm_sab") {
    return interaction.reply("🧠 Un trader te enviará un servidor de SAB.");
  }
}
