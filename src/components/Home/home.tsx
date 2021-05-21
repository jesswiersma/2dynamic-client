import appLogo from "../assets/appLogo.png";

const Home = () => {
    return (
        <div className = "splash">
        <div className = "splashBox">
        <div id = "splashTitle">Welcome to Dynamic</div>
        <img id = "splashImg" src = {appLogo} alt = "main page image"></img>     
        </div>
        </div>
    );
};

export default Home;