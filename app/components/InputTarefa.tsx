import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const categorias = [
  { label: "Trabalho", value: "Trabalho" },
  { label: "Prova", value: "Prova" },
  { label: "Atividade", value: "Atividade" },
  { label: "Estudo", value: "Estudo" },
  { label: "Evento", value: "Evento" },
];

type InputTarefaProps = {
  onAddTask: (titulo: string, categoria: string) => void;
};

export default function InputTarefa({ onAddTask }: InputTarefaProps) {
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState(categorias[0].value);

  const handleAddTask = () => {
    if (texto.trim() === "") {
      return;
    }
    onAddTask(texto, categoria);
    setTexto("");
    setCategoria(categorias[0].value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova tarefa..."
        value={texto}
        onChangeText={setTexto}
        onSubmitEditing={handleAddTask}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={categoria}
          onValueChange={(v) => setCategoria(v)}
          style={styles.picker}
        >
          {categorias.map((c) => (
            <Picker.Item key={c.value} label={c.label} value={c.value} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  picker: {
    height: 40,
    width: 120,
  },
  button: {
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: -4,
  },
});