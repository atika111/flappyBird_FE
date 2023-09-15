import "./Home.css"
import Login from '../Account/Login';

const HomePage = () => {


  return (
    <>
     <div className="home-page">
      <header>
        <h1>Flappy Bird Mania</h1>
      </header>
      <main>
      <section className="welcome">
    <h2>Welcome to Flappy Bird Mania!</h2>
  </section>

  <section className="instructions-card">
    <div className="instructions login">
      <h3>Login</h3>
      <p>Log in to start playing and save your progress.</p>
    </div>

    <div className="instructions gameplay">
      <h3>How to Play</h3>
      <p>Tap or click to make the bird jump. Use the spacebar or the up arrow key on your keyboard. Avoid obstacles and collect points to win!</p>
    </div>
  </section>

  <section className="start-button">
    <Login />
  </section>

  <section className="game-preview">
   
  </section>
      </main>
      <footer>
        <p>&copy; 2023 Flappy Bird Mania</p>
        <div className="social-links">
         
        </div>
      </footer>
    </div>
  
    </>
  )
}

export default HomePage