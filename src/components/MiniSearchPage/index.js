import {Component} from 'react'
import SearchResults from '../SearchResults'

viewOption = {
  initial: 'INITIAL',
  searching: 'SEARCHING',
}

class MiniSearchPage extends Component {
  state = {
    search: '',
    activeView: viewOption.initial,
  }

  onClickSearchIcon = () => {
    this.setState({activeSearch: viewOption.searching})
  }

  onClickEnter=(event)=>{
      if(event.key==='Enter'){
           this.setState({activeSearch: viewOption.searching})
      }
  }

  onUpdateSearch = event => {
    const search = event.target.value
    this.setState({search})
  }

  renderInitialView=()=>{
      <div>
          
      </div>
  }



}
