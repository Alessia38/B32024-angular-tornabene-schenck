import { Component, Input } from '@angular/core';
import { Paper } from '../../models/paper';

@Component({
  selector: 'app-paper-title',
  standalone: true,
  imports: [],
  templateUrl: './paper-title.component.html',
  styleUrl: './paper-title.component.scss'
})
export class PaperTitleComponent {

  @Input() actualPaper: Paper | undefined;

}
