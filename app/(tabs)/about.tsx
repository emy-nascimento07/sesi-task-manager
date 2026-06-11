import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function About() {
  const router = useRouter();
    
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.profileContainer}>
        <View style={styles.photoFrame}>
          {/* <Image 
            source={require("../../assets/images/emilly.jpg")} // Lembre de salvar sua foto com esse nome em assets/images
            style={styles.profilePhoto} 
          /> */}
        </View>
        <Text style={styles.studentName}>Emilly Raissa Nascimento</Text>
        <Text style={styles.studentRole}>Estudante de Tecnologia</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Ionicons name="school-outline" size={18} color="#96B6C5" />
          <Text style={styles.infoText}>Técnico em Desenvolvimento de Sistemas</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="book-outline" size={18} color="#96B6C5" />
          <Text style={styles.infoText}>Disciplina: PPDM</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sesi Task Manager</Text>
        <Text style={styles.description}>
          Um espaço calmo e minimalista projetado para organizar sua rotina diária, 
          permitindo visualizar e interagir com seus compromissos sem pressa e sem estresse.
        </Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Voltar ao Início</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FBF7F4",
    padding: 24,
    justifyContent: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  photoFrame: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFF",
    padding: 4,
    borderWidth: 1,
    borderColor: "#EFE9E1",
    marginBottom: 14,
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 55,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4A4744",
    textAlign: "center",
  },
  studentRole: {
    fontSize: 14,
    color: "#8A8782",
    marginTop: 2,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    shadowColor: "#5C554E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#96B6C5",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#4A4744",
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: "#6E6A64",
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: "#96B6C5",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});