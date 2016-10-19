import { commandRegex } from '../../Helpers/Regex';
import { People } from '../../Helpers/Helpers';
import Account from './Account';

const TownGameRecurRate = 60;
let TownGameTimer = 0;


export function TownGameEntry(message, sender, response) {
  if(commandRegex.test(message)) Command(message, sender, response);
}

function Command(command, sender, response){
  Account(command, sender, response);
}

export class TownGameModel {
  constructor(Obj) {
    if (Obj) {
      console.log(`Loaded Town Game Data for ${Obj.name}!`);
      this.coins =  Obj.townGame.coins;
      this.baseIncome = Obj.townGame.baseIncome;
      this.incomeMultiplier = Obj.townGame.incomeMultiplier;
      this.buildings = Obj.townGame.buildings;
      this.inventory = Obj.townGame.inventory;
    } else {
      console.log('Creating New Town Game Data for a new person!');
      this.coins = 0;
      this.baseIncome = 1;
      this.incomeMultiplier = 1;
      this.buildings = [];
      this.inventory = [];
    }
  }

  income() {
    let buildingBonus = 0;
    this.buildings.forEach((building) => {
      buildingBonus += builidng.income;
    });
    this.coins += ((this.baseIncome + buildingBonus) * this.incomeMultiplier);
  }

  getIncome() {
    let buildingBonus = 0;
    this.buildings.forEach((building) => {
      buildingBonus += builidng.income;
    });
    return ((this.baseIncome + buildingBonus) * this.incomeMultiplier);
  }
}

export function Recurring() {
  TownGameTimer++;
  if((TownGameTimer % TownGameRecurRate) === 0){
    TownGameTimer = 0;
    Object.keys(People).forEach((key) => {
      People[key].townGame.income();
    });
  }
}
