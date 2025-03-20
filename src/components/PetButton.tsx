"use client"
import { useState } from 'react'
import { Button } from './ui/button'
import { PlusIcon } from '@radix-ui/react-icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import PetForm from './PetForm';

type PetButtonProps = {
  actionType: "edit" | "checkout" | "add";
  onClick?: () => void;
  disabled?: boolean;
}
export default function PetButton({ actionType, onClick, disabled }: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (actionType === "checkout") {
    return (
      <Button variant="secondary" disabled={disabled} onClick={onClick}>Checkout</Button>
    )
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={() => { setIsFormOpen(!isFormOpen) }}>
      <DialogTrigger asChild>
        {
          actionType === "add" ?
            <Button size="icon">
              <PlusIcon className='h-6 w-6' />
            </Button>
            : <Button variant="secondary">Edit</Button>
        }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{actionType === "add" ? "Add a new pet" : "Edit pet"}</DialogTitle>
        </DialogHeader>
        <PetForm type={actionType} onFormSubmission={() => { setIsFormOpen(false) }} />
      </DialogContent>
    </Dialog>
  )
}
