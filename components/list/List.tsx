import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { mockDataBastList2 } from './bastMockData';

const ListPageDemo = () => {
  return (
    <>
      {
        mockDataBastList2?.data?.data.map((item: any, index: number) => (
          <ListItem key={index} item={item} />
        ))
      }
    </>
  );
};

export const ListPage = ({ listData }: any) => {
  const { data, statusList } = listData
  const { data: items } = data

  return (
    <>
      {
        items?.map((item: any, index: number) => (
          <ListItem key={index} item={item} />
        ))
      }
    </>
  )
}

const TransactionContentItem = ({ title, value }: { title: string, value: string }) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'flex-start',
      // backgroundColor: 'yellow',
      // borderWidth: 1,
      // borderColor: 'red'
    }}>
      <Text variant="titleSmall" style={{
        flex: 4,
        // backgroundColor: 'red'
      }}>{title}</Text>
      <Text variant="titleSmall" style={{
        flex: 1,
        // backgroundColor: 'blue'
      }}>:</Text>
      <Text variant="bodySmall" style={{
        flex: 7,
        // backgroundColor: 'green',
        // justifyContent: 'center',
        // alignItems: 'flex-end',
      }}>{value}</Text>
    </View>
  )
}
const TransactionContentItemStatus = ({ title, value, bgColor }: { title: string, value: string, bgColor: string }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <Text variant="titleSmall" style={{
        flex: 4,
        // backgroundColor: 'red'
      }}>{title}</Text>
      <Text variant="titleSmall" style={{
        flex: 1,
        // backgroundColor: 'blue'
      }}>:</Text>
      <View style={{
        flex: 7,
        // backgroundColor: 'green',
        alignItems: 'flex-start'
      }}>
        <View style={{
          backgroundColor: bgColor,
          // width: 'auto',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 15
        }}>
          <Text variant="labelSmall" style={{ color: '#fff' }}>{value}</Text>
        </View>
      </View>
    </View>
  )
}

const ListItem = ({ item }: { item: any }) => {
  return (
    <Card mode="elevated" elevation={1} style={{ backgroundColor: '#F8F9FE', width: "100%", marginBottom: 10 }}>
      <Card.Content>
        <TransactionContentItem title={"Vendor Name"} value={item?.suplier_name} />
        <TransactionContentItem title={"BAST No."} value={item?.bast_no} />
        <TransactionContentItem title={"PO No."} value={item?.po_no} />
        <TransactionContentItem title={"DPP"} value={item?.grand_total} />
        <TransactionContentItemStatus title={"Status"} value={item?.approval_status?.status_name} bgColor={item?.approval_status?.status_color} />
      </Card.Content>
      <Card.Actions style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
        {item.action?.is_reject && <Button icon="close" style={{ flex: 1 }} >Reject</Button>}
        {
          item.action?.is_approve && (
            <Button icon="check" style={{ flex: 1 }} >Approve</Button>
          )
        }
      </Card.Actions>
    </Card>
  )
}

export default ListPageDemo;