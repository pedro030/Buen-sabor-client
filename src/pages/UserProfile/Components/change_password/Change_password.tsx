// React
import { useEffect, useState } from 'react';

// Auth0
import { useAuth0 } from '@auth0/auth0-react';

// Services
import { updatePassword } from '../../../../services/Auth0Service';

// Formik
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'

// Yup
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const Change_password = () => {
    // User from Auth0
    const { user } = useAuth0();

    // State que indica si el user puede cambiar de contraseña o no (si se registró con Auth0 o no)
    const [canChange, setCanChange] = useState<boolean>(false);

    // Validation
    const validationSchema = Yup.object({
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

    useEffect(() => {
        if (user?.sub) {
            setCanChange(user.sub?.split('|')[0] === "auth0");
        }
    }, [])

    // Handle Save New Password
    const handleSubmit = (state: { newPassword: string, confirmPassword: string }, action: FormikHelpers<any>) => {
        Swal.fire({
            title: 'Loading...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        updatePassword(user?.sub || "", state.newPassword)
            .then(data => {
                if (data) {
                    Swal.fire({ title: 'Password Updated', icon: 'success', confirmButtonColor: '#E73636' })
                    action.resetForm();
                } else {
                    Swal.fire({ title: 'There was an error, please try again later', icon: 'error', confirmButtonColor: '#E73636' })
                    action.resetForm();
                }
            })
    }
    
    return (
        <>
            <h2 className='mb-5 text-center stat-title'>Change password</h2>
            <div className="flex justify-center">
                <Formik
                    initialValues={{
                        newPassword: "",
                        confirmPassword: ""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <Form className="flex flex-col gap-5 ">
                        <div className="flex flex-col ">
                            <label className="label">
                                <span className="label-text">new password</span>
                            </label>
                            <Field disabled={!canChange} type="password" name="newPassword" className="w-full input input-bordered" />
                            <ErrorMessage name="newPassword">{msg => <span className="error-message">{msg}</span>}</ErrorMessage>
                        </div>
                        <div className="flex flex-col ">
                            <label className="label">
                                <span className="label-text">repeat password</span>
                            </label>
                            <Field disabled={!canChange} type="password" name="confirmPassword" className="w-full input input-bordered" />
                            <ErrorMessage name="confirmPassword">{msg => <span className="error-message">{msg}</span>}</ErrorMessage>
                        </div>
                        <button disabled={!canChange} className="rounded-full btn btn-primary" type="submit">Save changes</button>
                        {canChange ? (<></>) : (
                            <div className="mb-10 alert alert-warning">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>Warning: You can't change the password because you logged with google</span>
                            </div>)}
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default Change_password