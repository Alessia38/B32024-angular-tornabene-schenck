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
      name: new FormControl('', Validators.required),
      texture: new FormControl(''),
      grammage: new FormControl(''),
      color: new FormControl(''),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPaper'] && this.selectedPaper != null) {
      this.paperForm.setValue({
        name: this.selectedPaper.name,
        texture: this.selectedPaper.texture,
        weight: this.selectedPaper.grammage,
        color: this.selectedPaper.color,
      });
    }
  }

  onSubmit() {
    if (this.paperForm.valid) {
      const updatedPaper: Paper = this.paperForm.value;
      this.savePaper.emit(updatedPaper);
    }
  }

  onCancel() {
    this.cancelEdit.emit();
  }
}
