exports.run = ({ client, message, args, lang, language }, t) => {
  lang = lang.reverse
  let razaou = args.slice(0).join(' ')

  if (!razaou.length < 1) {
    message.channel.sendMessage(`**${message.author.tag}:** ${args.join(' ').split('').reverse().join('')}`)
  } else {
    message.channel.sendMessage(t('comandos:reverse.noArgs'))
  }
}
