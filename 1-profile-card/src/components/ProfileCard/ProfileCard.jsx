import './ProfileCard.css';

function ProfileCard(props) {
    return (
        <div className="profile-card">
            <img src={props.imageUrl} alt={props.name} className="profile-image" />
            <h2 className="profile-name">{props.name}</h2>
            <p className="profile-bio">{props.bio}</p>
        </div>
    );
}

export default ProfileCard;