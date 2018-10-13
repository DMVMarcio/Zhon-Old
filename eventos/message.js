var database = require('../database.js')
const Discord = require('discord.js')
const fs = require('fs')
const i18next = require('i18next')
const translationBackend = require('i18next-node-fs-backend')
const DBL = require('dblapi.js')
const client = new Discord.Client({})
const dbl = new DBL(process.env.dbl, client)
var id = '451155262431035393'

async function newDocDB(doc, res) {
    if (doc === "user") {
        var pessoa = new database.Users({
            _id: res.id,
            level: 0,
            xp: 0,
            coins: 0,
            sobre: 'Use z!sobremim para poder alterar está mensagem.',
            rep: 0,
            caixas: [],
            background: 'https://i.imgur.com/CJ8fmrT.png',
            vip: false,
            dev: false,
            sup: false,
            dzn: false,
            owner: false,
            subowner: false,
            ban: false,
            timevip: '0000000000000',
            timedaily: '0000000000000',
            timerep: '0000000000000'
        })
        pessoa.save()
    } else if (doc === "guild") {
        var servidor = new database.Guilds({
            _id: res.id,
            prefix: 'z!',
            lang: res.region === "sydney" || res.region === "us-south" || res.region === "us-west" || res.region === "us-central" || res.region === "us-east" ? "en-US" : "pt-BR",
            welcome: false,
            welcomechannel: 'None',
            welcomemsg: 'None',
            byebye: false,
            byebyechannel: 'None',
            byebyemsg: 'None',
            autorole: false,
            autoroleid: 'None',
            logs: false,
            logschannel: 'None',
            leveis: true,
            coins: true,
            box: true,
            roleshop: false,
            caixa: false,
            caixatipo: 'Comum',
            links: false,
            invites: false,
            words: [],
            customcmd: [],
            customfun: [],
            customresposta: [],
            cargos: [],
            cargospreço: [],
            cargosmsg: false,
            blackchannels: [],
            blackcmds: []
        })
        servidor.save()
    }
}

var cmdCol = new Set()
var banCol = new Set()
var dbCol = new Set()
var mentionCol = new Set()
var boxCol = new Set()
var xpCol = new Set()
let coinsRDM = Math.round(Math.random() * 15)
var vipCol = new Set()

