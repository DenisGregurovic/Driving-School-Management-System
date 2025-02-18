import { InstPipe } from './inst.pipe';

describe('InstPipe', () => {
  it('create an instance', () => {
    const pipe = new InstPipe();
    expect(pipe).toBeTruthy();
  });
});
