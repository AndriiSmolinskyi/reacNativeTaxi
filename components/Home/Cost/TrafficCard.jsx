import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const nameMap = {
  'Базовый': 'Базовий',
  'Универсал': 'Універсал',
  'Бизнес-класс': 'Бізнес',
  'Микроавтобус': 'Мікроавтобус',
  'Премиум-класс': 'Преміум',
  'Эконом-класс': 'Економ',
};

export const TrafficCard = ({ tariffData, selectedTariff, setSelectedTariff }) => {
  const { flexible_tariff_name, order_cost_details } = tariffData;
  const formattedTariffName = nameMap[flexible_tariff_name] || flexible_tariff_name;

  const iconMap = {
    'Базовий': 'car',
    'Універсал': 'car',
    'Бізнес': 'car',
    'Мікроавтобус': 'bus',
    'Преміум': 'car',
    'Економ': 'car',
  };

  const iconName = iconMap[formattedTariffName] || 'car';

  const isActive = selectedTariff && selectedTariff.flexible_tariff_name === flexible_tariff_name;

  const selectTariff = () => {
    setSelectedTariff(tariffData);
  };

  return (
    <View style={[styles.card, isActive && styles.activeCard]}>
      <TouchableOpacity onPress={selectTariff} style={styles.card__block}>
        <Icon name={iconName} size={35} color="#4CE5B1" />
        <Text style={styles.tariffName}>{formattedTariffName}</Text>
        <Text style={styles.tariff__price}>{order_cost_details.order_cost}{order_cost_details.currency}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "#31ac83",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    marginTop: 2,
  },
  activeCard: {
    elevation: 4, // Додаємо тінь лише для активного елемента
  },
  card__block: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 100,
  },
  tariffName: {
    marginTop: 4,
    marginBottom: 4,
    color: '#8a8a8b',
    fontSize: 16,
  },
  tariff__price: {
    color: '#C8C7CC',
    fontSize: 14,
  },
});