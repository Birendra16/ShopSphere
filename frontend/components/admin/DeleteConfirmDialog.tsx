"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px] bg-slate-900 border-slate-700 text-white">
        <DialogHeader className="flex flex-col items-center text-center space-y-3">
          <div className="p-3 bg-red-500/10 rounded-full">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <DialogTitle className="text-xl font-bold">Delete Product</DialogTitle>
          <DialogDescription className="text-slate-400">
            Are you sure you want to delete <span className="text-white font-semibold">"{itemName}"</span>? 
            This action cannot be undone and will remove the product permanently.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="grid grid-cols-2 gap-3 mt-6 sm:justify-center">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-900/20"
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
