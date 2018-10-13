const Discord = require('discord.js')
var database = require('../database.js')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run = ({ client, message, args, language, prefixo, usuario }, t) => {
    let razaou = args.slice(0).join(' ')
    let razaod = args.slice(1).join(' ')

    if (!razaou.length < 1) {
        if (message.content.startsWith(prefixo + 'invite create')) {
            if (usuario.owner || usuario.subowner || usuario.dev || usuario.sup || message.member.hasPermission(['CREATE_INSTANT_INVITE'])) {
                message.channel.createInvite().then(convite => {
                    message.channel.send(t('comandos:invite.createdInvite', { member: message.author, link: convite }))
                }).catch(err => {
                    message.channel.send(t('comandos:invite.noPermBot'))
                })
            } else {
                message.reply(t('comandos:invite.noPermMember'))
            }
        } else if (message.content.startsWith(prefixo + 'invite info')) {
            if (!razaod.length < 1) {
                if (message.mentions.users.size > 0) {
                    message.guild.fetchInvites().then(convites => {
                        if (convites.size > 0) {
                            var iconvites = convites.filter(a => a.inviter.id === message.mentions.users.first().id)
                            var mconvites = iconvites.map(a => a.code).join('` **|** `')

                            if (iconvites.size > 0) {
                                var embedUI = new Discord.RichEmbed()
                                    .setTitle(t('comandos:invite.userInvites', { member: message.mentions.users.first().username }))
                                    .setDescription(`\`${mconvites}\``)
                                    .setColor(11676858)
                                    .setTimestamp(new Date())
                                    .setFooter(message.author.username, message.author.displayAvatarURL)
                                message.channel.send(embedUI);
                            } else {
                                message.channel.send(t('comandos:invite.noUserInvites'))
                            }
                        } else {
                            message.channel.send(t('comandos:invite.noServerInvites'))
                        }
                    }).catch(err => {
                        message.channel.send(t('comandos:invite.noPermBot'))
                    })
                } else {
                    message.guild.fetchInvites().then(convites => {
                        if (convites.size > 0) {
                            if (convites.find('code', args[1])) {
                                var convite = convites.find('code', args[1])
                                var criador = message.guild.members.get(convite.inviter.id)
                                var criado = moment(convite.createdAt).format('lll')
                                var expira = moment(convite.expiresAt).format('lll')
                                var embedIF = new Discord.RichEmbed()
                                    .setColor(11676858)
                                    .setTimestamp(new Date())
                                    .setFooter(message.author.username, message.author.displayAvatarURL)
                                    .setThumbnail(criador.user.displayAvatarURL)
                                    .setAuthor(criador.user.username, criador.user.displayAvatarURL)
                                    .addField(t('comandos:invite.inviteInfoEmbedFields.inviteURL.title'), t('comandos:invite.inviteInfoEmbedFields.inviteURL.value', { convite: convite.code }), true)
                                    .addField(t('comandos:invite.inviteInfoEmbedFields.inviteCode.title'), convite.code, true)
                                    .addField(t('comandos:invite.inviteInfoEmbedFields.creator.title'), `<@${criador.id}>`, true)
                                    .addField(t('comandos:invite.inviteInfoEmbedFields.inviteUses.title'), `${convite.uses}/${convite.maxUses === 0 ? '∞' : convite.maxUses}`, true)
                                    .addField(t('comandos:invite.inviteInfoEmbedFields.createdIn.title'), criado, true)
                                    .addField(t('comandos:invite.inviteInfoEmbedFields.timeoutIn.title'), `${convite.maxUses === 0 ? t('comandos:invite.inviteInfoEmbedFields.timeoutIn.value') : expira}`, true)
                                message.channel.send(embedIF)
                            } else {
                                if (convites.size !== 0) {
                                    message.channel.send(t('comandos:invite.inviteNotFound'))
                                } else {
                                    message.channel.send(t('comandos:invite.noServerInvites'))
                                }
                            }
                        } else {
                            message.channel.send(t('comandos:invite.noServerInvites'))
                        }
                    }).catch(err => {
                        message.channel.send(t('comandos:invite.noPermBot'))
                    })
                }
            } else {
                message.guild.fetchInvites().then(convites => {
                    if (convites.size !== 0) {
                        var mconvites = convites.map(a => a.code).join('` **|** `')
                        var embedGI = new Discord.RichEmbed()
                            .setTitle(t('comandos:invite.serverInvitesEmbed.title', { guild: message.guild.name }))
                            .setDescription(t('comandos:invite.serverInvitesEmbed.description', { convites: mconvites, prefix: prefixo }))
                            .setColor(11676858)
                            .setTimestamp(new Date())
                            .setFooter(message.author.username, message.author.displayAvatarURL)
                        message.channel.send(embedGI);
                    } else {
                        message.channel.send(t('comandos:invite.noServerInvites'))
                    }
                }).catch(err => {
                    message.channel.send(t('comandos:invite.noPermBot'))
                })
            }
        } else if (message.content.startsWith(prefixo + 'invite top')) {
            message.guild.fetchInvites().then(invites => {
                if (invites.size > 0) {
                    var convites = []
                    var num = 0

                    invites.map(a => convites.push({
                        user: a.inviter.id,
                        usos: a.uses,
                        code: a.code
                    }))

                    convites.sort(function(a, b) {
                        return b.usos - a.usos
                    })

                    var invitetop = convites.map(a => '**' + (num += 1) + `** - <@${a.user}> \`${a.code}\`, **${Number(a.usos).toLocaleString()} usos.**`).slice(0, 10).join('\n')
                    var embedIT = new Discord.RichEmbed()
                        .setTitle(':postbox: InviteTop:')
                        .setDescription(invitetop)
                        .setColor(11676858)
                        .setTimestamp(new Date())
                        .setFooter(message.author.username, message.author.displayAvatarURL)
                    message.channel.send(embedIT)
                } else {
                    message.channel.send(t('comandos:invite.noServerInvites'))
                }
            }).catch(err => {
                message.channel.send(t('comandos:invite.noPermBot'))
            })
        }
    } else {
        var embedIH = new Discord.RichEmbed()
            .setTitle(':postbox: Invites:')
            .setDescription(`\`\`\`\n${prefixo}invite create\n${prefixo}invite info <codigo de convite | menção de usuario>\n${prefixo}invite top\n${prefixo}invite welcome\`\`\``)
            .setColor(11676858)
            .setTimestamp(new Date())
            .setFooter(message.author.username, message.author.displayAvatarURL)
        message.channel.send(embedIH)
    }
}