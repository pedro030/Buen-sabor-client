import { Field, Form, Formik } from "formik"
import './ChangePassword.scss'

function ChangePassword() {

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="user-pass-container">
    <h2>Change Password</h2>
    <Formik
      initialValues={{
        oldPass: "",
        newPass: "",
        confirmNewPass: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className="form-container">
          <div className="form-oldPass">
            <label htmlFor="oldPass">Old Password</label>
            <Field name="oldPass" type="password" className="input-text" />
          </div>
          <div className="form-newPass">
            <label>New Password</label>
            <Field name="newPass" type="password" className="input-text" />
          </div>
          <div className="form-confirmNewPass">
            <label>Confirm New Password</label>
            <Field name="confirmNewPass" type="password" className="input-text" />
          </div>
          <div className="form-submit">
            <button type="submit">Save Changes</button>
          </div>
      </Form>
    </Formik>
  </div>
  )
}

export default ChangePassword