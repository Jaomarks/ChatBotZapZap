const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
require("dotenv").config();
const { enviarMensagemGrupo, agendarVisita, enviarMaterial } = require("./utils");

const client = new Client({
  authStrategy: new LocalAuth(),
});
let atendimentoEmAndamento = new Set(); // Armazena os números em atendimento

// Mostrar o QR Code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Bot conectado
client.on("ready", async () => {
  console.log("✅ Bot conectado com sucesso!");
  const chats = await client.getChats();
  chats.forEach((chat) => {
    if (chat.isGroup) {
      console.log(`Grupo: ${chat.name}, ID: ${chat.id._serialized}`);
    }
  });
});

// Capturar mensagens recebidas
client.on("message", async (msg) => {
  const chat = await msg.getChat();
  const senderNumber = msg.from;

  // Responder apenas mensagens privadas (não grupos)
  if (!chat.isGroup) {
    // Verifica se o usuário está em atendimento e não responde
    if (atendimentoEmAndamento.has(senderNumber)) return;

    // Primeira mensagem ou reinício
    if (msg.body.toLowerCase() === "oi" || msg.body.trim() === "") {
      msg.reply(
        `Olá! 😊 Bem-vindo à *Agência de Cursos de Liderança*!\n\nComo posso te ajudar hoje?\n\n1️⃣ - Conhecer nossos cursos\n2️⃣ - Agendar uma visita\n3️⃣ - Baixar material promocional\n4️⃣ - Falar com um atendente`
      );
      return;
    }

    // Opções do menu
    switch (msg.body) {
      case "1":
        msg.reply(
          "🎓 Aqui estão alguns dos nossos cursos:\n\n- *Liderança Transformacional*\n- *Comunicação Eficaz*\n- *Gestão de Equipes*\n\nDeseja saber mais sobre algum curso específico? Envie o número correspondente.\n\n1️⃣ - Liderança Transformacional\n2️⃣ - Comunicação Eficaz\n3️⃣ - Gestão de Equipes"
        );
        break;

      case "2":
        msg.reply(
          "📅 Para agendar uma visita, por favor, escolha uma data disponível:\n\n1️⃣ - Segunda-feira, 10h\n2️⃣ - Quarta-feira, 14h\n3️⃣ - Sexta-feira, 16h"
        );
        break;

      case "3":
        enviarMaterial(msg, "assets/cursos_catalogo.pdf");
        msg.reply("📚 Aqui está o catálogo de cursos para você baixar!");
        break;

      case "4":
        msg.reply(
          "📞 Vou avisar nossa equipe para te atender. Aguarde um momento!"
        );
        atendimentoEmAndamento.add(senderNumber);
        enviarMensagemGrupo(
          `🚨 **NOVA SOLICITAÇÃO DE ATENDIMENTO** 🚨\n\nNúmero: ${senderNumber}`
        );
        break;

      // Submenu de cursos
      case "1": // Liderança Transformacional
        msg.reply(
          "🌟 *Liderança Transformacional*: Aprenda a inspirar e motivar sua equipe para alcançar resultados extraordinários. Duração: 8 semanas.\n\nDeseja agendar uma visita ou baixar o material promocional?\n\n1️⃣ - Agendar visita\n2️⃣ - Baixar material"
        );
        break;

      case "2": // Comunicação Eficaz
        msg.reply(
          "🗣️ *Comunicação Eficaz*: Desenvolva habilidades para se comunicar de forma clara e assertiva. Duração: 6 semanas.\n\nDeseja agendar uma visita ou baixar o material promocional?\n\n1️⃣ - Agendar visita\n2️⃣ - Baixar material"
        );
        break;

      case "3": // Gestão de Equipes
        msg.reply(
          "👥 *Gestão de Equipes*: Aprenda técnicas avançadas para gerenciar equipes de alto desempenho. Duração: 10 semanas.\n\nDeseja agendar uma visita ou baixar o material promocional?\n\n1️⃣ - Agendar visita\n2️⃣ - Baixar material"
        );
        break;

      // Submenu de agendamento
      case "1": // Segunda-feira, 10h
      case "2": // Quarta-feira, 14h
      case "3": // Sexta-feira, 16h
        const horarios = ["Segunda-feira, 10h", "Quarta-feira, 14h", "Sexta-feira, 16h"];
        const horarioEscolhido = horarios[parseInt(msg.body) - 1];
        agendarVisita(msg, horarioEscolhido);
        msg.reply(`🗓️ Sua visita foi agendada para *${horarioEscolhido}*. Te esperamos lá!`);
        break;

      default:
        msg.reply("❌ Opção inválida. Por favor, escolha uma das opções do menu.");
        break;
    }
  }
});

// Inicializar o bot
client.initialize();