import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';
import type { RegisterFormData } from '../types';

export default function RegisterPage() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({ defaultValues: { role: 'USER' } });

  const password = watch('password');

  const mutation = useMutation({
    mutationFn: ({ confirmPassword: _, ...rest }: RegisterFormData) => registerUser(rest),
    onSuccess: (res) => {
      const { token, name, email, role } = res.data;
      login(token, { name, email, role });
    },
    onError: (err: any) => {
      setServerError(err.response?.data?.message || 'Registration failed. Please try again.');
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    setServerError('');
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500 opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-500/30 mb-6">
            <svg className="w-7 h-7 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Create account</h1>
          <p className="text-gray-400 mt-2">Join the platform to get started</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="label">Full name</label>
              <input
                type="text"
                className="input-field"
                placeholder="John Doe"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="error-text">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="label">Email address</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                })}
              />
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Min. 6 characters"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)/,
                    message: 'Password must contain at least one letter and one number',
                  },
                })}
              />
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label">Confirm password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Repeat password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="label">Select role</label>
              <div className="grid grid-cols-2 gap-3">
                {(['USER', 'ADMIN'] as const).map((r) => (
                  <label
                    key={r}
                    className="relative flex items-center gap-3 p-4 rounded-xl border border-surface-border hover:border-brand-500/50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      value={r}
                      className="sr-only"
                      {...register('role', { required: 'Role is required' })}
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                      watch('role') === r ? 'border-brand-500 bg-brand-500' : 'border-gray-600'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{r}</p>
                      <p className="text-xs text-gray-500">{r === 'USER' ? 'Standard access' : 'Full access'}</p>
                    </div>
                  </label>
                ))}
              </div>
              {errors.role && <p className="error-text">{errors.role.message}</p>}
            </div>

            {serverError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </>
              ) : 'Create account'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-500 hover:text-brand-400 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
