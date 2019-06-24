import React from 'react'
import { SafeAreaView, Text, Button } from 'react-native'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const createStudent = gql`
  mutation($name: String, $age: Int, $gender: String) {
    createStudent(name: $name, age: $age, gender: $gender) {
      name,
      age,
      gender
    }
  }
`

const MutationGraphql = () => {
  return (
    <Mutation
      mutation={createStudent}
    >
      {(createStudent, {data, error, loading}) => (
        <SafeAreaView>
          <Button 
            title="Pukul aku mas"
            onPress={() => {
            createStudent({
              variables: {
                name: 'Afdal',
                age: 14,
                gender: 'Male'
              }
            })
          }} />
          
          <Text>{JSON.stringify(data)}</Text>
        </SafeAreaView>
      )}
    </Mutation>
  )
}

export default MutationGraphql
