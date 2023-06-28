import { useAuth0 } from '@auth0/auth0-react'
import { Field, Form, Formik } from 'formik'
import './UserDetails.scss'
import React from 'react'

const UserDetails = () => {

  const { user } = useAuth0()
  return (
    <div className="">
      <h2 className='stat-title'>Account Info</h2>
      <Formik
        initialValues={{
          firstName: user?.given_name,
          email: user?.email,
          lastName: user?.family_name,
          rememberMe: false
        }}
        onSubmit={(state) => { console.log(state.email) }}
      >
        <Form>
          <label className='label' htmlFor="firstName"><span className="label-text">First Name</span></label>
          <Field name="firstName" type="text" className="block w-full max-w-xs input input-bordered input-primary" />
          <label className='label' htmlFor="lastName"><span className="label-text">Last Name</span></label>
          <Field type="text" name="lastName" className="block w-full max-w-xs input input-bordered input-primary" />
          <label className='label' htmlFor="email"><span className="label-text">Email</span></label>
          <Field name="email" type="email" className="block w-full max-w-xs input input-bordered input-primary" />
        </Form>
      </Formik>
    </div>
  )
}

export default UserDetails