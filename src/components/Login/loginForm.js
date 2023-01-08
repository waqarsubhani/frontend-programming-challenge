import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import LoadingDots from "../LoadingDots/loadingDots.js";
import { LocalService } from "../../utils/LocalStorage.js";
import { useState } from "react";


const schema = yup.object().shape({
    email: yup
        .string()
        .required("email is a required field")
        .matches(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/i,
            "Email must be valid"
        ),
    password: yup
        .string()
        .required("password is a required field"),
});


export default function LoginForm({redirect}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const setAccessToken = (token) => {
        LocalService.saveData('jwt', token);
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        setLoading(true);
        const { email, password } = data;
        fetch('https://test.zyax.se/access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                reset();
                if (data.error) {
                    setError("Password or email is incorrect");
                    return;
                }
                // Save the JWT in local storage or a cookie
                setAccessToken(data.accessToken);
                redirect("/");
            })
            .catch((ex) => {
                reset();
                setError(ex.message)
            });
    };
    const onError = (errs, e) => console.log(errs, e);

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onError)} 
            noValidate
            className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
            <div>
                <label
                    htmlFor="email"
                    className="block text-xs text-gray-600 uppercase">
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    autoComplete="email"
                    {...register("email")}
                    required
                    className={`mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 
                        shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm ${errors.email ? 'border-red-500': ''}`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600" role="alert">{errors?.email?.message}</p>}
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    {...register("password")}
                    required
                    className={`mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 
                        shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm ${errors.password ? 'border-red-500': ''}`}
                />
                {errors.password && <p className="mt-2 text-sm text-red-600" role="alert">{errors?.password?.message}</p>}
            </div>
            <button
                disabled={loading}
                className={`${
                loading
                    ? "cursor-not-allowed border-gray-200 bg-gray-100"
                    : "border-black bg-black text-white hover:bg-white hover:text-black"
                } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
            >
                {loading ? (
                    <LoadingDots color="#808080" />
                ) : (
                    <p>Sign In</p>
                )}
            </button>

            {error && <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>}

            <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                Sign in
                {" "}
                instead.
            </p>
        
        </form>
    );
}
