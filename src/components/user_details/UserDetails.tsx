import { useAuth0 } from "@auth0/auth0-react";
import { Field, Form, Formik } from "formik";
import "./UserDetails.scss";
import React from "react";

const UserDetails = () => {
  const { user } = useAuth0();

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="user-detail-container">
      <h2>Account Info</h2>
      <Formik
        initialValues={{
          firstName: user?.given_name,
          email: user?.email,
          lastName: user?.family_name,
          birthDate: "",
          cellPhone: "",
          rememberMe: false,
        }}
        onSubmit={handleSubmit}
      >
        <Form className="form-container">
          <div className="form-container-left">
            <div className="form-first-name">
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" type="text" className="input-text" />
            </div>
            <div className="form-cellphone">
              <label>Cell Phone</label>
              <Field name="cellPhone" type="text" className="input-text" />
            </div>
            <div className="form-birthdate">
              <label>Birthdate</label>
              <Field name="birthDate" type="date" className="input-text" />
            </div>
          </div>

          <div className="form-container-right">
            <div className="form-last-name">
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" name="lastName" className="input-text" />
            </div>
            <div className="form-email">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="input-text" />
            </div>
            <div className="form-submit">
              <button type="submit">Save</button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UserDetails;