exports.run = (client, message) => {

    if (message.channel.type === 'dm') return;
    if (!message.author.bot) {

        let args = message.content.split(' ').slice(1)

        setTimeout(function() {
            return;
        }, 5 * 1000)

        if (!banCol.has(message.author.id)) {
            database.Guilds.findOne({
                '_id': message.guild.id
            }, function(servro, servidor) {
                if (servidor) {
                    var prefixo
                    prefixo = servidor.prefix

                    if (message.content.startsWith(servidor.prefix)) {
                        database.Users.findOne({
                            '_id': message.author.id
                        }, function(erro, usuario) {
                            if (usuario) {
                                let command = message.content.split(' ')[0]
                                command = command.slice(prefixo.length)

                                if (!servidor.blackchannels.includes(message.channel.id) || command === 'blackchannel') {
                                    if (!servidor.blackcmds.includes(command)) {

                                        const setFixedT = function(translate) {
                                            t = translate
                                        }

                                        const language = (servidor && servidor.lang) || 'pt-BR'
                                        setFixedT(i18next.getFixedT(language))

                                        try {
                                            let commandFile = require(`../comandos/${command}.js`)

                                            if (!usuario.ban || usuario.owner || usuario.subowner || usuario.dev || usuario.sup || usuario.dzn) {
                                                if (!cmdCol.has(message.author.id)) {
                                                    database.Comandos.findOne({
                                                        '_id': command
                                                    }, function(cerro, comando) {
                                                        if (comando) {
                                                            if (comando.manutenção && !usuario.owner && !usuario.subowner && !usuario.dev && !usuario.sup && !usuario.dzn) {
                                                                message.channel.sendMessage(t('comandos:events.commandInMaintenance'))
                                                                cooldownCMD()
                                                            } else {
                                                                return new Promise(async (resolve, reject) => {

                                                                    i18next.use(translationBackend).init({
                                                                        ns: ['comandos', 'eventos', 'help'],
                                                                        preload: await fs.readdirSync('./locales'),
                                                                        fallbackLng: 'pt-BR',
                                                                        backend: {
                                                                            loadPath: `./locales/{{lng}}/{{ns}}.json`
                                                                        },
                                                                        interpolation: {
                                                                            escapeValue: false
                                                                        },
                                                                        returnEmptyString: false
                                                                    }, (e, f) => {
                                                                        if (f) {
                                                                            commandFile.run({ client, message, args, language, prefixo, servidor, usuario }, t)
                                                                            cooldownCMD()
                                                                        }
                                                                    })
                                                                })
                                                            }
                                                        } else {
                                                            var comandoC = new database.Comandos({
                                                                _id: command,
                                                                usos: 0,
                                                                manutenção: false,
                                                                lastError: "Nenhum"
                                                            })

                                                            comandoC.save()

                                                            message.channel.sendMessage(t('comandos:events.cmdDB'))
                                                        }
                                                    })
                                                } else {
                                                    message.channel.sendMessage(t('comandos:events.cooldown'))
                                                }
                                            } else {
                                                banido()
                                            }
                                        } catch (err) {
                                            if (err.code === 'MODULE_NOT_FOUND') {
                                                if (!usuario.ban || usuario.owner && usuario.subowner && usuario.dev && usuario.sup && usuario.dzn) {
                                                    if (servidor.customcmd.includes(command)) {
                                                        if (!cmdCol.has(message.author.id)) {
                                                            if (servidor.customfun[servidor.customcmd.indexOf(command)] === 'response') {
                                                                message.channel.sendMessage(servidor.customresposta[servidor.customcmd.indexOf(command)].replace(/{member}/g, `<@${message.author.id}>`).replace(/{member.username}/g, `${message.author.username}`).replace(/{member.id}/g, `${message.author.id}`).replace(/{users.size}/g, `${message.guild.members.size}`).replace(/{guild.name}/g, `${message.guild.name}`).replace(/{guild.id}/g, `${message.guild.id}`))
                                                            } else if (servidor.customfun[servidor.customcmd.indexOf(command)] === 'addrole') {
                                                                if (message.guild.roles.get(servidor.customresposta[servidor.customcmd.indexOf(command)])) {
                                                                    if (message.guild.members.get(message.author.id).roles.get(servidor.customresposta[servidor.customcmd.indexOf(command)])) {
                                                                        message.guild.members.get(message.author.id).removeRole(servidor.customresposta[servidor.customcmd.indexOf(command)])
                                                                        message.channel.sendMessage(`:cocktail: **O cargo \`${message.guild.roles.get(servidor.customresposta[servidor.customcmd.indexOf(command)]).name}\` foi removido.**`)
                                                                    } else {
                                                                        message.guild.members.get(message.author.id).addRole(servidor.customresposta[servidor.customcmd.indexOf(command)])
                                                                        message.channel.sendMessage(`:cocktail: **O cargo \`${message.guild.roles.get(servidor.customresposta[servidor.customcmd.indexOf(command)]).name}\` foi recebido.**`)
                                                                    }
                                                                } else {
                                                                    servidor.customfun.splice(servidor.customcmd.indexOf(command), 1)
                                                                    servidor.customresposta.splice(servidor.customcmd.indexOf(command), 1)
                                                                    servidor.customcmd.splice(servidor.customcmd.indexOf(command), 1)
                                                                    servidor.save()
                                                                }
                                                            }
                                                        } else {
                                                            message.channel.sendMessage(coldownCMDmsg)
                                                        }
                                                    }
                                                } else {
                                                    banido()
                                                }
                                            } else {
                                                if (err.code === 'MISSING_PERMISSIONS') return;
                                                database.Comandos.findOne({ "_id": command }).then(comando => {
                                                    if (!comando.manutenção) {
                                                        comando.manutenção = true
                                                        comando.lastError = err
                                                        comando.save()
                                                        message.channel.send(t('comandos:events.errorFound', { member: message.author.tag, erro: err }));
                                                    }
                                                })
                                                console.error(err)
                                            }
                                        }

                                        async function banido() {
                                            banCol.add(message.author.id)
                                            setTimeout(function() {
                                                banCol.delete(message.author.id)
                                            }, 5 * 1000)
                                            message.channel.sendMessage(t('comandos:events.banned')).then((value) => {
                                                setTimeout(() => {
                                                    value.delete()
                                                }, 5000)
                                            })
                                        }

                                        async function cooldownCMD() {
                                            cmdCol.add(message.author.id)
                                            setTimeout(function() {
                                                cmdCol.delete(message.author.id)
                                            }, 3 * 1000)
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
            })
        }

        if (!dbCol.has(message.author.id)) {
            dbCol.add(message.author.id)
            setTimeout(function() {
                dbCol.delete(message.author.id)
            }, 60 * 1000)

            database.Users.findOne({
                '_id': message.author.id
            }, function(userro, usuario) {
                var doc;
                var res;
                if (usuario) {
                    database.Guilds.findOne({
                        '_id': message.guild.id
                    }, function(servro, servidor) {
                        if (servidor) {
                            if (message.mentions.users.size > 0) {
                                database.Users.findOne({
                                    '_id': message.author.id
                                }, function(menrro, mencionado) {
                                    if (!mencionado) {
                                        if (!message.mentions.users.first().bot) {
                                            res = message.mentions.users.first()
                                            doc = "user"
                                            newDocDB(doc, res)
                                        }
                                    }
                                })
                            }
                        } else {
                            res = message.guild
                            doc = "guild"
                            newDocDB(doc, res)
                        }
                    })
                } else {
                    res = message.author
                    doc = "user"
                    newDocDB(doc, res)
                }
            })
        }

        if (!mentionCol.has(message.author.id)) {
            database.Users.findOne({
                '_id': message.author.id
            }, function(erro, usuario) {
                if (usuario) {
                    if (usuario.ban) {} else {
                        database.Guilds.findOne({
                            '_id': message.guild.id
                        }, function(servro, servidor) {
                            if (servidor) {
                                if (message.content.includes(`<@!${id}>`) || message.content.includes(`<@${id}>`)) {
                                    const setFixedT = function(translate) {
                                        t = translate
                                    }

                                    const language = (servidor && servidor.lang) || 'pt-BR'
                                    try {
                                        setFixedT(i18next.getFixedT(language))
                                        message.channel.sendMessage(t('comandos:events.mentionBot', { member: message.author, prefix: servidor.prefix })).then(value => {
                                            setTimeout(() => {
                                                value.delete()
                                            }, 5000)
                                        })
                                    } catch (e) {
                                        console.error(e)
                                    }
                                    mentionCol.add(message.author.id)
                                    setTimeout(function() {
                                        mentionCol.delete(message.author.id)
                                    }, 15 * 1000)
                                }
                            } else {}
                        })
                    }
                } else {}
            })
        }

        if (!boxCol.has(message.author.id)) {
            database.Users.findOne({
                '_id': message.author.id
            }, function(erro, usuario) {
                if (usuario) {
                    if (usuario.ban) {} else {
                        database.Guilds.findOne({
                            '_id': message.guild.id
                        }, function(servro, servidor) {
                            if (servidor) {
                                if (servidor.box) {
                                    if (!servidor.caixa) {
                                        var random
                                        var caixaTP
                                        var caixas = ['comum', 'rara', 'epica', 'lendaria']
                                        var numeros = [100, 4555, 3450, 1365, 153, 1089]
                                        var random2 = Math.round(Math.random() * caixas.length)
                                        random = Math.round(Math.random() * 6000)

                                        if (numeros.includes(random)) {
                                            caixaTP = caixas[caixas.length === 1 ? 0 : random2 === 0 ? random2 + 1 : random2 - 1]
                                            servidor.caixa = true
                                            servidor.caixatipo = caixaTP
                                            servidor.save()
                                            message.channel.sendMessage(`**:gift: Uma caixa ${caixaTP} foi dropada, Use \`${servidor.prefix}getbox\`**`)
                                        } else {}
                                    } else {}
                                } else {
                                    boxCol.add(message.author.id)
                                    setTimeout(function() {
                                        boxCol.delete(message.author.id)
                                    }, 15 * 1000)
                                }
                            } else {}
                        })
                    }
                } else {}
            })
        }

        if (!xpCol.has(message.author.id)) {
            database.Guilds.findOne({
                '_id': message.guild.id
            }, function(serverro, servidor) {
                if (servidor) {
                    if (servidor.leveis) {
                        database.Users.findOne({
                            '_id': message.author.id
                        }, function(erro, usuario) {
                            if (usuario) {
                                if (usuario.ban) {} else {
                                    var unbug = 910 * usuario.level + 1
                                    var xpRDM = usuario.owner || usuario.subowner || usuario.sup || usuario.vip || usuario.dev ? Math.round(Math.random() * 30) : Math.round(Math.random() * 15)
                                    if (usuario.xp > unbug) {
                                        usuario.xp += xpRDM - unbug
                                        usuario.coins += coinsRDM
                                        usuario.level += 1
                                        const setFixedT = function(translate) {
                                            t = translate
                                        }

                                        const language = (servidor && servidor.lang) || 'pt-BR'
                                        try {
                                            setFixedT(i18next.getFixedT(language))
                                            message.channel.sendMessage(t('comandos:events.levelUp', { member: message.author, level: usuario.level }))
                                        } catch (e) {
                                            console.error(e)
                                        }
                                        usuario.save()
                                        xpCol.add(message.author.id)
                                        setTimeout(function() {
                                            xpCol.delete(message.author.id)
                                        }, 30 * 1000)
                                    } else {
                                        usuario.xp += xpRDM
                                        usuario.coins += coinsRDM
                                        usuario.save()
                                        xpCol.add(message.author.id)
                                        setTimeout(function() {
                                            xpCol.delete(message.author.id)
                                        }, 30 * 1000)
                                    }
                                }
                            } else {}
                        })
                    } else {}
                } else {}
            })
        }

        database.Guilds.findOne({
            '_id': message.guild.id
        }, function(serverro, servidor) {
            if (servidor) {
                if (servidor.invites || servidor.links) {
                    database.Users.findOne({
                        '_id': message.author.id
                    }, function(erro, usuario) {
                        if (usuario) {
                            if (usuario.owner || usuario.subowner || usuario.dev || usuario.sup || message.member.hasPermission(['MANAGE_MESSAGES'])) {} else {
                                let mensagem = message.content.split(' ')
                                const setFixedT = function(translate) {
                                    t = translate
                                }

                                const language = (servidor && servidor.lang) || 'pt-BR'
                                try {
                                    setFixedT(i18next.getFixedT(language))
                                    if (servidor.links) {
                                        if (message.content.toLowerCase().includes('http://') || message.content.toLowerCase().includes('https://')) {
                                            message.delete()
                                            message.reply('**Proibido o envio de links aqui. :sparkles:**').then((value) => {
                                                setTimeout(() => {
                                                    value.delete()
                                                }, 10000)
                                            })
                                        }
                                    }
                                    if (servidor.invites) {
                                        if (message.content.toLowerCase().includes('discord.gg/') || message.content.toLowerCase().includes('discordapp.com/invite') || message.content.toLowerCase().includes('discord.me/')) {
                                            message.delete()
                                            message.reply('**Proibido o envio de convites aqui. :sparkles:**').then((value) => {
                                                setTimeout(() => {
                                                    value.delete()
                                                }, 10000)
                                            })
                                        }
                                    }
                                    if (servidor.words.length > 0) {
                                        var filter = false
                                        mensagem.filter(a => servidor.words.includes(a.toLowerCase())).forEach(argumento => {
                                            argsFound(argumento)
                                        })
                                        async function argsFound(argumento) {
                                            if (!filter) {
                                                filter = true
                                                message.delete()
                                                message.channel.send(t('comandos:events.argsFound', { member: message.author }));
                                            }
                                        }
                                    }
                                } catch (e) {
                                    console.error(e)
                                }
                            }
                        } else {}
                    })
                } else {}
            } else {}
        })

        if (!vipCol.has(message.author.id)) {
            vipCol.add(message.author.id)
            setTimeout(function() {
                vipCol.delete(message.author.id)
            }, 20 * 1000)
            database.Users.findOne({
                '_id': message.author.id
            }, function(erro, usuario) {
                if (usuario) {
                    database.Guilds.findOne({
                        '_id': message.guild.id
                    }, function(servro, servidor) {
                        if (servidor) {
                            const setFixedT = function(translate) {
                                t = translate
                            }

                            const language = (servidor && servidor.lang) || 'pt-BR'
                            try {
                                setFixedT(i18next.getFixedT(language))
                                if (usuario.vip) {
                                    dbl.hasVoted(message.author.id).then(voted => {
                                        if (voted) {} else {
                                            usuario.vip = false
                                            // noinspection JSAnnotator
                                            usuario.timevip = '0000000000000'
                                            usuario.save()
                                            message.reply(t('comandos:events.vipFinish', { prefix: servidor.prefix }))
                                        }
                                    })
                                    if ((parseInt(usuario.timevip) + 43200000) <= (Date.now())) {
                                        usuario.vip = false
                                        // noinspection JSAnnotator
                                        usuario.timevip = '0000000000000'
                                        usuario.save()
                                        message.reply(t('comandos:events.vipFinish', { prefix: servidor.prefix }))
                                    } else {}
                                    if (client.guilds.get('451178258982240287')) {
                                        if (client.guilds.get('451178258982240287').members.get(message.author.id)) {
                                            if (client.guilds.get('451178258982240287').members.get(message.author.id).roles.get('460258535838842890')) {} else {
                                                client.guilds.get('451178258982240287').members.get(message.author.id).addRole('460258535838842890')
                                            }
                                        } else {}
                                    } else {}
                                } else {
                                    dbl.hasVoted(message.author.id).then(voted => {
                                        if (voted) {
                                            usuario.vip = true
                                            usuario.timevip = Date.now()
                                            usuario.save()
                                            message.reply(t('comandos:events.vipWon'))
                                            if (client.guilds.get('451178258982240287')) {
                                                if (client.guilds.get('451178258982240287').members.get(message.author.id)) {
                                                    if (client.guilds.get('451178258982240287').members.get(message.author.id).roles.get('460258535838842890')) {
                                                        client.guilds.get('451178258982240287').members.get(message.author.id).removeRole('460258535838842890')
                                                    } else {}
                                                } else {}
                                            } else {}
                                        } else {}
                                    })
                                    if (client.guilds.get('451178258982240287')) {
                                        if (client.guilds.get('451178258982240287').members.get(message.author.id)) {
                                            if (client.guilds.get('451178258982240287').members.get(message.author.id).roles.get('460258535838842890')) {
                                                client.guilds.get('451178258982240287').members.get(message.author.id).removeRole('460258535838842890')
                                            } else {}
                                        } else {}
                                    } else {}
                                }
                            } catch (e) {
                                console.error(e)
                            }
                        } else {}
                    })
                } else {}
            })
        }
    } else if (message.guild.id === "451178258982240287" && message.channel.id === "466698066599346176" && message.author.id !== "451155262431035393") {
        let mensagem = message.content.split(' ')
        message.delete()
        if (mensagem.length >= 4) {
            var cargo = mensagem[0] === "Desenvolvedor" ? "473976241150623746" : mensagem[0] === "Supervisor" ? "476511450324533260" : mensagem[0] === "Designer" ? "451205385764864011" : "null"
            if (message.guild.members.get(mensagem[1])) {
                if (!message.guild.members.get(mensagem[1]).roles.get(cargo)) {
                    var usuario = message.guild.members.get(mensagem[1])
                    var embed = new Discord.RichEmbed()
                        .setTitle(`:page_facing_up: Formulário para ${mensagem[0]}:`)
                        .setThumbnail(usuario.user.displayAvatarURL)
                        .setColor(11676858)
                        .setTimestamp(new Date())
                        .setFooter(usuario.user.username, usuario.user.displayAvatarURL)
                        .addField(`:bust_in_silhouette: Por:`, `<@${usuario.user.id}>`, true)
                        .addField(`:e_mail: Email:`, mensagem[2], true)
                        .addField(`:loudspeaker: Motivo:`, message.content.split(' ').slice(3).join(" "), false)
                    message.channel.send(`@everyone :arrow_down: :arrow_down: @everyone`, embed);
                }
            }
        }
    }

}