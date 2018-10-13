var database = require('../database.js')

exports.run = ({ client, message, args, language }, t) => {
  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, usuario) {
    if (usuario) {
      if (usuario.owner || usuario.subowner || message.member.hasPermission(['BAN_MEMBERS'])) {
        if (message.mentions.users.size > 0) {
          var alvo = message.mentions.users.first()

          if (message.guild.member(alvo).bannable) {
            if (message.guild.members.get(message.author.id).highestRole.position >= message.guild.members.get(alvo.id).highestRole.position) {
              client.guilds.get(message.guild.id).members.get(alvo.id).ban(args.length > 1 ? args.slice(1).join("") : t('comandos:ban.notReason'))
              message.channel.sendMessage(t('comandos:ban.banned', { member: alvo.username, author: message.author.username }))
            } else {
              message.channel.sendMessage(t('comandos:ban.highestRole'))
            }
          } else {
            message.channel.sendMessage(t('comandos:ban.noBannable'))
          }
        } else {
          message.channel.sendMessage(t('comandos:ban.noMention'))
        }
      } else {
        message.channel.sendMessage(t('comandos:ban.noPerm'))
      }
    } else {
      message.channel.sendMessage(t('comandos:ban.errorOccurred'))
    }
  })
}
