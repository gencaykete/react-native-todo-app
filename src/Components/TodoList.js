import React, { useState } from "react";
import { observer } from "mobx-react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import TodoStore from "../Stores/TodoStore";

const TodoList = observer(() => {
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  const handleAddTodo = () => {
    if (newTodo.length > 0){
      TodoStore.addTodo(newTodo);
      setNewTodo("");
    }else {
      Alert.alert(
        "Hata",
        "Lütfen bir todo giriniz.",
        [
          {
            text: "Tamam",
            style: "cancel"
          }
        ],
        { cancelable: true }
      );
    }
  };

  const handleRemoveTodo = (index) => {
    Alert.alert(
      "Emin misiniz?",
      "Silmek istediğinize emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel"
        },
        {
          text: "Sil",
          onPress: () => {
            TodoStore.removeTodo(index);
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  const handleEditTodo = (index, text) => {
    setEditIndex(index);
    setEditText(text);
  };

  const handleSaveEdit = (index) => {
    TodoStore.editTodo(index, editText);
    setEditIndex(-1);
    setEditText("");
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
          <View style={styles.listGroup}>
            {editIndex === index ? (
              <View style={styles.listItem}>
                <TextInput
                  value={editText}
                  onChangeText={setEditText}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => handleSaveEdit(index)}>
                  <Text style={{ color: "green" }}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.listItem}>
                <Text>{item}</Text>
                <View style={styles.actionGroup}>
                  <TouchableOpacity onPress={() => handleEditTodo(index, item)}>
                    <Text style={{ color: "blue" }}>Düzenle</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleRemoveTodo(index)}>
                    <Text style={{ color: "red" }}>Sil</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
    marginRight: 10,
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
  actionGroup: {
    flexDirection: "row",
    gap: 15,
  },
});

export default TodoList;
