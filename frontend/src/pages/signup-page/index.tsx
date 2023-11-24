import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../../api/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, useController } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";

import { User } from "../../types/index";


// const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]){8,24}/;

interface IUser extends User {
  confirmPassword: string;
}

interface IRoles {
  value: string;
  label: string;
}

const roleOptions: IRoles[] = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

const UserFormData = z
  .object({
    username: z
      .string().trim().min(1, "Please enter your username"),
    email: z
      .string()
      .toLowerCase()
      .min(1, { message: "Please enter your email" })
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


export default function SignUpPage() {
  const [, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  const form = useForm<IUser>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(UserFormData),
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const { field } = useController({ name: "role", control });

  const handleSelectChange = (option: IRoles | null) => {

    field.onChange(option?.value);

    if (option?.value == "admin") setIsDisabled(true);
    else setIsDisabled(false);

  };

  const onSubmitHandle = async (data: IUser) => {
    let newUser: User;

    if (data !== undefined) {
      newUser = {
        username: data.username,
        email: data.email,
        password: data.password,
        role: 'user',
      };

      // Use axios
      await axiosPublic.post('/signup',
        JSON.stringify({ newUser }), {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true
      })
        .then((response) => {
          if (response.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Success...",
              text: "You are register successfully!",
            });
            navigate("/login");
          }
        })
        .catch((error) => {
          let errorMessage;
          if (!error?.response) {
            errorMessage = 'No server response';
            console.error('No server response');
          } else if (error?.response.status === 409) {
            errorMessage = 'User exist';
            console.error('User exist');
          } else {
            errorMessage = 'Registration failed'
            console.error('Registration failed');
          }
          Swal.fire({
            icon: "error",
            title: "Fail...!!!",
            text: errorMessage
          });
        })
    }
  };


  return (
    <section id="signup" className="h-[calc(100vh-72px)] bg-sky-200 ">
      <div className="max-w-md mx-auto p-8 border-2 border-neutral-400 rounded-xl bg-slate-200 ">
        <h1>Sign Up</h1>
        {/* max-w-md mx-auto items-center p-8 mt-16 border-2 border-neutral-500 rounded-xl */}
        <form className="mt-6" onSubmit={handleSubmit(onSubmitHandle)}>

          <label htmlFor="username">Username
            <input
              type="text"
              id="username"
              autoComplete="off"
              {...register("username")}
            />
            {errors.username?.message && (
              <p className="errors">{errors.username?.message}</p>
            )}
          </label>

          <label htmlFor="email"> email
            <input
              type="email"
              id="email"
              autoComplete="off"
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="errors">{errors.email?.message}</p>
            )}
          </label>

          <label htmlFor="password">Password
            <input
              type="password"
              id="password"
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="errors">{errors.password?.message}</p>
            )}
          </label>

          <label htmlFor="confirmPassword">Confirm Password
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <p className="errors">{errors.confirmPassword?.message}</p>
            )}
          </label>

          <button className="mt-6 px-5 py-1" type="submit" >Sign Up</button>
        </form>
      </div>
    </section>

  );
}
