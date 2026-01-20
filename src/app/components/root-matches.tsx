import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Calendar, ArrowRight, Home, Sparkles } from 'lucide-react';

interface Match {
  id: number;
  name: string;
  confidence: number;
  location: string;
  sharedAncestor: string;
  generation: number;
}

export function RootMatches() {
  const matches: Match[] = [
    { id: 1, name: 'Emma Rodriguez', confidence: 95, location: 'Barcelona, Spain', sharedAncestor: 'Maria Santos', generation: 3 },
    { id: 2, name: 'James Chen', confidence: 87, location: 'Toronto, Canada', sharedAncestor: 'William Chen', generation: 4 },
    { id: 3, name: 'Sophia Patel', confidence: 92, location: 'Mumbai, India', sharedAncestor: 'Sarah Johnson', generation: 3 },
    { id: 4, name: 'Lucas Silva', confidence: 78, location: 'São Paulo, Brazil', sharedAncestor: 'Antonio Silva', generation: 5 },
    { id: 5, name: 'Olivia Kim', confidence: 85, location: 'Seoul, South Korea', sharedAncestor: 'Grace Kim', generation: 4 },
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'from-[#b5ffd4] to-[#b5e5ff]';
    if (confidence >= 80) return 'from-[#fff4b5] to-[#ffb5c5]';
    return 'from-[#d4b5ff] to-[#b5e5ff]';
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return { text: 'High Match', emoji: '✨' };
    if (confidence >= 80) return { text: 'Good Match', emoji: '💫' };
    return { text: 'Possible Match', emoji: '🌟' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafaff] via-[#f5f0ff] to-[#f0fff5] font-['Poppins']">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#d4b5ff] to-[#ffb5c5] bg-clip-text text-transparent">
                Root Matches ✨
              </h1>
              <p className="text-[#6b6b8b] text-lg">Discover your extended family worldwide</p>
            </div>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-[#d4b5ff]/30 text-[#2d2d44] flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Dashboard
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-6 rounded-3xl bg-white/60 backdrop-blur-lg border border-white/80 shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4b5ff] to-[#b5e5ff] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#2d2d44]">12 Possible Matches Found!</h2>
              <p className="text-[#8888aa]">Connect with your distant relatives</p>
            </div>
          </div>
        </motion.div>

        {/* Matches List */}
        <div className="space-y-6">
          {matches.map((match, index) => {
            const badge = getConfidenceBadge(match.confidence);
            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="relative group"
              >
                <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-lg border border-white/90 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left side - User info */}
                    <div className="flex items-start gap-4 flex-1">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${getConfidenceColor(match.confidence)} flex items-center justify-center shadow-lg flex-shrink-0`}
                      >
                        <Users className="w-7 h-7 text-white" />
                      </motion.div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-[#2d2d44] text-lg">{match.name}</h3>
                          <span className="px-3 py-1 bg-gradient-to-r from-[#b5ffd4]/30 to-[#b5e5ff]/30 backdrop-blur-sm rounded-full text-xs border border-white/40">
                            {badge.text} {badge.emoji}
                          </span>
                        </div>

                        <div className="space-y-1 text-sm text-[#8888aa]">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{match.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>Shared ancestor: {match.sharedAncestor}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>~{match.generation} generations back</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Match percentage and CTA */}
                    <div className="flex flex-col md:items-end gap-3">
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-3xl font-bold text-[#2d2d44]">{match.confidence}%</p>
                          <p className="text-xs text-[#8888aa]">Match</p>
                        </div>
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getConfidenceColor(match.confidence)} flex items-center justify-center`}>
                          <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-white font-bold">{match.confidence}</span>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-[#d4b5ff] to-[#b5e5ff] rounded-full shadow-lg text-[#2d2d44] flex items-center gap-2 group-hover:shadow-xl transition-shadow"
                      >
                        View Connection
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/70 backdrop-blur-lg rounded-full shadow-lg border border-[#d4b5ff]/30 text-[#2d2d44] hover:shadow-xl transition-shadow"
          >
            Load More Matches
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
