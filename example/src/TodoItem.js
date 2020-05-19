import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useRealm} from 'react-realm-ctx';

const TodoItem = React.memo(({id, title, done}) => {
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
      <View style={styles.item}>
        <Text style={done ? styles.done : undefined}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  item: {
    paddingVertical: 12,
  },
  done: {
    textDecorationLine: 'line-through',
  },
});

export default TodoItem;
