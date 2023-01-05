import { Button, Container, Heading, Text, VStack } from "native-base";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export function Profile() {
  const { user, signOutUser } = useContext(AuthContext);


  return (

    <VStack flex={1}
      bgColor="#0E0D20"
      alignItems='center'
      paddingTop={50}
    >
      <Heading
        color="#FFF"
        marginTop={15}
      >
        {user && user.name}
      </Heading>
      <Text
        color="#DDD"
        marginY={5}
      >
        {user && user.email}
      </Text>
      <Button
        onPress={() => signOutUser()}
        bgColor="tomato"
        w="90%"
      >
        Sair
      </Button>
    </VStack>
  )
}