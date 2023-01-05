import { Button, Center, Text } from "native-base";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export function Home() {

  return (
    <Center
      flex={1}
      bgColor="#0E0D20"
    >
      <Text
        color="#FFF"
      >Home</Text>

    </Center>
  )
}