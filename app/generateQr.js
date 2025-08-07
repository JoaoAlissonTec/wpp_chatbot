const qrcode = require('qrcode-terminal');

function generateQrCodeOnTerminal(data){
    qrcode.generate(data, {small: true}, function (qrCodeString){
        console.log(qrCodeString);
    });
}

module.exports = generateQrCodeOnTerminal