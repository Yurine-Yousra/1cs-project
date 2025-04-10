import { create } from "zustand";

type  Role = "admin" | "teacher";

interface RoleSate {
    role:Role;
    setRole:(role:Role) => void;
}

export const useRoleStore = create<RoleSate>((set) => ({
  role: 'admin',
  setRole: (role:Role) => set({ role })
}));
