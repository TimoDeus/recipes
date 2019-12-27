import reduxCookiesMiddleware, {getStateFromCookies} from 'redux-cookies-middleware';

const paths = {'auth.token': {name: 'access_token'}};
const emptyState = {auth: {token: undefined}};
export const initialState = getStateFromCookies(emptyState, paths);
export const createCookieMiddleware = () => reduxCookiesMiddleware(paths);
