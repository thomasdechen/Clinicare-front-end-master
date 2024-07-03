import { TestBed } from '@angular/core/testing';

import { DisponibilidadeService } from './disponibilidade.service';

describe('DisponibilidadeService', () => {
  let service: DisponibilidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisponibilidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
