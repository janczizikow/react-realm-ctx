import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {useRealm} from 'react-realm-ctx';
import generateId from './generateId';

const AddTodo = () => {
  const realm = useRealm();
  const [title, setTitle] = useState('');
  const addTodo = () => {
    if (title) {
      realm.write(() => {
        realm.create(
          'Todo',
          {id: generateId(), title, createdAt: new Date()},
          true,
        );
      });
      setTitle('');
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="grey"
        />
      </View>
      <Button title="Add" onPress={addTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    color: 'black',
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default AddTodo;
