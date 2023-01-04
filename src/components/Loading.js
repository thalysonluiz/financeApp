import { Center, Heading, HStack, Spinner } from "native-base";

export function Loading() {
  return (
    <Center
      flex={1}
      bgColor="#0E0D20"
    >

      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Carregando informação" />
        <Heading color="tertiary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    </Center>
  )
}