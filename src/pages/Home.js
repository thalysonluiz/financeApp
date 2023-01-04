import { Button, Center, Text } from "native-base";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export function Home() {
  const { signOutUser } = useContext(AuthContext);

  function handleSignOut() {
    signOutUser();
  }

  return (
    <Center>
      <Text>Home</Text>
      <Button onPress={handleSignOut}>Sair</Button>
    </Center>
  )
}