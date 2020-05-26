# React Realm Ctx

A more react-like experience for [Realm]([real](https://realm.io/docs/javascript/latest)).

- Provides a [React context](https://reactjs.org/docs/context.html) to child components to read and write from the realm database.
- Adds and removes listeners on Realm.Results and re-renders components when [results get updated](https://realm.io/docs/javascript/latest#auto-updating-results)
- Consume the context as you prefer: via [hooks](https://reactjs.org/docs/hooks-intro.html), [higher order components](https://reactjs.org/docs/higher-order-components.html) or [render props](https://reactjs.org/docs/render-props.html)

## Installation

**Note:** This package requires Realm and React 16.3.0 or later. Make sure you have those dependencies installed before adding `react-realm-ctx`.

```sh
# If you use yarn
yarn add react-realm-ctx

# Or if you use npm:
npm install react-realm-ctx
```

## Usage

Create a realm instance and wrap the root of your app with the `RealmProvider`:

```jsx
import React from 'react';
import Realm from 'realm';
import {RealmProvider} from 'react-realm-ctx';

const TodoSchema = {
  name: 'Todo',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    done: {type: 'bool', default: false},
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.realm = new Realm({schema: [TodoSchema]});
  }

  render() {
    return (
      <RealmProvider realm={this.realm}>
        {/* ... */}
      </RealmProvider>
    );
  }
}
```

Use the context in any child components:

### Query

#### Hooks

```jsx
import React from 'react';
import {FlatList} from 'react-native';
import {useRealmObjectsQuery} from 'react-realm-ctx';

const TodoList = () => {
  const allTodos = useRealmObjectsQuery('Todo');
  const pendingTodos = useRealmObjectsQuery('Todo', {
    filtered: 'done = false',
  });

  return (
    <FlatList data={allTodos} renderItem={renderItem} />
  );
}
```

#### Render props

```jsx
import React from 'react';
import {FlatList} from 'react-native';
import {RealmObjectsQuery} from 'react-realm-ctx';

const TodoList = () => {
  return (
    <RealmObjectsQuery type="Todo" filtered="done = false">
      {({results}) => <FlatList data={results} renderItem={renderItem} />}
    </RealmObjectsQuery>
  );
}
```

### Write

#### Hooks

```jsx
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useRealm} from 'react-realm-ctx';

const TodoItem = ({id, title, done}) => {
  const realm = useRealm();
  const toggleDone = () => {
    realm.write(() => {
      let todo = realm.objectForPrimaryKey('Todo', id);
      todo.done = !todo.done;
    });
  };

  const handleDelete = () => {
    realm.write(() => {
      let todo = realm.objectForPrimaryKey('Todo', id);
      realm.delete(todo);
    });
  };

  return (
    <TouchableOpacity onPress={toggleDone} onLongPress={handleDelete}>
      <Text style={done ? {textDecorationLine: 'line-through'} : undefined}>{title}</Text>
    </TouchableOpacity>
  );
};
```

#### HOC

```jsx
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {withRealm} from 'react-realm-ctx';

const TodoItem = withRealm(({id, title, done, realm}) => {
  const toggleDone = () => {
    realm.write(() => {
      let todo = realm.objectForPrimaryKey('Todo', id);
      todo.done = !todo.done;
    });
  };

  const handleDelete = () => {
    realm.write(() => {
      let todo = realm.objectForPrimaryKey('Todo', id);
      realm.delete(todo);
    });
  };

  return (
    <TouchableOpacity onPress={toggleDone} onLongPress={handleDelete}>
      <Text style={done ? {textDecorationLine: 'line-through'} : undefined}>{title}</Text>
    </TouchableOpacity>
  );
});
```


#### Render props

```jsx
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {RealmConsumer} from 'react-realm-ctx';

const TodoItem = ({id, title, done}) => {
  const toggleDone = (realm) => {
    realm.write(() => {
      let todo = realm.objectForPrimaryKey('Todo', id);
      todo.done = !todo.done;
    });
  };

  const handleDelete = (realm) => {
    realm.write(() => {
      let todo = realm.objectForPrimaryKey('Todo', id);
      realm.delete(todo);
    });
  };

  return (
    <RealmConsumer>
      {({realm}) => (
        <TouchableOpacity onPress={() => toggleDone(realm)} onLongPress={() => handleDelete(realm)}>
          <Text style={done ? {textDecorationLine: 'line-through'} : undefined}>{title}</Text>
        </TouchableOpacity>
      )}
    </RealmConsumer>
  );
};
```

## Related project

- [react-realm-context](https://github.com/realm/react-realm-context)
- [react-use-realm](https://github.com/kedarvaidya/react-use-realm)

## License

[MIT](LICENSE)