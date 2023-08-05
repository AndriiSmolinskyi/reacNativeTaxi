import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { ServerApi } from '../../ServerApi';

export const RegisterPhoneScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [phone, setPhone] = useState('');

  // const handleNext = async () => {
  //   try {
  //     const response = await axios.post(`${ServerApi}/account/register/sendConfirmCode`, {
  //       phone: `380${phone}`,
  //     });
  
  //     if (response.status === 200) {
  //       setUser({ phone: `380${phone}` });
  //       navigation.navigate('RegisterData');
  //     } else {
  //       console.error('Error sending code:', response.data);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       // Server responded with a status code outside of the 2xx range
  //       console.error('Server Error:', error.response.data);
  //       console.error('Status Code:', error.response.status);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.error('Request Error:', error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.error('Error:', error.message);
  //     }
  //     Alert.alert('Помилка', 'Сталася помилка при відправці запиту');
  //   }
  // };
  const handleNext = async () => {
    try {
      const response = await axios.post(`${ServerApi}/account/register/sendConfirmCode`, {
        phone: `380${phone}`,
      });
  
      if (response.status === 200) {
        setUser({ phone: `380${phone}` });
        navigation.navigate('RegisterData');
      } else {
        console.error('Error sending code:', response.data);
        Alert.alert('Помилка', 'Сталася помилка при відправці запиту');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          const errorData = error.response.data;
          const errorMessage = errorData.Message || 'Невідома помилка';
          
          if (errorData.Id === -32) {
            Alert.alert('Помилка', 'Користувач з таким номером телефону вже зареєстрований');
          } else if (errorData.Id === -34) {
            Alert.alert('Помилка', 'Невірний формат номера телефону');
          } else {
            console.error('Bad Request Error:', errorData);
            Alert.alert('Помилка', errorMessage);
          }
        } else {
          console.error('Server Error:', error.response.data);
          console.error('Status Code:', error.response.status);
          Alert.alert('Помилка', 'Сталася помилка при відправці запиту');
        }
      } else if (error.request) {
        console.error('Request Error:', error.request);
        Alert.alert('Помилка', 'Сталася помилка при відправці запиту');
      } else {
        console.error('Error:', error.message);
        Alert.alert('Помилка', 'Сталася помилка при відправці запиту');
      }
    }
  };
  
  const isNextButtonDisabled = phone.length !== 9;

  return (
    <View style={styles.container}>
      <Text>Етап 1: Введіть телефонний номер</Text>
      <View style={styles.phoneInputContainer}>
        <Text style={styles.phonePrefix}>+380</Text>
        <TextInput
          style={styles.phoneInput}
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
          maxLength={9}
        />
      </View>
      <Button title="Далі" onPress={handleNext} disabled={isNextButtonDisabled} />
      <Button title="Have account? Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    padding: 5,
    marginVertical: 10,
  },
  phonePrefix: {
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
  },
});

export default RegisterPhoneScreen;