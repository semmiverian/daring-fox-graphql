const gql = require('graphql')
const Student = require('./models/Student')

// Membuat sebuah tipe student 
const studentType = new gql.GraphQLObjectType({
  name: 'StudentType',
  fields: {
    id: { 
      type: gql.GraphQLID
    },
    gender: {
      type: gql.GraphQLString
    },
    name: {
      type: gql.GraphQLString
    },
    age: {
      type: gql.GraphQLInt
    }
  }
})

const schema = new gql.GraphQLSchema({
  query: new gql.GraphQLObjectType({
    name: 'DaringPoxQuery',
    fields: {
      helloWorld: {
        type: gql.GraphQLString,
        resolve: () => {
          return 'Hello Graphql'
        }
      },
      name: {
        type: gql.GraphQLString,
        resolve: () => {
          return 'Kosasih itu siapa?'
        }
      },
      student: {
        type: studentType,
        args: {
          id: {
            type: gql.GraphQLID
          }
        },
        resolve: async (_previous, args, _context) => {
          return await Student.findById(args.id)
        }
      },
      allStudents: {
        type: new gql.GraphQLList(studentType),
        resolve: async () => {
          return await Student.find({})
        }
      }
    }
  }),
  mutation: new gql.GraphQLObjectType({
    name: 'DaringPoxMutation',
    fields: {
      createStudent: {
        type: studentType,
      args: {
        gender: {
          type: gql.GraphQLString
        },
        name: {
          type: gql.GraphQLString
        },
        age: {
          type: gql.GraphQLInt
        }
      },
      resolve: async (_previous, {name, age, gender}, _context) => {
        return await Student.create({
            name, age, gender
        })  
      }
      }
    }
  })
})

module.exports = schema