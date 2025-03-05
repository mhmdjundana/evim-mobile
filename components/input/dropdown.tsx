import { useState } from 'react';
import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useValueDropDown } from './useValueDropDown';
import { Picker } from '@react-native-picker/picker';

export const RnDropDownPicker = ({
  value = null,
  setValue = null,
  items = null,
  setItems = null,
  label = 'Label',
  required = false,
  onChangeValue = () => { },
  error = null,
  styles = {}
}: any) => {
  const {
    open,
    setOpen,
    items: itemsDefault,
    setItems: setItemsDefault,
    value: valueDefault,
    setValue: setValueDefault,
  } = useValueDropDown();
  const setValuea = setValue || setValueDefault;
  const setItemsa = setItems || setItemsDefault;
  const valuea = setValue ? value : valueDefault;
  const itemsa = items || itemsDefault;

  return (
    <View style={[{
      height: 70,
      zIndex: open ? 1 : 0
    }, styles]}>
      <Text style={{ fontSize: 14, fontWeight: '500', color: '#444', paddingLeft: 4 }}>{label}{required && <Text style={{ color: 'red' }}>*</Text>}</Text>
      <DropDownPicker
        dropDownContainerStyle={{
          // borderColor: 'gray',
          // borderWidth: 1,
          // borderRadius: 5,
          // height: 20,
          // position: 'absolute',
        }}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        value={valuea}
        items={itemsa}
        setOpen={setOpen}
        setValue={setValuea}
        setItems={setItemsa}
        onChangeValue={onChangeValue}
        searchable={true}
        multiple
        mode="BADGE"
        placeholder="Select an item"
        searchPlaceholder="Search..."
        containerStyle={{
          zIndex: open ? 1 : 0
        }}
        style={{
          borderColor: error ? 'red' : '#f0f0f0',
          // borderWidth: 1,
          // borderRadius: 5,
          // height: 10,
        }}
      />
      {error && <Text style={{
        color: 'red',
        paddingLeft: 6,
        fontSize: 14
      }}>{error}</Text>}
    </View>
  )
}

export const RnPicker = ({ options, value, setValue }: any) => {
  const [items, setItems] = useState([]);

  return (
    <Picker
      selectedValue={value}
      onValueChange={(itemValue, itemIndex) =>
        setValue(itemValue)
      }
    >
      {
        options?.map((item: any, index: number) => <Picker.Item key={index} label={item.label} value={item.value} />)
      }
    </Picker>
  )
}
