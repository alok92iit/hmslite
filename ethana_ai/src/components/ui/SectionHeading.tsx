import { motion } from 'framer-motion';
import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  badge?: string;
  action?: ReactNode;
}

export default function SectionHeading({ 
  title, 
  subtitle, 
  icon,
  badge,
  action
}: SectionHeadingProps) {
  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 mb-6 shadow-sm">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between flex-wrap gap-4"
      >
        {/* Left side - Title and subtitle */}
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {/* Icon */}
          {icon && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex-shrink-0 w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-700"
            >
              {icon}
            </motion.div>
          )}
          
          {/* Title and subtitle container */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-2xl font-semibold text-zinc-850 truncate"
              >
                {title}
              </motion.h2>
              
              {/* Badge */}
              {badge && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-200 text-zinc-800"
                >
                  {badge}
                </motion.span>
              )}
            </div>
            
            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-1 text-sm text-zinc-600"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
        
        {/* Right side - Action button */}
        {action && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex-shrink-0"
          >
            {action}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

