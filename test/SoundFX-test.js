import { expect } from 'chai'
import SoundFX from '../lib/SoundFX.js'

describe('SoundFX testing occurs here...', () => {

  it("should be an instance of SoundFX", () => {
    var soundFx = new SoundFX();
    expect(soundFx).to.be.an.instanceof(SoundFX)
  });

  it("should have a source property", () => {
    var soundFx = new SoundFX('some HTMLMediaElement source');
    expect(soundFx.source).to.equal('some HTMLMediaElement source');
  });

})
