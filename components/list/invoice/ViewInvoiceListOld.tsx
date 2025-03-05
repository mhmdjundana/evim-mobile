import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, TouchableHighlight, RefreshControl, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon library
import HeaderTitle from '../HeaderTitle';
import FilterButton from '../filter/Filter';
import api from '@/fetch/axios';
import axios from 'axios';
import { router } from 'expo-router';
import { mockDataBastList } from '../bastMockData';
import { login, relogin, retrieveEmailPassword, retriveAccessToken } from '@/fetch/auth';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { getBastList } from '@/fetch/bast';
import { displayDate } from '@/utils/utils';
import { useGetUserData } from '@/hooks/useGetUserData';

interface RowData {
  id: string;
  bast_no: string;
  created_at: string;
  migo_or_ses: string;
  company_sub_id: string;
  suplier_name: string;
  currency_code: string;
  grand_total: string;
  department: any;
  status_name: string;
  action: any;
  approval_status: any;
  vendor_code: any;
}

export default function ViewInvoiceListOld({data, userData, handleLoadMore, isLoading}: any) {
  return (
    <View style={styles.container}>
      <HeaderTitle title="List Invoice" />
      <FilterButton />
      <ScrollView horizontal>
        <View style={{ flex: 1, width: 1200, marginBottom: 100, marginTop: 4 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<ListHeader />}
            renderItem={({ item }) => <ListRow item={item} userData={userData} />}
            ListFooterComponent={RenderFooter({ isLoading })}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.7}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => { console.log("refresh") }}
              />
            }
          />
        </View>
      </ScrollView>
    </View>
  )
}

const ListRow: React.FC<{ item: RowData, userData: any }> = ({ item, userData }) => (
  <TouchableOpacity style={styles.row} onPress={() => {
    router.push({ pathname: `/bast/detail`, params: { id: item.id } })
  }}>
    {/* Action Button */}
    {/* <TouchableOpacity style={styles.actionButton}>
      <View >✏️</View>
    </TouchableOpacity> */}

    {/* Data Cells */}
    <View style={[styles.viewCell]}>
      <Text style={[styles.cell, styles.status, { backgroundColor: item.approval_status?.status_color }]}>{item.status_name}</Text>
    </View>
    <View style={[styles.actionContainer]}>
      {
        item.action?.is_approve && (
          <TouchableOpacity onPress={() => {
            console.log("approve")
            router.push({
              pathname: `/confirmation`,
              params: {
                id: item.id,
                type: "approval",
                data: JSON.stringify([{
                  // "bast_id": item?.id,
                  "id": item?.id,
                  // "approval_status_id": item?.approval_status?.id,
                  "module_id": 1,
                  // "user_id": userData?.data?.id,
                  // "vendor_code": item?.vendor_code,
                  "type": "approve"
                }]),
                module: "bast"
              }
            })
          }}>
            <Icon name="check" size={20} color="#228B22" />
          </TouchableOpacity>
        )
      }
      {
        item.action?.is_reject && (
          <TouchableOpacity onPress={() => {
            console.log("reject")
            router.push({
              pathname: `/confirmation`,
              params: {
                id: item.id,
                type: "rejection",
                data: JSON.stringify([{
                  // "bast_id": item?.id,
                  "id": item?.id,
                  // "approval_status_id": item?.approval_status?.id,
                  "module_id": 1,
                  // "user_id": userData?.data?.id,
                  // "vendor_code": item?.vendor_code,
                  "type": "reject",
                }]),
                module: "bast"
              }
            })
          }}>
            <Icon name="close" size={20} color="#DC143C" />
          </TouchableOpacity>
        )
      }
      {
        item.action?.is_edit && (
          <TouchableOpacity
            onPress={() => {
              console.log("edit")
              router.push({ pathname: `/bast/form`, params: { id: item.id } })
            }}
          >
            <FontAwesome6 name="pen-to-square" size={20} color="#757575" />
          </TouchableOpacity>
        )
      }
    </View>
    <Text style={styles.cell}>{item.bast_no}</Text>
    <Text style={styles.cell}>{displayDate(item.created_at)}</Text>
    <Text style={styles.cell}>{item.migo_or_ses}</Text>
    <Text style={styles.cell}>{item.company_sub_id === "1" ? "Mineral" : item.company_sub_id === "2" ? "Geothermal" : ""}</Text>
    <Text style={styles.cell}>{item.suplier_name}</Text>
    <Text style={styles.cell}>{item.currency_code}</Text>
    <Text style={styles.cell}>{item.grand_total}</Text>
    <Text style={styles.cell}>{item.department?.name}</Text>
  </TouchableOpacity>
);

const ListHeader: React.FC = () => (
  <View style={styles.header}>
    {[
      'Status',
      'Action',
      'Doc No.',
      'Created Date',
      'MIGO/SES',
      'Mineral/Geothermal',
      'Supplier Name',
      'Currency',
      'Amount',
      'Department',
    ].map((title, index) => (
      <Text key={index} style={styles.headerText}>
        {title}
      </Text>
    ))}
  </View>
);

const RenderFooter = ({ isLoading }: any) => {
  if (isLoading) {
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: 'yellow',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  actionButton: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    // fontSize: 18,
    color: 'blue',
  },
  viewCell: {
    flex: 1,
    alignItems: 'center',
    padding: "auto",
    // backgroundColor: 'red',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    // backgroundColor: 'yellow',
  },
  status: {
    // backgroundColor: '#fdd835',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: '500',
    // height: 10,
    color: '#fff',
  },
  actionContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    // width: 80,
  },
});