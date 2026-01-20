import { motion, AnimatePresence } from 'motion/react';
import { X, User, MapPin, Calendar, Heart, Users, CheckCircle, Eye } from 'lucide-react';
import { useState } from 'react';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  birthYear: string;
  birthPlace: string;
  isLiving: boolean;
  relationshipType: string;
  connectTo: string;
  confirmed: boolean;
}

const existingMembers = [
  { id: '1', name: 'You', relation: 'Self' },
  { id: '2', name: 'Mom', relation: 'Mother' },
  { id: '3', name: 'Dad', relation: 'Father' },
  { id: '4', name: 'Grandma Sarah', relation: 'Grandmother' },
  { id: '5', name: 'Grandpa John', relation: 'Grandfather' },
];

const relationshipTypes = [
  { value: 'parent', label: 'Parent', emoji: '👨‍👩' },
  { value: 'child', label: 'Child', emoji: '👶' },
  { value: 'sibling', label: 'Sibling', emoji: '👫' },
  { value: 'spouse', label: 'Spouse', emoji: '💑' },
  { value: 'grandparent', label: 'Grandparent', emoji: '👴' },
  { value: 'other', label: 'Other Relative', emoji: '👥' },
];

export function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    birthYear: '',
    birthPlace: '',
    isLiving: true,
    relationshipType: '',
    connectTo: '',
    confirmed: false,
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.birthYear.trim() !== '' &&
      formData.birthPlace.trim() !== '' &&
      formData.relationshipType !== '' &&
      formData.connectTo !== '' &&
      formData.confirmed
    );
  };

  const handlePreview = () => {
    if (isFormValid()) {
      setStep('preview');
    }
  };

  const handleConfirm = () => {
    console.log('Adding member:', formData);
    onClose();
    // Reset form
    setFormData({
      fullName: '',
      birthYear: '',
      birthPlace: '',
      isLiving: true,
      relationshipType: '',
      connectTo: '',
      confirmed: false,
    });
    setStep('form');
  };

  const handleCancel = () => {
    onClose();
    setStep('form');
    setFormData({
      fullName: '',
      birthYear: '',
      birthPlace: '',
      isLiving: true,
      relationshipType: '',
      connectTo: '',
      confirmed: false,
    });
  };

  const selectedMember = existingMembers.find(m => m.id === formData.connectTo);
  const selectedRelation = relationshipTypes.find(r => r.value === formData.relationshipType);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-white/60"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#d4b5ff]/20 bg-gradient-to-r from-[#d4b5ff]/10 to-[#b5ffd4]/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4b5ff] to-[#b5e5ff] flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#2d2d44]">
                      {step === 'form' ? 'Add Family Member' : 'Preview Placement'}
                    </h2>
                    <p className="text-sm text-[#8888aa]">
                      {step === 'form' ? 'Fill in the details below' : 'Confirm the family connection'}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancel}
                  className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
                >
                  <X className="w-5 h-5 text-[#2d2d44]" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {step === 'form' ? (
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-[#2d2d44] flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#ffb5c5]" />
                      Basic Information
                    </h3>

                    <div>
                      <label className="block text-sm text-[#8888aa] mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="e.g., Sarah Johnson"
                        className="w-full px-4 py-3 rounded-2xl bg-[#f8f8ff] border border-[#d4b5ff]/30 focus:border-[#d4b5ff] focus:ring-2 focus:ring-[#d4b5ff]/20 outline-none transition-all text-[#2d2d44]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-[#8888aa] mb-2 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Birth Year *
                        </label>
                        <input
                          type="text"
                          value={formData.birthYear}
                          onChange={(e) => handleInputChange('birthYear', e.target.value)}
                          placeholder="e.g., 1965"
                          className="w-full px-4 py-3 rounded-2xl bg-[#f8f8ff] border border-[#d4b5ff]/30 focus:border-[#d4b5ff] focus:ring-2 focus:ring-[#d4b5ff]/20 outline-none transition-all text-[#2d2d44]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-[#8888aa] mb-2 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Birth Place *
                        </label>
                        <input
                          type="text"
                          value={formData.birthPlace}
                          onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                          placeholder="e.g., Chicago, IL"
                          className="w-full px-4 py-3 rounded-2xl bg-[#f8f8ff] border border-[#d4b5ff]/30 focus:border-[#d4b5ff] focus:ring-2 focus:ring-[#d4b5ff]/20 outline-none transition-all text-[#2d2d44]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[#8888aa] mb-2">Living Status</label>
                      <div className="flex gap-3">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleInputChange('isLiving', true)}
                          className={`flex-1 px-4 py-3 rounded-2xl border-2 transition-all ${
                            formData.isLiving
                              ? 'bg-gradient-to-r from-[#b5ffd4] to-[#b5e5ff] border-[#b5ffd4] text-[#2d2d44]'
                              : 'bg-white border-[#d4b5ff]/30 text-[#8888aa]'
                          }`}
                        >
                          Living 💚
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleInputChange('isLiving', false)}
                          className={`flex-1 px-4 py-3 rounded-2xl border-2 transition-all ${
                            !formData.isLiving
                              ? 'bg-gradient-to-r from-[#d4b5ff] to-[#b5e5ff] border-[#d4b5ff] text-[#2d2d44]'
                              : 'bg-white border-[#d4b5ff]/30 text-[#8888aa]'
                          }`}
                        >
                          Deceased 🕊️
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Relationship Information */}
                  <div className="space-y-4 pt-6 border-t border-[#d4b5ff]/20">
                    <h3 className="font-bold text-[#2d2d44] flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#d4b5ff]" />
                      Family Connection *
                    </h3>

                    <div>
                      <label className="block text-sm text-[#8888aa] mb-2">Relationship Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {relationshipTypes.map((type) => (
                          <motion.button
                            key={type.value}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleInputChange('relationshipType', type.value)}
                            className={`px-4 py-3 rounded-2xl border-2 transition-all text-left ${
                              formData.relationshipType === type.value
                                ? 'bg-gradient-to-r from-[#d4b5ff]/20 to-[#b5e5ff]/20 border-[#d4b5ff] text-[#2d2d44]'
                                : 'bg-white border-[#d4b5ff]/30 text-[#8888aa] hover:border-[#d4b5ff]/60'
                            }`}
                          >
                            <span className="mr-2">{type.emoji}</span>
                            {type.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[#8888aa] mb-2">Connect To</label>
                      <select
                        value={formData.connectTo}
                        onChange={(e) => handleInputChange('connectTo', e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-[#f8f8ff] border border-[#d4b5ff]/30 focus:border-[#d4b5ff] focus:ring-2 focus:ring-[#d4b5ff]/20 outline-none transition-all text-[#2d2d44]"
                      >
                        <option value="">Select an existing family member...</option>
                        {existingMembers.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name} ({member.relation})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Confirmation */}
                  <div className="space-y-4 pt-6 border-t border-[#d4b5ff]/20">
                    <motion.label
                      whileTap={{ scale: 0.98 }}
                      className="flex items-start gap-3 cursor-pointer"
                    >
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          checked={formData.confirmed}
                          onChange={(e) => handleInputChange('confirmed', e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            formData.confirmed
                              ? 'bg-gradient-to-br from-[#b5ffd4] to-[#b5e5ff] border-[#b5ffd4]'
                              : 'bg-white border-[#d4b5ff]/30'
                          }`}
                        >
                          {formData.confirmed && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                      <span className="text-sm text-[#2d2d44]">
                        I confirm that the relationship information is accurate and I understand this will update the family tree structure.
                      </span>
                    </motion.label>
                  </div>
                </div>
              ) : (
                // Preview Step
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#d4b5ff]/10 to-[#b5ffd4]/10 border border-[#d4b5ff]/30">
                    <h3 className="font-bold text-[#2d2d44] mb-4 flex items-center gap-2">
                      <Eye className="w-5 h-5 text-[#d4b5ff]" />
                      Tree Preview
                    </h3>

                    <div className="flex items-center justify-center gap-8 py-8">
                      {/* Existing Member */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                      >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4b5ff] to-[#b5e5ff] flex items-center justify-center shadow-lg mb-2">
                          <User className="w-10 h-10 text-white" />
                        </div>
                        <p className="font-bold text-[#2d2d44]">{selectedMember?.name}</p>
                        <p className="text-sm text-[#8888aa]">{selectedMember?.relation}</p>
                      </motion.div>

                      {/* Connection Line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="h-0.5 w-16 bg-gradient-to-r from-[#d4b5ff] to-[#b5ffd4]"></div>
                        <div className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#d4b5ff]/30 text-xs text-[#8888aa]">
                          {selectedRelation?.emoji} {selectedRelation?.label}
                        </div>
                        <div className="h-0.5 w-16 bg-gradient-to-r from-[#b5ffd4] to-[#ffb5c5]"></div>
                      </motion.div>

                      {/* New Member */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                      >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ffb5c5] to-[#fff4b5] flex items-center justify-center shadow-lg mb-2 border-2 border-[#b5ffd4] border-dashed">
                          <Heart className="w-10 h-10 text-white" />
                        </div>
                        <p className="font-bold text-[#2d2d44]">{formData.fullName}</p>
                        <p className="text-sm text-[#8888aa]">New Member</p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Member Details Summary */}
                  <div className="p-6 rounded-2xl bg-white border border-[#d4b5ff]/20">
                    <h4 className="font-bold text-[#2d2d44] mb-3">Member Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#8888aa]">Full Name:</span>
                        <span className="text-[#2d2d44] font-medium">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8888aa]">Birth Year:</span>
                        <span className="text-[#2d2d44] font-medium">{formData.birthYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8888aa]">Birth Place:</span>
                        <span className="text-[#2d2d44] font-medium">{formData.birthPlace}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8888aa]">Status:</span>
                        <span className="text-[#2d2d44] font-medium">
                          {formData.isLiving ? 'Living 💚' : 'Deceased 🕊️'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[#d4b5ff]/20 bg-gradient-to-r from-[#f8f8ff] to-[#f0fff5]">
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 rounded-full bg-white border-2 border-[#d4b5ff]/30 text-[#2d2d44] hover:bg-[#f8f8ff] transition-colors"
                >
                  Cancel
                </motion.button>

                {step === 'form' ? (
                  <motion.button
                    whileHover={{ scale: isFormValid() ? 1.02 : 1 }}
                    whileTap={{ scale: isFormValid() ? 0.98 : 1 }}
                    onClick={handlePreview}
                    disabled={!isFormValid()}
                    className={`flex-1 px-6 py-3 rounded-full font-medium transition-all ${
                      isFormValid()
                        ? 'bg-gradient-to-r from-[#d4b5ff] to-[#b5e5ff] text-[#2d2d44] shadow-lg hover:shadow-xl'
                        : 'bg-[#e0e0f0] text-[#8888aa] cursor-not-allowed'
                    }`}
                  >
                    Preview Placement
                  </motion.button>
                ) : (
                  <div className="flex-1 flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep('form')}
                      className="flex-1 px-6 py-3 rounded-full bg-white border-2 border-[#d4b5ff]/30 text-[#2d2d44] hover:bg-[#f8f8ff] transition-colors"
                    >
                      ← Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirm}
                      className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-[#b5ffd4] to-[#b5e5ff] text-[#2d2d44] font-medium shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Confirm & Add ✨
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
