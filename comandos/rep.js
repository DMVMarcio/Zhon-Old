var database = require('../database.js')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run = ({client, message, args, language }, t) => {

  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, documento) {
    if (documento) {
      var tempo = moment.duration.format([moment.duration((parseInt(documento.timerep) + 86400000) - Date.now())], 'hh:mm:ss')

      if ((parseInt(documento.timerep) + 86400000) <= (Date.now())) {
        if (message.mentions.users.size > 0) {
          if (!message.mentions.users.first().bot) {
            if (message.mentions.users.first().id !== message.author.id) {
              database.Users.findOne({
                '_id': message.mentions.users.first().id
              }, function (mrro, mencionado) {
                if (mencionado) {
                  mencionado.rep += 1
                  mencionado.save()
                  documento.timerep = Date.now()
                  documento.save()
                  message.channel.send(t('comandos:rep.givenRep', { member: message.mentions.users.first().username }))
                } else {
                  message.channel.send(t('comandos:rep.errorOccurred'))
                }
              })
            } else {
              message.channel.send(t('comandos:rep.mentionYou'))
            }
          } else {
            message.channel.send(t('comandos:rep.mentionBot'))
          }
        } else {
          message.channel.send(t('comandos:rep.timeHasEnded'))
        }
      } else {
        message.channel.send(t('comandos:rep.alreadyGiven', { time: tempo }))
      }
    } else {
      message.channel.send(t('comandos:rep.errorOccurred'))
    }
  })
}
