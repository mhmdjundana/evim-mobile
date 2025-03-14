import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import InvoiceDetail from '@/components/detail/DocumentDetail';
import DetailInvoiceNew from '@/components/detail/DetailInvoiceNew';
import TopBarLayout from '@/components/layout/TopBarLayout';

const DetailInvoice = () => {
  return (
    <TopBarLayout>
      <ScrollView
        style={{
          // flex: 1,
          // justifyContent: "flex-start",
          // alignItems: "center",
          backgroundColor: "#eee",
          padding: 0,
          margin: 0,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <DetailInvoiceNew />
      </ScrollView >
    </TopBarLayout>
  );
};

export default DetailInvoice;