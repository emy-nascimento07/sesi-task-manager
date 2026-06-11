import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, TouchableWithoutFeedback } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

LocaleConfig.locales["pt-br"] = {
  monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje"
};
LocaleConfig.defaultLocale = "pt-br";

type InputTarefaProps = {
  onAddTask: (titulo: string, categoria: string, prazo: string) => void;
};

const categoriasConfig = [
  { id: "Trabalho", label: "Trabalho", bgActive: "#E2EAFC", textActive: "#5A73A3" },
  { id: "Prova", label: "Prova", bgActive: "#FFDFD3", textActive: "#A85A44" },
  { id: "Atividade", label: "Atividade", bgActive: "#E2F0D9", textActive: "#4F7A3E" },
  { id: "Estudo", label: "Estudo", bgActive: "#FEF5D1", textActive: "#8A7321" },
];

export default function InputTarefa({ onAddTask }: InputTarefaProps) {
  const [texto, setTexto] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Trabalho");
  
  const hojeBr = new Date().toLocaleDateString("pt-BR");
  const hojeIso = new Date().toISOString().split("T")[0];
  
  const [prazoExibicao, setPrazoExibicao] = useState(hojeBr); // Ex: 11/06/2026
  const [prazoSalvo, setPrazoSalvo] = useState(hojeIso); // Ex: 2026-06-11
  const [showCalendar, setShowCalendar] = useState(false);

  const handleAddTask = () => {
    if (texto.trim() === "") return;
    onAddTask(texto, categoriaSelecionada, prazoExibicao);
    setTexto("");
  };

  return (
    <View style={styles.formCard}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>O que você quer listar hoje?</Text>
        <TextInput
          style={styles.input}
          placeholder="Escreva aqui com calma..."
          placeholderTextColor="#BCB8B2"
          value={texto}
          onChangeText={setTexto}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Escolha um marcador:</Text>
        <View style={styles.chipsRow}>
          {categoriasConfig.map((cat) => {
            const isSelected = categoriaSelecionada === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.7}
                onPress={() => setCategoriaSelecionada(cat.id)}
                style={[
                  styles.chip,
                  isSelected 
                    ? { backgroundColor: cat.bgActive, borderColor: cat.bgActive } 
                    : styles.chipUnselected
                ]}
              >
                <Text style={[styles.chipText, isSelected ? { color: cat.textActive, fontWeight: "700" } : styles.chipTextUnselected]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Prazo para entrega:</Text>
        <TouchableOpacity 
          style={styles.calendarSelector} 
          activeOpacity={0.7} 
          onPress={() => setShowCalendar(true)}
        >
          <Text style={styles.calendarSelectorText}>{prazoExibicao}</Text>
          <Ionicons name="calendar-outline" size={20} color="#96B6C5" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Adicionar à lista</Text>
      </TouchableOpacity>

      <Modal visible={showCalendar} transparent animationType="fade" onRequestClose={() => setShowCalendar(false)}>
        <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.calendarContainer}>
                <Text style={styles.calendarTitle}>Selecione o prazo ✨</Text>
                <Calendar
                  current={prazoSalvo}
                  onDayPress={(day) => {
                    setPrazoSalvo(day.dateString);
                    
                    const [ano, mes, dia] = day.dateString.split("-");
                    setPrazoExibicao(`${dia}/${mes}/${ano}`);
                    setShowCalendar(false);
                  }}
                  markedDates={{
                    [prazoSalvo]: { selected: true, selectedColor: "#96B6C5", selectedTextColor: "#FFF" }
                  }}
                  theme={{
                    calendarBackground: "#FFFFFF",
                    textSectionTitleColor: "#8A8782",
                    selectedDayBackgroundColor: "#96B6C5",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "#4F7A3E",
                    dayTextColor: "#4A4744",
                    textDisabledColor: "#EFE9E1",
                    arrowColor: "#96B6C5",
                    monthTextColor: "#4A4744",
                    textDayFontWeight: "500",
                    textMonthFontWeight: "700",
                    textDayHeaderFontWeight: "600",
                    textDayFontSize: 14,
                    textMonthFontSize: 16,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: "#5C554E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    gap: 16,
    width: "100%",
  },
  inputGroup: { width: "100%" },
  label: { fontSize: 13, fontWeight: "600", color: "#7E7A74", marginBottom: 8 },
  input: {
    backgroundColor: "#FAF6F0",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    fontSize: 15,
    color: "#4A4744",
    borderWidth: 1,
    borderColor: "#EFE9E1",
  },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, borderWidth: 1 },
  chipUnselected: { backgroundColor: "#FAF6F0", borderColor: "#EFE9E1" },
  chipText: { fontSize: 13 },
  chipTextUnselected: { color: "#8A8782", fontWeight: "500" },
  calendarSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FAF6F0",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EFE9E1",
  },
  calendarSelectorText: { fontSize: 15, color: "#4A4744", fontWeight: "500" },
  button: {
    backgroundColor: "#96B6C5",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  buttonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(92, 85, 78, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  calendarContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    width: "100%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4A4744",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 4,
  }
});