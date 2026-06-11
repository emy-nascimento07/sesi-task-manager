import { StyleSheet, Text, View, Button } from "react-native";
import { useRouter } from "expo-router"; // <-- Corrigido aqui: mudou de Router para useRouter

export default function About() {
  const router = useRouter(); // <-- Agora o React Native vai reconhecer essa função perfeitamente
    
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Sesi Task Manager</Text>

      <Text style={styles.studentName}>Emilly Raissa Nascimento</Text>
      <Text style={styles.text}>
        Curso: Técnico em Desenvolvimento de Sistemas
      </Text>
      <Text style={styles.text}>Disciplina: PPDM</Text>

      <Text style={styles.description}>
        Aplicativo desenvolvido para um desafio para visualizar, detalhar e
        interagir com uma lista de tarefas.
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  appName: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 24,
  },
});