import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { countriesService } from '@/services';
import type { Country } from '@/types';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    countryCode: '',
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load countries on mount
    const loadCountries = async () => {
      try {
        const data = await countriesService.getAllCountries();
        setCountries(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
      } catch (err) {
        console.error('Failed to load countries:', err);
      }
    };

    loadCountries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh', padding: '2rem 0' }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-lg">Create Account</h2>
        
        {error && (
          <div
            className="mb-md p-md"
            style={{
              backgroundColor: 'var(--color-error-light)',
              color: 'var(--color-error)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-md">
            <label className="mb-sm" style={{ display: 'block', fontWeight: 500 }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="input"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="John Doe"
            />
          </div>

          <div className="mb-md">
            <label className="mb-sm" style={{ display: 'block', fontWeight: 500 }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="john@example.com"
            />
          </div>

          <div className="mb-md">
            <label className="mb-sm" style={{ display: 'block', fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="At least 8 characters"
              minLength={8}
            />
          </div>

          <div className="mb-md">
            <label className="mb-sm" style={{ display: 'block', fontWeight: 500 }}>
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              className="input"
              value={formData.companyName}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Acme Corp"
            />
          </div>

          <div className="mb-lg">
            <label className="mb-sm" style={{ display: 'block', fontWeight: 500 }}>
              Country
            </label>
            <select
              name="countryCode"
              className="input"
              value={formData.countryCode}
              onChange={handleChange}
              required
              disabled={loading}
              style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.cca2} value={country.cca2}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-lg text-sm">
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 500 }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
