import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DateState {
    laborDate: string;
    setDate: (Date: string) => void;
}

const useDate = create<DateState>()(
    persist(
        (set) => ({
            laborDate: '',
            setDate: (laborDate: string) => set({ laborDate }),
        }),
        {
            name: 'Date-storage',
            storage: {
                getItem: (laborDate) => {
                    const item = localStorage.getItem(laborDate);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (laborDate, value) => localStorage.setItem(laborDate, JSON.stringify(value)),
                removeItem: (laborDate) => localStorage.removeItem(laborDate),
            },
        }
    )
);

export default useDate;
