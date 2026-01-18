"use client";

import { useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AccountPage() {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider>
      <div className="section-spacing">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-4 md:grid-cols-2 md:px-6">
          <div className="rounded-[20px] border border-[#1F2430] bg-[#0B0D10]/70 p-6">
            <h1 className="font-display text-2xl uppercase">Sign in</h1>
            <div className="mt-4 space-y-3">
              <Input placeholder="Email" type="email" />
              <Input placeholder="Password" type="password" />
              <Button onClick={() => setOpen(true)}>Sign in</Button>
            </div>
          </div>
          <div className="rounded-[20px] border border-[#1F2430] bg-[#0B0D10]/70 p-6">
            <h2 className="font-display text-2xl uppercase">Register</h2>
            <div className="mt-4 space-y-3">
              <Input placeholder="Name" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Password" type="password" />
              <Button variant="secondary" onClick={() => setOpen(true)}>
                Create account
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className="fixed bottom-6 right-6 rounded-[14px] border border-[#1F2430] bg-[#0B0D10] px-4 py-3 text-sm text-white"
      >
        Success. Mock authentication complete.
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
}
