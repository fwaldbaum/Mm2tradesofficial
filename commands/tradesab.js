import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("tradesab")
    .setDescription("Confirmación para SAB (brainrots)"),

  async run(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("confirm_sab")
        .setLabel("Confirmo para SAB")
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({
      content: "⚠️ **El bot no puede devolver brainrots** una vez entregados.",
      components: [row]
    });
  }
};
