import { Box, Button, Center, FlatList, Text, VStack } from "native-base";
import { useContext, useEffect, useState } from "react";
import { RecordItem } from "../components/RecordItem";
import { AuthContext } from "../contexts/auth";
import { firebase } from "../services/firebase/connection";

import { getDatabase, limitToLast, onValue, orderByChild, query, ref } from "firebase/database";


const data = [{
  id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  valor: 10.5,
  timeStamp: "12:47 PM",
  status: "despesa"
}, {
  id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  valor: 54.3,
  timeStamp: "11:11 PM",
  status: "receita"
}, {
  id: "58694a0f-3da1-471f-bd96-145571e29d72",
  valor: 5.0,
  timeStamp: "6:22 PM",
  status: "despesa"
}, {
  id: "68694a0f-3da1-431f-bd56-142371e29d72",
  valor: 8.6,
  timeStamp: "8:56 PM",
  status: "despesa"
}, {
  id: "28694a0f-3da1-471f-bd96-142456e29d72",
  valor: 100.89,
  timeStamp: "12:47 PM",
  status: "receita"
}];

const database = getDatabase(firebase);

export function Home() {
  const { user } = useContext(AuthContext);

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userBalance, setUserBalance] = useState(0)

  function listUserBalance() {
    const usuariosRef = ref(database, 'users/' + user.uid);
    onValue(usuariosRef, (snapshot) => {
      const balance = parseFloat(snapshot.val().balance);
      setUserBalance(balance);
    }, {
      onlyOnce: true
    });
  }

  function listRecords() {
    const recordsRef = query(ref(database, 'records/' + user.uid), orderByChild('data'), limitToLast(10));
    onValue(recordsRef, (snapshot) => {
      /* const data = snapshot.toJSON();
      console.log(data); */

      setRecords([])
      snapshot.forEach(item => {
        const list = {
          id: item.key,
          valor: item.val().valor,
          tipo: item.val().tipo,
          data: item.val().data
        }

        setRecords(oldArray => [
          ...oldArray,
          list
        ]);
        //console.log(list);

      })
    });

  }

  useEffect(() => {
    listUserBalance();
    listRecords();
    setLoading(false);
  }, [])

  return (
    <VStack
      flex={1}
      bgColor="#0E0D20"
      paddingTop={20}
    >
      <Text
        color="#FFF"
        marginBottom={5}
        paddingLeft={5}
        fontSize={19}
        fontStyle="italic"
      >
        {user.name ?? ''}
      </Text>
      <Text
        color="#FFF"
        marginBottom={5}
        paddingLeft={5}
        fontSize={30}
        fontWeight='bold'
      >
        R$ {userBalance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') ?? 0}
      </Text>
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