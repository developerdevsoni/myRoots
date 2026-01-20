import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, Users, Sparkles, LogIn } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafaff] via-[#f5f0ff] to-[#f0fff5] font-['Poppins']">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#d4b5ff]" />
            <span className="text-xl font-bold text-[#2d2d44]">FamilyRoots</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-[#d4b5ff]/30 text-[#2d2d44] flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-[#d4b5ff] to-[#b5e5ff] rounded-full shadow-md text-[#2d2d44]"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-[#d4b5ff] mx-auto animate-pulse" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#d4b5ff] via-[#ffb5c5] to-[#b5ffd4] bg-clip-text text-transparent">
            Discover Your Roots
          </h1>

          <p className="text-xl md:text-2xl text-[#6b6b8b] mb-8 max-w-2xl mx-auto">
            Connect with your past, celebrate your heritage, and find your tribe. Your family story starts here. 💜
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#d4b5ff] to-[#b5e5ff] text-[#2d2d44] rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm"
              >
                Create Your Tree 🌳
              </motion.button>
            </Link>
            <Link to="/matches">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[#2d2d44] rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-[#d4b5ff]/30"
              >
                Find Connections ✨
              </motion.button>
            </Link>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="relative p-8 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/60 shadow-2xl">
              <div className="flex justify-center items-end gap-4 md:gap-8">
                {/* Tree visualization */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#d4b5ff] to-[#b5e5ff] flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="h-12 w-1 bg-gradient-to-b from-[#d4b5ff] to-transparent"></div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#ffb5c5] to-[#fff4b5] flex items-center justify-center shadow-xl">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="h-16 w-1 bg-gradient-to-b from-[#ffb5c5] to-transparent"></div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#b5ffd4] to-[#fff4b5] flex items-center justify-center shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="h-12 w-1 bg-gradient-to-b from-[#b5ffd4] to-transparent"></div>
                </motion.div>
              </div>

              <div className="mt-8 flex justify-center gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#d4b5ff]/50 to-[#b5ffd4]/50 backdrop-blur-sm border border-white/40"
                  ></motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}