import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import * as message from "~/utils/validateRuleMessages";
import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import env from "~/constants/env";
import http from "~/utils/http";
import endpoints from "~/constants/endpoints";
import "./index.scss";

const inititalValues = {
  email: "",
  password: "",
  phone: "",
  name: "",
  birthDate: "",
  gender: "male",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .min(13, message.min("Email", 13))
    .email("Invalid email address")
    .required(message.required("Email")),
  password: Yup.string()
    .min(6, message.min("Password", 6))
    .max(30, message.max("Password", 30))
    .required(message.required("Password")),
  phone: Yup.string()
    .matches(/^[0-9]{10,11}$/, "Must only contain 10 or 11 numbers")
    .required(),
  name: Yup.string().min(6, message.min("Name", 6)).required(),
  birthDate: Yup.date("Must be a date").nullable().optional(),
  gender: Yup.string().oneOf(["male", "female"]).nullable().optional(),
});

const SignUpForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();
  return (
    <div className="sign-up-form">
      <Formik
        initialValues={inititalValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            const result = await http.post(endpoints.signUp, values);
            if (!result.data) {
              throw Error({ message: "Data not found" });
            }
            setLoading(false);
            history.push("/login");
          } catch (err) {
            setLoading(false);
            setError(err);
          }
        }}
      >
        {(formik) => (
          <form className="sign-up-form-inner" onSubmit={formik.handleSubmit}>
            <Typography variant="h6" component="div">
              Sign up
            </Typography>
            {error && <div style={{ color: "red" }}>{error.message}</div>}
            <div className="sign-up-form-input">
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
                onBlur={formik.handleBlur}
                fullWidth
              />
            </div>
            <div className="sign-up-form-input">
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
                onBlur={formik.handleBlur}
                fullWidth
              />
            </div>
            <div className="sign-up-form-input">
              <TextField
                id="phone"
                name="phone"
                label="Phone number"
                type="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                variant="outlined"
                onBlur={formik.handleBlur}
                fullWidth
              />
            </div>
            <div className="sign-up-form-input">
              <TextField
                id="name"
                name="name"
                label="Name"
                type="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                variant="outlined"
                onBlur={formik.handleBlur}
                fullWidth
              />
            </div>
            <div className="sign-up-form-input">
              <TextField
                id="birthDate"
                label="Date of birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                error={
                  formik.touched.birthDate && Boolean(formik.errors.birthDate)
                }
                helperText={formik.touched.birthDate && formik.errors.birthDate}
                variant="outlined"
                onBlur={formik.handleBlur}
                fullWidth
              />
            </div>
            <RadioGroup
              value={formik.values.gender}
              onChange={(e) => {
                formik.setFieldValue("gender", e.target.value);
              }}
              row
              aria-label="gender"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
            <div className="sign-up-form-input">
              <Button
                color="primary"
                className="back-btn"
                variant="outlined"
                onClick={() => history.push("/login")}
              >
                Back to login
              </Button>
              <LoadingButton
                loading={loading}
                color="primary"
                className="sign-up-btn"
                variant="contained"
                type="submit"
              >
                Sign up
              </LoadingButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
