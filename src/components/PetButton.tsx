import React from 'react'
import { Button } from './ui/button'
import { PlusIcon } from '@radix-ui/react-icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import PetForm from './PetForm';

type PetButtonProps = {
  actionType: "edit" | "checkout" | "add";
  onClick?: () => void;
}
export default function PetButton({ actionType, onClick }: PetButtonProps) {
  if (actionType === "checkout") {
    return (
      <Button variant="secondary" onClick={onClick}>Checkout</Button>
    )
  }

  return (
    <Dialog>
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
        <PetForm />
      </DialogContent>
    </Dialog>
  )
}
