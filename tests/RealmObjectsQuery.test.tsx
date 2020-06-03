import React from 'react';
import {Text, Button} from 'react-native';
import {render, fireEvent} from '@testing-library/react-native';
import Realm from 'realm';
import {TodoSchema, Todo} from './test-utils';
import {RealmProvider, RealmObjectsQuery} from '../src';

const TEST_TODO_TITLE = 'a test todo';

const TestCase: React.FC<{
  realm: Realm;
  filtered?: string;
  sorted?: Realm.SortDescriptor[];
  variables?: any[];
}> = ({realm, filtered, sorted, variables}) => {
  const addTodo = React.useCallback(() => {
    realm.write(() => {
      realm.create('Todo', {
        id: 1,
        title: TEST_TODO_TITLE,
        createdAt: new Date(),
      });
    });
  }, [realm]);

  return (
    <RealmProvider realm={realm}>
      <RealmObjectsQuery<Todo>
        type="Todo"
        filtered={filtered}
        sorted={sorted}
        variables={variables}>
        {({results}) => (
          <>
            <Text testID="text">{results.length}</Text>
            <Text testID="firstTodoTitle">
              {results.length ? results[0].title : ''}
            </Text>
          </>
        )}
      </RealmObjectsQuery>
      <Button testID="button" title="Add todo" onPress={addTodo} />
    </RealmProvider>
  );
};

describe('<RealmObjectsQuery />', () => {
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

  it('re-renders when realm results auto update', () => {
    const {getByTestId} = render(<TestCase realm={realm} />);
    expect(getByTestId('text').props.children).toBe(0);
    fireEvent.press(getByTestId('button'));
    expect(getByTestId('text').props.children).toBe(1);
  });

  it('correctly applies filters without variables', () => {
    realm.write(() => {
      realm.create('Todo', {
        id: 0,
        title: 'test completed todo',
        createdAt: new Date(),
        done: true,
      });
    });
    const {getByTestId} = render(
      <TestCase realm={realm} filtered="done == false" />,
    );
    expect(getByTestId('text').props.children).toBe(0);
    fireEvent.press(getByTestId('button'));
    expect(realm.objects('Todo').length).toBe(2);
    expect(getByTestId('text').props.children).toBe(1);
  });

  it('correctly applies filtres with variables', () => {
    realm.write(() => {
      realm.create('Todo', {
        id: 0,
        title: 'test completed todo',
        createdAt: new Date(),
        done: true,
      });
    });
    const {getByTestId} = render(
      <TestCase realm={realm} filtered="id == $0" variables={[1]} />,
    );
    expect(getByTestId('text').props.children).toBe(0);
    fireEvent.press(getByTestId('button'));
    expect(realm.objects('Todo').length).toBe(2);
    expect(getByTestId('text').props.children).toBe(1);
  });

  it('correctly sorts the results', () => {
    realm.write(() => {
      realm.create('Todo', {
        id: 0,
        title: 'test completed todo',
        createdAt: new Date(),
        done: true,
      });
    });
    const {getByTestId} = render(
      <TestCase realm={realm} sorted={[['title', false]]} />,
    );
    expect(getByTestId('firstTodoTitle').props.children).toBe(
      'test completed todo',
    );
    fireEvent.press(getByTestId('button'));
    expect(realm.objects('Todo').length).toBe(2);
    expect(getByTestId('firstTodoTitle').props.children).toBe(TEST_TODO_TITLE);
  });
});
