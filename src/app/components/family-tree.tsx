import { motion } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import { Plus, User, Heart, Home, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { AddMemberModal } from "./add-member-modal";
import { treeService } from "../../services/tree.service";
import { memberService } from "../../services/member.service";
import { toast } from "sonner";

interface Member {
  id: number;
  name: string;
  relation: string;
  generation: number;
}

export function FamilyTree() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [currentTreeId, setCurrentTreeId] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Recursive mapping to flatten backend JSON
  // Recursive mapping with deduplication
  const mapMembers = (
    member: any,
    relation = "Self",
    addedIds = new Set<number>(),
  ): Member[] => {
    if (!member || addedIds.has(member.id)) return [];

    // Mark this member as added
    addedIds.add(member.id);

    const mapped: Member[] = [
      {
        id: member.id,
        name: member.name,
        relation,
        generation: member.generationLevel,
      },
    ];

    // Map children
    if (member.children?.length) {
      member.children.forEach((child: any) => {
        mapped.push(...mapMembers(child, "Child", addedIds));
      });
    }

    // Map spouses
    if (member.spouses?.length) {
      member.spouses.forEach((spouse: any) => {
        mapped.push(...mapMembers(spouse, "Spouse", addedIds));
      });
    }

    return mapped;
  };

  const fetchTreeData = useCallback(async () => {
    try {
      setIsLoading(true);
      let treeId = currentTreeId;

      if (!treeId) {
        const paramId = searchParams.get("treeId");
        if (paramId) treeId = parseInt(paramId);
        else {
          const trees = await treeService.getUserTrees();
          if (trees && trees.length > 0) treeId = trees[0].id;
        }
      }

      if (treeId) {
        setCurrentTreeId(treeId);
        const treeDetails: any = await treeService.getTreeDetails(treeId);

        if (treeDetails.nodes?.length) {
          const addedIds = new Set<number>();
          const mappedMembers = treeDetails.nodes.flatMap((m: any) =>
            mapMembers(m, "Self", addedIds),
          );
          setMembers(mappedMembers);
        } else {
          setMembers([]);
        }
      }
    } catch (error) {
      console.error("Error fetching tree data:", error);
      toast.error("Failed to load family tree.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTreeData();
  }, [fetchTreeData]);

  const handleDeleteMember = async (memberId: number) => {
    if (!window.confirm("Are you sure you want to remove this family member?"))
      return;
    try {
      await memberService.deleteMember(memberId);
      toast.success("Member removed successfully");
      fetchTreeData();
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Failed to delete member");
    }
  };

  const generationColors = {
    1: "from-[#ffb5c5] to-[#fff4b5]",
    2: "from-[#d4b5ff] to-[#b5e5ff]",
    3: "from-[#b5ffd4] to-[#b5e5ff]",
  };

  const getGenerationMembers = (gen: number) =>
    members.filter((m) => m.generation === gen);

  const generations = Array.from(
    new Set(members.map((m) => m.generation)),
  ).sort((a, b) => b - a);
  const displayGenerations = generations.length > 0 ? generations : [0];

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
              <p className="text-[#6b6b8b] text-lg">
                Every branch tells a story
              </p>
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
            disabled={!currentTreeId}
          >
            <Plus className="w-6 h-6" />
            <span>Add Family Member</span>
          </motion.button>
          {!currentTreeId && !isLoading && (
            <p className="text-red-400 text-sm mt-2">
              No family tree found. Please create one in dashboard.
            </p>
          )}
        </motion.div>

        {/* Tree Visualization */}
        <div className="space-y-12">
          {isLoading ? (
            <div className="text-center text-[#8888aa]">Loading tree...</div>
          ) : members.length === 0 ? (
            <div className="text-center text-[#8888aa]">
              No members yet. Start by adding one!
            </div>
          ) : (
            displayGenerations.map((generation) => (
              <motion.div
                key={generation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-center mb-4">
                  <span className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-[#8888aa] border border-white/80 shadow-md">
                    Generation {generation + 1}
                  </span>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                  {getGenerationMembers(generation).map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                      className="relative group"
                    >
                      <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-lg border border-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 w-48 relative">
                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMember(member.id);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div
                          className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${
                            generationColors[
                              ((generation % 3) +
                                1) as keyof typeof generationColors
                            ] || generationColors[1]
                          } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          {member.relation === "Self" ? (
                            <Heart className="w-8 h-8 text-white" />
                          ) : (
                            <User className="w-8 h-8 text-white" />
                          )}
                        </div>
                        <h3 className="font-bold text-[#2d2d44] text-center mb-1">
                          {member.name}
                        </h3>
                        <p className="text-[#8888aa] text-sm text-center">
                          {member.relation}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsModalOpen(true)}
          disabled={!currentTreeId}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#ffb5c5] to-[#fff4b5] shadow-2xl flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <Plus className="w-8 h-8 text-white" />
        </motion.button>
      </div>

      {/* Add Member Modal */}
      {currentTreeId && (
        <AddMemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          treeId={currentTreeId}
          existingMembers={members}
          onMemberAdded={fetchTreeData}
        />
      )}
    </div>
  );
}
