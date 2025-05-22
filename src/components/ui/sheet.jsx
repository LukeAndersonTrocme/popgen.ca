'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

/**
 * Simple sheet (slide-in drawer) using Radix Dialog as a Sheet
 */
export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;

export const SheetContent = forwardRef(({ children, ...props }, ref) => (
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content
      ref={ref}
      className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-xs bg-white p-4 shadow-lg dark:bg-slate-900"
      {...props}
    >
      {children}
      <Dialog.Close asChild>
        <button
          className="absolute right-4 top-4 p-1 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close menu"
        >
          <Cross2Icon />
        </button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
));
