import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/firebase';
import { toast } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const id = toast.loading("Loading..");
    await signInWithEmailAndPassword(email, password);
    toast.dismiss(id);
    toast.success("Login Successfull");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        navigate('/dashboard', { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="container mt-5 justify-content-center" style={{ height: 'auto' }}>
      <div className="row justify-content-center" style={{ width: '100%' }}>
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger">{error.message}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ backgroundColor: '#fff', position: 'relative', bottom: '30px', left: '550px', height: '1px' }}
                  >
                    <span style={{ color: "black", position: 'relative', bottom: '10px' }} className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <p className="mt-3 text-center">
                Don't have an account? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>Sign Up</span>
              </p>
              <p className="text-center mt-2">
                <Link to="/forgot-password" className="text-muted">Forgot Password?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
