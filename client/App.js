import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from "react-apollo";
import client from './client'
import QueryGraphQl from './QueryGraphql'
import MutationGraphQl from './MutationGraphql'
import Children from './Children'

export default function App() {
  return (
    <ApolloProvider client={client}>
     {/* <QueryGraphQl /> */}
     <MutationGraphQl />
     {/* <Children /> */}
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
