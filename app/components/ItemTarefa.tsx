import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Tarefa } from "../types/Tarefa";

type ItemTarefaProps = {
  tarefa: Tarefa;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPressDetail: () => void;
};

export default function ItemTarefa({
  tarefa,
  onToggle,
  onDelete,
  onPressDetail,
}: ItemTarefaProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.category} onPress={onPressDetail}>
        <Text style={styles.categoryText}>
          {tarefa.categoria || "Sem categoria"}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.content}
        onPress={() => onToggle(tarefa.id)}
      >
        <View
          style={[styles.checkbox, tarefa.concluida && styles.checkboxCompleted]}
        />
        <Text style={[styles.title, tarefa.concluida && styles.titleCompleted]}>
          {tarefa.titulo}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(tarefa.id)}
      >
        <Text style={styles.deleteText}>❌</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  category: {
    marginRight: 8,
    backgroundColor: "#eee",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    color: "#666",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007AFF",
    marginRight: 12,
  },
  checkboxCompleted: {
    backgroundColor: "#007AFF",
  },
  title: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 20,
  },
});