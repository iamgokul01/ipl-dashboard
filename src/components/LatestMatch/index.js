// Write your code here
import './index.css'

const LatestMatch = props => {
  const {data} = props

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
  } = data
  console.log(true)
  return (
    <div className="latest-match-section">
      <div className="team-details-section">
        <p>{competingTeam}</p>
        <p>{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
      </div>
      <div className="opponent-logo-section">
        <img src={competingTeamLogo} alt={`latest match ${competingTeam}`} />
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
  )
}

export default LatestMatch
