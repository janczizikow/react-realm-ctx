import React from 'react';
import Realm from 'realm';

export interface IReactRealmContext {
  realm: Realm;
}

const ReactRealmContext = React.createContext<IReactRealmContext>(null as any);

ReactRealmContext.displayName = 'ReactRealm';

export {ReactRealmContext};
