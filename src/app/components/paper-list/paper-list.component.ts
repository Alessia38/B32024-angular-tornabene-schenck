import { Component, Input, output, Output,EventEmitter } from '@angular/core';
import { Paper } from '../../models/paper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paper-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paper-list.component.html',
  styleUrl: './paper-list.component.scss'
})
export class PaperListComponent {

  @Input() papers : Paper[] = [];
  selectedPaper : any = null;
  clickPaper = output<Paper>();

  onPaperClic(current: Paper){
    this.clickPaper.emit(current);
    this.selectedPaper = current;
  }
}
