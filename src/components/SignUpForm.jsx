import React, { useState } from 'react';

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  function validateUsername(value) {
    if (value.length < 4) {
      setUsernameError(<span className="error">Username must be at least four characters long.</span>);
      return false;
    }
    setUsernameError(null);
    return true;
  }

  function validatePassword(value) {
    if (value.length < 4) {
      setPasswordError(<span className="error">Password must be at least 4 characters long.</span>);
      return false;
    }
    setPasswordError(null);
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);

    if (isUsernameValid && isPasswordValid) {
      try {
        const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password
          })
        });

        const result = await response.json();

        if (response.ok) {
          // Successful signup
          const { success, message, token } = result;
          console.log(success, message, token);
          setToken(token);
        } else {
          // Signup failed, handle the error
          setError(result.message);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:&nbsp;
          <input 
            type="text"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </label>
        <br />
        {usernameError && <p>{usernameError}</p>}
        <label>
          Password:&nbsp;
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        {passwordError && <p>{passwordError}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUpForm;