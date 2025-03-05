import { Alert, ScrollView, Text, View } from "react-native";
import { InputText, InputTextStyle2 } from "../input";
import { RadioButtonHorizontal } from "./RadioButton";
import { useEffect, useState } from "react";
import DocumentDetail from "@/components/detail/DocumentDetail";
import DocumentDetailBastSapEdit from "@/components/detail/DocumentDetailBastSapEdit";
import { mockData, mockHistory, mockDataAll } from "../../../components/detail/BastDetailMockData"
import BastDocFileDetail from "@/components/detail/BastDocFileDetail";
import DocumentDetailBastSapEditFiles from "@/components/detail/DocumentDetailBastSapEditFiles";
import { ActionButton } from "@/components/button/ActionButton";
import DetailTable from "@/components/detail/DetailTable";
import { RnDropDownPicker, RnPicker } from "@/components/input/dropdown";
import { router, useLocalSearchParams } from "expo-router";
import api from "@/fetch/axios";
import { getBastById } from "@/fetch/bast";
import { useValueDropDown } from "@/components/input/useValueDropDown";
import { Formik } from 'formik';
import { sapAdminBastEditSchema } from "./validation/sapAdminValidation";

export default function BastForm() {
  const [gs, setGs] = useState('');
  // console.log(gs, "gs")
  const [subCompany, setSubCompany] = useState('');
  // console.log(typeof subCompany, "subCompany")
  const company: any = "STM"
  const { id } = useLocalSearchParams()
  console.log(id, "params id")
  const [data, setData] = useState<any>([]);
  // const [bastData, setBastData] = useState<any>([])
  const [bastData, setBastData] = useState<any>([])
  const [bastDataInitial, setBastDataInitial] = useState<any>([])
  // console.log(bastData.gl_no, "bastData")
  // const [bastDataSubmit, setBastDataSubmit] = useState<any>([])
  const { items: glList,
    setItems: setGlList,
    value: glValue,
    setValue: setGlValue, } = useValueDropDown()
  const { items: wbsList,
    setItems: setWbsList,
    value: wbsValue,
    setValue: setWbsValue, } = useValueDropDown()
  const { items: costCenterList,
    setItems: setCostCenterList,
    value: costCenterValue,
    setValue: setCostCenterValue, } = useValueDropDown()

  const gsOptions = [
    { label: 'Goods', value: '1', disabled: true },
    { label: 'Services', value: '2', disabled: true },
  ];
  const subCompanyOptions = [
    { label: 'Mineral', value: '1', disabled: false },
    { label: 'Geothermal', value: '2', disabled: false },
  ];

  useEffect(() => {
    if (data?.data?.id) {
      // console.log(data.data?.id, "data")
      setGs(data.data?.good_or_services)
      setSubCompany(data.data?.company_sub_id)
      // setBastData(data.data)
      setBastData({
        ...data.data,
        gl_no: data.data?.gl_no ? JSON.parse(data.data?.gl_no?.replace(/(["'[\]])+/g, "")?.split(",")) : data.data?.gl_no,
        wbs_no: data.data?.wbs_no ? JSON.parse(data.data?.wbs_no?.replace(/(["'[\]])+/g, "")?.split(",")) : data.data?.wbs_no,
        coscenter_no: data.data?.coscenter_no ? JSON.parse(data.data?.coscenter_no?.replace(/(["'[\]])+/g, "")?.split(",")) : data.data?.coscenter_no,
      })
      setBastDataInitial({
        ...data.data,
        gl_no: data.data?.gl_no ? JSON.parse(data.data?.gl_no?.replace(/(["'[\]])+/g, "")?.split(",")) : data.data?.gl_no,
        wbs_no: data.data?.wbs_no ? JSON.parse(data.data?.wbs_no?.replace(/(["'[\]])+/g, "")?.split(",")) : data.data?.wbs_no,
        coscenter_no: data.data?.coscenter_no ? JSON.parse(data.data?.coscenter_no?.replace(/(["'[\]])+/g, "")?.split(",")) : data.data?.coscenter_no,
      })
    }
    if (data?.gl_list) {
      // console.log(data.gl_list, "gl_list")
      setGlList((prev: any) => (
        data.gl_list?.map((item: any) => ({
          // key: item.gl_code,
          label: item.gl_code + " - " + item.gl_name,
          value: item.gl_code,
        }))
      ))
    }
    if (data?.wbs_list) {
      setWbsList((prev: any) => (
        data.wbs_list?.map((item: any) => ({
          // key: item.gl_code,
          label: item.wbs_code + " - " + item.wbs_name,
          value: item.wbs_code,
        }))
      ))
    }
    if (data?.cost_center_list) {
      setCostCenterList((prev: any) => (
        data.cost_center_list?.map((item: any) => ({
          // key: item.gl_code,
          label: item.code + " - " + item.names,
          value: item.code,
        }))
      ))
    }
  }, [data])

  useEffect(() => {
    if (id) {
      // getBastByIdEdit()
      getBastById({
        setData,
        id,
        company,
        isGetDepartmentData: true,
        isGetUomData: true,
        isGetWbsData: true,
        isGetCostCenterData: true,
        isGetGlData: true,
      })
    }
  }, [id])

  return (
    <ScrollView style={{ width: "100%", marginBottom: 50, backgroundColor: "#fff" }}>
      <Formik
        validationSchema={sapAdminBastEditSchema}
        initialValues={bastDataInitial}
        enableReinitialize
        onSubmit={values => {
          const data = { ...values }
          // console.log(values, 'submit values')
          data.gl_no = JSON.stringify(data.gl_no)?.replace(/\"/g, "")
          data.wbs_no = JSON.stringify(data.wbs_no)?.replace(/\"/g, "")
          data.cost_center = JSON.stringify(data.cost_center)?.replace(/\"/g, "")
          console.log(data, "submit data")
          const updateBast = async (data: any) => {
            try {
              const res = await api.post(`bast/update`, [data])
              console.log(res.data, "update bast")
              // console.log(res.status, "update bast")
              if (res.data?.success) {
                router.replace(`/bast`)
              } else {
                Alert.alert("Error", res.data?.message)
              }
            } catch (error) {
              console.error("Error updating bast:", error)
            }
          }
          updateBast(data)
        }}
      >
        {
          ({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setValues,
            setFieldValue,
            touched,
          }) =>
            <>
              <View style={{ padding: 10 }}>
                <InputText
                  label="BAST No."
                  placeholder="BAST No."
                  value={values.bast_no}
                  disabled
                  style={{ marginBottom: 10 }}
                />
                <InputText
                  label="Department"
                  placeholder="Department"
                  value={values.department?.name}
                  disabled
                  style={{ marginBottom: 15 }}
                />
                <RadioButtonHorizontal
                  options={gsOptions}
                  selectedValue={gs}
                  setSelectedValue={setGs}
                  style={{ marginBottom: 15, }}
                />
                <RadioButtonHorizontal
                  options={subCompanyOptions}
                  selectedValue={subCompany}
                  setSelectedValue={setSubCompany}
                  style={{ marginBottom: 15 }}
                />
                <InputText
                  label="MIGO / SES No."
                  placeholder="MIGO / SES"
                  required
                  style={{ marginBottom: 10 }}
                  value={values.migo_or_ses}
                  onChangeText={handleChange('migo_or_ses')}
                  onBlur={handleBlur('migo_or_ses')}
                  error={errors.migo_or_ses}
                />
                {/* <InputText label="GL No." placeholder="GL" required style={{ marginBottom: 10 }} /> */}
                <RnDropDownPicker label="GL No."
                  value={glValue}
                  setValue={setGlValue}
                  onChangeValue={(value: any) => {
                    setBastData((prev: any) => {
                      return {
                        ...prev,
                        gl_no: value,
                      };
                    });
                    setFieldValue('gl_no', value);
                    // setValues((prev: any) => (
                    //   { ...prev, gl_no: value }
                    //))
                  }}
                  items={glList}
                  setItems={() => { }}
                  required
                  error={errors.gl_no}
                  styles={{ marginBottom: 10 }}
                />
                {
                  company === "STM" ? (
                    <>
                      <RnDropDownPicker label="WBS No."
                        value={wbsValue}
                        setValue={setWbsValue}
                        onChangeValue={(value: any) => {
                          setBastData((prev: any) => (
                            { ...prev, wbs_no: value }
                          ))
                          setFieldValue('wbs_no', value)
                        }}
                        items={wbsList}
                        setItems={() => { }}
                        required
                        error={errors.wbs_no}
                        styles={{ marginBottom: 10 }}
                      />
                      {/* <InputText label="WBS No." placeholder="WBS" required style={{ marginBottom: 10 }} /> */}
                    </>
                  ) : (
                    <>
                      <RnDropDownPicker label="Cost Center No." value={costCenterValue} setValue={setCostCenterValue}
                        onChangeValue={(value: any) => {
                          setBastData((prev: any) => (
                            { ...prev, coscenter_no: value }
                          ))
                          setFieldValue('coscenter_no', value)
                        }}
                        items={costCenterList} setItems={() => { }}
                        styles={{ marginBottom: 10 }}
                        required
                        error={errors.coscenter_no}
                      />
                      {/* <InputText label="Cost Center No." placeholder="Cost Center" required style={{ marginBottom: 10 }} /> */}
                    </>
                  )
                }
                <InputText
                  label="PO No."
                  placeholder="PO"
                  required
                  style={{ marginBottom: 10 }}
                  value={values.po_no}
                  onChangeText={handleChange('po_no')}
                  onBlur={handleBlur('po_no')}
                  error={errors.po_no}
                />
              </View>
              <DocumentDetailBastSapEdit data={bastData} />
              <DocumentDetailBastSapEditFiles data={bastData} />
              <DetailTable data={bastData}
                setData={setBastData}
                style={{ marginTop: 30 }}
                uomList={data.uom_list}
                permission={{
                  description: true,
                  uom_name: true,
                  qty: false,
                  currency_code: false,
                  unit_price: false,
                  total_value: false,
                  is_reimbursement: true,
                  reason: false,
                  comment: false,
                }}
              />
              {/* <RnDropDownPicker /> */}
              {/* <RnPicker /> */}
              <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 20 }}>
                <ActionButton type="reject" onPress={() => {
                  handleSubmit()
                }} />
                <ActionButton type="submit" onPress={handleSubmit} />
              </View>
            </>
        }
      </Formik>
    </ScrollView>
  );
}