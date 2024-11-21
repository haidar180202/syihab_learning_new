import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase'; // Pastikan konfigurasi Firebase sudah benar

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const auth = getAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Buat akun baru di Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Ambil UID dari pengguna yang baru dibuat
      const { uid } = userCredential.user;

      // Simpan data pengguna ke Firestore
      await setDoc(doc(db, 'users', uid), {
        name: name || '', // Nama default jika kosong
        email: email,
        role: 'user', // Role default
        createdAt: new Date().toISOString(), // Tanggal pembuatan
      });

      setMessage({ type: 'success', text: 'Registration successful. You can now log in!' });

      // Reset form
      setEmail('');
      setPassword('');
      setName('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <h1 className="display-6 text-primary">Syihab Learning</h1>
          <h3 className="text-muted">Create Your Account</h3>
        </div>

        {/* Feedback */}
        {message && (
          <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`} role="alert">
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister}>
          {/* Input Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Input Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <a href="/auth/login" className="fw-bold text-primary">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
