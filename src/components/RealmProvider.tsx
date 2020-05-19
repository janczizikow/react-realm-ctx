import React, {useMemo, PropsWithChildren} from 'react';
import Realm from 'realm';
import {ReactRealmContext} from '../Context';

interface IProviderProps {
  realm: Realm;
}

export function RealmProvider({
  realm,
  children,
}: PropsWithChildren<IProviderProps>): React.ReactNode {
  const value = useMemo(() => ({realm}), [realm]);

  return (
    <ReactRealmContext.Provider value={value}>
      {children}
    </ReactRealmContext.Provider>
  );
}
