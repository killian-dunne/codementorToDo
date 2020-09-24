import React, { useState } from 'react';
import { TextInput, View, FlatList } from 'react-native';
import styles from '../styles/todoStyles'
import TodoItem from './todoItem';

const Todo = props => {
  let inputComponent;
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([])

  const onSubmit = () => {
    if (text) {
      setText(text)
      setTodos([...todos, {title: text, done: false}])
      inputComponent.setNativeProps({ text: '' })
      inputComponent.focus()
    }
  }

  const keyExtractor = (item, index) => index.toString();

  const separator = () => <View style={styles.separator} />

  const renderItem = ({ item, index }) => (
    <TodoItem
      item={item}
      index={index}
      markAsDone={markAsDone}
      onPressRemove={onPressRemove}
    />
  )

  const onPressRemove = idx => {
    let updatedTodos = todos.filter((_, i) => i !== idx);
    setTodos(updatedTodos)
  }

  const markAsDone = index => {
    let updatedTodos = todos.map((item, idx) => {
      if (idx === index) {
        item.done = !item.done;
        return item;
      }
      return item;
    })
    setTodos(updatedTodos)
  }

  return (
    <View style={styles.container} >
      <TextInput 
        selectionColor="black"
        underlineColorAndroid="black"
        placeholder="What needs to be done"
        onChangeText={text => setText(text)}
        onSubmitEditing={onSubmit}
        ref={component => { inputComponent = component; }}
        autoFocus
      />
      <FlatList
        ItemSeparatorComponent={separator}
        data={todos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  )
}

export default Todo;