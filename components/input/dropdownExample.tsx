import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

export const DropDownPickerExample = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Grape', value: 'grape' }, 
    { label: 'Mango', value: 'mango' },
    { label: 'Watermelon', value: 'watermelon' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Raspberry', value: 'raspberry' },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        searchable={true} // Enable search functionality
        multiple
        mode="BADGE"
        placeholder="Select an item"
        searchPlaceholder="Search..." // Customize search placeholder
        // Optional styling
        style={{
          backgroundColor: '#fafafa', // Styling for the dropdown container
        }}
        // dropDownStyle={{ backgroundColor: '#fafafa' }} // Styling for the dropdown list
        searchContainerStyle={{
          borderBottomColor: '#dfdfdf' // Styling for the search input container
        }}
        searchTextInputStyle={{
          borderColor: '#dfdfdf' // Styling for the search input
        }}
        listItemContainerStyle={{
          backgroundColor: '#fff', // Styling for each list item
        }}
        selectedItemContainerStyle={{
          backgroundColor: '#eee' // Styling for the selected item
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the dropdown vertically
    padding: 20, // Add some padding around the dropdown
  },
});

export const DropdownSelectListExample = () => {

  const [selected, setSelected] = React.useState([]);
  
  const data = [
      {key:'1', value:'Mobiles', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]

  return(
    <MultipleSelectList 
        setSelected={(val: any) => setSelected(val)} 
        data={data} 
        save="value"
        onSelect={() => alert(selected)} 
        label="Categories"
    />
  )

};

