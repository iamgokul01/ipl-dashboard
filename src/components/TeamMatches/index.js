import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    matchDetails: [],
    isLoading: true,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const fetchMatchDetails = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedDetails = await fetchMatchDetails.json()

    const data = this.parseTheData(fetchedDetails)

    const fetchedRecentMatch = fetchedDetails.recent_matches

    const recentMatch = fetchedRecentMatch.map(each => ({
      result: each.result,
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      matchStatus: each.match_status,
      id: each.id,
    }))

    this.setState({
      matchDetails: data,
      recentMatch,
      isLoading: false,
    })
  }

  parseTheData = fetchedDetails => {
    const parsedData = {
      teamBannerUrl: fetchedDetails.team_banner_url,
      latestMatchDetails: {
        umpires: fetchedDetails.latest_match_details.umpires,
        result: fetchedDetails.latest_match_details.result,
        manOfTheMatch: fetchedDetails.latest_match_details.man_of_the_match,
        id: fetchedDetails.latest_match_details.id,
        date: fetchedDetails.latest_match_details.date,
        venue: fetchedDetails.latest_match_details.venue,
        competingTeam: fetchedDetails.latest_match_details.competing_team,
        competingTeamLogo:
          fetchedDetails.latest_match_details.competing_team_logo,
        firstInnings: fetchedDetails.latest_match_details.first_innings,
        secondInnings: fetchedDetails.latest_match_details.second_innings,
        matchStatus: fetchedDetails.latest_match_details.match_status,
      },
    }
    return parsedData
  }

  render() {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params

    const {matchDetails = {}, recentMatch = {}, isLoading} = this.state
    const {teamBannerUrl, latestMatchDetails = {}} = matchDetails

    const {
      umpires,
      result,
      manOfTheMatch,
      date,
      venue,
      competingTeam,
      competingTeamLogo,
      firstInnings,
      secondInnings,
    } = latestMatchDetails

    const renderRecentMatch = recentMatch !== {}
    console.log(renderRecentMatch)
    return (
      <div className={`team-match-container ${id}`}>
        {isLoading && (
          <div data-testid="loader" className="loader-element">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        )}
        <div className="team-banner-section">
          <img
            src={teamBannerUrl}
            className="team-banner-img"
            alt="team banner"
          />
        </div>
        <p>Latest Matches</p>
        <div className="latest-match-section">
          <div className="team-details-section">
            <p>{competingTeam}</p>
            <p>{date}</p>
            <p>{venue}</p>
            <p>{result}</p>
          </div>
          <div className="opponent-logo-section">
            <img
              src={competingTeamLogo}
              alt={`latest match ${competingTeam}`}
            />
          </div>
          <div className="match-details">
            <h1>First Innings</h1>
            <p>{firstInnings}</p>
            <h1>Second Innings</h1>
            <p>{secondInnings}</p>
            <h1>Man Of The Match</h1>
            <p>{manOfTheMatch}</p>
            <h1>Umpires</h1>
            <p>{umpires}</p>
          </div>
        </div>

        <ul className="recent-match-section">
          {Object.keys(recentMatch).length !== 0
            ? recentMatch.map(each => <MatchCard data={each} key={each.id} />)
            : null}
        </ul>
      </div>
    )
  }
}

export default TeamMatches
