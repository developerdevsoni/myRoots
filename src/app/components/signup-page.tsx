import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useState } from 'react';
import { toast } from 'sonner';

export function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.register({ email, password, name: fullName });
      toast.success('Account created successfully! Please login.');
      navigate('/login');
    } catch (error: any) {
      console.error('Signup failed:', error);
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
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
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#ffb5c5] to-[#fff4b5] flex items-center justify-center shadow-xl"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#d4b5ff] via-[#ffb5c5] to-[#b5ffd4] bg-clip-text text-transparent">
            Start Your Journey ✨
          </h1>
          <p className="text-[#6b6b8b]">Create your account and discover your roots</p>
        </motion.div>

        {/* Signup Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-3xl bg-white/70 backdrop-blur-lg border border-white/90 shadow-2xl"
        >
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-[#2d2d44] mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-[#ffb5c5]" />
                Full Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full px-4 py-3 rounded-2xl bg-[#f8f8ff] border-2 border-[#d4b5ff]/30 focus:border-[#ffb5c5] focus:ring-2 focus:ring-[#ffb5c5]/20 outline-none transition-all text-[#2d2d44] placeholder:text-[#8888aa]"
              />
            </div>

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
                <Lock className="w-4 h-4 text-[#b5ffd4]" />
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                className="w-full px-4 py-3 rounded-2xl bg-[#f8f8ff] border-2 border-[#d4b5ff]/30 focus:border-[#b5ffd4] focus:ring-2 focus:ring-[#b5ffd4]/20 outline-none transition-all text-[#2d2d44] placeholder:text-[#8888aa]"
              />
              <p className="mt-2 text-xs text-[#8888aa]">
                Use at least 8 characters with a mix of letters and numbers
              </p>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3">
              <div className="relative mt-1">
                <input
                  type="checkbox"
                  required
                  className="peer sr-only"
                  id="terms"
                />
                <label
                  htmlFor="terms"
                  className="flex w-5 h-5 rounded-lg border-2 border-[#d4b5ff]/30 peer-checked:bg-gradient-to-br peer-checked:from-[#b5ffd4] peer-checked:to-[#b5e5ff] peer-checked:border-[#b5ffd4] transition-all cursor-pointer"
                >
                  <svg
                    className="hidden peer-checked:block w-3 h-3 text-white m-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </label>
              </div>
              <label htmlFor="terms" className="text-sm text-[#2d2d44] cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-[#d4b5ff] hover:text-[#b5e5ff] transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#d4b5ff] hover:text-[#b5e5ff] transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Signup Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-[#ffb5c5] to-[#fff4b5] text-[#2d2d44] font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
            >
              Create Account
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#d4b5ff]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/70 text-[#8888aa]">or sign up with</span>
              </div>
            </div>

            {/* Social Signup */}
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

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-[#6b6b8b]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#d4b5ff] font-medium hover:text-[#b5e5ff] transition-colors inline-flex items-center gap-1"
            >
              Log in
              <Heart className="w-4 h-4" />
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
