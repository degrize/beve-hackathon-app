import { TestBed } from '@angular/core/testing';

import { DonsCreateurService } from './dons-createur.service';

describe('DonsCreateurService', () => {
  let service: DonsCreateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonsCreateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
