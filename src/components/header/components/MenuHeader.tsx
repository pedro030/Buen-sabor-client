import { useState } from "react";
import notepad from "../../../assets/notepad.svg";
import cartImg from "../../../assets/cart.svg";
import EditCartModal from "../../menu/EditCartModal/EditCartModal";
import PendingOrdersModal from "./PendingOrdersModal";

export const MenuHeader = () => {
   // Cart Modal State
   const [isEditCartModalOpen, setIsEditCartModalOpen] =
   useState<boolean>(false);

   const handleOpenEditCartModal = () => {
    setIsEditCartModalOpen(true);
  };

  const handleCloseEditCartModal = () => {
    setIsEditCartModalOpen(false);
  };

  // Pending Orders Modal State
  const [isPendingOrdersModalOpen, setIsPendingOrdersModalOpen] =
  useState<boolean>(false);

  const handleOpenPendingOrdersModal = () => {
    setIsPendingOrdersModalOpen(true);
  };

  const handleClosePendingOrdersModal = () => {
    setIsPendingOrdersModalOpen(false);
  };

  return (
    <div className="dropdown lg:hidden">
      <div tabIndex={0} role="button" className="btn btn-xs btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a>
            <div
              tabIndex={0}
              className="flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => handleOpenPendingOrdersModal()}
            >
              <img src={notepad} height="25" /> Pending orders
            </div>
          </a>
        </li>
        <li>
          <a>
            <div
              tabIndex={0}
              className="flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => handleOpenEditCartModal()}
            >
              <img src={cartImg} height="25" /> Cart
            </div>
          </a>
        </li>
      </ul>
      {/* EDIT CART MODAL */}
      <EditCartModal
        isOpen={isEditCartModalOpen}
        onClose={handleCloseEditCartModal}
      />
      <PendingOrdersModal
        isOpen={isPendingOrdersModalOpen}
        onClose={handleClosePendingOrdersModal}
      />
    </div>
  );
};
