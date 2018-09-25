import ApolloClient, { Operation } from "apollo-boost";

// AppolloClient는 config object를 가져야됨
// * clientState : defaultState, 언어선택,화폐 등등의 일을 할 수있음
//   clientState의 resolver는 state(clientState)를 조정할 수 있음
// * request : 클라이언트가 request할 때마다 생기게 함
// * uri : 서버의 graphqlAPI를 가지고 있음을 보여줌
const client = new ApolloClient({
  clientState: {
    defaults: {
      auth: {
        __typename: "Auth",
        isLoggedIn: Boolean(localStorage.getItem("jwt")) || false
      }
    },
    resolvers: {
      Mutation: {
        // cache는 clientState를 defaults를 뜻함
        logUserIn: (_, { token }, { cache }) => {
          localStorage.setItem("jwt", token);
          cache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isLoggedIn: true
              }
            }
          });
          return null;
        },
        logUserOut: (_, __, { cache }) => {
          localStorage.removeItem("jwt");
          cache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isLoggedIn: false
              }
            }
          });
          return null;
        }
      }
    }
  },
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        "X-JWT": localStorage.getItem("jwt") || ""
      }
    });
  },
  uri: "http://localhost:4000/graphql"
});

export default client;
