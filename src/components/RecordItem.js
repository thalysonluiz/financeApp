import { Avatar, Badge, Box, HStack, Icon, Spacer, Text, VStack } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export function RecordItem({ item }) {
  return (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: "muted.50"
      }}
      borderColor="muted.800"
      pl={["0", "4"]}
      pr={["0", "5"]}
      py="2"
    >
      <HStack justifyContent="space-between">

        <VStack>
          <Badge colorScheme={item.status == 'receita' ? 'success' : 'error'}
            alignSelf="center"
            variant='solid'
            borderRadius={5}
          >
            <HStack
              color="#FFF"
              justifyContent='space-between'
              alignItems='center'
            >
              <Icon as={<MaterialIcons name={item.status == 'receita' ? "north" : "south"} />} size={3} mr="2" color="#FFF" />

              {item.status}
            </HStack>
          </Badge>
          <Text color="coolGray.900" _dark={{
            color: "warmGray.200"
          }}
            marginTop={2}
            fontStyle='bold'
            fontSize={16}
          >
            R$ {item.valor}
          </Text>
        </VStack>
        <Spacer />
        <Text fontSize="xs" _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" alignSelf="flex-start">
          {item.timeStamp}
        </Text>
      </HStack>
    </Box>
  )
}