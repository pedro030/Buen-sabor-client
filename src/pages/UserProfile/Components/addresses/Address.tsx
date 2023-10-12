import TrashSimple from "../../../../assets/TrashSimple.svg";
import MapPin from "../../../../assets/MapPin.svg";
import { useContext, useEffect, useState } from "react";
import AddressModal from "./AddressModal/AddressModal";
import { UserContext } from "../../../../context/user";
import { MAddress } from "../../../../models/MAddress";
import ConfirmationModal from "../../../../components/confirmation-modal/confirmation-modal";
import swal from "sweetalert";

const Address = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<MAddress>();
  const { addresses, newAddress, deleteAddress } = useContext(UserContext);

  const handleOpenAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  const handleConfirmCreate = (ad: MAddress) => {
    newAddress(ad)
      .then(() => {
        swal({
          icon: "success",
          text: "Agregado",
          buttons: [false],
          timer: 2000,
        });
        handleCloseAddressModal();
      })
      .catch(() => {
        swal({
          icon: "error",
          text: "Error al agregar",
        });
      });
  };

  const handleConfirmDelete = () => {
    if (addressToDelete)
      deleteAddress(addressToDelete).then((data) => {
        if (data) {
          swal({
            icon: "success",
            text: "Eliminado con exito",
            buttons: [false],
            timer: 2000,
          });
          setIsConfirmationModalOpen(false);
        } else {
          swal({
            icon: "error",
            text: "Error al eliminar",
          });
          setIsConfirmationModalOpen(false);
        }
      });
  };

  const handleOpenConfirmationModal = (ad: MAddress) => {
    setIsConfirmationModalOpen(true);
    setAddressToDelete(ad);
  };

  return (
    <div>
      <h2 className='mb-5 text-center stat-title'>Address</h2>

      <div className='flex my-3 place-content-center'>
        <button
          onClick={() => handleOpenAddressModal()}
          className='mb-5 rounded-full btn btn-primary max-md:w-full'
        >
          <img className='h-6' src={MapPin} />
          Add address
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='table mb-10 table-xs'>
          <thead>
            <tr>
              <th>Address</th>
              <th>Number</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {addresses &&
              addresses?.map((a: MAddress, i: number) => (
                <tr key={i}>
                  <td>{a.street}</td>
                  <td>{a.number}</td>
                  <td>{a.location.location}</td>
                  <td>
                    <button
                      className='btn btn-circle btn-secondary btn-sm'
                      onClick={() => handleOpenConfirmationModal(a)}
                    >
                      <img className='p-1 h-7' src={TrashSimple} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Address</th>
              <th>Number</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={handleCloseAddressModal}
        onConfirm={handleConfirmCreate}
      />
      <ConfirmationModal
        mainText='Are you sure you want to delete this address?'
        buttonText='Delete address'
        onConfirm={handleConfirmDelete}
        onClose={() => setIsConfirmationModalOpen(false)}
        isOpen={isConfirmationModalOpen}
      />
    </div>
  );
};

export default Address;
