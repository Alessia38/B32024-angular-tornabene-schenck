import { Component } from '@angular/core';
import { Paper } from './models/paper';
import { PaperTitleComponent } from "./components/paper-title/paper-title.component";
import { PaperListComponent } from "./components/paper-list/paper-list.component";
import { PaperFormComponent } from "./components/paper-form/paper-form.component";


 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaperTitleComponent, PaperListComponent, PaperFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 
  public papers: Paper[] = [
    {id:1 , name:"Papier 1 " ,texture:"Lisse" , grammage:"80gr" , color:"blanc" },
    {id:2 , name:"Papier 2" ,texture:"Grain fin" , grammage:"120gr" , color:"écru" }
  ];
  public selectedPaper: Paper | undefined;

  onSelectPaper($event: Paper) {
    this.selectedPaper = $event;
  }

  onPaperSelected(paper: Paper) {
    this.selectedPaper = paper;
  }

  onSavePaper(updatedPaper: Paper) {
    if (this.selectedPaper) {
      const index = this.papers.findIndex((p) => p.id === this.selectedPaper?.id);
      if (index !== -1) {
        updatedPaper.id = this.selectedPaper.id;
        this.papers[index] = updatedPaper;
      }
    } else {
      if (this.papers.length > 0) {
        const lastPaperId = this.papers[this.papers.length - 1].id;
        updatedPaper.id = lastPaperId + 1;
      } else {
        updatedPaper.id = 1;
      }
      this.papers.push(updatedPaper);
    }
  }

  onCancelEdit() {
    this.selectedPaper = undefined;
  }
}

