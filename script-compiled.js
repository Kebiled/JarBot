import { People, Modules } from './Helpers/Helpers';

import login from 'facebook-chat-api';

// var counter = 0;
//
// setInterval(function() {
//   if(counter > 0) {
//     counter--;
//     console.log('Counter', counter);
//   }
// }, 2000);
// // Create simple echo bot
// login({email: "thedungeonmasterbot@gmail.com", password: "dungeon9"}, function callback (err, api) {
//     if(err) return console.error(err);
//     main.register(api);
//     api.listen(function callback(err, message) {
//         api.markAsRead(message.threadID);
//         Main(message, function(response) {
//             console.log("response: " + response);
//             if(counter < 20) {
//               counter++;
//             }
//             console.log('Counter', counter);
//             if(counter < 15) {
//               api.sendMessage(response, message.threadID);
//             }
//         }, api);
//     });
// });

login({ email: "thedungeonmasterbot@gmail.com", password: "dungeon9" }, function callback(err, api) {
  if (err) return console.error(err);

  api.listen(function callback(err, message) {
    api.sendMessage(message.body, message.threadID);
  });
});

function Main({ senderID, body }, response) {
  const message = body;
  const sender = People[senderID];
  Modules.forEach(module => {
    module.entry(message, sender, response);
  });
}

//test cases
// Main(
//   { type: 'message',
//   senderID: '1526902204',
//   body: '!mine',
//   threadID: '1705796619693120',
//   messageID: 'mid.1476785178204:c260e05817',
//   attachments: [],
//   timestamp: '1476785178204',
//   isGroup: true }
// );
// Main(
//   { type: 'message',
//   senderID: '1526902204',
//   body: '!mine',
//   threadID: '1705796619693120',
//   messageID: 'mid.1476785178204:c260e05817',
//   attachments: [],
//   timestamp: '1476785178204',
//   isGroup: true }
// );
