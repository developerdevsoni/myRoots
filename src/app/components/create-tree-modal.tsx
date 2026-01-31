import { motion, AnimatePresence } from 'motion/react';
import { X, User, MapPin, Calendar, Heart, GitBranch, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { treeService } from '../../services/tree.service';
import { toast } from 'sonner';

interface CreateTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTreeCreated: () => void;
}

interface FormData {
  title: string;
  rootName: string;
  rootGender: string;
  rootBirthDate: string;
  rootLocation: string;
}

export function CreateTreeModal({ isOpen, onClose, onTreeCreated }: CreateTreeModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    rootName: '',
    rootGender: 'male',
    rootBirthDate: '',
    rootLocation: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.title.trim() !== '' &&
      formData.rootName.trim() !== ''
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      setIsLoading(true);
      await treeService.createTree({
        title: formData.title,
        rootName: formData.rootName,
        rootGender: formData.rootGender,
        rootBirthDate: formData.rootBirthDate,
        rootLocation: formData.rootLocation
      });
      toast.success('Family tree created successfully!');
      onTreeCreated();
      onClose();
      // Reset form
      setFormData({
        title: '',
        rootName: '',
        rootGender: 'male',
        rootBirthDate: '',
        rootLocation: '',
      });
    } catch (error) {
      console.error('Error creating tree:', error);
      toast.error('Failed to create family tree');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-white/60"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#d4b5ff]/20 bg-gradient-to-r from-[#d4b5ff]/10 to-[#b5ffd4]/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4b5ff] to-[#b5e5ff] flex items-center justify-center">
                    <GitBranch className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#2d2d44]">Start New Tree</h2>
                    <p className="text-sm text-[#8888aa]">Begin your journey</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
                >
                  <X className="w-5 h-5 text-[#2d2d44]" />
                </motion.button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm text-[#8888aa] mb-2">Tree Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., The Johnson Family"
                  className="w-full px-4 py-3 rounded-2xl bg-[#f8f8ff] border border-[#d4b5ff]/30 focus:border-[#d4b5ff] focus:ring-2 focus:ring-[#d4b5ff]/20 outline-none transition-all text-[#2d2d44]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#8888aa] mb-2 flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Root Person Name (You/Ancestor) *
                </label>
                <input
                  type="text"
                  value={formData.rootName}
                  onChange={(e) => handleInputChange('rootName', e.target.value)}
                  placeholder="e.g., John Doe"
                  className="w-full px-4 py-3 rounded-2xl bg-[#f8f8ff] border border-[#d4b5ff]/30 focus:border-[#d4b5ff] focus:ring-2 focus:ring-[#d4b5ff]/20 outline-none transition-all text-[#2d2d44]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm text-[#8888aa] mb-2 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Birth Year
                  </label>
                  <input
                    type="text"
                    value={formData.rootBirthDate}
                    onChange={(e) => handleInputChange('rootBirthDate', e.target.value)}
                    placeholder="e.g., 1990"
                    className="w-full px-4 py-3 rounded-2xl bg-[#f8f8ff] border border-[#d4b5ff]/30 focus:border-[#d4b5ff] focus:ring-2 focus:ring-[#d4b5ff]/20 outline-none transition-all text-[#2d2d44]"
                  />
                </div>
                <div>
                   <label className="block text-sm text-[#8888aa] mb-2 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.rootLocation}
                    onChange={(e) => handleInputChange('rootLocation', e.target.value)}
                    placeholder="e.g., New York"
                    className="w-full px-4 py-3 rounded-2xl bg-[#f8f8ff] border border-[#d4b5ff]/30 focus:border-[#d4b5ff] focus:ring-2 focus:ring-[#d4b5ff]/20 outline-none transition-all text-[#2d2d44]"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-full bg-white border-2 border-[#d4b5ff]/30 text-[#2d2d44] hover:bg-[#f8f8ff] transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4b5ff] to-[#b5e5ff] text-[#2d2d44] font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Creating...' : <>Create Tree <Sparkles className="w-4 h-4" /></>}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
