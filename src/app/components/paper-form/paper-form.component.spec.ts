import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PaperFormComponent } from './paper-form.component';

describe('PaperFormComponent', () => {
  let component: PaperFormComponent;
  let fixture: ComponentFixture<PaperFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperFormComponent, ReactiveFormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit when form is valid', () => {
    component.paperForm.setValue({
      name: 'Papier test',
      texture: 'Lisse',
      grammage: '200gr',
      color: 'Blanc',
    });
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    submitButton.click();
    expect(component.paperForm.valid).toBeTrue();
  });

  it('should display error messages for invalid form', () => {
    const nameInput = fixture.debugElement.query(By.css('#name')).nativeElement;
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errorMessages = fixture.debugElement.queryAll(By.css('.fielderror'));
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
