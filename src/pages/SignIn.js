import { useState } from "react";
import { Center, Heading, Icon, Image, Input, Pressable, Text, VStack } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function SignIn() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Center
      flex={1}
    >

      <Image
        source={require('../assets/Logo.png')}
        alt="Nota de dinheiro"
        size="md"
        borderRadius={200}
        marginBottom={15}
      />
      <Heading
        marginBottom={5}>Entre na sua Conta</Heading>
      <Input w="90%"
        InputLeftElement={
          <Icon as={<MaterialIcons name="mail" />}
            size={5}
            ml="2"
            color="muted.400" />
        }
        placeholder="Email"
        marginBottom={5}
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        marginBottom={5}
        w="90%"
        type={show ? "text" : "password"}
        InputRightElement={<Pressable onPress={() => setShow(!show)}>
          <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
        </Pressable>}
        placeholder="Senha"
        autoCorrect={false}
        autoCapitalize="none"
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Pressable
        onPress={() => setShow(!show)}
        bgColor="#34b67f"
        w="90%"
        justifyContent="center"
        alignItems="center"
        borderRadius={5}
        height={45}
        fontWeight="bold"
      >
        <Text color="#FFF" fontSize={16}>

          Entrar
        </Text>
      </Pressable>
    </Center>
  )
}
