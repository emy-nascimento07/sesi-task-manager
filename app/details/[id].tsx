import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetalhesTarefa() {
  const { id, titulo, categoria, data, prazo } = useLocalSearchParams();
  const router = useRouter();

  const getBadgeColors = (cat: string) => {
    switch (cat) {
      case "Trabalho": return { bg: "#E2EAFC", text: "#5A73A3" };
      case "Prova": return { bg: "#FFDFD3", text: "#A85A44" };
      case "Atividade": return { bg: "#E2F0D9", text: "#4F7A3E" };
      case "Estudo": return { bg: "#FEF5D1", text: "#8A7321" };
      default: return { bg: "#FAF6F0", text: "#8A8782" };
    }
  };

  const badge = getBadgeColors(String(categoria));

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.title}>{titulo}</Text>
        
        <View style={[styles.badge, { backgroundColor: badge.bg }]}>
          <Text style={[styles.badgeText, { color: badge.text }]}>{categoria || "Geral"}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.iconWrapper}>
            <Ionicons name="time-outline" size={18} color="#8A8782" />
          </View>
          <View>
            <Text style={styles.label}>Prazo Limite</Text>
            <Text style={styles.valuePrazo}>{prazo || "Sem prazo definido"}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconWrapper}>
            <Ionicons name="calendar-clear-outline" size={18} color="#8A8782" />
          </View>
          <View>
            <Text style={styles.label}>Criada em</Text>
            <Text style={styles.value}>{data}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconWrapper}>
            <Ionicons name="key-outline" size={18} color="#8A8782" />
          </View>
          <View>
            <Text style={styles.label}>ID da Tarefa</Text>
            <Text style={styles.idValue}>{id}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Voltar para as tarefas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#FBF7F4", padding: 24, justifyContent: "center" },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#5C554E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#4A4744", marginBottom: 12 },
  badge: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 8 },
  badgeText: { fontSize: 13, fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#EFE9E1", marginVertical: 20 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 20 },
  iconWrapper: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#F5F0EA", alignItems: "center", justifyContent: "center" },
  label: { fontSize: 11, fontWeight: "600", color: "#8A8782", textTransform: "uppercase", marginBottom: 2 },
  value: { fontSize: 15, fontWeight: "500", color: "#4A4744" },
  valuePrazo: { fontSize: 15, fontWeight: "700", color: "#4F7A3E" },
  idValue: { fontSize: 13, color: "#8A8782" },
  backButton: { backgroundColor: "#96B6C5", paddingVertical: 14, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  backButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});