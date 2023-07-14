import React, { useEffect, useState } from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import Button from "../Button";

const LoginForm = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [rememberMe, setRememberMe] = useState();
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };
  const onSubmit = (data) => {
    if (data) {
      onLogin(data);
      console.log("Data: ", data);
      if (rememberMe) {
        localStorage.setItem("email", JSON.stringify(data.email));
      }
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
        {/* End .form-group */}
        <div className="form-footer">
          <Button type="submit" variant="outline">
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </Button>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="signin-remember"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <label className="custom-control-label" htmlFor="signin-remember">
              Remember Me
            </label>
          </div>
          {/* End .custom-checkbox */}
          <a href="#" className="forgot-link">
            Forgot Your Password?
          </a>
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
            <a href="#" className="btn btn-login btn-f">
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

export default LoginForm;
