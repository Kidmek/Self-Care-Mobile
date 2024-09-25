import React from 'react';
import WebView from 'react-native-webview';

export default function terms() {
  return (
    <WebView
      style={{
        flex: 1,
      }}
      source={{ uri: 'https://selfcare.org.et/#/terms-and-conditions' }}
    />
  );
}
