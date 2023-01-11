import { Box, Skeleton, Text, VStack } from "native-base";

export function SkeletonHome() {
  return (
    <VStack
      flex={1}
      bgColor="#0E0D20"
      paddingTop={20}
    >
      <Skeleton.Text px="5" mb={5} fontSize={19} />
      <Skeleton.Text marginBottom={5}
        paddingLeft={5}
        fontSize={30}
      />

      <Text
        color="#00b94a"
        marginBottom={2}
        paddingLeft={5}
      >
        Últimas Movimentações
      </Text>
      <Box
        bgColor="#FFF"
        borderTopRadius={15}
        flex={1}
        paddingX={3}
        paddingTop={3}
        marginX={2}
      >
        <FlatList
          data={records}
          renderItem={({
            item
          }) => <RecordItem item={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Box>

    </VStack>
  )
}