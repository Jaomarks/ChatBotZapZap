

# 🤖 Bot de Atendimento para WhatsApp  

Este projeto é um chatbot desenvolvido com **whatsapp-web.js** e **Node.js**. Ele realiza atendimentos automáticos no WhatsApp, permitindo responder mensagens, enviar menus de opções, notificar o time sobre dúvidas personalizadas e agendar horários de conversa.  

## 🚀 Funcionalidades  

- Responde automaticamente mensagens privadas (não responde em grupos).  
- Exibe um menu inicial com opções de interação.  
- Notifica um grupo do WhatsApp quando o usuário escolhe a opção de dúvida personalizada.  
- Permite agendamento de horários, removendo o horário escolhido da lista de disponíveis.  

## 🛠️ Tecnologias Utilizadas  

- Node.js  
- whatsapp-web.js  
- puppeteer  
- dotenv  

## 💾 Pré-requisitos  

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:  
- [Node.js](https://nodejs.org/)  
- [Git](https://git-scm.com/)  

## 📦 Instalação  

1. Clone este repositório:  
```bash
git clone https://github.com/seu-usuario/bot-whatsapp.git
```

2. Acesse o diretório do projeto:  
```bash
cd bot-whatsapp
```

3. Instale as dependências:  
```bash
npm install
```

4. Crie o arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:  
```env
GRUPO_ID=seu-id-do-grupo
```
> O ID do grupo será exibido no console quando o bot for iniciado.  

## 💡 Como Usar  

1. Inicie o bot:  
```bash
node index.js
```

2. Escaneie o QR Code que será exibido no terminal usando o WhatsApp Web no seu celular.  

3. O bot estará pronto para receber mensagens privadas.  

## 🗂️ Estrutura do Projeto  

```plaintext
├── node_modules
├── .env
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## 📝 Comandos Úteis  

- **Instalar dependências:** `npm install`  
- **Iniciar o bot:** `node index.js`  
- **Reinstalar o navegador Chromium:** `npx puppeteer install`  

## 🧹 Solução de Problemas  

1. **Erro de navegador não encontrado:**  
   Execute o comando abaixo para baixar o Chromium:  
   ```bash
   npx puppeteer install
   ```  

2. **Erro de cache:**  
   Exclua as pastas `.wwebjs_auth` e `.wwebjs_cache` se precisar reconectar o bot.  

## 🤝 Contribuição  

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou um pull request.  

## 📜 Licença  

Este projeto está sob a licença MIT.  

---  

Se quiser, posso adicionar a parte dos horários assim que terminar o código. Quer que eu crie o arquivo direto aqui no canvas pra você copiar?
