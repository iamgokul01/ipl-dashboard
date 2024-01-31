import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    teamsData: [],
  }

  componentDidMount() {
    this.fetchTeamsData()
  }

  fetchTeamsData = async () => {
    const backData = await fetch('https://apis.ccbp.in/ipl')
    const teamsJSON = await backData.json()
    const {teams} = teamsJSON
    console.log(teamsJSON, teams)
    const teamsData = teams.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))

    console.log(teamsData)
    this.setState({
      isLoading: false,
      teamsData,
    })
  }

  render() {
    const {isLoading, teamsData} = this.state

    return (
      <div className="home-container">
        <div className="title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="logo"
          />
          <h1 className="app-title">IPL DASHBOARD</h1>
        </div>
        {isLoading && (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        )}
        {isLoading === false ? (
          <ul className="teams-container">
            {teamsData.map(each => (
              <TeamCard data={each} key={each.id} />
            ))}
          </ul>
        ) : null}
      </div>
    )
  }
}

export default Home
