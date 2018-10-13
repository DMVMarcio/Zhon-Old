var database = require('../database.js')
const { RichEmbed } = require('discord.js')
const i18next = require('i18next')

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')

  database.Guilds.findOne({
    '_id': message.guild.id
  }, function (servro, servidor) {
    if (servidor) {
      let linguagens = ['pt-BR', 'en-US', 'pt-PT']

      if (!razaou.length < 1) {
        if (linguagens.includes(razaou)) {
          language = args[0]
          if (language !== servidor.lang) {
            servidor.lang = language
            servidor.save()
            const embed = new RichEmbed()
              .setTitle((i18next.getFixedT(language)('comandos:lang.changeSuccessfullyTo', {lang: language.replace('pt-BR', 'Português do Brasil')})))
              .setTimestamp(new Date())
              .setFooter(message.author.username, message.author.displayAvatarURL)
              .setColor(11676858)
            message.channel.send(embed)
          } else {
            message.channel.sendMessage(t('comandos:lang.alreadyDefined'))
          }
        } else {
          message.channel.sendMessage(t('comandos:lang.invalidLang', { langs: linguagens.join(`\` **|** \``)}))
        }
      } else {
        message.channel.sendMessage(t('comandos:lang.noArgs', { langs: linguagens.join(`\` **|** \``)}))
      }
    } else {
      message.channel.sendMessage(t('comandos:lang.errorOccurred'))
    }
  })
}
