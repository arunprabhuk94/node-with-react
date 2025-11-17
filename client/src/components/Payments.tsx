import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { createPaymentIntent, getPaymentIntentStatus } from "../api";
import { fetchCurrentUser, useAppDispatch } from "../redux";
import { Box, Modal } from "@mui/material";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

export const Payments = () => {
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);

  return (
    <>
      <button className="btn" onClick={() => setShow(true)}>
        Add Credits
      </button>
      {show && <PaymentsModal show={show} closeModal={closeModal} />}
    </>
  );
};

const PaymentsModal = ({
  show,
  closeModal,
}: {
  show: boolean;
  closeModal: () => void;
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const clientSecret = await createPaymentIntent();
      setClientSecret(clientSecret);
    })();
  }, []);

  if (!clientSecret) return <div>Loading...</div>;

  return (
    <Modal
      open={show}
      onClose={() => closeModal()}
      aria-labelledby="Add Credits Modal"
      aria-describedby="Credit card form for adding credits"
    >
      <Box
        sx={{
          width: 400,
          margin: "auto",
          marginTop: "10vh",
          padding: 2,
          backgroundColor: "white",
          borderRadius: 1,
        }}
      >
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm closeModal={closeModal} />
        </Elements>
      </Box>
    </Modal>
  );
};

const CheckoutForm = ({ closeModal }: { closeModal: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Optionally pass billing details here
          payment_method_data: {
            billing_details: address
              ? {
                  address: address.address,
                  name: address.name,
                  email: address.email,
                  phone: address.phone,
                }
              : undefined,
          },
          return_url: window.location.origin + "/payment-success",
        },
        redirect: "if_required",
      });

      setHasError(!!error);
      if (error) {
        setMessage(error.message || "An error occurred");
      } else {
        await getPaymentIntentStatus(paymentIntent?.id);
        dispatch(fetchCurrentUser());
        setMessage("Payment successful!");
        closeModal();
      }
    } catch (err) {
      if (err instanceof Error) setMessage(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{ mode: "billing" }}
          onChange={(e) => setAddress(e.value)}
        />
        <button
          type="submit"
          className="btn"
          disabled={!stripe || loading}
          style={{ marginTop: "20px" }}
        >
          {loading ? "Adding Credits..." : "Add Credits"}
        </button>
        {message && (
          <div className={hasError ? "red-text" : "green-text"}>{message}</div>
        )}
      </form>
    </div>
  );
};
