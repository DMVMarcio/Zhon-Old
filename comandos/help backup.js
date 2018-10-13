var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, usuario) {
    database.Users.find({}, function (erro, documento) {
      if (usuario) {
        message.channel.sendMessage('**<a:smile2:438533831566557186> Enviei meus comandos em sua DM.**')

        var developers = documento.filter(a => a.owner || a.subowner).map(a => client.users.get(a._id) ? `**${client.users.get(a._id).tag}**` : '**Não encontrado**').join(', ')

        message.author.sendMessage({
          'embed': {
            'title': 'Info:',
            'description': `:thinking: Olá, sou **Zhon**, um bot com várias funções que lhe **ajudará** em seu servidor no discord, ou até mesmo para **divertir**. <a:smile2:438533831566557186>\n\n<:aviso:438515961805537293> Fui criado pelas seguintes pessoas:\n${developers}\n\n**Meu server no discord:** https://discord.gg/Jy3vtNE`,
            'color': 11676858,
            'thumbnail': {
              'url': 'https://i.imgur.com/0DEF4PI.png'
            }
          }
        }).then((value) => {
          setTimeout(() => {
            value.delete()
          }, 3 * 60 * 1000)
        })

        message.author.sendMessage({
          'embed': {
            'title': 'Comandos úteis:',
            'description': ':gear: Aqui estão alguns comandos para a **configuração** de seu server. :thinking:\n\n**z!config** configura algumas funções do bot no servidor.\n**z!welcome** seta uma mensagem de entrada no servidor.\n**z!byebye** seta uma mensagem de saida no servidor.\n**z!cmdcustom** comandos customizados para o servidor.\n**z!filter** filtra palavras, links e convites no servidor.\n**z!userinfo** mostra informações sobre um usuário.\n**z!serverinfo** mostra informações do servidor.\n**z!botinfo** mostra informações de um bot.\n**z!avatar** mostra a foto de usuário de alguém.\n**z!roles** mostra os cargos do servidor.\n**z!discrim** procura usuários pelo seu discriminator.\n**z!autorole** adicione um cargo automático ao seu servidor.\n**z!invite** gerencie os convites de seu servidor.\n**z!staff** veja toda a staff do bot.\n**z!mine** simples comandos sobre minecraft.\n**z!ascii** transforme textos em ascii.\n**z!fortnite** mostra informações de um jogador no fortnite.\n**z!traduzir** traduza uma frase especifica.\n**z!blackchannel** bloqueia comandos em um canal especifico.\n**z!blackcmd** bloqueie comandos em seu servidor.\n**z!reverse** veja como é a frase desejada aocontrário.',
            'color': 11676858,
            'thumbnail': {
              'url': 'https://cdn.discordapp.com/emojis/440261266934857728.gif?v=1'
            }
          }
        }).then((value) => {
          setTimeout(() => {
            value.delete()
          }, 3 * 60 * 1000)
        })

        message.author.sendMessage({
          'embed': {
            'title': 'Comandos de moderação:',
            'description': '<:police_officer:460499215882387482> Aqui estão alguns comandos para a **moderação** de seu server.\n\n**z!clear** limpa uma quantidade especifica de mensagens até 100.\n**z!ban** de ban em alguém.\n**z!kick** de kick em alguém.',
            'color': 11676858,
            'thumbnail': {
              'url': 'https://cdn.discordapp.com/emojis/460499215882387482.png?v=1'
            }
          }
        }).then((value) => {
          setTimeout(() => {
            value.delete()
          }, 3 * 60 * 1000)
        })

        message.author.sendMessage({
          'embed': {
            'title': 'Comandos sociais:',
            'description': ':sunglasses: Aqui estão alguns **comandos sociais**. <:urso3:438695602860326922>\n\n**z!profile** veja seu perfil.\n**z!level** veja seu level.\n**z!setbackground** troca o fundo do seu perfil.\n**z!rep** de pontos de reputação.\n**z!box** veja e abra suas caixas.\n**z!getbox** pegue uma caixa quando for dropada.\n**z!sobremim** diga algo sobre você para ficar no perfil.',
            'color': 11676858,
            'thumbnail': {
              'url': 'http://www.emoji.co.uk/files/twitter-emojis/smileys-people-twitter/10582-busts-in-silhouette.png'
            }
          }
        }).then((value) => {
          setTimeout(() => {
            value.delete()
          }, 3 * 60 * 1000)
        })

        message.author.sendMessage({
          'embed': {
            'title': 'Comandos de economia:',
            'description': ':money_mouth: Aqui estão alguns **comandos de economia**. <:coins:463789694036082689>\n\n**z!coins** veja a quantidade de coins.\n**z!daily** coleta coins diários.\n**z!moneytop** veja os usuários mais ricos do seu servidor.\n**z!apostar** aposte uma quantidade de dinheiro com alguém.\n**z!doar** doe coins para alguém.',
            'color': 11676858,
            'thumbnail': {
              'url': 'https://cdn.discordapp.com/emojis/463789694036082689.png?v=1'
            }
          }
        }).then((value) => {
          setTimeout(() => {
            value.delete()
          }, 3 * 60 * 1000)
        })

        message.author.sendMessage({
          'embed': {
            'title': 'Comandos de diversão:',
            'description': ':thinking: Aqui estão alguns comandos para lhe **divertir** em seu **servidor.** <a:hiperblob:435208792607686667>\n\n**z!cat** mostra o gif de um gato aleatório.\n**z!dog** mostra o gif de um cachorro aleatório.\n**z!kiss** de um beijo em alguém.\n**z!hug** de um abraço em alguém.\n**z!slap** dê um tapa em alguém.\n**z!athenas** sem ninguem pra conversar? converse com Athenas.\n**z!ship** junte dois usuários e veja se eles dão certos juntos.',
            'color': 11676858,
            'thumbnail': {
              'url': 'https://cdn.discordapp.com/emojis/435209910175924235.gif?v=1'
            }
          }
        }).then((value) => {
          setTimeout(() => {
            value.delete()
          }, 3 * 60 * 1000)
        })

        message.author.sendMessage({
          'embed': {
            'title': 'Comandos de música:',
            'description': ':notes: Afim de **curtir um som**? Basta **usar** os comandos à seguir:\n\n**z!play** inicia uma música.\n**z!queue** mostra sua playlist.\n**z!pause** pausa a música.\n**z!resume** resume a música.\n**z!stop** para as músicas.\n**z!np** mostra a música que está tocando.\n**z!skip** pula a música que está tocando.\n**z!summon** puxa o bot de um canal para outro.\n**z!repeat** faça com que a música fique se repetindo.\n**z!disconnect** me desconecta do canal de voz.\n**z!restart** reinicia a música que está tocando.',
            'color': 11676858,
            'thumbnail': {
              'url': 'https://images.emojiterra.com/mozilla/512px/1f3b6.png'
            }
          }
        }).then((value) => {
          setTimeout(() => {
            value.delete()
          }, 3 * 60 * 1000)
        })

        message.author.sendMessage({
          'embed': {
            'title': 'Comandos de manipulação de imagens:',
            'description': ':crossed_swords: Aqui estão alguns comandos que **manipulam imagens**.\n\n**z!invert** inverta a cor de uma imagem.\n**z!grey** remova a cor de uma imagem.\n**z!sepia** coloque o efeito sépia na imagem.',
            'color': 11676858,
            'thumbnail': {
              'url': 'https://i.imgur.com/Q4kWf96.png'
            }
          }

        }).catch(err => {
          message.reply('**:x: Não consegui enviar meus comandos em seu privado, verifique se sua DM está ativada.**')
        }).then((value) => {
          setTimeout(() => {
            value.delete()
          }, 3 * 60 * 1000)
        })
      } else {
        message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
      }
    })
  })
}
