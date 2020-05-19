import React from 'react';
import Realm from 'realm';

export interface IReactRealmContext {
  realm: Realm;
}

// @ts-ignore
export const ReactRealmContext = React.createContext<IReactRealmContext>(null);

if (__DEV__) {
  ReactRealmContext.displayName = 'ReactRealm';
}
