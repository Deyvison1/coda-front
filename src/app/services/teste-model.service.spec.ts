import { TestBed } from '@angular/core/testing';

import { TesteModelService } from './teste-model.service';

describe('TesteModelService', () => {
  let service: TesteModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesteModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
