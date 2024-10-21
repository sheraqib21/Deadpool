import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import DeadpoolInteractive from './src/components/DeadpoolAnimation';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <DeadpoolInteractive />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Optional, gives a better visual effect
    },
});

export default App;
