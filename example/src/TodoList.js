import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import {useRealm, useRealmObjectsQuery} from 'react-realm-ctx';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const filters = {
  ALL: 'ALL',
  PENDING: 'PENDING',
  DONE: 'DONE',
};

const sortValues = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const filtersReducer = (f) => {
  switch (f) {
    case filters.PENDING:
      return 'done = false';
    case filters.DONE:
      return 'done = true';
    default:
      return undefined;
  }
};

const TodoList = () => {
  const realm = useRealm();
  const [filter, setFilter] = useState(filters.ALL);
  const [sort, setSort] = useState(sortValues.ASC);
  const todos = useRealmObjectsQuery('Todo', {
    filtered: filtersReducer(filter),
    sorted: [['createdAt', sort === sortValues.DESC]],
  });
  const keyExtractor = (item, index) => `id${item.id}idx${index}`;
  const renderItem = ({item}) => (
    <TodoItem id={item.id} title={item.title} done={item.done} />
  );
  const toggleSort = () => {
    if (sort === sortValues.ASC) {
      setSort(sortValues.DESC);
    } else {
      setSort(sortValues.ASC);
    }
  };
  const deleteTodos = () => {
    realm.write(() => {
      let allTodos = realm.objects('Todo');
      realm.delete(allTodos);
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <AddTodo />
      </View>
      <View style={[styles.container, styles.row]}>
        <Button title="All" onPress={() => setFilter(filters.ALL)} />
        <Button title="Pending" onPress={() => setFilter(filters.PENDING)} />
        <Button title="Done" onPress={() => setFilter(filters.DONE)} />
        <Button title={sort} onPress={toggleSort} />
        <Button title="DELETE ALL" onPress={deleteTodos} />
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={[styles.container]}
        data={todos}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
  },
});

export default TodoList;
