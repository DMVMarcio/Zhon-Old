const Discord = require('discord.js')
var database = require('../database.js')
var Jimp = require('jimp')

exports.run = ({ client, message, args, lang, language }, t) => {
  let usuario = message.mentions.users.first() ? message.mentions.users.first() : message.author

  database.Users.findOne({
    '_id': usuario.id
  }, function (erro, documento) {
    if (documento) {
      try {
        message.channel.startTyping()
        setInterval(() => {
          message.channel.stopTyping()
        }, 8 * 1000)
        var unbug = 910 * documento.level + 1
        Jimp.loadFont('./comandos/fontes/mouse_memoirs/mouse_memoirs_16.fnt').then(function (letra) {
          Jimp.loadFont('./comandos/fontes/mouse_memoirs/mouse_memoirs_32.fnt').then(function (letra2) {
            Jimp.loadFont('./comandos/fontes/mouse_memoirs/mouse_memoirs_64.fnt').then(function (letra3) {
              Jimp.read('https://i.imgur.com/FphC2I0.png', function (erre, img) {
                Jimp.read(`${documento.background}`).then(function (background) {
                  Jimp.read(`${usuario.avatarURL}`).then(function (avatar) {
                    Jimp.read(`https://emojipedia-us.s3.amazonaws.com/thumbs/120/microsoft/106/police-officer_1f46e.png`).then(function (supervisor) {
                      Jimp.read(`https://images.emojiterra.com/twitter/512px/1f451.png`).then(function (donos) {
                        Jimp.read(`https://images.emojiterra.com/mozilla/512px/1f4bb.png`).then(function (desenvolvedores) {
                          Jimp.read(`https://emojipedia-us.s3.amazonaws.com/thumbs/160/emoji-one/98/lower-left-paintbrush_1f58c.png`).then(function (designers) {
                            Jimp.read(`http://www.emoji.co.uk/files/mozilla-emojis/animals-nature-mozilla/11599-glowing-star.png`).then(function (vip) {
                              Jimp.read('https://i.imgur.com/dWAiAUL.png').then(function (perfil) {
                                Jimp.read('https://cloud.githubusercontent.com/assets/414918/11165709/051d10b0-8b0f-11e5-864a-20ef0bada8d6.png').then(function (mascara) {
                                  avatar.resize(171, 171)
                                  mascara.resize(171, 171)
                                  supervisor.resize(20, 20)
                                  donos.resize(20, 20)
                                  desenvolvedores.resize(20, 20)
                                  designers.resize(20, 20)
                                  vip.resize(20, 20)
                                  avatar.mask(mascara, 0, 0)
                                  background.resize(716, 269)
                                  img.composite(background, 69, 15)
                                  img.composite(perfil, 0, 0)
                                  img.composite(avatar, 110, 124)
                                  var numero = 533
                                  if (documento.owner || documento.subowner) {
                                    img.composite(donos, numero, 287)
                                    numero += 25
                                  }
                                  if (documento.dev) {
                                    img.composite(desenvolvedores, numero, 287)
                                    numero += 25
                                  }
                                  if (documento.sup) {
                                    img.composite(supervisor, numero, 287)
                                    numero += 25
                                  }
                                  if (documento.dzn) {
                                    img.composite(designers, numero, 287)
                                    numero += 25
                                  }
                                  if (documento.vip) {
                                    img.composite(vip, numero, 287)
                                    numero += 25
                                  }
                                  img.print(letra2, 287, 251, `${usuario.tag}`)
                                  img.print(letra3, (documento.level < 10 ? 180 : 180 - ((documento.level.toString().length - 1) * 15)), 365, `${documento.level}`)
                                  img.print(letra, 308, 303, `${documento.sobre}`, 230)
                                  img.print(letra3, (documento.coins < 10 ? 670 : 670 - ((Number(documento.coins).toLocaleString().toString().length - 1) * 15)), 365, `${Number(documento.coins).toLocaleString()}`)
                                  img.print(letra2, 121, 317, `${Number(documento.xp).toLocaleString()}/${Number(unbug).toLocaleString()}`)
                                  img.print(letra2, 688, 308, `${Number(documento.rep).toLocaleString()}`)

                                  img.getBuffer(Jimp.MIME_PNG, (erri, buffer) => {
                                    message.channel.send(``, new Discord.Attachment(buffer, 'Profile.png')).catch(err => {
                                      message.channel.sendMessage(':x: **Ocorreu um erro ao enviar seu perfil.**')
                                    })
                                    message.channel.stopTyping()
                                  })
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                }).catch(err => {
                  message.reply(':x: **O plano de fundo parece ser invalido.**')
                })
              })
            })
          })
        })
      } catch (e) {
        message.reply(':x: **O plano de fundo parece ser invalido.**')
      }
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
