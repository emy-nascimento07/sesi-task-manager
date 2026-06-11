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
    <View style={styles.formCard}>
      {/* Bloco do Campo de Texto */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>O que precisa fazer?</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Estudar para a prova..."
          placeholderTextColor="#999"
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={handleAddTask}
        />
      </View>

      {/* Bloco do Seletor de Categoria */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Categoria</Text>
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
      </View>

      {/* Botão de Adicionar Largo */}
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    gap: 14, // Cria espaçamento perfeito entre cada bloco vertical
  },
  inputGroup: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    color: "#333",
  },
  pickerContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});