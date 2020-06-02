import React from 'react';
import renderer from 'react-test-renderer';
import {Text} from 'react-native';
import {RealmProvider, RealmConsumer} from '../src';
import {realm} from './test-utils';

describe('<RealmProvider />', () => {
  beforeEach(() => {
    realm.write(() => {
      realm.deleteAll();
    });
  });

  it('adds realm to the context', () => {
    const tree = renderer
      .create(
        <RealmProvider realm={realm}>
          <RealmConsumer>
            {({realm: realmCtx}) => (
              <Text>Todos: {realmCtx.objects('Todo').length}</Text>
            )}
          </RealmConsumer>
        </RealmProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
