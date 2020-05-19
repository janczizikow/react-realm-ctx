import React from 'react';
import {RealmProvider} from 'react-realm-ctx';
import realm from './src/realm';
import TodoList from './src/TodoList';

const App = () => {
  return (
    <RealmProvider realm={realm}>
      <TodoList />
    </RealmProvider>
  );
};

export default App;
