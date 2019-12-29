import reduxCookiesMiddleware, {getStateFromCookies} from 'redux-cookies-middleware';
import Cookies from 'js-cookie'

const paths = {'auth.token': {name: 'access_token'}};
const emptyState = {auth: {token: undefined}};
const options = {
  setCookie: (name, value) => Cookies.set(name, value, { expires: 1, path: '/', secure: false })
}
export const initialState = getStateFromCookies(emptyState, paths, name => Cookies.get(name));

export const createCookieMiddleware = () => reduxCookiesMiddleware(paths, options);
