import { TestBed } from '@angular/core/testing';

import { PanamaPaperService } from './panama-paper.service';

describe('PanamaPaperService', () => {
  let service: PanamaPaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanamaPaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
