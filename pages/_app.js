import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'

// Aca importamos Apollo para que se propague para todos los componentes

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
