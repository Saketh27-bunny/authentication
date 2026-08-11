import React,{useState} from 'react'

function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response =await fetch('http://localhost:5000/api/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({email,password}),
        credentials:'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Handle success (e.g., store token/user data, redirect)
      alert(data.message);
    }catch(e){
      alert(e.message);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-1 fw-bold">Welcome Back</h3>
          <p className="text-muted text-center mb-4 small">
            Please sign in to your account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label fw-semibold small">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label fw-semibold small">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-2 py-2 fw-semibold">
              Sign In
            </button>
          </form>

          <div className="text-center mt-4 small text-muted">
            Don't have an account?{' '}
            <a href="#signup" className="text-decoration-none fw-semibold">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login