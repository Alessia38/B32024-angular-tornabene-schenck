import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Paper } from '../../models/paper';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paper-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './paper-form.component.html',
  styleUrls: ['./paper-form.component.scss'] // correction: il y a un 's' manquant pour le fichier style
})
export class PaperFormComponent implements OnChanges {

  @Input() selectedPaper: Paper | undefined;
  @Output() savePaper = new EventEmitter<Paper>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() deletePaper = new EventEmitter<number>(); // EventEmitter pour la suppression

  paperForm: FormGroup;

  constructor() {
    this.paperForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      texture: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      grammage: new FormControl('', [Validators.required]), // Regex pour valider "20gr", "250gr", etc.
      color: new FormControl('', Validators.required),
    });
  }

  // Méthode pour réinitialiser le formulaire lorsque l'on crée un nouveau papier
  public onNew(): void {
    this.paperForm.reset();
    this.paperForm.patchValue({id:0});
  }

  // Méthode pour détecter les changements dans selectedPaper
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPaper'] && this.selectedPaper != null) {
      this.paperForm.setValue({
        id: this.selectedPaper.id,
        name: this.selectedPaper.name,
        texture: this.selectedPaper.texture,
        grammage: this.selectedPaper.grammage,
        color: this.selectedPaper.color,
      });
    }
  }

  // Soumission du formulaire
  public onSubmit(): void {
    if (this.paperForm.valid) {
      const updatedPaper: Paper = this.paperForm.value;
      this.savePaper.emit(updatedPaper); // Émettre l'événement savePaper avec le papier mis à jour
    }
  }

  // Annuler l'édition en cours
  public onCancel(): void {
    this.cancelEdit.emit(); // Émettre l'événement cancelEdit
  }

  // Supprimer le papier sélectionné
  public onDelete(): void {
    if (this.selectedPaper?.id) {
      this.deletePaper.emit(this.selectedPaper.id); // Émettre l'événement deletePaper avec l'id du papier à supprimer
      console.warn("Aucun papier sélectionné à supprimer.");
    }
  }

  // Afficher les erreurs de validation pour un champ
  public showFieldError(fieldName: string, errorKind: string = ''): boolean {
    if (this.paperForm.get(fieldName)?.touched) {
      if (errorKind == '') {
        return !this.paperForm.get(fieldName)?.valid;
      } else {
        return this.paperForm.get(fieldName)?.errors?.[errorKind] != null;
      }
    } else {
      return false;
    }
  }

  // Récupérer les erreurs de validation d'un champ
  public getError(fieldName: string): any {
    return this.paperForm.get(fieldName)?.errors;
  }
}
