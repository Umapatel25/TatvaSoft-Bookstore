import { Button, FormHelperText, TextField, Typography } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/authService";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Form1 = () => {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [UserDetails, setUserDetails] = useState({
        username: username,
        password: password,
    });

    const [userData, setUserData] = useState();
    const getData = async () => {

        await axios.get(`https://book-e-sell-node-api.vercel.app/api/user/byId?id=${625}`).then((response) => setUserData(response.data.result));
    };

    // useEffect(() => {
    //     if (UserDetails.username.length > 4) {
    //         console.log('use effect called with username');
    //     }
    // }, [UserDetails.username]);

    useEffect(() => {
        getData();
    }, [])
    console.log(userData);
    const validationSchema = Yup.object().shape({
        userName: Yup.string().required("Username is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().min(8).required("Password is required"),
        age: Yup.number().min(18),
    })
    
    const navigate=useNavigate();
    const handleSubmit = async (values) => {
        // console.log("Username", UserDetails.username);
        // console.log("Password", UserDetails.password);

        const payload = {
            firstName: values.userName,
            lastName: "test",
            email: values.email,
            roleId: 2,
            password: values.password,
        };

        await AuthService
            .Register(payload)
            .then((response) => {
                if (response && response.status === 200) {
                    toast.success("Data Submited successfully", {
                        position: "bottom-right",
                    });
                    navigate('/');
                }

            })
            .catch((error) => {
                toast("Error! unable to submit the form");
            });
        // await AuthService.Register(payload).then((response) => {
        //    

        // }).catch((error) => { });

    }
    return (

        <Formik initialValues={{ userName: '', age: '', email: '', password: '' }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={validationSchema}>
            {({ values, errors, setFieldValue, handleBlur }) => {

                // console.log("error", errors);
                return (
                    <Form>
                        <div className="form-demo">
                            <Typography variant="h2">Register hear</Typography>
                            <TextField label="Name"
                                name="userName"
                                variant="outlined"
                                error={errors.userName}
                                value={values.userName}

                                onChange={(e) => setFieldValue("userName", e.target.value)}
                                onBlur={handleBlur} />
                            <FormHelperText error>
                                <ErrorMessage name="userName" ></ErrorMessage>
                            </FormHelperText>
                            <TextField label="Email"
                                name="email"
                                variant="outlined"
                                error={errors.email}
                                value={values.email}
                                onChange={(e) => setFieldValue("email", e.target.value)}
                            />
                            <FormHelperText error>
                                <ErrorMessage name="email" ></ErrorMessage>
                            </FormHelperText>
                            <TextField label="Age"
                                variant="outlined"
                                name="age"
                                error={errors.age}
                                value={values.age}
                                onChange={(e) => setFieldValue("age", e.target.value)}
                            />
                            <FormHelperText error>
                                <ErrorMessage name="age" ></ErrorMessage>
                            </FormHelperText>
                            <TextField label="Password"
                                name="password"
                                variant="outlined"
                                error={errors.password}
                                value={values.password}
                                onChange={(e) => setFieldValue("password", e.target.value)}
                            />
                            <FormHelperText error>
                                <ErrorMessage name="password" ></ErrorMessage>
                            </FormHelperText>
                            <Button variant="contained" type="submit" >Submit</Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>


    )
};

export default Form1;