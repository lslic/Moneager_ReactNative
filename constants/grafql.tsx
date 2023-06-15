import {setContext} from "@apollo/client/link/context";
import {ApolloClient, createHttpLink, gql, InMemoryCache, makeVar, NormalizedCacheObject} from "@apollo/client";
//
// SplashScreen.preventAutoHideAsync();

export const jwt = makeVar('');

const httpLink = createHttpLink({
    uri: 'http://10.231.7.134:1337/graphql'
});

export const LOGIN_MUTATION = gql`mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
        jwt
        user {
            email
            username
        }
    }
}`

const authLink = setContext((_, { headers }) => {
    const token = jwt();
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export let client: ApolloClient<NormalizedCacheObject>;
client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});