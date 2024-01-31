import './index.css'

const MatchCard = props => {
  const {data} = props
  console.log(data)
  const {competingTeam, competingTeamLogo, matchStatus, result} = data
  return (
    <li className="recent-match-card-flexbox">
      <img
        src={competingTeamLogo}
        alt={competingTeam}
        className="team-logo-recents"
      />
      <h1 className="team-name">{competingTeam}</h1>
      <p className="team-result">{result}</p>
      <p className={matchStatus === 'Won' ? 'victory' : 'lost'}>
        {matchStatus}
      </p>
    </li>
  )
}

export default MatchCard
