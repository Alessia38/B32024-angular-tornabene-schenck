import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Paper } from '../../models/paper';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paper-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './paper-form.component.html',
  styleUrl: './paper-form.component.scss'
})
export class PaperFormComponent implements OnChanges {

  @Input() selectedPaper: Paper | undefined;
  @Output() savePaper = new EventEmitter<Paper>();
  @Output() cancelEdit = new EventEmitter<void>();

  paperForm: FormGroup;

  constructor() {
    this.paperForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      texture: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      grammage: new FormControl('', [ Validators.required, Validators.pattern(/^\d+gr$/)
        // Regex pour valider "20gr", "250gr", etc. ne pas mettre d'espace
      ]),
      color: new FormControl('', Validators.required),
    });
  }
  public onNew(): void {
    // reset des valeurs du formulaire
    this.paperForm.reset();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPaper'] && this.selectedPaper != null) {
      this.paperForm.setValue({
        name: this.selectedPaper.name,
        texture: this.selectedPaper.texture,
        grammage: this.selectedPaper.grammage,
        color: this.selectedPaper.color,
      });
    }
  }

  public onSubmit(): void {
    if (this.paperForm.valid) {
      const updatedPaper: Paper = this.paperForm.value;
      this.savePaper.emit(updatedPaper);
    }
  }

  public onCancel(): void {
    this.cancelEdit.emit();
  }

  public showFieldError(fieldName: string, errorKind: string = ''): boolean{
    if (this.paperForm.get(fieldName)?.touched) {
      if (errorKind == ''){
        return !this.paperForm.get(fieldName)?.valid;
      }else{
        return this.paperForm.get(fieldName)?.errors?.[errorKind] != null;
      }
    }else{
      return false;
    }
  }
  
  public getError(fieldName: string): any{
    return this.paperForm.get(fieldName)?.errors;
  }
}

