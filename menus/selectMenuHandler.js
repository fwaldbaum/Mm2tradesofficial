export default async function (interaction) {
  const value = interaction.values[0];

  if (value === "mm2") {
    await interaction.reply("🗡 Escribe `mm2: tus armas` para calcular precio.");
  }

  if (value === "sab") {
    await interaction.reply("🧠 Escribe `sab: tu brainrot` para contactar a un trader.");
  }
}
