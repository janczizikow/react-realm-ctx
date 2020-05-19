import {useReducer, useContext, useMemo, useEffect, useDebugValue} from 'react';
import Realm from 'realm';
import {ReactRealmContext, IReactRealmContext} from '../Context';

interface IRealmQueryArgs {
  filtered?: string;
  variables?: any[];
  sorted?: Realm.SortDescriptor[];
}

export function useRealmObjectsQuery<T>(
  type: string | Realm.ObjectType | Function,
  {filtered, sorted, variables}: IRealmQueryArgs = {},
): Realm.Results<T & Realm.Object> | (T & Object)[] {
  if (__DEV__ && !type) {
    throw new Error('You must pass an object type to useRealmObjectsQuery');
  }
  const [, forceUpdate] = useReducer((s) => s + 1, 0);
  const context = useContext<IReactRealmContext>(ReactRealmContext);
  if (__DEV__ && !context) {
    throw new Error(
      'Could not find realm context value; please ensure the component is wrapped in a <RealmProvider />',
    );
  }
  const query = useMemo(() => {
    let result = context.realm.objects<T>(type);

    if (filtered) {
      if (variables) {
        result = result.filtered(filtered, ...variables);
      } else {
        result = result.filtered(filtered);
      }
    }

    if (sorted) {
      result = result.sorted(sorted);
    }

    return result;
  }, [context, type, filtered, variables, sorted]);

  useEffect(() => {
    if (query) {
      query.addListener((_, __) => {
        forceUpdate();
      });
    }

    return () => {
      if (query) {
        query.removeAllListeners();
      }
    };
  }, [query]);

  useDebugValue(query);

  return query;
}
