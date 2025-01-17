import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperTitleComponent } from './paper-title.component';

describe('PaperTitleComponent', () => {
  let component: PaperTitleComponent;
  let fixture: ComponentFixture<PaperTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaperTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
