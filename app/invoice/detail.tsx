import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import InvoiceDetail from '@/components/detail/DocumentDetail';
import DetailInvoiceNew from '@/components/detail/DetailInvoiceNew';
import TopBarLayout from '@/components/layout/TopBarLayout';

const DetailInvoice = () => {
  return (
    <TopBarLayout>
        <DetailInvoiceNew />
    </TopBarLayout>
  );
};

export default DetailInvoice;