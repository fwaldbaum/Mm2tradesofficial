export default async (interaction) => {
  if (interaction.customId === "confirmar_mm2") {
    await interaction.reply("El trader te enviará un servidor privado. Entrega las armas ahí.");
  }

  if (interaction.customId === "confirmar_sab") {
    await interaction.reply("Un trader te contactará para continuar el trade.");
  }
};
