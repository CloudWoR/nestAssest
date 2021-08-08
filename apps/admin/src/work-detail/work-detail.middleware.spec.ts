import { WorkDetailMiddleware } from './work-detail.middleware';

describe('WorkDetailMiddleware', () => {
  it('should be defined', () => {
    expect(new WorkDetailMiddleware()).toBeDefined();
  });
});
