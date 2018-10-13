var discord = require('discord.js')
var numero = 0;
var ytdl = require('ytdl-core');
var info = require('youtube-info');
var api = require("simple-youtube-api");
var config;
var arquivo = require('../queue.js');
var musica2;
var key = new api('AIzaSyBuUq1V-pQDS-tL3HX6F4omxZNXQIVbnDw')

exports.run = (client,message,args)=>{

  var conteudo = args.slice(0).join(" ");
  const voiceChannel = message.member.voiceChannel;

if(!voiceChannel)return message.reply("Entre em um canal de voz")
if(!conteudo.length)return message.reply("Coloque alguma coisa para eu pesquisar, querido Pow")
    key.searchVideos(conteudo,10).then(function(sucesso){
        var embed = new discord.RichEmbed()
        .setTitle("resultados para **" + conteudo + "**")
        .setDescription(`${sucesso.map(musica=>`**${++numero}** - ${musica.title}`).join("\n")} \n\nDigite um número para escolher a musica`)
        .setThumbnail(message.author.avatarURL)
        .setColor("#33CCFF");
        message.channel.send(embed)
		numero = 0
        message.channel.awaitMessages(message1=> message1.content > 0 && message1.content <= 10,{
        maxMatches:1,
        time: 10000 ,
        errors: ['time']
        }).then(function(musica){
            voiceChannel.join().then(function(canal){
                if(arquivo.queue.get(message.guild.id) == null){
                        config = {
                            guild: message.guild.id,
                            channel: canal,
                            canal: message.channel.id,
                            som: {
                                titulo: [],
                                id: []
                            },
                            connection: null
                        }
                        arquivo.queue.set(message.guild.id,config)
                    }
				   if(arquivo.queue.get(message.guild.id).som.id[0]){
				   message.channel.send("Música adicionada a queue")
				   arquivo.queue.get(message.guild.id).som.id.push(sucesso[Number(musica.first().content) - 1].id)
				   arquivo.queue.get(message.guild.id).som.titulo.push(sucesso[Number(musica.first().content) - 1].title)
				   return
				   }
				   arquivo.queue.get(message.guild.id).som.id.push(sucesso[Number(musica.first().content) - 1].id)
				   arquivo.queue.get(message.guild.id).som.titulo.push(sucesso[Number(musica.first().content) - 1].title)
				   
				  async function play (musica){
                    musica2 = await arquivo.queue.get(message.guild.id).channel.playStream(ytdl(musica,{ filter: 'audioonly' }), {volume: 0.5, passes: 3})
                    arquivo.queue.get(message.guild.id).connection = musica2;
					 await arquivo.queue.get(message.guild.id).connection.on("end",function(reason){
                        if (reason == null){
                            play("https://www.youtube.com/watch?v="+arquivo.queue.get(message.guild.id).som.id[0])
                        }else{
                     arquivo.queue.get(message.guild.id).som.id.shift()
                     arquivo.queue.get(message.guild.id).som.titulo.shift()
						 if(arquivo.queue.get(message.guild.id).som.id[0]){
                            play("https://www.youtube.com/watch?v="+arquivo.queue.get(message.guild.id).som.id[0])
                            message.channel.send("Tocando a música " + arquivo.queue.get(message.guild.id).som.titulo[0])
						 }else{
                             var fim = new discord.RichEmbed()
                             .setDescription("Lista de música finalizada! Espero que tenha gostado de usar meus comandos de música. Se quiser dar um suporte para ajudar a melhorar minha qualidade, está ai meu Patreon para doações:\nhttps://www.patreon.com/ayumibot");
                            client.guilds.get(arquivo.queue.get(message.guild.id).guild).channels.get(arquivo.queue.get(message.guild.id).canal).send(fim);
                            arquivo.queue.get(message.guild.id).channel.disconnect()
                            arquivo.queue.delete(message.guild.id)
						 }
					 }})
				  }
			play("https://www.youtube.com/watch?v="+arquivo.queue.get(message.guild.id).som.id[0])
			
            info(sucesso[Number(musica.first().content) - 1].id,function(erro,musica1){
                var embed = new discord.RichEmbed()
               .setTitle("Uma Música está tocando em **" + voiceChannel.name + "**")
                .setThumbnail(musica1.thumbnailUrl)
                .addField("Nome da Música:",sucesso[Number(musica.first().content) - 1].title)
                .addField("Publicado por:",musica1.owner)
                .addField("views:",musica1.views)
                .addField("likes:",musica1.likeCount)
                .addField("Deslikes:",musica1.dislikeCount)
                .addField("Link:","https://www.youtube.com/watch?v="+sucesso[Number(musica.first().content) - 1].id)
                .setColor("#70DB93");

                message.channel.send(embed)

            })
            })
            },function(err){
                message.channel.send("Você não colocou nada em 10 segundos")
            })
        })
    }