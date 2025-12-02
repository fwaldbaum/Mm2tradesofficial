export default async function (interaction) {
  const value = interaction.values[0];

  if (value === "mm2") {
    await interaction.reply("🗡 Escribe: `mm2: arma1, arma2, arma3` para calcular valores.");
  }

  if (value === "sab") {
    await interaction.reply("🧠 Escribe: `sab: brainrot` para iniciar trade.");
  }
}
