import {renderHook} from '@testing-library/react-hooks';
import {useRealmObjectsQuery} from '../src';

describe('useRealmObjectsQuery', () => {
  it('throws if not provided an object type', () => {
    // @ts-ignore
    const {result} = renderHook(() => useRealmObjectsQuery());

    expect(result.error.message).toMatch(
      /you must pass an object type to useRealmObjectsQuery/i,
    );
  });

  it('throws if not wrapped in RealmProvider', () => {
    const {result} = renderHook(() => useRealmObjectsQuery('Todo'));

    expect(result.error.message).toMatch(/could not find realm context value/i);
  });
});
