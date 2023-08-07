import ReactModal from "react-modal";
import MapPin from '../../../../../assets/MapPin.svg'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik'
import { useContext } from "react";
import { MAddress } from "../../../../../models/MAddress";
import { LocationsContext } from "../../../../../context/locations";


interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (ad: MAddress) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const { locations } = useContext(LocationsContext);
    // validation form schema
    const validationSchema = Yup.object({
        street: Yup.string()
        .required("Street is required")
        .max(55),
        number: Yup.number()
        .required("Number is required")
        .lessThan(100000, "Number out of range")
        .moreThan(0, "Number out of range")
    })

    const handleSubmit = (state: any) =>{
        const selectLoc = locations.find(loc => loc.id === parseInt(state.location))
        const newLoc:MAddress = {
            ...state,
            location: selectLoc,
            id:0
        }
        onConfirm(newLoc)
    }

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal-delete">
            <div className="modal modal-open">
                <div className="bg-white p-8 rounded-3xl modal-box min-w-[50rem] max-h-[30rem] mt-20">
                    <button onClick={onClose} className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    <Formik
                        initialValues={{
                            street: "",
                            number: "",
                            location: ""
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <div className='flex flex-col gap-3'>
                                <label className='mt-1 text-sm' htmlFor="street">Street</label>
                                <Field type="text" name="street" error="street" className='my-2 input input-bordered' />
                                <ErrorMessage name="street">{msg => <span className="error-message">{msg}</span>}</ErrorMessage>
                                <label className='mt-1 text-sm' htmlFor="number">Number</label>
                                <Field type="number" name="number" className='my-2 input input-bordered' />
                                <ErrorMessage name="number">{msg => <span className="error-message">{msg}</span>}</ErrorMessage>
                                <label className='mt-1 text-sm' htmlFor="location">Location</label>
                                <Field as="select" name="location" className='my-2 input input-bordered'>
                                    <option value="">Select location</option>
                                    {
                                        locations.map(loc => (
                                            <option value={loc.id} key={loc.id}>{loc.location}</option>
                                        ))
                                    }
                                </Field>
                                <button type="submit" className='my-2 rounded-full btn btn-primary'><img className='h-6' src={MapPin} />Save address</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </ReactModal>
    )
}

export default AddressModal
