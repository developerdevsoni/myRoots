import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useState } from 'react';
import { toast } from 'sonner';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log('Logging in...', { email });
      await authService.login({ email, password });
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafaff] via-[#f5f0ff] to-[#f0fff5] font-['Poppins'] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#d4b5ff] to-[#b5e5ff] flex items-center justify-center shadow-xl"
          >
            <Heart className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#d4b5ff] via-[#ffb5c5] to-[#b5ffd4] bg-clip-text text-transparent">
            Welcome Back! 💜
          </h1>
          <p className="text-[#6b6b8b]">Your family story continues...</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-3xl bg-white/70 backdrop-blur-lg border border-white/90 shadow-2xl"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-[#2d2d44] mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4b5ff]" />
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-2xl bg-[#f8f8ff] border-2 border-[#d4b5ff]/30 focus:border-[#d4b5ff] focus:ring-2 focus:ring-[#d4b5ff]/20 outline-none transition-all text-[#2d2d44] placeholder:text-[#8888aa]"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-[#2d2d44] mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#d4b5ff]" />
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-2xl bg-[#f8f8ff] border-2 border-[#d4b5ff]/30 focus:border-[#d4b5ff] focus:ring-2 focus:ring-[#d4b5ff]/20 outline-none transition-all text-[#2d2d44] placeholder:text-[#8888aa]"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-[#d4b5ff] hover:text-[#b5e5ff] transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-[#d4b5ff] to-[#b5e5ff] text-[#2d2d44] font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
            >
              Log In
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#d4b5ff]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/70 text-[#8888aa]">or</span>
              </div>
            </div>

            {/* Social Login (Optional) */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full px-6 py-3 rounded-full bg-white border-2 border-[#d4b5ff]/30 text-[#2d2d44] hover:bg-[#f8f8ff] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-[#6b6b8b]">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-[#d4b5ff] font-medium hover:text-[#b5e5ff] transition-colors inline-flex items-center gap-1"
            >
              Sign up
              <Sparkles className="w-4 h-4" />
            </Link>
          </p>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-4"
        >
          <Link
            to="/"
            className="text-sm text-[#8888aa] hover:text-[#6b6b8b] transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
