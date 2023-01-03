import { Center, Heading, HStack, Spinner } from "native-base";

export function Loading() {
  return (
    <Center flex={1}>

      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Carregando informação" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    </Center>
  )
}