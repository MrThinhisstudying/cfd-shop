import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import { Link } from "react-router-dom";
import { PATHS } from "../../contant/pathnames";

const RegisterForm = ({ onRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log("Errors: ", errors);

  const onSubmit = (data) => {
    if (data) {
      const payload = {
        firstName: "",
        lastName: "",
        email: data.email,
        password: data.password,
      };
      onRegister?.(payload);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username or email address"
          required
          {...register("email", {
            required: "Please enter your email",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Plese enter email with format abc@def.com",
            },
          })}
          error={errors?.email?.message || ""}
        />
        <Input
          label="Password"
          required
          type="password"
          {...register("password", {
            required: "Please enter your password",
          })}
          error={errors?.password?.message || ""}
        />
        <div className="form-footer">
          <Button type="submit" variant="outline">
            <span>SIGN UP</span>
            <i className="icon-long-arrow-right" />
          </Button>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="register-policy"
              required
            />
            <label className="custom-control-label" htmlFor="register-policy">
              I agree to the
              <Link to={PATHS.PRIVACYPOLICY}>privacy policy</Link> *
            </label>
          </div>
          {/* End .custom-checkbox */}
        </div>
        {/* End .form-footer */}
      </form>
      <div className="form-choice">
        <p className="text-center">or sign in with</p>
        <div className="row">
          <div className="col-sm-6">
            <a href="#" className="btn btn-login btn-g">
              <i className="icon-google" />
              Login With Google
            </a>
          </div>
          {/* End .col-6 */}
          <div className="col-sm-6">
            <a href="#" className="btn btn-login  btn-f">
              <i className="icon-facebook-f" />
              Login With Facebook
            </a>
          </div>
          {/* End .col-6 */}
        </div>
        {/* End .row */}
      </div>
    </div>
  );
};

export default RegisterForm;
