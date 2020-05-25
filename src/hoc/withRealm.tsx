import React from 'react';
import Realm from 'realm';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {useRealm} from '../hooks/useRealm';
import {getDisplayName} from '../utils';

export interface InjectedRealmProps {
  realm: Realm;
}

interface WithRealmOptions {
  forwardRef?: boolean;
}

// TODO: TS typings for forwarded ref
export function withRealm<
  TProps extends InjectedRealmProps,
  T extends React.ComponentType<TProps> = any
>(
  WrappedComponent: React.ComponentType<TProps>,
  options?: WithRealmOptions,
): React.ComponentType<Omit<TProps, 'realm'>> {
  const {forwardRef = false} = options || {};

  const WithRealm: React.FC<TProps & {forwardedRef?: React.Ref<any>}> = (
    props,
  ) => {
    const realm = useRealm();
    return (
      <WrappedComponent
        {...props}
        realm={realm}
        ref={forwardRef ? props.forwardedRef : null}
      />
    );
  };

  WithRealm.displayName = `WithRealm(${getDisplayName(WrappedComponent)})`;

  if (forwardRef) {
    return hoistNonReactStatics(
      React.forwardRef<T, TProps>((props: TProps, ref) => (
        <WithRealm {...props} forwardedRef={ref} />
      )),
      WrappedComponent,
    ) as any;
  }

  return hoistNonReactStatics(WithRealm, WrappedComponent) as any;
}
