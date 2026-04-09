"use client";
import useClients from "@/hooks/useClients";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CreateCleintModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { createClient } = useClients();

  const handleSubmit = () => {
    createClient.mutate({ name, email, phone });
    setOpen(false);
    setName("");
    setEmail("");
    setPhone("");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-slate-800">Add New Client</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Input
            placeholder="Name"
            className="text-slate-800 font-semibold"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            className="text-slate-800 font-semibold"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Phone"
            className="text-slate-800 font-semibold"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button onClick={handleSubmit} className="mt-2">
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCleintModal;
