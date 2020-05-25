import React from 'react';
import Realm from 'realm';
import {ReactRealmContext} from '../Context';

interface IProviderProps {
  realm: Realm;
}

export function RealmProvider({
  realm,
  children,
}: React.PropsWithChildren<IProviderProps>): React.ReactElement {
  const value = React.useMemo(() => ({realm}), [realm]);

  return (
    <ReactRealmContext.Provider value={value}>
      {children}
    </ReactRealmContext.Provider>
  );
}
