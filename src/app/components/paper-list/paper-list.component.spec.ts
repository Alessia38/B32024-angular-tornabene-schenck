import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paper } from '../../models/paper';
import { PaperListComponent } from './paper-list.component';
import { By } from '@angular/platform-browser';

describe('PaperListComponent', () => {
  let component: PaperListComponent;
  let fixture: ComponentFixture<PaperListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should highlight the clicked paper', () => {
    const paper: Paper = {
      id: 1,
      grammage: '80gr',
      color: 'Blanc',
      texture: 'Lisse',
      name: 'Papier Test'
    };
    component.papers = [paper];
    fixture.detectChanges();

    const liElement = fixture.debugElement.query(By.css('li'));
    liElement.triggerEventHandler('click', null);

    expect(component.selectedPaper).toBe(paper);
  });
});
