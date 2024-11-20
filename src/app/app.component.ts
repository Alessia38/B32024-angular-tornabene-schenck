import { Component } from '@angular/core';
import { Paper } from './models/paper';
import { PaperTitleComponent } from "./components/paper-title/paper-title.component";
import { PaperListComponent } from "./components/paper-list/paper-list.component";


 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaperTitleComponent, PaperListComponent],
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

  public onSubmit(paper: Paper){
    this.papers.push(paper);
    this.selectedPaper = paper;
  }
}

