const Discord = require('discord.js');
const client = new Discord.Client();

var OwnerId = "192499916088672256"
var PublicChannel = null
var AnnouncementChannel = null
var LogChannel = null
var TalkChannel = null
var Prefix = "//"

var Hi_Cooldown = 10
var Hi_Available = true
var Raig_Cooldown = 30
var Raig_Available = true
var Ping_Cooldown = 60
var Ping_Available = true
var Pings = 0
var EightBall_Cooldown = 15
var EightBall_Available = true
var EightBall_Used = 0

function DMOwner(message) {
    client.channels.get('242844053731803136').sendMessage(message)
}

function ResponseHi(message) {
    var MessageToReply = ""
    var choice = Math.ceil(Math.random()*3)
    if (choice === 1) {
        MessageToReply = "Hi there, <@" + message.author.id + ">"
    }
    else if (choice === 2) {
        MessageToReply = "Aye , <@" + message.author.id + ">"
    }
    else if (choice === 3) {
        MessageToReply = "Hello , <@" + message.author.id + ">"
    }
    return MessageToReply
}

function RollDice() {
    var MessageToReply = ""
    var choice = Math.ceil(Math.random()*6)
    if (choice === 1) {
        MessageToReply = ":one:"
    }
    else if (choice === 2) {
        MessageToReply = ":two:"
    }
    else if (choice === 3) {
        MessageToReply = ":three:"
    }
    else if (choice === 4) {
        MessageToReply = ":four:"
    }
    else if (choice === 5) {
        MessageToReply = ":five:"
    }
    else if (choice === 6) {
        MessageToReply = ":six:"
    }
    return MessageToReply
}

function SlotMachine(message) {
    var Choice = [':gem:' , ':poop:' , ':pill:' , ':skull:' , ':hotdog:' , ':six:']
    var author = message.author
    var Slot1 = Choice[Math.floor(Math.random()*6)]
    var Slot2 = Choice[Math.floor(Math.random()*6)]
    var Slot3 = Choice[Math.floor(Math.random()*6)]
    message.channel.sendMessage(author +
                                '\n:arrow_right: :question: :question: :question: :arrow_left:' +
                                '\n:hourglass: *Spinning...*')
    .then(message => setTimeout(function(){
        message.edit(author +
                    '\n:arrow_right: ' + Slot1 + ' :question: :question: :arrow_left:' +
                    '\n:hourglass: *Spinning...*')
        .then(message => setTimeout(function(){
            message.edit(author +
                        '\n:arrow_right: ' + Slot1 + Slot2 + ' :question: :arrow_left:' +
                        '\n:hourglass: *Spinning...*')
            .then(message => setTimeout(function(){
                message.edit(author +
                            '\n:arrow_right: ' + Slot1 + Slot2 + Slot3 + ' :arrow_left:');
            }, 125))
            .catch(console.error);
        }, 125))
        .catch(console.error);
    }, 1500))
    .catch(console.error);
}

function EightBall(message) {
    var Choice = [
        "It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes, definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes",
        "Reply hazy try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful"
    ]
    var author = message.author
    if (EightBall_Used !== 2) {
        EightBall_Used = EightBall_Used + 1
        setTimeout(function(){ EightBall_Used = EightBall_Used - 1 }, 15000)
        message.channel.sendMessage(author + " **Question:**" + message.content.slice(5+Prefix.length) + "\n:8ball: **8 Ball's Answer**\n          *" + Choice[Math.floor(Math.random()*20)] + "*")
    }
    else {
        message.channel.sendMessage(":x: **Please try again in 15 seconds.**")
        EightBall_Available = false
        setTimeout(function(){ EightBall_Available = true }, EightBall_Cooldown*1000)
    } 
}

