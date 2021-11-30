import React, { useState } from "react";
import endpoints from "~/constants/endpoints";
import httpAuthorization from "~/utils/httpAuthorization";
import { Dialog, DialogContent, DialogTitle, Button, Typography, TextField } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from "react-redux";
import { SET_USER_STUDENT_ID } from "~/store/auth";

const SetStudentIdDialog = (props) => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [studentId, setStudentId] = useState('');

    const handleOnClose = () => {
        props.onClose();
        setError(null);
        setLoading(false);
        setStudentId('');
    }

    const handleOnSubmit = async () => {
        if (studentId.length < 6 || String(studentId).match(/^\d+$/) == null) {
            setError('Student ID length must greater than 5 characters and numbers only)');
        } else {
            setError(null);
            setLoading(true);
            try {
                const result = await httpAuthorization.patch(endpoints.setStudentId, { studentId });
                setLoading(false);

                dispatch(SET_USER_STUDENT_ID(studentId));
                props.setMessage('Set student ID successfully');
                handleOnClose();
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(err.message)
            }
        }
    }

    return (
        <Dialog open={props.open} onClose={handleOnClose}>
            <DialogTitle>Set Student ID</DialogTitle>
            <DialogContent style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography variant="subtitle1" style={{ color: 'red' }}>Note: You are only allowed to set Student ID once</Typography>
                <TextField error={error != null} helperText={error} label="Student ID" variant="outlined" fullWidth={true} onChange={(e) => { setStudentId(e.target.value) }} />

                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 16 }}>
                    <Button variant="outlined" disableElevation onClick={handleOnClose}>
                        Cancel
                    </Button>
                    <LoadingButton loading={loading} variant="contained" disableElevation onClick={handleOnSubmit}>
                        Confirm
                    </LoadingButton>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SetStudentIdDialog;