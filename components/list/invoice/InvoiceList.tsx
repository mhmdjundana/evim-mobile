import React from 'react';
import { getInvoiceList } from '@/fetch/invoice';
import InvoiceListUi from './invoiceListUi';
import useListData from '@/hooks/useListData';

const filterInputInvoice = [
  {
    label: "Vendor Name",
    placeholder: "Vendor Name",
    name: "suplier_name",
    id: "suplier_name",
    value: "",
  },
  {
    label: "Invoice No.",
    placeholder: "Invoice No.",
    name: "invoice_number",
    id: "invoice_number",
    value: "",
  },
  {
    label: "PO No.",
    placeholder: "PO No.",
    name: "po_no",
    id: "po_no",
    value: "",
  },
  {
    label: "DPP",
    placeholder: "DPP",
    name: "grand_total",
    id: "grand_total",
    value: "",
  },
  {
    label: "Status",
    placeholder: "Status",
    name: "status_name",
    id: "status_name",
    value: "",
  }
]


const InvoiceList: React.FC = () => {
  const listState = useListData({
    pageSize: 10,
    getList: getInvoiceList,
    filterInput: filterInputInvoice,
    module: 'invoice',
  });

  return (
    <InvoiceListUi
      listState={listState}
    />
  )
}


export default InvoiceList;
