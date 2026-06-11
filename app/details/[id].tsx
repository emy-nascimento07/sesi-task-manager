import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";

export default function DetalhesTarefa() {
  const { id, titulo, categoria, data } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.text}>Categoria: {categoria || "Sem Categoria"}</Text>
      <Text style={styles.text}>Criada em: {data}</Text>
      <Text style={styles.text}>ID: {id}</Text>
      
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 24,
  },
});