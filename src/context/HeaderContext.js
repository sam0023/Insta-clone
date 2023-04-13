import React from 'react'

const HeaderContext = React.createContext({
  search: '',
  updateSearch: () => {},
  isDarhTheme: false,
  toggleTheme: () => {},
  showSearchResults: false,
  updateShowSearchResults: () => {},
  // searchResultsApiResponse: [],
  // requestSearchResultsApi: () => {},
  // searchResultsPageStatus: 'LOADING',
  updateSearchResults: false,
})
export default HeaderContext
