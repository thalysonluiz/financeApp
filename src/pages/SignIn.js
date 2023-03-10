import { useContext, useState } from "react";
import { Button, Center, Heading, Icon, Image, Input, Link, Pressable, Text } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/auth";

export function SignIn() {
  const navigation = useNavigation();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  function handleSignIn() {
    setButtonLoading(true);
    signIn(email, password)
      .catch((error) => {
        setButtonLoading(false);
      });
  }

  return (
    <Center
      flex={1}
      bgColor="#0E0D20"
    >

      <Image
        source={require('../assets/Logo.png')}
        alt="Nota de dinheiro"
        size="md"
        borderRadius={200}
        marginBottom={15}
      />
      <Heading
        marginBottom={5}
        color="#FFF"
      >
        Entre na sua Conta
      </Heading>
      <Input w="90%"
        InputLeftElement={
          <Icon as={<MaterialIcons name="mail" />}
            size={5}
            ml="2"
            color="muted.400" />
        }
        placeholder="Email"
        marginBottom={5}
        color="#FFF"
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        marginBottom={5}
        w="90%"
        type={show ? "text" : "password"}
        InputLeftElement={
          <Icon as={<MaterialIcons name="lock" />}
            size={5}
            ml="2"
            color="muted.400" />
        }
        InputRightElement={<Pressable onPress={() => setShow(!show)}>
          <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
        </Pressable>}
        placeholder="Senha"
        color="#FFF"
        autoCorrect={false}
        autoCapitalize="none"
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Button
        onPress={handleSignIn}
        bgColor="#34b67f"
        w="90%"
        justifyContent="center"
        alignItems="center"
        borderRadius={5}
        height={45}
        fontWeight="bold"
        marginBottom={15}
        color="#FFF"
        fontSize={16}
        isLoading={buttonLoading}
      >

        Entrar
      </Button>
      <Link _text={{
        fontSize: "xl",
        _light: {
          color: "cyan.500"
        },
        color: "cyan.300"
      }} onPress={() => navigation.navigate('SignUp')} isUnderlined _hover={{
        _text: {
          _light: {
            color: "cyan.600"
          },
          color: "cyan.400"
        }
      }}>
        Criar uma conta.
      </Link>
    </Center>
  )
}