function Ping(message) {
    var MessageToReply = ""
    var choice = Math.ceil(Math.random()*5)
    var easteregg_chance = 20
    var easteregg_choice = Math.ceil(Math.random()*3)
    console.log(Pings)
    if (Pings !== 10) {
        Pings = Pings + 1
        setTimeout(function(){ Pings = Pings - 1 }, 30000)
        if (easteregg_chance > Math.random()*100) {
            if (message.channel !== PublicChannel) {
                if (easteregg_choice === 1) {
                    MessageToReply = "**PONG AF**"
                }
                else if (easteregg_choice === 2) {
                    MessageToReply = "**Porn...**"
                }
                else if (easteregg_choice === 3) {
                    MessageToReply = "**PING PONG**\n" +
                                    '**DING DONG**\n' +
                                    'https://t2.rbxcdn.com/486d351f809891f46a42428af3dad3e5'
                }
            }
        }
        else {
            if (choice === 1) {
                MessageToReply = "**Pang!**"
            }
            else if (choice === 2) {
                MessageToReply = "**Ping!**"
            }
            else if (choice === 3) {
                MessageToReply = "**Pung!**"
            }
            else if (choice === 4) {
                MessageToReply = "**Peng!**"
            }
            else if (choice === 5) {
                MessageToReply = "**Pong!**"
            }
        }
    }
    else {
        MessageToReply = ":x: **I don't want to say it anymore. Try again later.**"
        Ping_Available = false
        setTimeout(function(){ Ping_Available = true }, Ping_Cooldown*1000)
    }
    return MessageToReply
}

function DetectInappWord(message) {
    LCMsg = message.content.toLowerCase()
    var ContainInappWords = false
    if (LCMsg.match("fuck")) {
        ContainInappWords = true
    }
    else if (LCMsg.match("shit")) {
        ContainInappWords = true
    }
    else if (LCMsg.match("bitch")) {
        ContainInappWords = true
    }
    else if (LCMsg.match("penis")) {
        ContainInappWords = true
    }
    else if (LCMsg.match("dick")) {
        ContainInappWords = true
    }
    else if (LCMsg.match("cock")) {
        ContainInappWords = true
    }
    else if (LCMsg.match("bastard")) {
        ContainInappWords = true
    }
    else if (LCMsg.match("ass ")) {
        ContainInappWords = true
    }
    else if (LCMsg.match("asshole")) {
        ContainInappWords = true
    }
    else if (LCMsg.match(":regional_indicator_f::regional_indicator_u::regional_indicator_c::regional_indicator_k:")) {
        ContainInappWords = true
    }
    else if (LCMsg.match(":regional_indicator_f: :regional_indicator_u: :regional_indicator_c: :regional_indicator_k:")) {
        ContainInappWords = true
    }
    return ContainInappWords
}

function CheckPermission(message) {
    var HasPermission = false
    var Role = message.member.roles.array().find(function(content){return content.name === "Bot Commander"})
    if (Role !== undefined) {
        if (Role.name === "Bot Commander") {
            HasPermission = true
        }
    }
    return HasPermission
}

function SomeonesayingSuperEvilAzmil(message) {
    message.channel.sendMessage("<@" + message.author.id + "> If you want to talk to him, you have to **@mention** him.\n" +
                                "**Example:** <@" + OwnerId + ">")
}

client.on('guildMemberAdd', member => {
    if (LogChannel !== null) {
        LogChannel.sendMessage(':information_source: <@' + member.user.id + '> **has joined ' + member.guild.defaultChannel.guild.name + ' **');
    }
});

client.on('guildMemberRemove', member => {
    if (LogChannel !== null) {
        LogChannel.sendMessage(':warning: <@' + member.user.id + '> **has left ' + member.guild.defaultChannel.guild.name + ' **');
    }
});
 
client.on('ready', () => {
    DMOwner(':white_check_mark: **Electro-Atom Bot on duty!**')
    console.log('Electro-Atom Bot on duty');
});
 
