var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, usuario) {
    if (usuario) {
      if (usuario.owner || usuario.subowner || message.member.hasPermission(['KICK_MEMBERS'])) {
        if (message.mentions.users.size > 0) {
          var alvo = message.mentions.users.first()

          if (message.guild.member(alvo).kickable) {
            if (message.guild.members.get(message.author.id).highestRole.position >= message.guild.members.get(alvo.id).highestRole.position) {
              client.guilds.get(message.guild.id).members.get(alvo.id).kick()
              message.channel.sendMessage('<:PandaBye:462338023103660032> **Usuário kickado com sucesso.**')
            } else {
              message.channel.sendMessage(':x: **Seu cargo precisa ser maior que o dele.**')
            }
          } else {
            message.channel.sendMessage(':x: **Não posso kickar esse usuário.**')
          }
        } else {
          message.channel.sendMessage(':x: **Mencione quem deseja kickar.**')
        }
      } else {
        message.reply('**Sem permissão. <a:engrenagem:440261266934857728>**')
      }
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}