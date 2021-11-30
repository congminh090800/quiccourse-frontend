import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './index.scss';
import NavBar from '../../components/common/NavBar';
import { Card, CardContent, Typography } from '@material-ui/core';
import LoadingButton from '@mui/lab/LoadingButton';
import FieldData from '../../components/profile/FieldData';
import ChangeAvatarDialog from '../../components/profile/ChangeAvatarDialog';
import SetStudentIdDialog from '../../components/profile/SetStudentIdDialog';
import { Snackbar, Alert } from '@mui/material';
import httpAuthorization from '../../utils/httpAuthorization';
import endpoints from '../../constants/endpoints';
import { useDispatch } from "react-redux";
import { UPDATE_USER_INFO } from "~/store/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import * as errorMessage from "~/utils/validateRuleMessages";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [showChangeAvatarDialog, setShowChangeAvatarDialog] = useState(false);
    const [showSetStudentIdDialog, setShowSetStudentIdDialog] = useState(false);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenChangeAvatarDialog = () => {
        setShowChangeAvatarDialog(true);
    };

    const handleChangeAvatarDialogClose = () => {
        setShowChangeAvatarDialog(false);
    };

    const handleOpenSetStudentIdDialog = () => {
        setShowSetStudentIdDialog(true);
    };

    const handleCloseSetStudentIdDialog = () => {
        setShowSetStudentIdDialog(false);
    };

    const handleOnCloseSnackbar = (event, reason) => {
        setMessage(null);
    }

    const inititalValues = {
        name: user.name,
        birthDate: user.birthDate,
        phone: user.phone,
        gender: user.gender
    }

    const validationSchema = Yup.object({
        phone: Yup.string()
            .matches(/^[0-9]{10,11}$/, "Must only contain 10 or 11 numbers")
            .required(),
        name: Yup.string().min(6, errorMessage.min("Name", 6)).required(),
        birthDate: Yup.date("Must be a date").nullable().optional(),
        gender: Yup.string().oneOf(["male", "female"]).nullable().optional()
    });

    return (
        <div className="profile">
            <NavBar />
            <Formik
                initialValues={inititalValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    setIsLoading(true);
                    const result = await httpAuthorization.put(endpoints.updateInformation, values);

                    if (result) {
                        setIsLoading(false);
                        setMessage('Saved changes');
                        dispatch(UPDATE_USER_INFO(values));
                    } else {
                        setIsLoading(false);
                        setMessage('#Something went wrong');
                    }
                    setIsSubmitted(true);
                    setIsChanged(false);
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="profile-content">
                            <div className="profile-content-header">
                                <h1 style={{ fontWeight: 400 }}>Personal info</h1>
                                <h3 style={{ fontWeight: 300, color: '#5f6368' }}>Info about you and your preferences</h3>
                            </div>
                            <div className="profile-content-body">
                                <Card style={{ borderRadius: 8 }} variant="outlined" className="profile-content-body-card">
                                    <CardContent style={{ padding: '16px 0px' }}>
                                        <Typography style={{ padding: 16 }} variant="h5" className='cardItem'>Basic info</Typography>
                                        <FieldData field='STUDENTID' content={user.studentId} handler={handleOpenSetStudentIdDialog} />
                                        <FieldData field='PHOTO' content='A photo helps personalize your account' avatar={user.avatar} name={user.name} handler={handleOpenChangeAvatarDialog} />
                                        <FieldData formik={formik} fieldName='name' field='NAME' content={user.name} />
                                        <FieldData formik={formik} fieldName='birthDate' field='BIRTHDATE' content={user.birthDate} />
                                        <FieldData formik={formik} fieldName='gender' field='GENDER' content={user.gender} />
                                    </CardContent>
                                </Card>
                                <Card style={{ borderRadius: 8, marginTop: 20 }} variant="outlined" className="profile-content-body-card">
                                    <CardContent style={{ padding: '16px 0px' }}>
                                        <Typography style={{ padding: 16 }} variant="h5" className='cardItem'>Contact info</Typography>
                                        <FieldData field='EMAIL' content={user.email} />
                                        <FieldData formik={formik} fieldName='phone' field='PHONE' content={user.phone} />
                                    </CardContent>
                                </Card>
                                <Card style={{ borderRadius: 8, marginTop: 20, marginBottom: 20 }} variant="outlined" className="profile-content-body-card">
                                    <CardContent style={{ padding: '16px 0px' }}>
                                        <Typography style={{ padding: 16 }} variant="h5" className='cardItem'>Password</Typography>
                                        <Typography style={{ padding: '0px 16px' }} variant="body1" className='cardItem'>A secure password helps protect your account</Typography>
                                        <FieldData content='•••••••' />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <ChangeAvatarDialog open={showChangeAvatarDialog} onClose={handleChangeAvatarDialogClose} user={user} setMessage={setMessage} />
                        <SetStudentIdDialog open={showSetStudentIdDialog} onClose={handleCloseSetStudentIdDialog} setMessage={setMessage} />
                        {formik.isValid && <LoadingButton type='submit' loading={isLoading} variant="outlined" style={{ position: 'fixed', right: 16, bottom: 16 }} >Save changes</LoadingButton>}
                    </form>
                )}
            </Formik>
            <Snackbar open={message !== null} autoHideDuration={2000} onClose={handleOnCloseSnackbar}>
                <Alert onClose={handleOnCloseSnackbar} severity={message?.startsWith('#') ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Profile;