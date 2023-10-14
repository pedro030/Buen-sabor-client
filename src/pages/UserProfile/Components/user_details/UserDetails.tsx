// React
import { useContext } from "react";

// Auth
import { useAuth0 } from "@auth0/auth0-react";

// Formik
import { Field, Form, Formik } from "formik";

// Yup
import * as Yup from "yup";

// Context
import { UserContext } from "../../../../context/user";

// Types
import { MUser } from "../../../../models/MUser";

const UserDetails = () => {
  // User from Auth0
  const { user } = useAuth0();

  // User Contex - User info from DB & editUserInfo function
  const { userInfo, editUserInfo } = useContext(UserContext);

  // Regex para validar números de teléfono
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // Validacion del formulario
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Name is required").max(55),
    email: Yup.string().email(),
    lastName: Yup.string().required("Lastname is required").max(55),
    birthdate: Yup.date(),
    phone_number: Yup.string().matches(
      phoneRegExp,
      "Phone number is not valid"
    ),
  });

  // Guardar cambios
  const onSubmitChanges = (state: MUser) => {
    const updatedObj: MUser = {
      ...userInfo,
      firstName: state.firstName,
      lastName: state.lastName,
      telephone: state.telephone,
    };
    editUserInfo(updatedObj);
  };
  
  return (
    <div className=''>
      <h2 className='mb-5 text-center stat-title'>Account Info</h2>
      <Formik
        initialValues={ userInfo ? userInfo : {
          id: 0,
          firstName: "",
          mail: "",
          lastName: "",
          birthdate: "",
          telephone: 0,
          gender: "",
          blacklist: "",
          orders: []
        }}
        onSubmit={onSubmitChanges}
        validationSchema={validationSchema}
      >
        <Form className='grid grid-cols-2 gap-4 max-md:grid-cols-1 place-content-center'>
          <div className='flex flex-col items-center justify-center'>
            <div>
              <label className='label' htmlFor='firstName'>
                <span className='label-text'>First Name</span>
              </label>
              <Field
                name='firstName'
                type='text'
                className='w-96 max-lg:w-72 input input-bordered input-primary'
              />
            </div>
            <div>
              <label className='label' htmlFor='lastName'>
                <span className='label-text'>Last Name</span>
              </label>
              <Field
                type='text'
                name='lastName'
                className='w-96 max-lg:w-72 input input-bordered input-primary'
              />
            </div>
            <div>
              <label className='label' htmlFor='mail'>
                <span className='label-text'>Email</span>
              </label>
              <Field
                disabled
                name='mail'
                type='email'
                className='w-96 max-lg:w-72 input input-bordered input-primary'
              />
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div>
              <label className='label' htmlFor='birthdate'>
                <span className='label-text'>Birthdate</span>
              </label>
              <Field
                name='birthdate'
                type='date'
                className='w-96 max-lg:w-72 input input-bordered input-primary'
              />
            </div>
            <div>
              <label className='label' htmlFor='phone_number'>
                <span className='label-text'>Phone Number</span>
              </label>
              <Field
                type='text'
                name='phone_number'
                className='w-96 max-lg:w-72 input input-bordered input-primary'
              />
            </div>
            <div>
              <label className='label' htmlFor='gender'>
                <span className='label-text'>Gender</span>
              </label>
              <Field
                name='gender'
                type='text'
                className='w-96 max-lg:w-72 input input-bordered input-primary'
              />
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='w-full mb-10 rounded-full btn btn-primary max-md:w-72'
            >
              Save changes
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UserDetails;
