// Confirmation.tsx
import React from "react";
import Swal from "sweetalert2";

type ConfirmationProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Confirmation: React.FC<ConfirmationProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  React.useEffect(() => {
    void Swal.fire({
      title: "Confirmation",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("confirmed");
        onConfirm();
      } else {
        onCancel();
      }
    });
  }, [message, onConfirm, onCancel]);

  return null;
};

export default Confirmation;
