import fs from 'fs';
import { TownGameModel, TownGameEntry, TownGameRecurring, RecurRate, Recurring } from '../Modules/TownGame/index';
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

export const Modules = [
  {
    name: 'townGame',
    model: TownGameModel,
    entry: TownGameEntry,
    recurring: Recurring,
  }
];

export const Names = {
  100000389598383: 'Ava',
  1776197526: 'Mike',
  1526902204: 'James',
  100000181989360: 'Jarry',
  100009414471151: 'Karry',
  1543897746: 'Tom',
  100000074543949: 'Specky',
  100000060670940: 'Sol',
  100000657393681: 'Gabby',
  100000378331034: 'James Beck',
  100008170809466: 'Rims',
  100000025701959: 'YatesDawg2P',
  100000207870213: 'Matt',
  530161655: 'Drew',
}

export function SendMessage(message) {
  console.log(message);
}

function setup(){
  const Obj = load();
  const People = {}
  Object.keys(Names).forEach((key) => {
    People[key] = {
      name: Names[key],
    };
    Modules.forEach((module) => {
      People[key][module.name] = new module.model((Obj && Obj[key]));
    });
  });
  return People;
}

function load(){
  if(checkExists('data.json')) return null;
  const data = fs.readFileSync('data.json', 'utf8');
  return (data ? JSON.parse(data) : null);
}

function checkExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}

export const People = setup();
