var database = require('../database.js')
const Discord = require('discord.js')
var Jimp = require('jimp')

exports.run = ({ client, message, args, language }, t) => {
  if (message.mentions.users.size > 0) {
    var menções = []
    message.mentions.users.map(a => menções.push(a.id))

    var user1 = menções.length > 1 ? message.guild.members.get(menções[0]).user : message.guild.members.get(message.author.id).user
    var user2 = menções.length > 1 ? message.guild.members.get(menções[1]).user : message.guild.members.get(menções[0]).user

    var porcentagem = 0
    var nome = user1.username.substring(0, 5) + user2.username.substring(user2.username.length - 4, user2.username.length)

    database.Ships.findOne({
      '_id1': user1.username,
      '_id2': user2.username
    }, function (erro, procurando) {
      if (procurando) {
        porcentagem = procurando.porcentagem
        shipar()
      } else {
        database.Ships.findOne({
          '_id1': user2.username,
          '_id2': user1.username
        }, function (erro2, procurando2) {
          if (procurando2) {
            porcentagem = procurando2.porcentagem
            shipar()
          } else {
            var random = Math.round(Math.random() * 100)
            porcentagem = random

            var shipados = new database.Ships({
              _id: user1.id + user2.id,
              _id1: user1.username,
              _id2: user2.username,
              porcentagem: porcentagem
            })

            shipados.save()

            shipar()
          }
        })
      }
    })
  } else {
    message.channel.sendMessage(t('comandos:ship.noMention'))
  }

  async function shipar () {
    var mensagem = porcentagem <= 10 ? t('comandos:ship.msg1') : porcentagem <= 30 ? t('comandos:ship.msg2') : porcentagem <= 50 ? t('comandos:ship.msg3') : porcentagem <= 70 ? t('comandos:ship.msg4') : porcentagem <= 90 ? t('comandos:ship.msg5') : t('comandos:ship.msg6')

    Jimp.read('https://i.imgur.com/nuLX9sF.png', function (err, img) {
      Jimp.read(user1.displayAvatarURL, function (err1, usuario1) {
        Jimp.read(user2.displayAvatarURL, function (err2, usuario2) {
          usuario1.resize(128, 128)
          usuario2.resize(128, 128)
          img.composite(usuario1, 0, 0)
          img.composite(usuario2, 256, 0)

          img.getBuffer(Jimp.MIME_PNG, (erri, buffer) => {
            var arquivo = new Discord.Attachment(buffer, 'Ship.png')
            message.channel.sendMessage({
              'embed': {
                'description': `**${nome} ${porcentagem}%**\n${mensagem}`,
                'color': 11676858,
                'timestamp': new Date(),
                'footer': {
                  'icon_url': message.author.displayAvatarURL,
                  'text': `${message.author.username}`
                },
                'image': {
                  'url': `attachment://Ship.png`
                }
              },
              'files': [
                arquivo
              ]
            }).catch(err => {
              message.channel.sendMessage(t('comandos:ship.errorOccurred'))
            })
          })
        }).catch(err => {
          message.channel.sendMessage(t('comandos:ship.errorOccurred'))
        })
      }).catch(err => {
        message.channel.sendMessage(t('comandos:ship.errorOccurred'))
      })
    }).catch(err => {
      message.channel.sendMessage(t('comandos:ship.errorOccurred'))
    })
  }
}
