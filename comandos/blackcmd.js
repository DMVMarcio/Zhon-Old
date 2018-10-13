var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')

  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, usuario) {
    if (usuario) {
      if (usuario.owner || usuario.subowner || usuario.dev || usuario.sup || message.member.hasPermission(['MANAGE_GUILD'])) {
        database.Guilds.findOne({
          '_id': message.guild.id
        }, function (servro, servidor) {
          if (servidor) {
            if (!razaou.length < 1) {
              try {
                if (!args[0].includes('.') && !args[0].includes('/')) {
                  require(`./${args[0].replace('.', '').replace('/', '').toLowerCase()}.js`)
                  var comando = args[0].replace('.', '').replace('/', '').toLowerCase()
                  var desativar = !!servidor.blackcmds.includes(comando)
                  if (comando !== 'blackcmd') {
                    if (desativar) {
                      servidor.blackcmds.splice(servidor.blackcmds.indexOf(comando), 1)
                    } else {
                      servidor.blackcmds.unshift(comando)
                    }
                    servidor.save()
                    message.channel.sendMessage(`:wink: O comando \`${comando}\` ${!desativar ? '**não** será mais' : '**agora** poderá ser'} **executado** neste servidor.`)
                  } else {
                    message.channel.sendMessage(':x: **Você não pode bloquear este comando.**')
                  }
                } else {
                  message.channel.sendMessage(':x: **Comando inexistente.**')
                }
              } catch (err) {
                if (err.code === 'MODULE_NOT_FOUND') {
                  message.channel.sendMessage(':x: **Comando inexistente.**')
                } else {
                  console.error(err)
                }
              }
            } else {
              message.channel.sendMessage(':x: **Diga o comando.**')
            }
          } else {
            message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
          }
        })
      } else {
        message.reply('**Sem permissão. <a:engrenagem:440261266934857728>**')
      }
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
