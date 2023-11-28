// React
import { useContext, useState } from "react";

// Context
import { UserContext } from "../../../../context/user";

// Sweet Alert 2
import Swal from "sweetalert2";

// Type
import { MAddress } from "../../../../models/MAddress";

// Component
import AddressModal from "./AddressModal/AddressModal";

// Assets
import TrashSimple from "../../../../assets/TrashSimple.svg";
import MapPin from "../../../../assets/MapPin.svg";

const Address = () => {
  // State: Addres Modal Opened or Closed
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // User Context - Address state & functions
  const { addresses, newAddress, deleteAddress } = useContext(UserContext);

  // Open Modal
  const handleOpenAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  // Close Modal
  const handleCloseAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  // Handler: Create Address with Alerts
  const handleConfirmCreate = (ad: MAddress) => {
    Swal.fire({
        title: 'Adding...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        showCancelButton: false,
        didOpen: () => {
            Swal.showLoading();
        },
    })
    newAddress(ad)
    .then((res) => {
      // console.log(res);
        if(res) {
            Swal.fire({
                icon: 'success',
                title: `The address was added`,
                allowEscapeKey: false,
                allowOutsideClick: false,
                showCancelButton: false,
                confirmButtonColor: '#E73636'
            })                
        } else {
            Swal.fire({ title: 'There was an error', icon: 'error', confirmButtonColor: '#E73636' })
        }
        handleCloseAddressModal();
    })
};

// Handler: Delete Address with Alerts
const handleConfirmDelete = (ad: MAddress) => {
    Swal.fire({
        icon: 'warning',
        title: `Delete Address`,
        text: `Are you sure you want to delete this address?`,
        confirmButtonText: `Delete Address`,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: '#E73636'
    })
        .then((result) => {
            if(result.isConfirmed && ad) {
                Swal.fire({
                    title: 'Removing...',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    showCancelButton: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                })

                deleteAddress(ad)
                    .then((res) => {
                        if(res) {
                            Swal.fire({
                                icon: 'success',
                                title: `The address was removed`,
                                allowEscapeKey: false,
                                allowOutsideClick: false,
                                showCancelButton: false,
                                confirmButtonColor: '#E73636'
                            })
                        } else Swal.fire({ title: 'There was an error', icon: 'error', confirmButtonColor: '#E73636' })
                    })
            }
        })
}

  return (
    <div>
      <h2 className='mb-5 text-center stat-title'>Address</h2>
      { /* ADD ADDRESS BUTTON */ }
      <div className='flex my-3 place-content-center'>
        <button
          onClick={() => handleOpenAddressModal()}
          className='mb-5 rounded-full btn btn-primary max-md:w-full'
        >
          <img className='h-6' src={MapPin} />
          Add address
        </button>
      </div>
      { /* ADDRESSES LIST */ }
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
                      onClick={() => handleConfirmDelete(a)}
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
      { /* ADDRESS MODAL */ }
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={handleCloseAddressModal}
        onConfirm={handleConfirmCreate}
      />
    </div>
  );
};

export default Address;
