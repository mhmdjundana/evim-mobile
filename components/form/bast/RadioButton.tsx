import { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { RadioButton } from 'react-native-paper';

const mockOption = [
  // { label: 'ReactJS', value: 'option1', disabled: true },
  { label: 'NextJs', value: 'option2', },
  { label: 'React Native', value: 'option3' },
];

export const RadioButtonHorizontal = ({ options = mockOption, selectedValue = '', setSelectedValue = () => {}, style }: any) => {
  // const [selectedValue, setSelectedValue] = useState('option1');

  return (
      <View style={[styles.radioGroup, style]}>
        {/* {mockOption.map((item: any, index: any) => ( */}
        {options.map((item: any, index: any) => (

          <View style={styles.radioButton} key={index}>
            <RadioButton.Android
              value={item.value}
              disabled={item.disabled}
              status={selectedValue === item.value ?
                'checked' : 'unchecked'}
              onPress={() => setSelectedValue(item.value)}
              color="#007BFF"
            />
            <Text style={item.disabled ? styles.radioLabelDisabled : styles.radioLabel}>
              {item.label}
            </Text>
          </View>
        ))}

        {/* <View style={styles.radioButton}>
                    <RadioButton.Android
                        value="option2"
                        disabled
                        status={selectedValue === 'option2' ? 
                                 'checked' : 'unchecked'}
                        onPress={() => setSelectedValue('option2')}
                        color="#007BFF"
                    />
                    <Text style={styles.radioLabel}>
                        NextJs
                    </Text>
                </View>

                <View style={styles.radioButton}>
                    <RadioButton.Android
                        value="option3"
                        status={selectedValue === 'option3' ? 
                                'checked' : 'unchecked'}
                        onPress={() => setSelectedValue('option3')}
                        color="#007BFF"
                    />
                    <Text style={styles.radioLabel}>
                        React Native
                    </Text>
                </View> */}
      </View>
  );
};

// export const CustomRadioButton = ({ label, selected, onSelect }: any) => (
//   <TouchableOpacity
//     style={[styles.radioButton,
//     { backgroundColor: selected ? '#007BFF' : '#FFF' }]}
//     onPress={onSelect}
//   >
//     <Text style={[styles.radioButtonText,
//     { color: selected ? '#FFF' : '#000' }]}>
//       {label}
//     </Text>
//   </TouchableOpacity>
// );

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    flex: 1,

  },
  radioLabel: {
    fontSize: 16,
    color: '#444',
  },
  radioLabelDisabled: {
    fontSize: 16,
    color: '#444',
    opacity: 0.5,
  },
});