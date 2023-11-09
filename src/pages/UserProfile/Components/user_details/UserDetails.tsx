// React
import { useContext } from "react";

// Auth
import { useAuth0 } from "@auth0/auth0-react";

// Formik
import { ErrorMessage, Field, Form, Formik } from "formik";

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

  // Regex para validar nombres y apellido
  const nameRegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s']+$/u
  // Validacion del formulario
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Name is required")
    .matches(nameRegExp, 'Numbers are not allowed').max(55),
    email: Yup.string().email(),
    lastName: Yup.string().required("Lastname is required")
    .matches(nameRegExp, 'Numbers are not allowed').max(55),
    telephone: Yup.string().matches(
      phoneRegExp,
      "Phone number is not valid"
    ).max(14, "Phone number is too long"),
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
          telephone: 0,
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
              <br />
              <ErrorMessage name="firstName">{msg => <span className="text-error">{msg}</span>}</ErrorMessage>
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
              <br />
              <ErrorMessage name="lastName">{msg => <span className="text-error">{msg}</span>}</ErrorMessage>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div>
              <label className='label' htmlFor='telephone'>
                <span className='label-text'>Phone Number</span>
              </label>
              <Field
                type='text'
                name='telephone'
                className='w-96 max-lg:w-72 input input-bordered input-primary'
              />
              <br />
              <ErrorMessage name="telephone">{msg => <span className="text-error">{msg}</span>}</ErrorMessage>
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
