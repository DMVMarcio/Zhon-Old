exports.run = ({ client, message, args, language }, t) => {
  var ping

  ping = parseInt(client.ping)
  let peso = ping > 650 ? '16711680' : '11676858'

  message.channel.sendMessage({
    'embed': {
      'title': `Shard[${(client.shard.id + 1)}/${(client.shard.count)}]:`,
      'description': '<a:relo:442892992215252992> Ping: **' + Number(ping).toLocaleString() + '**ms',
      'color': peso
    }
  })
}
