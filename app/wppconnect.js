const wppconnect = require("@wppconnect-team/wppconnect");
const qrCodeGenerate = require('./generateQr')
require('dotenv').config()

function init() {
    wppconnect
        .create({
            phoneNumber: process.env.PHONE_NUMBER,
            catchLinkCode: (link) => qrCodeGenerate(link)
        })
        .then((client) => start(client))
        .catch((err) => console.log(err));
}

function start(client) {
    let last_timestamp = 0;
    client.onMessage((message) => {
        if(message.body === 'Test' && last_timestamp < message.timestamp) {
            last_timestamp = message.timestamp + 10;
            setTimeout(() => {
                client.startTyping(message.from);
            }, 2000)
            setTimeout(()=> {
                client
                    .sendText(message.from, 'Hello ' + message.sender.pushname + ", I'm a bot 🤖")
                    .then((result) => console.log('Result: ', result))
                    .catch((err) => console.error('Error when sending: ', err))
                    .finally(() => client.stopTyping(message.from));
            }, 5000)
        }
    })
}

module.exports = {init}