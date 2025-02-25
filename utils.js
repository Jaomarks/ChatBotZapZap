const fs = require("fs");

// Enviar mensagem para o grupo
async function enviarMensagemGrupo(mensagem) {
  const chatId = process.env.GRUPO_ID; // ID do grupo no arquivo .env
  const chat = await client.getChatById(chatId);
  chat.sendMessage(mensagem);
}

// Agendar visita
function agendarVisita(msg, horario) {
  console.log(`Visita agendada para ${msg.from} no horário: ${horario}`);
  // Aqui você pode integrar com APIs ou bancos de dados para salvar o agendamento
}

// Enviar material promocional
function enviarMaterial(msg, caminhoArquivo) {
  if (fs.existsSync(caminhoArquivo)) {
    const media = MessageMedia.fromFilePath(caminhoArquivo);
    msg.reply(media);
  } else {
    msg.reply(
      "❌ Desculpe, o material solicitado não está disponível no momento."
    );
  }
}

module.exports = { enviarMensagemGrupo, agendarVisita, enviarMaterial };
