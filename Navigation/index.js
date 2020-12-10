import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';


//all providers wrapped here

export default function Providers() {
    return (
      <PaperProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </PaperProvider>
    );
  }