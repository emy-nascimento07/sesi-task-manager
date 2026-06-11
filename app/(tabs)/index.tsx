import { useState } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { useRouter } from "expo-router";
import InputTarefa from "../components/InputTarefa";
import ItemTarefa from "../components/ItemTarefa";
import { Tarefa } from "../types/Tarefa";

export default function Home() {
  // Início com 2 tarefas padrões
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { 
      id: "1", 
      titulo: "Prova de PPDM", 
      concluida: false, 
      data: "11/06/2026", 
      categoria: "Prova" 
    },
    {
      id: "2", 
      titulo: "Entrega de BCD", 
      concluida: false, 
      data: "11/06/2026", 
      categoria: "Atividade"
    }
  ]);

  const router = useRouter();

  // Função para adicionar tarefa
  const handleAddTask = (titulo: string, categoria: string ) => {
    const novaTarefa: Tarefa = {
      id: Date.now().toString(),
      titulo: titulo,
      concluida: false,
      data: new Date().toLocaleDateString("pt-BR") + " às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      categoria,
    };
    setTarefas([...tarefas, novaTarefa]);
  };

  // Função para "concluir" tarefa
  const handleToggleTask = (id: string) => {
    setTarefas(tarefas.map((t) => t.id === id ? { ...t, concluida: !t.concluida } : t));
  };

  // Função para deletar tarefa
  const handleDeleteTask = (id: string) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/images/logoSesi.jpg")} />
      
      <Text style={styles.appSubtitle}>SESI Task Manager</Text>
      
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Minhas Tarefas</Text>
            <InputTarefa onAddTask={handleAddTask} />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <ItemTarefa
              tarefa={item}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onPressDetail={() => router.push({
                pathname: `/details/${item.id}`,
                params: { titulo: item.titulo, categoria: item.categoria, data: item.data }
              })}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma tarefa ainda. 📝</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 150,
    height: 60,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
  },
  appSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff0000", 
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1, 
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  row: {
    marginBottom: 8,
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
});