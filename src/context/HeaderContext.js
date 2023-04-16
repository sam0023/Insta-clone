import React from 'react'

const HeaderContext = React.createContext({
  search: '',
  updateSearch: () => {},
  isDarkTheme: false,
  toggleTheme: () => {},
  showSearchResults: false,
  updateShowSearchResults: () => {},
  updateSearchResults: false,
})
export default HeaderContext
