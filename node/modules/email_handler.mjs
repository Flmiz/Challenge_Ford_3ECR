import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "6bits.projetos@gmail.com",
        pass: "ocoqnowdjcwdwsng"
    },
    tls: {
        rejectUnauthorized: false,
    },
});

var readHTML = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
           callback(err); 
           throw err;
            
        }
        else {
            callback(null, html);
        }
    });
};

export default async function send(email) {
    readHTML(process.cwd() + '/pages/email.html', function(err, html) {
        var mailOptions = {
            from: '6Bits<6bits.projetos@gmail.com>',
            to: email,
            subject: '[Ford] Seu pedido foi confirmado #XXXXX',
            text: 'teste',
            html: html
        };
        transporter.sendMail(mailOptions);
        }
    );
}