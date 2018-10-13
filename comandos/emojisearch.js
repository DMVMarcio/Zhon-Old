exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')

  if (!razaou.length < 1) {
    if (client.emojis.find('name', args[0])) {

    } else {
      message.channel.sendMessage(':x: **Emoji não encontrado.**')
    }
  } else {
    message.channel.sendMessage(':x: **Diga o nome do emoji.**')
  }
}
