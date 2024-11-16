import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LaborState {
    laborId: string;
    setLaborId: (laborId: string) => void;
}

const useLaborStore = create<LaborState>()(
    persist(
        (set) => ({
            laborId: '',
            setLaborId: (laborId: string) => set({ laborId }),
        }),
        {
            name: 'laborId-storage',
            storage: {
                getItem: (laborId) => {
                    const item = localStorage.getItem(laborId);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (laborId, value) => localStorage.setItem(laborId, JSON.stringify(value)),
                removeItem: (laborId) => localStorage.removeItem(laborId),
            },
        }
    )
);

export default useLaborStore;
