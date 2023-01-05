import { Button, CheckIcon, FormControl, Heading, Icon, Input, Select, Text, VStack } from "native-base";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

export function NewRecord() {
  const [valor, setValor] = useState('');

  function handleRegistrar() {

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