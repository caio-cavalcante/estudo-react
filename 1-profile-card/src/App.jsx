import ProfileCard from "./components/ProfileCard/ProfileCard";
import './App.css';

function App() {
    const userProfile = {
        name: "Caio C.",
        bio: "Front-End Dev",
        imageUrl: "https://avatars.githubusercontent.com/u/107592408"
    };

    return (
        <div className="App">
            <h1>My Profile Card</h1>

            <ProfileCard
                name={userProfile.name} 
                bio={userProfile.bio} 
                imageUrl={userProfile.imageUrl}
            />

            <ProfileCard
                name="React" 
                bio="Front-End Framework"
                imageUrl=".\src\assets\react.svg"
            />
        </div>
    );
}

export default App;