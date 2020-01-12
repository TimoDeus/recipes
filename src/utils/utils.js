import qs from 'qs'

export const getQueryParamsFromLocation = ({ search }) => qs.parse(search.substr(1))

export const stringifyQueryParams = queryParams => qs.stringify(queryParams, { arrayFormat: 'repeat' })

export const isNonEmptyObject = obj => {
  return obj && Object.keys(obj).length !== 0 && obj.constructor === Object
}
