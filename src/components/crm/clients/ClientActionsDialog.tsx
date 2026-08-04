"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addClient, updateClient } from "@/app/(crm)/actions/clients";

interface ClientActionsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  client?: any; // If provided, it's edit mode
}

export function ClientActionsDialog({ isOpen, onOpenChange, client }: ClientActionsDialogProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const isEditMode = !!client;

  const [formData, setFormData] = useState({
    firstName: client?.firstName || "",
    lastName: client?.lastName || "",
    email: client?.email || "",
    phone: client?.phone || "",
    pan: client?.pan || "",
    aadhaar: client?.aadhaar || "",
    riskProfile: client?.riskProfile || "MODERATE",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const action = isEditMode ? updateClient.bind(null, client.id) : addClient;
    const result = await action(formData);

    if (result.success) {
      onOpenChange(false);
      router.refresh(); // Refresh to ensure latest data
    } else {
      setError(result.error || "An error occurred.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Client Profile" : "Add New Client"}</DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Make changes to the client's information below." 
              : "Enter the details to create a new client and generate their portal account."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">{error}</div>}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" name="email" type="email" required disabled={isEditMode} value={formData.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Number</Label>
              <Input id="pan" name="pan" value={formData.pan} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <Input id="aadhaar" name="aadhaar" value={formData.aadhaar} onChange={handleChange} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="riskProfile">Risk Profile</Label>
            <select 
               id="riskProfile" 
               name="riskProfile" 
               value={formData.riskProfile} 
               onChange={handleChange}
               className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="CONSERVATIVE">Conservative</option>
              <option value="MODERATE">Moderate</option>
              <option value="AGGRESSIVE">Aggressive</option>
              <option value="HIGH">High</option>
              <option value="LOW">Low</option>
            </select>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditMode ? "Save Changes" : "Create Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
