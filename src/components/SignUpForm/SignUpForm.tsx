// Author: TrungQuanDev: https://youtube.com/@trungquandev
import React from "react"
import { useForm } from "react-hook-form"

type FormValues = {
  email: string
  password: string
}

type SignUpFormProps = {
  onSubmit: (data: FormValues) => void
  defaultValues?: FormValues
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  defaultValues = { email: "", password: "" },
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  })

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <label>Email:</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email is not valid",
            },
          })}
          placeholder="Enter email"
        />
        {errors.email && <span style={{ color: "red"}}>{errors.email.message}</span>}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <label>Password:</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Enter password"
        />
        {errors.password && <span style={{ color: "red"}}> {errors.password.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
