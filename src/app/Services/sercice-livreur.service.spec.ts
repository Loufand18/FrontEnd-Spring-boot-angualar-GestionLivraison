import { TestBed } from '@angular/core/testing';

import { SerciceLivreurService } from './sercice-livreur.service';

describe('SerciceLivreurService', () => {
  let service: SerciceLivreurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerciceLivreurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
