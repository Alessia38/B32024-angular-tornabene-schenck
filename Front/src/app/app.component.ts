import { Component, inject } from '@angular/core';
import { Paper } from './models/paper';
import { PaperTitleComponent } from "./components/paper-title/paper-title.component";
import { PaperListComponent } from "./components/paper-list/paper-list.component";
import { PaperFormComponent } from "./components/paper-form/paper-form.component";
import { PaperDetailComponent } from "./components/paper-detail/paper-detail.component";
import { PanamaPaperService } from './services/panama-paper.service';
import { BehaviorSubject, switchMap } from 'rxjs';
import { OidcSecurityService, LoginResponse } from 'angular-auth-oidc-client';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaperTitleComponent, PaperListComponent, PaperFormComponent, PaperDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
  
  export class AppComponent {
    private readonly oidcSecurityService = inject(OidcSecurityService);

    ngOnInit() {
      this.oidcSecurityService
        .checkAuth()
        .subscribe((loginResponse: LoginResponse) => {
          const { isAuthenticated, userData, accessToken, idToken, configId } =
            loginResponse;
  
          /*...*/
        });
    }


    public papers: Paper[] = [];
    public selectedPaper: Paper | undefined;
    private _myRefreshObservable = new BehaviorSubject<number>(1);
  
    constructor(private _panamaPaperService: PanamaPaperService) {
      this._myRefreshObservable
      .pipe(
        switchMap(()=> {
          return this._panamaPaperService.get();
        }),
      ).subscribe((value)=>{
        this.papers = value
      });
    }
    onLogin(){
      this.oidcSecurityService.authorize();
    }
    
    onSelectPaper($event: Paper) {
      this.selectedPaper = $event;
    }
  
    onPaperSelected(paper: Paper) {
      this.selectedPaper = paper;
    }
  
    onSavePaper(updatedPaper: Paper): void {
      if (this.selectedPaper) {
        // if (this.selectedPaper.id >0) {
      this._panamaPaperService.put(updatedPaper).subscribe(
        (updated) => {
          console.log('Papier mis à jour', updated);
          this.onRefreshList(); // Rafraîchir la liste après mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du papier', error);
        }
      );
      } else {
        this._panamaPaperService.add(updatedPaper).subscribe(
          (added) => {
            console.log('Nouveau papier ajouté', added);
            this.onRefreshList(); // Rafraîchir la liste après ajout
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du papier', error);
          }
        );
      }
      // }
      this.selectedPaper = updatedPaper; 
    }
    
      onRefreshList(): void {
        this._panamaPaperService.get().subscribe(
          (data: Paper[]) => {
            this.papers = data; // Mettre à jour la liste des papiers
          },
          (error) => {
            console.error('Erreur lors du rafraîchissement de la liste des papiers', error);
          }
        );
      }

      public onDeletePaper(id: number): void {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce papier ?")) {
          this._panamaPaperService.delete(id).subscribe(
            () => {
              console.log(`Papier avec l'ID ${id} supprimé`);
              this.onRefreshList(); // Rafraîchir la liste après suppression
            },
            (error) => {
              console.error("Erreur lors de la suppression du papier", error);
            }
          );
        }
      }
  }