import reduxCookiesMiddleware, {getStateFromCookies} from 'redux-cookies-middleware';

const paths = {'user.username': {name: 'bookmarks'}};
const emptyState = {user: {username: undefined}};
export const initialState = getStateFromCookies(emptyState, paths);
export const createCookieMiddleware = () => reduxCookiesMiddleware(paths);
