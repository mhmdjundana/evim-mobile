import { View, Text, ScrollView } from "react-native";
import HeaderDetail from "./DetailHeader";
import DetailLogo from "./DetailLogo";
import DocumentDetail from "./DocumentDetail";
import DetailTable from "./DetailTable";
import DetailHistory from "./DetailHistory";

const mockData = {
    documentName: "STMM_Rob_00065_USD_200,000,00.pdf",
    specialPaymentNumber: "13287410230",
    description: "Services",
    mineralOrGeothermal: "Mineral",
    vendorDetail: "112233445566",
    currency: "IDR",
    vatApplicable: "Yes",
    amountOfWHT: "0,00",
    netPayment: "111,000,00",
    sapCompanyNumber: "STM 1492",
    vendorName: "Vendor",
    paymentAmount: "100,000,00",
    amountOfVAT: "11,000,00",
    wht: "-",
    specialPaymentPDF: "Special_payment.pdf",
    referenceNumber: "1234567890",
    requestedBy: "SAP Admin",
};

export default function Detail({logoTitle}: any) {
    return (
        <>
            {/* <ScrollView
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
        > */}
            <HeaderDetail />
            {/* <DetailLogo title={logoTitle} />
            <DocumentDetail data={mockData} />
            <DetailTable />
            <DetailHistory /> */}
            {/* </ScrollView> */}
        </>
    )
}