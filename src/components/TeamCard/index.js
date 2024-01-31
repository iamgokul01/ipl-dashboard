// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {data} = props
  const {teamImageUrl, name, id} = data
  return (
    <Link to={`/team-matches/${id}`} className="team-card-container">
      <li className="team-match-flexbox">
        <img src={teamImageUrl} alt={name} className="team-logo" />
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
