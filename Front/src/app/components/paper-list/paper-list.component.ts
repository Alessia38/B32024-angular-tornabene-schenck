import { Component, Input, Output, EventEmitter, ChangeDetectorRef  } from '@angular/core';
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

  @Input() papers: Paper[] = [];
  @Output() clickPaper = new EventEmitter<Paper>();

  selectedPaper : any = null;

  constructor(private cdr: ChangeDetectorRef) {}

  onPaperClic(current: Paper){
    console.log('Clicked paper:', current);
    this.clickPaper.emit(current);
    this.selectedPaper = current;

    this.cdr.detectChanges();
  }
}
