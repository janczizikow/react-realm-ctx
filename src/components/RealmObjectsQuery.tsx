import Realm from 'realm';
import {useRealmObjectsQuery} from '../hooks/useRealmObjectsQuery';
import {IRealmQueryArgs, RenderProp} from '../types';

interface IRealmObjectsQueryProps<T> {
  type: string | Realm.ObjectType | Function;
  children: RenderProp<{
    results: Realm.Results<T & Realm.Object>;
  }>;
}

export function RealmObjectsQuery<T>({
  children,
  type,
  ...rest
}: IRealmObjectsQueryProps<T> & IRealmQueryArgs) {
  const results = useRealmObjectsQuery<T>(type, rest);
  return children({results});
}
