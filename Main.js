import { People, Modules } from './Helpers/Helpers';

import fs from 'fs';

import login from 'facebook-chat-api';

var counter = 0;

setInterval(function() {
  if(counter > 0) {
    counter--;
    console.log('Counter', counter);
  }
}, 2000);
// Create simple echo bot
login({email: "thedungeonmasterbot@gmail.com", password: "dungeon9"}, function callback (err, api) {
    if(err) return console.error(err);
    api.listen(function callback(err, message) {
        api.markAsRead(message.threadID);
        Main(message, function(response) {
            console.log("response: " + response);
            if(counter < 20) {
              counter++;
            }
            console.log('Counter', counter);
            if(counter < 15) {
              api.sendMessage(response, message.threadID);
            }
        }, api);
    });
});

function Main({senderID, body}, response) {
  const message = body;
  const sender = People[senderID];
  Modules.forEach((module) => {
    module.entry(message, sender, response);
  });
}

function Recurring() {
  Modules.forEach((module) => {
    if(module.recurring) module.recurring();
  });
}

function savePeople(){
  fs.writeFile('data.json', JSON.stringify(People), function (err) {
    if (err) return console.log(err);
    console.log('Saving!');
  });
}


setInterval(Recurring, 1000);
setInterval(savePeople, 60000);
