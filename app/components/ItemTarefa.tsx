import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Tarefa } from "../types/Tarefa";

type ItemTarefaProps = {
  tarefa: Tarefa;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPressDetail: () => void;
};

export default function ItemTarefa({ tarefa, onToggle, onDelete, onPressDetail }: ItemTarefaProps) {
  
  const getBadgeColors = (cat: string) => {
    switch (cat) {
      case "Trabalho": return { bg: "#E2EAFC", text: "#5A73A3" };
      case "Prova": return { bg: "#FFDFD3", text: "#A85A44" };
      case "Atividade": return { bg: "#E2F0D9", text: "#4F7A3E" };
      case "Estudo": return { bg: "#FEF5D1", text: "#8A7321" };
      default: return { bg: "#FAF6F0", text: "#8A8782" };
    }
  };

  const badge = getBadgeColors(tarefa.categoria);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.categoryBadge, { backgroundColor: badge.bg }]} activeOpacity={0.7} onPress={onPressDetail}>
        <Text style={[styles.categoryText, { color: badge.text }]}>
          {tarefa.categoria || "Geral"}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.content} activeOpacity={0.8} onPress={() => onToggle(tarefa.id)}>
        <View style={[styles.checkbox, tarefa.concluida && styles.checkboxCompleted]}>
          {tarefa.concluida && <Ionicons name="checkmark" size={12} color="#FFF" />}
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, tarefa.concluida && styles.titleCompleted]} numberOfLines={1}>
            {tarefa.titulo}
          </Text>
          <Text style={styles.deadlineText}>Prazo: {tarefa.prazo || "Sem prazo"}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} activeOpacity={0.6} onPress={() => onDelete(tarefa.id)}>
        <Ionicons name="trash-outline" size={16} color="#C48A8A" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 20,
    shadowColor: "#5C554E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  categoryBadge: { marginRight: 12, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  categoryText: { fontSize: 12, fontWeight: "700" },
  content: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  textContainer: { flex: 1, flexDirection: "column" },
  checkbox: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: "#E3DDD5", alignItems: "center", justifyContent: "center", backgroundColor: "#FFF" },
  checkboxCompleted: { backgroundColor: "#A9B388", borderColor: "#A9B388" },
  title: { fontSize: 15, fontWeight: "500", color: "#4A4744" },
  titleCompleted: { textDecorationLine: "line-through", color: "#C2BEB8" },
  deadlineText: { fontSize: 11, color: "#8A8782", marginTop: 2 },
  deleteButton: { padding: 8, borderRadius: 12, backgroundColor: "#FDF4F4", marginLeft: 6 },
});