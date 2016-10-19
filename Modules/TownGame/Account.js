import { People } from '../../Helpers/Helpers';
import { inspectRegex } from '../../Helpers/Regex';

export default function Account(command, sender, response){
  if(inspectRegex.test(command)) {
    Inspect(command, sender, response);
    return;
  }
  switch (command) {
    case '!coins':
      response(`${sender.name} has ${sender.townGame.coins} Coins!`);
      break;
    case '!profile':
      response(
        `[${sender.name}]\nCoins: ${sender.townGame.coins}\nIncome: ${sender.townGame.getIncome()} per minute`);
      break;
  }
}

function Inspect(command, sender, response) {
  const subjectName = command.split(' ')[1];
  let subject;
  Object.keys(People).forEach((key) => {
    if(People[key].name === subjectName) subject = People[key];
  });
  if(!subject){
    response('Person not found.');
    return;
  }
  response(
    `[${subject.name}]\nCoins: ${subject.townGame.coins}\nIncome: ${subject.townGame.getIncome()} per minute`);
}
