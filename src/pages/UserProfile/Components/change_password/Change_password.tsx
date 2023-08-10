import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik'

const Change_password = () => {
    const validationSchema = Yup.object({
        oldPassword: Yup.string().required('Old password is required'),
        newPassword: Yup.string()
            .required('New password is required')
            .min(8, 'Your password is too short.')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])/, 'The password must have at least one uppercase and lowercase letter.')
            .matches(/(?=.*\d)/, 'The password must have at least one digit')
            .matches(/(?=.*[@$!%*?&#])/, 'The password must have a special character')
            .matches(/[A-Za-z\d@$!%*?&#]/, 'The password is invalid'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    })

    const handleSubmit = (state: any) =>{
        console.log(state);
    }
    return (
        <>
            <h2 className='mb-5 text-center stat-title'>Change password</h2>
            <div className="flex justify-center">
                <Formik
                    initialValues={{
                        oldPassword:"",
                        newPassword:"",
                        confirmPassword:""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <div className="grid grid-rows-4 gap-5 w-[40%]">
                        <div className="flex flex-col ">
                            <label className="label">
                                <span className="label-text">old password</span>
                            </label>
                            <Field type="password" name="oldPassword" className="w-full input input-bordered" />
                            <ErrorMessage name="oldPassword">{msg => <span className="error-message">{msg}</span>}</ErrorMessage>
                        </div>
                        <div className="flex flex-col ">
                            <label className="label">
                                <span className="label-text">new password</span>
                            </label>
                            <Field type="password" name="newPassword" className="w-full input input-bordered" />
                            <ErrorMessage name="newPassword">{msg => <span className="error-message">{msg}</span>}</ErrorMessage>
                        </div>
                        <div className="flex flex-col ">
                            <label className="label">
                                <span className="label-text">repeat password</span>
                            </label>
                            <Field type="password" name="confirmPassword" className="w-full input input-bordered" />
                            <ErrorMessage name="confirmPassword">{msg => <span className="error-message">{msg}</span>}</ErrorMessage>
                        </div>
                        <button className="rounded-full btn btn-primary">Save changes</button>
                    </div>
                </Formik>
            </div>
        </>
    )
}

export default Change_password