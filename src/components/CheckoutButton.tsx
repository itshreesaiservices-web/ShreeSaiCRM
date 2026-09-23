'use client';

import { useState } from 'react';
import { createPaymentOrder } from '@/app/actions/payments';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';


interface CheckoutButtonProps {
  amount: number; // Amount in INR
  taxReturnId?: string; // Optional context
  buttonText?: string;
  onSuccess?: () => void;
}

export function CheckoutButton({ 
  amount, 
  taxReturnId, 
  buttonText = `Pay ₹${amount}`,
  onSuccess
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    // 1. Load the script
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Connection Error: Failed to load Razorpay SDK. Please check your internet connection.");
      setLoading(false);
      return;
    }

    // 2. Create order on the server
    const response = await createPaymentOrder(amount, taxReturnId);
    
    if (!response.success || !response.orderId) {
      alert(`Payment Error: ${response.error || "Failed to initiate payment"}`);
      setLoading(false);
      return;
    }

    // 3. Open Razorpay Checkout
    const options = {
      key: response.keyId,
      amount: response.amount,
      currency: response.currency,
      name: "ClientBridge",
      description: "Tax Services Payment",
      order_id: response.orderId,
      handler: function (response: any) {
        // Handled securely by the webhook, but we can optimistically show success
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        if (onSuccess) onSuccess();
      },
      prefill: {
        // Can be pre-filled if we fetch client details
        name: "",
        email: "",
        contact: ""
      },
      theme: {
        color: "#3399cc"
      }
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.on('payment.failed', function (response: any) {
      alert(`Payment Failed: ${response.error.description}`);
    });
    
    paymentObject.open();
    setLoading(false);
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={loading}
      className="w-full sm:w-auto"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
}
