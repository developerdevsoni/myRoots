import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Plus, User, Heart, Home } from 'lucide-react';
import { useState } from 'react';
import { AddMemberModal } from './add-member-modal';

interface Member {
  id: number;
  name: string;
  relation: string;
  generation: number;
}

export function FamilyTree() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members] = useState<Member[]>([
    { id: 1, name: 'You', relation: 'Self', generation: 1 },
    { id: 2, name: 'Mom', relation: 'Mother', generation: 2 },
    { id: 3, name: 'Dad', relation: 'Father', generation: 2 },
    { id: 4, name: 'Grandma Sarah', relation: 'Grandmother', generation: 3 },
    { id: 5, name: 'Grandpa John', relation: 'Grandfather', generation: 3 },
    { id: 6, name: 'Nana Rose', relation: 'Grandmother', generation: 3 },
    { id: 7, name: 'Papa Mike', relation: 'Grandfather', generation: 3 },
  ]);

  const generationColors = {
    1: 'from-[#ffb5c5] to-[#fff4b5]',
    2: 'from-[#d4b5ff] to-[#b5e5ff]',
    3: 'from-[#b5ffd4] to-[#b5e5ff]',
  };

  const getGenerationMembers = (gen: number) => members.filter(m => m.generation === gen);

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
                Your Family Tree 🌳
              </h1>
              <p className="text-[#6b6b8b] text-lg">Every branch tells a story</p>
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

        {/* Add Member Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#d4b5ff] to-[#b5e5ff] rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-[#2d2d44] flex items-center justify-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-6 h-6" />
            <span>Add Family Member</span>
          </motion.button>
        </motion.div>

        {/* Tree Visualization */}
        <div className="space-y-12">
          {[3, 2, 1].map((generation) => (
            <motion.div
              key={generation}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (4 - generation) * 0.1 }}
            >
              <div className="text-center mb-4">
                <span className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-[#8888aa] border border-white/80 shadow-md">
                  Generation {generation}
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                {getGenerationMembers(generation).map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (4 - generation) * 0.1 + index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="relative group"
                  >
                    <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-lg border border-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 w-48">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${generationColors[generation as keyof typeof generationColors]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {member.generation === 1 ? (
                          <Heart className="w-8 h-8 text-white" />
                        ) : (
                          <User className="w-8 h-8 text-white" />
                        )}
                      </div>
                      <h3 className="font-bold text-[#2d2d44] text-center mb-1">{member.name}</h3>
                      <p className="text-[#8888aa] text-sm text-center">{member.relation}</p>
                    </div>

                    {/* Connection line */}
                    {generation > 1 && (
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 h-12 w-0.5 bg-gradient-to-b from-[#d4b5ff] to-transparent"></div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Horizontal connector for generation */}
              {generation > 1 && getGenerationMembers(generation).length > 1 && (
                <div className="flex justify-center mt-6">
                  <div className="h-0.5 w-3/4 bg-gradient-to-r from-transparent via-[#d4b5ff] to-transparent"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#ffb5c5] to-[#fff4b5] shadow-2xl flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <Plus className="w-8 h-8 text-white" />
        </motion.button>
      </div>

      {/* Add Member Modal */}
      <AddMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}