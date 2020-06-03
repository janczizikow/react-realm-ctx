import {renderHook} from '@testing-library/react-hooks';
import {useRealm} from '../src';

describe('useRealm', () => {
  it('throws if not wrapped in RealmProvider', () => {
    const {result} = renderHook(() => useRealm());
    expect(result.error.message).toMatch(/could not find realm context value/i);
  });
});
