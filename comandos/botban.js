var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')

  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, usuario) {
    if (usuario) {
      if (usuario.owner || usuario.subowner || usuario.dev || usuario.sup) {
        if (!razaou.length < 1) {
          let banir = message.mentions.users.first() ? message.mentions.users.first() : client.users.get(args[0])
          if (banir) {
            if (banir.id === message.author.id) {
              message.reply('**:x: Você não pode se banir de usar o bot.**')
            } else {
              database.Users.findOne({
                '_id': banir.id
              }, function (arro, alvo) {
                if (alvo) {
                  if (alvo.dev || alvo.sup) {
                    message.reply(`:x: **Este usuário é um ${alvo.dev ? '`DESENVOLVEDOR`' : '`SUPERVISOR`'} do bot.**`)
                  } else {
                    if (alvo.ban) {
                      alvo.ban = false
                      alvo.coins = 0
                      alvo.level = 0
                      alvo.xp = 0
                      alvo.rep = 0
                      alvo.vip = false
                      alvo.save()
                      message.channel.sendMessage(`**${banir.username} foi desbanido com sucesso. <:check:438534229563801620>**`)
                    } else {
                      alvo.ban = true
                      alvo.coins = 0
                      alvo.level = 0
                      alvo.xp = 0
                      alvo.rep = 0
                      alvo.vip = false
                      alvo.save()
                      message.channel.sendMessage(`**${banir.username} foi banido com sucesso. <:check:438534229563801620>**`)
                    }
                  }
                } else {
                  message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
                }
              })
            }
          } else {
            message.reply('**Usuário não encontrado. <a:engrenagem:440261266934857728>**')
          }
        } else {
          message.channel.sendMessage('**:x: Mencione o usuário ou diga seu ID.**')
        }
      } else {
        message.reply('**Sem permissão. <a:engrenagem:440261266934857728>**')
      }
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
