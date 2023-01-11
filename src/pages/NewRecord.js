import { Button, CheckIcon, FormControl, Heading, Icon, Input, Select, Text, VStack } from "native-base";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { format } from "date-fns"

import Ionicons from 'react-native-vector-icons/Ionicons';

import { getAuth } from "firebase/auth";
import { child, getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";

import { firebase } from '../services/firebase/connection'
import { useNavigation } from "@react-navigation/native";

const auth = getAuth(firebase);
const database = getDatabase(firebase);


export function NewRecord() {
  const navigation = useNavigation();

  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');


  function handleRegistrar() {
    Keyboard.dismiss();
    if (isNaN(parseFloat(valor)) || tipo === null) {
      alert('Preencha todos os campos!');
      return;
    }

    /* Alert.alert(
      'Confirmando dados',
      `Tipo ${tipo} - Valor: ${parseFloat(valor)}`
      [{
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Continuar',
        onPress: () => handleAdd()
      }]
    ) */
    handleAdd();
  }

  async function handleAdd() {
    const uid = auth.currentUser.uid;

    const newRecordRef = push(child(ref(database, 'records/'), uid));
    //console.log(newRecordRef.key);
    await set(newRecordRef, {
      tipo,
      valor: parseFloat(valor),
      data: format(new Date(), 'dd/MM/yyyy')
    });

    const usuariosRef = ref(database, 'users/' + uid);
    onValue(usuariosRef, (snapshot) => {
      let balance = parseFloat(snapshot.val().balance);

      tipo === 'despesa' ? balance -= parseFloat(valor) : balance += parseFloat(valor)

      atualizaDados(uid, balance);
    }, {
      onlyOnce: true
    });

    Keyboard.dismiss();
    setValor('');
    navigation.navigate('Home');
  }

  async function atualizaDados(userId, balance) {
    await update(ref(database, 'users/' + userId), {
      balance
    });
  }

  return (
    <VStack flex={1}
      bgColor="#0E0D20"
      alignItems='center'
      paddingTop={50}
    >
      <Heading
        color="#FFF"
        margin={15}
      >
        Adicionar Registro
      </Heading>
      <Input
        w="350"
        InputLeftElement={
          <Icon as={<Ionicons name="cash-outline" />}
            size={5}
            ml="2"
            color="muted.400" />
        }
        placeholder="Valor"
        marginBottom={5}
        color="#FFF"
        autoCorrect={false}
        autoCapitalize="none"
        value={valor}
        onChangeText={text => setValor(text)}
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={() => Keyboard.dismiss()}
      />

      <Select
        w="350"
        accessibilityLabel="Escolha o Tipo"
        placeholder="Escolha o Tipo"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size={5} />
        }}
        mb="5"
        InputLeftElement={
          <Icon as={<Ionicons name="pulse-outline" />}
            size={5}
            ml="2"
            color="muted.400" />
        }
        onValueChange={(value) => setTipo(value)}
        selectedValue={tipo}
        color="#FFF"
      >
        <Select.Item label="Receita" value="receita" />
        <Select.Item label="Despesa" value="despesa" />
      </Select>

      <Button
        onPress={handleRegistrar}
        bgColor="tomato"
        w="350"
      >
        Registrar
      </Button>
    </VStack>
  )
}