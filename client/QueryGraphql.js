import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const allStudentQuery = gql`
{
  allStudents {
    name
  }
}
`

const getStudentById = gql`
  query ($studentId: ID) {
    student(id: $studentId) {
      name,
      gender
    }
  }
`

const QueryGraphql = () => {
  return (
    <Query
      // query={allStudentQuery}
      query={getStudentById}
      variables={{
        studentId: '5d0b313f9df40d4ed77670f9'
      }}
    >
      {
        ({ loading, error, data }) => (
          <SafeAreaView>    
            {loading && <Text>Sabar ya mas</Text>}
            {error && <Text>Ih mas error {JSON.stringify(error)}</Text>}
            {data && <Text>{JSON.stringify(data)}</Text>}
          </SafeAreaView>
        )
      }
    </Query>
  )
}

export default QueryGraphql
