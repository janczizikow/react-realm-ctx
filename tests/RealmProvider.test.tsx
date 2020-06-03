import React from 'react';
import renderer from 'react-test-renderer';
import {Text} from 'react-native';
import Realm from 'realm';
import {RealmProvider, RealmConsumer} from '../src';
import {TodoSchema} from './test-utils';

describe('<RealmProvider />', () => {
  let realm: Realm;

  beforeAll(async () => {
    realm = await Realm.open({schema: [TodoSchema]});
  });

  beforeEach(() => {
    realm.write(() => {
      realm.deleteAll();
    });
  });

  afterAll(() => {
    if (realm && !realm.isClosed) {
      realm.close();
    }
  });

  it('adds realm to the context', () => {
    const tree = renderer
      .create(
        <RealmProvider realm={realm}>
          <RealmConsumer>
            {({realm: realmCtx}) => (
              <Text>
                Number of todos in this Realm: {realmCtx.objects('Todo').length}
              </Text>
            )}
          </RealmConsumer>
        </RealmProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
