import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface AppTitleProps {
  title: string;
}

const AppTitle: React.FC<AppTitleProps> = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

interface AppSubtitleProps {
  subtitle?: string;
}

const AppSubtitle: React.FC<AppSubtitleProps> = ({ subtitle }) => {
  return subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null;
};

const AppText: React.FC<{ title: string; subtitle?: string; style?: object; }> = ({ title, subtitle, style }) => {
  return (
    <View style={style}>
      <AppTitle title={title} />
      <AppSubtitle subtitle={subtitle} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
});

export default AppText;