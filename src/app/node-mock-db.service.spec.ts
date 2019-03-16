import { TestBed } from '@angular/core/testing';

import { NodeMockDbService } from './node-mock-db.service';

describe('NodeMockDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodeMockDbService = TestBed.get(NodeMockDbService);
    expect(service).toBeTruthy();
  });
});
