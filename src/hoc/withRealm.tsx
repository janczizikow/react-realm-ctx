import React from 'react';
import Realm from 'realm';

export interface InjectedRealmProps {
  realm: Realm;
}

export function withRealm<P extends object>(Component: React.ComponentType<P>) {
  return class WithRealm extends React.Component<P & InjectedRealmProps> {
    render() {
      return <Component {...(this.props as P)} />;
    }
  };
}
