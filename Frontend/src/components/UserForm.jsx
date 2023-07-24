import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { createUserAsync, fetchUserByIdAsync, updateUserAsync } from '../features/user/userSlice';

const UserForm = () => {
    const selectedUser = useSelector(state => state.user.selectedUser)
    const errorMessage = useSelector(state => state.user.error)
    const dispatch = useDispatch()
    const params = useParams()
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const alert = useAlert()

    useEffect(() => {
        if (params.id) {
            dispatch(fetchUserByIdAsync(params.id))
        }
        // else {
        //     dispatch(clearSelectedProduct())
        // }
    }, [dispatch, params.id])

    useEffect(() => {
        if (selectedUser && params.id) {
            setValue('firstname', selectedUser.firstname)
            setValue('lastname', selectedUser.lastname)
            setValue('email', selectedUser.email)
            setValue('phone', selectedUser.phone)
        }
    }, [selectedUser, setValue, params.id])

    return (
        <form noValidate className="space-y-6 px-4 sm:px-0 sm:mx-auto sm:max-w-lg" onSubmit={handleSubmit((data) => {
            const user = { ...data }
            user.phone = +user.phone

            if (params.id) {
                user.id = params.id
                dispatch(updateUserAsync({ user: user, alert }));
                reset()
            }
            else {
                dispatch(createUserAsync({ user: user, alert }))
                reset();
            }
        })}>
            <div className="space-y-6 bg-white p-6">
                <div className="border-b border-gray-900/10 pb-6">
                    <h2 className="text-xl font-semibold leading-7 text-gray-900">{params.id ? "Edit Product" : "Add Product"}</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="firstname" className="block text-sm font-medium leading-5 text-gray-700">
                            First Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="firstname"
                                name="firstname"
                                type="text"
                                autoComplete="off"
                                required
                                {...register('firstname', { required: "First Name Is Required" })}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <p className=" text-red-600">{errors?.firstname?.message}</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="lastname" className="block text-sm font-medium leading-5 text-gray-700">
                            Last Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="lastname"
                                name="lastname"
                                type="text"
                                autoComplete="off"
                                required
                                {...register('lastname', { required: "Last Name Is Required" })}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <p className=" text-red-600">{errors?.lastname?.message}</p>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                {...register("email", { required: "Email Is Required", pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "Email Is Not Valid" } })}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <p className=" text-red-600">{errors?.email?.message}</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium leading-5 text-gray-700">
                            Phone
                        </label>
                        <div className="mt-1">
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                maxLength="10"
                                {...register('phone', { required: "Phone Is Required" })}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <p className=" text-red-600">{errors?.phone?.message}</p>
                        </div>
                    </div>
                    {errorMessage && <p className=" text-red-600">{errorMessage}</p>}
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {params.id ? "Update" : "Add"}
                    </button>

                </div>
            </div>
        </form>
    );
};

export default UserForm;
