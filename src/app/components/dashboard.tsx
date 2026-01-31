import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Users, GitBranch, Heart, ArrowRight, Plus } from "lucide-react";

import { useEffect, useState, useCallback } from "react";
import { treeService } from "../../services/tree.service";
import { matchService } from "../../services/match.service";
import { CreateTreeModal } from "./create-tree-modal";

export function Dashboard() {
  const [isTreeModalOpen, setIsTreeModalOpen] = useState(false);
  const [stats, setStats] = useState([
    {
      label: "Generations",
      value: "0",
      icon: GitBranch,
      color: "from-[#d4b5ff] to-[#b5e5ff]",
    },
    {
      label: "Members",
      value: "0",
      icon: Users,
      color: "from-[#ffb5c5] to-[#fff4b5]",
    },
    {
      label: "Matches",
      value: "0",
      icon: Heart,
      color: "from-[#b5ffd4] to-[#b5e5ff]",
    },
  ]);

  const fetchData = useCallback(async () => {
    try {
      const [trees, matches] = await Promise.all([
        treeService.getUserTrees(),
        matchService.getMyMatches(),
      ]);

      // Calculate stats (simplified logic as we might need more details for total members)
      // Assuming we just count trees for now or if tree object has member count
      const totalTrees = trees.length;
      const totalMatches = Array.isArray(matches) ? matches.length : 0;

      // For accurate member count we'd need to fetch details for each tree,
      // but for dashboard summary let's just use what we have or 0 if not available
      // logic to be improved when backend provides aggregate stats

      setStats([
        {
          label: "Trees",
          value: totalTrees.toString(),
          icon: GitBranch,
          color: "from-[#d4b5ff] to-[#b5e5ff]",
        },
        // Placeholder for members count until we have an endpoint for it
        {
          label: "Members",
          value: "-",
          icon: Users,
          color: "from-[#ffb5c5] to-[#fff4b5]",
        },
        {
          label: "Matches",
          value: totalMatches.toString(),
          icon: Heart,
          color: "from-[#b5ffd4] to-[#b5e5ff]",
        },
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
                Hey there! 👋
              </h1>
              <p className="text-[#6b6b8b] text-lg">
                Your family story is beautiful
              </p>
            </div>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-[#d4b5ff]/30 text-[#2d2d44]"
              >
                Home
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-lg border border-white/80 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-[#8888aa] mb-1">{stat.label}</p>
                <p className="text-4xl font-bold text-[#2d2d44]">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tree Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-lg border border-white/80 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#2d2d44]">
                Your Family Tree
              </h2>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsTreeModalOpen(true)}
                  className="px-6 py-3 bg-white hover:bg-gray-50 rounded-full shadow-lg text-[#2d2d44] border border-[#d4b5ff]/30 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  New Tree
                </motion.button>
                <Link to="/tree">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-[#d4b5ff] to-[#b5e5ff] rounded-full shadow-lg text-[#2d2d44] flex items-center gap-2"
                  >
                    View Tree
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Mini Tree Visualization */}
            <div className="flex justify-center items-center py-8">
              <div className="relative">
                {/* Root */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ffb5c5] to-[#fff4b5] flex items-center justify-center shadow-lg mb-6 mx-auto"
                >
                  <Users className="w-8 h-8 text-white" />
                </motion.div>

                {/* Connections */}
                <div className="flex gap-8 justify-center">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="h-8 w-0.5 bg-gradient-to-b from-[#d4b5ff] to-transparent mb-2"></div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4b5ff] to-[#b5e5ff] shadow-md"
                      ></motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[#2d2d44] mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/tree">
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-3xl bg-white/60 backdrop-blur-lg border border-white/80 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4b5ff] to-[#b5e5ff] flex items-center justify-center">
                    <Plus className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2d2d44] mb-1">
                      Add Family Member
                    </h3>
                    <p className="text-[#8888aa] text-sm">
                      Grow your family tree
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link to="/matches">
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-3xl bg-white/60 backdrop-blur-lg border border-white/80 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ffb5c5] to-[#fff4b5] flex items-center justify-center">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2d2d44] mb-1">
                      Find Matches
                    </h3>
                    <p className="text-[#8888aa] text-sm">
                      Discover connections
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>

      <CreateTreeModal
        isOpen={isTreeModalOpen}
        onClose={() => setIsTreeModalOpen(false)}
        onTreeCreated={fetchData}
      />
    </div>
  );
}
