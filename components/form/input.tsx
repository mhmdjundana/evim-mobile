import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';

export const InputText = ({
  error = false,
  onBlur = () => { },
  required = false,
  label = "Input Label",
  placeholder = "Input Placeholder",
  disabled = false,
  onChangeText = () => { },
  style = {},
  value = "",
  index,
}: any) => {
  return (
    <View style={{ ...style }}>
      <Text style={{ fontSize: 14, fontWeight: '500', color: '#444', paddingLeft: 4 }}>{label}{required && <Text style={{ color: 'red' }}>*</Text>}</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: error ? 'red' : '#444',
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          backgroundColor: disabled ? '#f0f0f0' : 'white',
        }}
        placeholder={placeholder}
        editable={!disabled}
        onChangeText={onChangeText}
        value={value}
        onBlur={onBlur}
      />
      {error && <Text style={{
        color: 'red',
        // backgroundColor: '#ffecec', 
        paddingLeft: 6,
        fontSize: 14
      }}>{error}</Text>}
    </View>
  )
}
export const InputTextStyle2 = () => {
  return (
    <>
      <Text>BAST No.</Text>
      <TextInput value="1234" editable={false} style={{
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      }} />
      <Text>PO No.</Text>
      <TextInput value={"poNo"} onChangeText={() => { }} style={{
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      }} placeholder="Input..." />
    </>
  )
}

export const InputSelect = ({
  label = "Input Label",
  placeholder = "Input Placeholder",
  disabled = false,
  onValueChange = () => { },
  style = {},
  options = [],
  value = "",
  index,
}: any) => {
  return (
    <>
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#444' }}>
        {label}
      </Text>
      <View style={{
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        height: "auto",
        // paddingBottom: 8,
        ...style
      }}>
        <Picker
          style={{
            height: 50,
            // paddingHorizontal: 8,
            // backgroundColor: 'white',
            borderColor: 'red'
          }}
          // selectedValue={"Finance"}
          mode="dropdown"
          onValueChange={onValueChange}
          dropdownIconColor="gray"
          dropdownIconRippleColor="gray"
          selectedValue={value}
        >
          {
            options.map((option: any) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))
          }
        </Picker>
      </View>
    </>
  )
}

export const InputFile = () => {
  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 16 }}>
        File Input
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 8,
        }}
        placeholder="Choose a file"
        value="No file chosen"
        editable={false}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#38A3A5',
          padding: 8,
          borderRadius: 5,
          marginTop: 8,
        }}
      >
        <Text style={{ color: 'white' }}>Browse</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 16 }}>
        Type of Invoice
      </Text>
      {/* <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 8,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <RadioButton
              value="Goods"
              status={selectedType === 'Goods' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedType('Goods')}
            />
            <Text style={{ fontSize: 16 }}>Goods</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <RadioButton
              value="Services"
              status={selectedType === 'Services' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedType('Services')}
            />
            <Text style={{ fontSize: 16 }}>Services</Text>
          </View>
        </View> */}
    </View>
  )
}