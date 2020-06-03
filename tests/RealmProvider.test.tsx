import React from 'react';
import {render} from '@testing-library/react-native';
// @ts-ignore
import {toHaveTextContent} from '@testing-library/jest-native';
import {Text} from 'react-native';
import Realm from 'realm';
import {RealmProvider, RealmConsumer} from '../src';
import {TodoSchema} from './test-utils';

expect.extend({toHaveTextContent});

describe('<RealmProvider />', () => {
  let realm: Realm;
  const TEST_ID = 'text';

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
    const testText = 'Number of todos in this Realm: ';
    const tree = (
      <RealmProvider realm={realm}>
        <RealmConsumer>
          {({realm: realmCtx}) => (
            <Text testID={TEST_ID}>
              {testText + realmCtx.objects('Todo').length}
            </Text>
          )}
        </RealmConsumer>
      </RealmProvider>
    );
    const {getByTestId, rerender} = render(tree);
    expect(getByTestId(TEST_ID)).toHaveTextContent(`${testText}0`, {
      normalizeWhitespace: true,
    });
    realm.write(() => {
      realm.create('Todo', {
        id: 1,
        title: 'test todo',
        createdAt: new Date(),
      });
    });
    rerender(tree);
    expect(getByTestId(TEST_ID)).toHaveTextContent(`${testText}1`, {
      normalizeWhitespace: true,
    });
  });
});
