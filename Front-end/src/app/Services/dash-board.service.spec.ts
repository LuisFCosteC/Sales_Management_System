import { TestBed } from '@angular/core/testing';

import { DashBoardService } from './dash-board.service';

describe('DashBoardService', () => {
  let service: DashBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
