import { useAuth0 } from '@auth0/auth0-react'
import { Field, Form, Formik } from 'formik'
import './UserDetails.scss'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { UserContext } from '../../../../context/user'
import { MUser } from '../../../../models/MUser'

const UserDetails = () => {

  const { user } = useAuth0()

  const { userInfo, editUserInfo } = useContext(UserContext);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("Name is required")
      .max(55),
    email: Yup.string().email(),
    lastName: Yup.string()
      .required("Lastname is required")
      .max(55),
    birthdate: Yup.date(),
    phone_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
  })

  const onSubmitChanges = (state: any) =>{
    const updatedObj:MUser = {
      ...userInfo,
      firstName: state.firstName,
      lastName: state.lastName,
      telephone: state.phone_number
    }
    editUserInfo(updatedObj)
  }
  return (
    <div className="">
      <h2 className='mb-5 text-center stat-title'>Account Info</h2>
      <Formik
        initialValues={{
          firstName: userInfo?.firstName,
          email: userInfo?.mail,
          lastName: userInfo?.lastName,
          birthdate: user?.birthdate,
          phone_number: userInfo?.telephone,
          gender: user?.gender,
        }}
        onSubmit={onSubmitChanges}
        validationSchema={validationSchema}
      >
        <Form className='grid grid-cols-2 gap-4 place-content-center'>
          <div className='flex flex-col items-center justify-center'>
            <div>
              <label className='label' htmlFor="firstName"><span className="label-text">First Name</span></label>
              <Field name="firstName" type="text" className="w-96 max-lg:w-72 input input-bordered input-primary" />
            </div>
            <div>
              <label className='label' htmlFor="lastName"><span className="label-text">Last Name</span></label>
              <Field type="text" name="lastName" className="w-96 max-lg:w-72 input input-bordered input-primary" />
            </div>
            <div>
              <label className='label' htmlFor="email"><span className="label-text">Email</span></label>
              <Field disabled name="email" type="email" className="w-96 max-lg:w-72 input input-bordered input-primary" />
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div>
              <label className='label' htmlFor="birthdate"><span className="label-text">Birthdate</span></label>
              <Field name="birthdate" type="date" className="w-96 max-lg:w-72 input input-bordered input-primary" />
            </div>
            <div>
              <label className='label' htmlFor="phone_number"><span className="label-text">Number Cell Phone</span></label>
              <Field type="text" name="phone_number" className="w-96 max-lg:w-72 input input-bordered input-primary" />
            </div>
            <div>
              <label className='label' htmlFor="gender"><span className="label-text">Gender </span></label>
              <Field name="gender" type="text" className="w-96 max-lg:w-72 input input-bordered input-primary" />
            </div>
          </div>
          <button type="submit" className='my-2 rounded-full btn btn-primary'>Save changes</button>
        </Form>
      </Formik>
    </div>
  )
}

export default UserDetails