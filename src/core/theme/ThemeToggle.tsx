import { Moon, Sun } from 'lucide-react';
import { Button } from '@/core/ui/button';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative">
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.div>
    </Button>
  );
}
