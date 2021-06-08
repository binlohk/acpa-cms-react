import { useState } from 'react';

export default function useSidebar() {
    const [open, setOpen] = useState(false);
    return {
        open,
        setOpen,
    }
}