import { useState } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { useRouter } from "expo-router";
import InputTarefa from "../components/InputTarefa";
import ItemTarefa from "../components/ItemTarefa";
import { Tarefa } from "../types/Tarefa";

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: "1", titulo: "Prova de PPDM", concluida: false, data: "11/06/2026", categoria: "Prova", prazo: "Hoje" },
    { id: "2", titulo: "Entrega de BCD", concluida: false, data: "11/06/2026", categoria: "Atividade", prazo: "Esta semana" }
  ]);

  const router = useRouter();

  const handleAddTask = (titulo: string, categoria: string, prazo: string) => {
    const novaTarefa: Tarefa = {
      id: Date.now().toString(),
      titulo: titulo,
      concluida: false,
      data: new Date().toLocaleDateString("pt-BR") + " às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      categoria,
      prazo,
    };
    setTarefas([...tarefas, novaTarefa]);
  };

  const handleToggleTask = (id: string) => {
    setTarefas(tarefas.map((t) => t.id === id ? { ...t, concluida: !t.concluida } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Image style={styles.logo} source={require("../../assets/images/logoSesi.jpg")} />
            <Text style={styles.title}>Minhas Tarefas</Text>
            <InputTarefa onAddTask={handleAddTask} />
          </View>
        }
        renderItem={({ item }) => (
          <ItemTarefa
            tarefa={item}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onPressDetail={() => router.push({
              pathname: `/details/${item.id}`,
              params: { titulo: item.titulo, categoria: item.categoria, data: item.data, prazo: item.prazo }
            })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma tarefa ainda. 📝</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF7F4",
  },
  listContent: {
    padding: 20,
  },
  header: {
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 44,
    resizeMode: "contain",
    marginBottom: 16,
    opacity: 0.85,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4A4744",
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
});