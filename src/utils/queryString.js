import qs from 'qs'

export const getQueryParamsFromLocation = ({ search }) => qs.parse(search.substr(1))
