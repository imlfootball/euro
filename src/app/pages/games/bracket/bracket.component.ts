import { Component } from '@angular/core';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrl: './bracket.component.scss'
})
export class BracketComponent {

  winnerR161: string = '-';
  winnerR162: string = '-';
  winnerR163: string = '-';
  winnerR164: string = '-';
  winnerR165: string = '-';
  winnerR166: string = '-';
  winnerR167: string = '-';
  winnerR168: string = '-';

  winnerR41: string = '-';
  winnerR42: string = '-';
  winnerR43: string = '-';
  winnerR44: string = '-';

  winnerSemi1: string = '-';
  winnerSemi2: string = '-';

  winnerEuro: string = '-';

  choiceR411!: string | null;
  choiceR412!: string | null;
  choiceR421!: string | null;
  choiceR422!: string | null;
  choiceR431!: string | null;
  choiceR432!: string | null;
  choiceR441!: string | null;
  choiceR442!: string | null;

  choiceS11!: string | null;
  choiceS12!: string | null;
  choiceS21!: string | null;
  choiceS22!: string | null;

  choiceFinal1!: string | null;
  choiceFinal2!: string | null;

  resultMode: boolean = false;

  selectedWinner(phase: string, selected: Event):void {
    let choice = selected.target as HTMLSelectElement;
    console.log(phase, choice.value);

      switch (phase) {
        case 'r16-1':
          (choice.value !== '-')? this.choiceR431 = choice.value : this.choiceR431 = null;
        break;
        case 'r16-2':
          (choice.value !== '-')? this.choiceR411 = choice.value : this.choiceR411 = null;
        break;
        case 'r16-3':
          (choice.value !== '-')? this.choiceR432 = choice.value : this.choiceR432 = null;
        break;
        case 'r16-4':
          (choice.value !== '-')? this.choiceR412 = choice.value : this.choiceR412 = null;
        break;
        case 'r16-5':
          (choice.value !== '-')? this.choiceR421 = choice.value : this.choiceR421 = null;
        break;
        case 'r16-6':
          (choice.value !== '-')? this.choiceR422 = choice.value : this.choiceR422 = null;
        break;
        case 'r16-7':
          (choice.value !== '-')? this.choiceR441 = choice.value : this.choiceR441 = null;
        break;
        case 'r16-8':
          (choice.value !== '-')? this.choiceR442 = choice.value : this.choiceR442 = null;
        break;

        case 'r4-4':
          (choice.value !== '-')? this.choiceS22 = choice.value : this.choiceS22 = null;
        break;
        case 'r4-3':
          (choice.value !== '-')? this.choiceS21 = choice.value : this.choiceS21 = null;
        break;
        case 'r4-2':
          (choice.value !== '-')? this.choiceS12 = choice.value : this.choiceS12 = null;
        break;
        case 'r4-1':
          (choice.value !== '-')? this.choiceS11 = choice.value : this.choiceS11 = null;
        break;

        case 's2':
          (choice.value !== '-')? this.choiceFinal2 = choice.value : this.choiceFinal2 = null;
        break;
        case 's1':
          (choice.value !== '-')? this.choiceFinal1 = choice.value : this.choiceFinal1 = null;
        break;

        default:
          break;
      }

  }

  validateBracket(): void {
    if(this.winnerEuro !=="_"){
      let bracketSelection = {
        "status": 'published',
        "user": 'useriml',
        "winner_r16_1" : this.winnerR161,
        "winner_r16_2" : this.winnerR162,
        "winner_r16_3" : this.winnerR163,
        "winner_r16_4" : this.winnerR164,
        "winner_r16_5" : this.winnerR165,
        "winner_r16_6" : this.winnerR166,
        "winner_r16_7" : this.winnerR167,
        "winner_r16_8" : this.winnerR168,
        "winner_r4_1": this.winnerR41,
        "winner_r4_2": this.winnerR42,
        "winner_r4_3": this.winnerR43,
        "winner_r4_4": this.winnerR44,
        "winner_semi_1": this.winnerSemi1,
        "winner_semi_2": this.winnerSemi2,
        "winner_euro": this.winnerEuro
      }
      console.log(bracketSelection);
    }
  }
}
