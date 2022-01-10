import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Child = ({ match }) => (
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
)

class App1 extends React.Component {
  render() {
    return (
        <Router>
            <h2>Accounts</h2>
            <ul>
              <li><Link to="/query/netflix">Netflix</Link></li>
              <li><Link to="/query/zillow-group">Zillow Group</Link></li>
              <li><Link to="/query/yahoo">Yahoo</Link></li>
              <li><Link to="/query/modus-create">Modus Create</Link></li>
            </ul>
    
            <Route path="/query/:id" component={Child}/>
        </Router>
    )
  }
}

export default App1