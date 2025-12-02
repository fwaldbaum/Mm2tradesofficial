export default async (interaction) => {
  const value = interaction.values[0];

  if (value === "mm2") {
    await interaction.reply("Has elegido **MM2**. Escribe las armas:
`mm2: Iceblaster, Batwing`");
  }

  if (value === "sab") {
    await interaction.reply("Has elegido **SAB**. Escribe el brainrot:
`sab: Ohio Gyat`");
  }
};
