import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NameState {
    name: string;
    setName: (name: string) => void;
}

const useName = create<NameState>()(
    persist(
        (set) => ({
            name: '',
            setName: (name: string) => set({ name }),
        }),
        {
            name: 'name-storage',
            storage: {
                getItem: (name) => {
                    const item = localStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => localStorage.removeItem(name),
            },
        }
    )
);

export default useName;
