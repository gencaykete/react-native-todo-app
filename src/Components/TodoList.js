import React, { useState } from "react";
import { observer } from "mobx-react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import TodoStore from "../Stores/TodoStore";

const TodoList = observer(() => {
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    TodoStore.addTodo(newTodo);
    setNewTodo("");
  };

  const handleRemoveTodo = (index) => {
    TodoStore.removeTodo(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Todo Girin..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>Ekle</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={TodoStore.todos}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => handleRemoveTodo(index)}>
              <Text style={{ color: "red" }}>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
});

let styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#22ff26",
    borderRadius: 5,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "80%",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
  },
});

export default TodoList;
