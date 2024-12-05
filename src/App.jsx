import './App.css'
import React, { useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagnifyingGlass, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import Form from './Form';
import ViewChore from './ViewChore';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';
import Shop from './Shop';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showChores, setShowChores] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  const apiURL = import.meta.env.VITE_REACT_APP_API_URL;


  const toggleForm = () => {
    setShowForm(!showForm);
  }

  const toggleChores = () => {
    setShowChores(!showChores);
  }

  const handleSignUpClick = () => {
    setShowSignUp(true);
    if(showLogIn == true){
      setShowLogIn(false);
    }
  }

  const handleLogInClick = () => {
    setShowLogIn(true);
    if(showSignUp == true){
      setShowSignUp(false);
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowForm(false);
    setShowChores(false);
    setShowShop(false);
    setUserPoints(0);
  }

  const toggleShop = () => {
    setShowShop(!showShop);
    //console.log(showShop);
  }

  const fetchUserPoints = async () => {
    try{
      const response = await fetch(`${apiURL}/api/users/points`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if(response.ok){
        const result = await response.json();
        setUserPoints(result.points);
      } else {
        console.error("Failed to fetch user points.");
      }
    } catch (error){
      console.error('Error fetching points:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      fetch(`${apiURL}/api/users/validate-token`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
    })
      .then((response) => {
        if(response.ok){
          setIsLoggedIn(true);
          fetchUserPoints();
        } else{
          console.warn('Token invalid or expired. Logging Out.');
          handleLogOut();
        }
      })
      .catch((error) => {
        console.error('Token validation error:', error);
        handleLogOut();
      });
    } else {
      handleLogOut();
    }
  }, []);

// const validateToken = async () => {
//   const token = localStorage.getItem('token');
//   if (token){
//     try{
//       const response = await fetch('http://localhost:3000/api/auth/validate', {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.ok){
//         setIsLoggedIn(true)
//       } else {
//         localStorage.removeItem('token');
//         setIsLoggedIn(false);
//       }
//     } catch (error) {
//       console.error("Error validating token:", error);
//       setIsLoggedIn(false);
//     }
//   }
// }
// useEffect(()=> {
//   validateToken();
// }, []);


  return (
    <> 
    {!isLoggedIn && 
    <div id="loggedOutButtons">
      <button onClick={handleLogInClick}>Log In</button>
      <button onClick={handleSignUpClick}>Sign Up</button>
    </div>
      }
    {showSignUp && (
      <SignUpForm onClose={() => setShowSignUp(false)} />
    )
    }
    {showLogIn && (
      <LogInForm onClose={() => setShowLogIn(false)} setIsLoggedIn={setIsLoggedIn} setUserPoints={setUserPoints}/>
    )}
    {isLoggedIn &&
      <div id="main-container">
        <div id="home-info">
          <h2>Points: {userPoints}</h2>
        </div>
        <div id="home-buttons">
          <button onClick={toggleForm}>
          <FontAwesomeIcon icon={faPlus} id="plus-icon"/>
            <span>Add Chores</span>
          </button>
          <button onClick={toggleChores}>
          <FontAwesomeIcon icon={faMagnifyingGlass} id="magnify-glass"/>
            <span>View Chores</span>
          </button>
          <button onClick={toggleShop}>
          <FontAwesomeIcon icon={faDollarSign} id="dollar-sign" />
            <span>Reward Shop</span>
          </button>
        </div>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
      }
      <footer></footer>
      {showForm && <Form onClose={toggleForm} />}
      {showChores && <ViewChore onClose={toggleChores} setUserPoints={setUserPoints}/>}
      {showShop && <Shop onClose={toggleShop} userPoints={userPoints} setUserPoints={setUserPoints}/>}
    </>
  )
};

export default App;
