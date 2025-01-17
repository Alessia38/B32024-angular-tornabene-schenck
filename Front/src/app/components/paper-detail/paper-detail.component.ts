import { Component, Input, output, EventEmitter } from '@angular/core';
import { Paper } from '../../models/paper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paper-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paper-detail.component.html',
  styleUrl: './paper-detail.component.scss'
})
export class PaperDetailComponent {
  @Input() actualPaper: Paper | undefined;
  // @Input() papers : Paper[] = [];
  //   selectedPaper : any = null;
  //   clickPaper = output<Paper>();
  
  //   onPaperClic(current: Paper){
  //     this.clickPaper.emit(current);
  //     this.selectedPaper = current;
  //   }
}
