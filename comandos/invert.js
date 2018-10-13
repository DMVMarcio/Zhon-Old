const Discord = require('discord.js')
var Jimp = require('jimp')

exports.run = ({ client, message, args, lang, language }, t) => {
  var imagem

  if (message.attachments.first()) {
    if (message.attachments.first().filename.includes('.png') || message.attachments.first().filename.includes('.jpg') || message.attachments.first().filename.includes('.jpeg')) {
      imagem = message.attachments.first().url
      inverter()
    } else {
      nofile()
    }
  } else {
    nofile()
  }

  async function nofile () {
    if (!args.slice(0).join(' ').length < 1) {
      if (message.mentions.users.size > 0) {
        imagem = message.mentions.users.first().displayAvatarURL
        inverter()
      } else {
        if (client.users.get(args[0])) {
          imagem = client.users.get(args[0]).displayAvatarURL
          inverter()
        } else if (client.users.find('tag', args.slice(0).join(' '))) {
          imagem = client.users.find('tag', args.slice(0).join(' ')).displayAvatarURL
          inverter()
        } else if (message.guild.members.find('displayName', args.slice(0).join(' '))) {
          imagem = message.guild.members.find('displayName', args.slice(0).join(' ')).user.displayAvatarURL
          inverter()
        } else if (client.users.find('username', args.slice(0).join(' '))) {
          imagem = client.users.find('username', args.slice(0).join(' ')).user.displayAvatarURL
          inverter()
        } else {
          if (args[0].includes('.png') || args[0].includes('.jpg') || args[0].includes('.jpeg')) {
            imagem = args.slice(0).join(' ')
            inverter()
          } else {
            imagem = message.author.displayAvatarURL
            inverter()
          }
        }
      }
    } else {
      imagem = message.author.displayAvatarURL
      inverter()
    }
  }

  async function inverter () {
    Jimp.read(imagem, function (err, img) {
      img.invert()

      img.getBuffer(Jimp.MIME_PNG, (erri, buffer) => {
        message.channel.send(`${message.author} **Sua imagem:**`, new Discord.Attachment(buffer, 'Invert.png')).catch(err => {
          message.channel.sendMessage(':x: **Ocorreu um erro ao enviar sua imagem.**')
        })
        message.channel.stopTyping()
      })
    }).catch(err => {
      message.reply(':x: **Ocorreu um erro ao enviar sua imagem.**')
    })
  }
}