client.on('message', message => {
    if (message.author.bot) return;

    if (message.channel.type === "dm") {
        console.log(message.author.username + ":     " + message)
        //console.log(message.channel)
    }

    if (message.content === Prefix + 'cmds') {
        message.channel.sendMessage("", {embed: {
        color: 3447003,
        author: {
            name: 'Commands List',
            icon_url: client.user.avatarURL
        },
        description: 'The **prefix** of this commands is **' + Prefix + '**',
        fields: [
            {
            name: 'List of commands available so far',
            value: '- dice\n' +
                    '- slotmachine\n' +
                    '- myid\n' +
                    '- 8ball\n'
            },
            {
            name: 'Help',
            value: '- **dice:**     Roll the dice\n' +
                    '- **slotmachine:**     Use slow machine\n' +
                    '- **myid:**     Show your Discord ID\n' +
                    '- **8ball:**     Ask a question to 8 Ball\n'
            }
        ]
        }});
        //message.reply('I have sent you a commands. Look at your DM');
        //message.author.sendMessage(
        //    ':information_source: **List of Commands so far:**\n' +
        //    '          `' + Prefix + 'dice` - Roll the dice\n' +
        //    '          `' + Prefix + 'slotmachine` - Use slot machine\n' +
        //    '          `hello / hi / hey` - I will respond with **Hi** message\n' +
        //    '          `' + Prefix + 'myid` - Show your Discord ID\n' +
        //    '          `' + Prefix + '8ball` - Ask a question to 8 Ball\n' +
        //    '     **Bot Commander only**\n' +
        //    '          `' + Prefix + 'announce` - Make announcement to the channel that has been set');
    }
    if (message.content.toLowerCase().match('raig')) {                                        //Show Raig Face
        if (Raig_Available === false) return;
        Raig_Available = false
        message.channel.sendMessage('https://t2.rbxcdn.com/486d351f809891f46a42428af3dad3e5');
        setTimeout(function(){ Raig_Available = true }, Raig_Cooldown*1000);
    }


    else if (message.content.toLowerCase() === 'super') {                                        //When anyone calling "Super"
        if (message.channel === PublicChannel) {
            SomeonesayingSuperEvilAzmil(message)
        }
    }
    else if (message.content.toLowerCase() === 'superevil') {
        if (message.channel === PublicChannel) {
            SomeonesayingSuperEvilAzmil(message)
        }
    }
    else if (message.content.toLowerCase() === 'superevilazmil') {
        if (message.channel === PublicChannel) {
            SomeonesayingSuperEvilAzmil(message)
        }
    }

    if (message.content === Prefix + 'dice') {                                        //Roll the Dice
        var author = message.author
        message.channel.sendMessage(':hourglass: *Rolling dice...*')
        .then(message => setTimeout(function(){
            message.edit(':game_die: **<@' + author.id + '>\'s Dice:** ' + RollDice());
        }, 1500))
        .catch(console.error);
    }

    else if (message.content === Prefix + 'slotmachine') {                                        //Slot Machine
        SlotMachine(message)
    }

    else if (message.content.slice(0,5+Prefix.length) === Prefix + '8ball' ) {                                        //8 Ball
        if (EightBall_Available === true) {
            EightBall(message)
        }
    }

    else if (message.content.toLowerCase() === 'hello' ) {                                        //Hi Response
        if (Hi_Available === false) return;
        Hi_Available = false
        setTimeout(function(){ message.channel.sendMessage(ResponseHi(message)); }, 500 + (Math.random()*2000));
        setTimeout(function(){ Hi_Available = true }, Hi_Cooldown*1000);
    }
    else if (message.content.toLowerCase() === 'hi' ) {
        if (Hi_Available === false) return;
        Hi_Available = false
        setTimeout(function(){ message.channel.sendMessage(ResponseHi(message)); }, 500 + (Math.random()*2000));
        setTimeout(function(){ Hi_Available = true }, Hi_Cooldown*1000);
    }
    else if (message.content.toLowerCase() === 'hey' ) {
        if (Hi_Available === false) return;
        Hi_Available = false
        setTimeout(function(){ message.channel.sendMessage(ResponseHi(message)); }, 500 + (Math.random()*2000));
        setTimeout(function(){ Hi_Available = true }, Hi_Cooldown*1000);
    }

    else if (message.content.toLowerCase() === Prefix + 'ping' ) {                                        //Ping
        if (Ping_Available === true) {
            message.channel.sendMessage(Ping(message));
        }
    }

    else if (message.content === Prefix + 'myid' ) {                                        //Show User ID
        message.channel.sendMessage(':information_source: **Your ID:** ```' + message.author.id + "```");
    }

    else if (message.content === Prefix + 'channelid' ) {                                        //Show Channel ID
        if (message.author.id === OwnerId) {
            message.channel.sendMessage(':information_source: **This Channel ID:** ```' + message.channel.id + "```");
            console.log(message.channel)
        }
        else {
            message.channel.sendMessage(':no_entry: **You are not my real boss**')
        }
    }

    else if (message.content === Prefix + 'setpublic' ) {                                        //Set Public Channel
        if (message.author.id === OwnerId) {
            PublicChannel = message.channel
            message.channel.sendMessage(':white_check_mark: **Public Channel Set!**\n          ' + message.channel);
        }
        else {
            message.channel.sendMessage(':no_entry: **You are not my real boss**')
        }
    }

    else if (message.content === Prefix + 'setannouncement' ) {                                        //Set Announcement Channel
        if (message.author.id === OwnerId) {
            AnnouncementChannel = message.channel
            message.channel.sendMessage(':white_check_mark: **Announcement Channel Set!**\n          ' + message.channel);
        }
        else {
            message.channel.sendMessage(':no_entry: **You are not my real boss**')
        }
    }

    else if (message.content === Prefix + 'setlog' ) {                                        //Set Log Channel
        if (message.author.id === OwnerId) {
            LogChannel = message.channel
            message.channel.sendMessage(':white_check_mark: **Log Channel Set!**\n          ' + message.channel);
        }
        else {
            message.channel.sendMessage(':no_entry: **You are not my real boss**')
        }
    }

    else if (message.content.slice(0,7+Prefix.length) === Prefix + 'settalk' ) {                                        //Set Talk Channel
        if (message.author.id === OwnerId) {
            if (message.channel.type === 'dm') {
                TalkChannel = client.channels.get(message.content.slice(8+Prefix.length))
                message.channel.sendMessage(':white_check_mark: **Talk Channel Set!**\n          ' + TalkChannel)
            }
            else {
                TalkChannel = message.channel
                message.delete()
                message.channel.sendMessage(':white_check_mark: **Talk Channel Set!**\n          ' + message.channel)
                .then(message => message.delete(2000))
                .catch(console.error);
            }
        }
        else {
            message.channel.sendMessage(':no_entry: **You are not my real boss**')
        }
    }

    else if (message.content.slice(0,9+Prefix.length) === Prefix + 'announce ' ) {                                        //Announce
        if (message.channel.type === "text") {
            if (CheckPermission(message)) {
                if (AnnouncementChannel !== null) {
                    message.channel.sendMessage(':white_check_mark: **Announced!**');
                    AnnouncementChannel.sendMessage('@everyone :EAELogo: **Announcement from <@' + message.author.id + '>:**\n\n' + 
                                                    message.content.slice(9 + Prefix.length));
                }
                else {
                    message.channel.sendMessage(':x: **There is no Announcement Channel that have been set**')
                }
            }
            else {
                message.channel.sendMessage(':no_entry: **You are not** `Bot Commander`')
            }
        }
        else {
            message.channel.sendMessage(':x: **You cannot use this command on DM Channel**')
        }
    }

    else if (message.content.toLowerCase() === Prefix + 'data' ) {                                        //Show Bot Data
        if (message.author.id === OwnerId) {
            let PC = "`Not set`"
            let AC = "`Not set`"
            let LC = "`Not set`"
            let TC = "`Not set`"
            if (PublicChannel !== null) { PC = PublicChannel }
            if (AnnouncementChannel !== null) { AC = AnnouncementChannel }
            if (LogChannel !== null) { LC = LogChannel }
            if (TalkChannel !== null) { TC = TalkChannel }
            message.channel.sendMessage(':information_source: **Bot Data**\n          ' + 
                'Public Channel: ' + PC + '\n          ' +
                'Announcement Channel: ' + AC + '\n          ' +
                'Log Channel: ' + LC + '\n          ' +
                'Talk Channel: ' + TC);
        }
        else {
            message.channel.sendMessage(':no_entry: **You are not my real boss**')
        }
    }

     else if (message.content.slice(0,5+Prefix.length) === Prefix + 'play ' ) {                                        //Set Game
        if (message.author.id === OwnerId) {
            client.user.setGame(message.content.slice(5 + Prefix.length))
        }
        else {
            message.channel.sendMessage(':no_entry: **You are not my real boss**')
        }
    }

     else if (message.content.slice(0,4+Prefix.length) === Prefix + 'say ' ) {                                        //Say
        if (message.author.id === OwnerId) {
            if (TalkChannel !== null) {
                TalkChannel.sendMessage(message.content.slice(4 + Prefix.length))
            }
            else {
                message.channel.sendMessage(':x: **There is no Talk Channel that have been set**')
            }
        }
        else {
            message.channel.sendMessage(':no_entry: **You are not my real boss**')
        }
    }

    else if (message.content.toLowerCase() === Prefix + 'shutdown' ) {                                        //Shutdown the Bot
        if (message.author.id === OwnerId) {
            message.channel.sendMessage(':warning: *Shutting down...*');
            client.destroy();
        }
        else {
            message.channel.sendMessage(':no_entry: **You are not my real boss**')
        }
    }

    else if (message.content.match('who')) {                                        //Easter-Egg: YOUR MOM XD
        if (7.5 > Math.random()*100) {
            message.channel.sendMessage('**YOUR MOM XD**')
        }
    }

    else if (message.content.match("ʖ")) {                                        //Lenny Face eliminator
        message.delete()
        message.channel.sendMessage("<@" + message.author.id + "> \n" +
                                    "**LENNY FACE ELIMINATED**")
        .then(message => message.delete(10000))
        .catch(console.error);
    }

//    else if (message.content.toLowerCase().match("fath")) {                                        //Fatherball eliminator
//        message.delete()
//        message.channel.sendMessage("<@" + message.author.id + "> \n" +
//                                    "**THIS JOKE SHOULD ALREADY OVER, YOU IDIOT**")
//        DMOwner(":warning: **Suspicious Message Detected!** \n" +
//                "          **User:** <@" + message.author.id + "> \n" +
//                "          **Channel:** " + message.channel + " \n" +
//                "          **Message:** " + message.content)
//    }
//    else if (message.content.toLowerCase().match("f@th")) {                                        //Fatherball eliminator
//        message.delete()
//        message.channel.sendMessage("<@" + message.author.id + "> \n" +
//                                    "**THIS JOKE SHOULD ALREADY OVER, YOU IDIOT**")
//        DMOwner(":warning: **Suspicious Message Detected!** \n" +
//                "          **User:** <@" + message.author.id + "> \n" +
//                "          **Channel:** " + message.channel + " \n" +
//                "          **Message:** " + message.content)
//    }
//    else if (message.content.toLowerCase().match("f4th")) {                                        //Fatherball eliminator
//        message.delete()
//        message.channel.sendMessage("<@" + message.author.id + "> \n" +
//                                    "**THIS JOKE SHOULD ALREADY OVER, YOU IDIOT**")
//        DMOwner(":warning: **Suspicious Message Detected!** \n" +
//                "          **User:** <@" + message.author.id + "> \n" +
//                "          **Channel:** " + message.channel + " \n" +
//                "          **Message:** " + message.content)
//    }

//    else if (message.attachments.find('filename','image.png')) {                                        //Fatherball eliminator
//        message.delete()
//        DMOwner(":warning: **I have deleted a image** \n" +
//                "          **User:** <@" + message.author.id + "> \n" +
//                "          **Channel:** " + message.channel + " \n" +
//                "          **Image:** " + message.attachments.find('filename','image.png').url)
//    }

//    else if (message.content.match("http://prnt.sc")) {                                        //Lenny Face eliminator
//        message.delete()
//    }

    if (DetectInappWord(message) === true) {                                        //Inappropriate world detection
        if (message.channel === PublicChannel) {
            if (message.deletable === true) {
                message.delete();
                message.channel.sendMessage(':warning: **Inappropriate word detected! ' + message.author.username + '\'s message has been deleted.**');
                if (LogChannel !== null) {
                LogChannel.sendMessage(':warning: **<@' + message.author.id + '> is swearing in ' + message.channel + '!**:\n\n' +
                                            '          \"' + message.content + '\"');
                }
            }
        }
    }
});

client.login('MjA1Njk5MjQ4NzIzOTg0Mzg1.CvjF5Q.tR74FifvPgStHVSIiU2SVO8y4r8');
