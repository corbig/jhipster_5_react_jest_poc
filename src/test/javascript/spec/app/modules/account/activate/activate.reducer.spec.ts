import { SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import activate, { ACTION_TYPES } from 'app/modules/account/activate/activate.reducer';

describe('Activate reducer tests', () => {
  it('should return the initial state', () => {
    expect(activate(undefined, {})).toEqual(
      expect.objectContaining({
        activationSuccess: false,
        activationFailure: false
      })
    );
  });

  it('should reset', () => {
    expect(activate({ activationSuccess: true, activationFailure: false }, { type: ACTION_TYPES.RESET })).toEqual(
      expect.objectContaining({
        activationSuccess: false,
        activationFailure: false
      })
    );
  });

  it('should detect a success', () => {
    expect(activate(undefined, { type: SUCCESS(ACTION_TYPES.ACTIVATE_ACCOUNT) })).toEqual(
      expect.objectContaining({
        activationSuccess: true,
        activationFailure: false
      })
    );
  });

  it('should detect a failure', () => {
    expect(activate(undefined, { type: FAILURE(ACTION_TYPES.ACTIVATE_ACCOUNT) })).toEqual(
      expect.objectContaining({
        activationSuccess: false,
        activationFailure: true
      })
    );
  });
});
