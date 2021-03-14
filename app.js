const fs = require('fs')
const Discord = require('discord.js')
const bot = new Discord.Client()
const dirFrames = './frames'

async function getFrame(frame) {
    return new Promise(callback => {
        fs.readFile(`${dirFrames}/BA (${frame}).txt`, 'utf8', function (err,dataFrame) {
            if (err) callback('error')
            callback(dataFrame)
        })
    })
}

bot.on('ready', () => {
    console.log("bot ready");
})

bot.on('message', async message => {
    if (!message.guild) return
    if (message.author.bot) return
    if (message.content.startsWith("badapple")) {
        fs.readdir(dirFrames, async (err, frames) => {
            message.channel.send(`**Bad Apple**\nFrame : 1/${frames.length}\n\`\`\`${await getFrame(0)}\`\`\``).then(async msg => {
                let frame = 1
                while (frame <= frames.length) {
                    const dataFrame = await getFrame(frame)
                    dataFrame != 'error' ? (
                        msg.edit(`**Bad Apple**\nFrame : ${frame}/${frames.length}\`\`\`\n${dataFrame}\`\`\``)
                        .catch(err => {
                            if (err) frame = frames.length
                        }),frame++
                    ) : (
                        frame = frames.length
                    )
                }
            })
        })
    }
})

bot.login('BOT TOKEN')