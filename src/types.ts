export interface RenderProp<TProps, TElement = any> {
  (props: TProps): React.ReactElement<TElement>;
}

export interface IRealmQueryArgs {
  filtered?: string;
  variables?: any[];
  sorted?: Realm.SortDescriptor[];
}
