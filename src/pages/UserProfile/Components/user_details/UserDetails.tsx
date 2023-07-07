import { useAuth0 } from '@auth0/auth0-react'
import { Field, Form, Formik } from 'formik'
import './UserDetails.scss'
import React from 'react'

const UserDetails = () => {

  const { user } = useAuth0()
  return (
    <div className="">
      <h2 className='mb-5 text-center stat-title'>Account Info</h2>
      <Formik
        initialValues={{
          firstName: user?.given_name,
          email: user?.email,
          lastName: user?.family_name,
          birthdate: user?.birthdate,
          phone_number: user?.phone_number,
          gender: user?.gender,
          rememberMe: false
        }}
        onSubmit={(state) => { console.log(state.email) }}
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
              <Field name="email" type="email" className="w-96 max-lg:w-72 input input-bordered input-primary" />
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
        </Form>
      </Formik>
    </div>
  )
}

export default UserDetails