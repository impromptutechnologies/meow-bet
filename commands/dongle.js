module.exports = {
    name: "dongle",
    description: "<3 dongle",
    execute(client, message, args, Discord, profileData) {
    const images = ['https://scontent-xsp1-1.xx.fbcdn.net/v/t1.15752-9/153643033_3314495141987773_4595259661111776249_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=ae9488&_nc_ohc=Xi1Ea-GKFKsAX-xz-S0&_nc_oc=AQlFcdTzsGXdBjgQh2ExSLAd0zNooe8SsIqiyvpWr4bJjOEBaoHpE28B6UNBYGxgS5M&_nc_ht=scontent-xsp1-1.xx&oh=125df9d42339e0f32312d2d6fec40c10&oe=60AD67A4'
    , 'https://scontent-xsp1-2.xx.fbcdn.net/v/t1.15752-9/178107430_513818559992160_6930932452840482371_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=ae9488&_nc_ohc=iyYFCALmkI8AX98jN1x&_nc_ht=scontent-xsp1-2.xx&oh=8ce2d463c82ef46425e564862e7aeae4&oe=60ABA447', 
    'https://media.discordapp.net/attachments/836222231587454998/836242833043357736/image0.jpg?width=926&height=1235',
'https://scontent-xsp1-3.xx.fbcdn.net/v/t1.15752-9/178542681_853712155488960_5583771649056448449_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=ae9488&_nc_ohc=01r5KeZpV44AX9cXe_f&_nc_ht=scontent-xsp1-3.xx&oh=c4a8ecbe9dcac0fb2618fd5b1c291394&oe=60AE099A',
'https://scontent-xsp1-1.xx.fbcdn.net/v/t1.15752-9/154230630_274579447378557_4305582829739990342_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=ae9488&_nc_ohc=93-WUAM4zC0AX8FO8cj&_nc_ht=scontent-xsp1-1.xx&oh=4d0b0b9f0a62c1e73923244d9edf1fa1&oe=60AD015E', 
'https://scontent-xsp1-3.xx.fbcdn.net/v/t1.15752-9/154537308_442263967094579_3831447974542020152_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=ae9488&_nc_ohc=nIhbVzAlyXoAX9IajFR&_nc_ht=scontent-xsp1-3.xx&oh=b7ab53cecd3eee890ad0944bfa4e45eb&oe=60AA86FD',
'https://scontent-xsp1-1.xx.fbcdn.net/v/t1.15752-9/156333774_248457600190516_1643998621673872254_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=ae9488&_nc_ohc=jQqzCyNmOrsAX-abab6&_nc_ht=scontent-xsp1-1.xx&oh=5e331e7cd38400ab316f8ecbf1f76bf9&oe=60ACCCCE',
'https://scontent-xsp1-1.xx.fbcdn.net/v/t1.15752-9/146935459_249271936813438_2902648750709957551_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=ae9488&_nc_ohc=IUSUNRU7UrIAX-c5qd9&_nc_ht=scontent-xsp1-1.xx&oh=43092a9c2e9c809d5d7290855c4810f2&oe=60AD87FF',
'https://scontent-xsp1-1.xx.fbcdn.net/v/t1.15752-9/162135536_378494733484222_1513778545102790965_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=ae9488&_nc_ohc=ZKEq7AVeLwUAX_K6Vp0&_nc_ht=scontent-xsp1-1.xx&oh=3a1300d809888f67e881985845d8eeb5&oe=60AC5052',
'https://scontent-xsp1-2.xx.fbcdn.net/v/t1.15752-9/127112668_369234950811661_713935370858300774_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=ae9488&_nc_ohc=nhTmsr_w4GwAX83xAXu&_nc_ht=scontent-xsp1-2.xx&oh=48ed1a773c31e7d9e5a3bb6a90c6bb7b&oe=60AB0430',
'https://scontent-xsp1-3.xx.fbcdn.net/v/t1.15752-9/117703882_1387865518071365_1283223251524605146_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=ae9488&_nc_ohc=RTUPFBA8M38AX_e-40o&_nc_ht=scontent-xsp1-3.xx&oh=faa8e377f4684fcfb381c61e781a32e4&oe=60ACC327'
]
     
        min = Math.ceil(1);
        max = Math.floor(11);
        const chances = Math.floor(Math.random() * (max - min) + min);
      const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Dongle is here to help!`)
        .setDescription("Very cute little dog")
        .setImage(images[chances]);
      message.channel.send(newEmbed);
    },
  };
  