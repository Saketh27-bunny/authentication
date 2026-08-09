import React ,{useState}from 'react'

function register() {
    const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Registering user:', formData);
  };
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-5">
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-1 fw-bold">Create an Account</h3>
          <p className="text-muted text-center mb-4 small">
            Sign up to get started
          </p>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label fw-semibold small">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Address */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold small">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold small">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label fw-semibold small">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100 mt-2 py-2 fw-semibold">
              Register
            </button>
          </form>

          {/* Link to Login */}
          <div className="text-center mt-4 small text-muted">
            Already have an account?{' '}
            <a href="#login" className="text-decoration-none fw-semibold">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default register