import {useContext} from 'react';
import {ReactRealmContext, IReactRealmContext} from '../Context';

export function useRealm() {
  const context = useContext<IReactRealmContext>(ReactRealmContext);
  if (__DEV__ && !context) {
    throw new Error(
      'Could not find realm context value; please ensure the component is wrapped in a <RealmProvider />',
    );
  }
  return context.realm;
}
