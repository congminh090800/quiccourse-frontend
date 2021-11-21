import { Avatar, Dialog, DialogContent, DialogTitle, Button } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { PhotoCamera } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import endpoints from "~/constants/endpoints";
import httpAuthorization from "~/utils/httpAuthorization";

const ChangeAvatarDialog = (props) => {
    const [avatar, setAvatar] = useState(props.avatar);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOnClose = () => {
        props.onClose();
        setAvatar(props.avatar);
        setError(null);
        setLoading(false);
        setSelectedFile(null);
    }

    const handleChooseFile = (event) => {
        setSelectedFile(event.target.files[0]);
        setAvatar(URL.createObjectURL(event.target.files[0]));
    }

    const handleOnSubmit = async () => {
        if (selectedFile) {
            setError(null);
            setLoading(true);
            const formData = new FormData();
            formData.append('imgFile', selectedFile);
            const result = await httpAuthorization.patch(endpoints.uploadAvatar, formData);
            if (result) {
                setLoading(false);
                props.setMessage('Avatar changed successfully');
                props.onClose();
            } else {
                setLoading(false);
                setError('Something went wrong');
            }
        } else {
            setError('Please choose a file');
        }
    }

    return (
        <Dialog open={props.open} onClose={handleOnClose}>
            <DialogTitle>Change Avatar</DialogTitle>
            <DialogContent style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Avatar src={avatar} style={{ height: 320, width: 320, margin: 16 }} />
                <label htmlFor="choose-file" style={{ display: 'flex', justifyContent: 'center' }}>
                    <input style={{ display: 'none' }} type="file" accept="image/*" name="file" id="choose-file" onChange={handleChooseFile} />
                    <Button variant="outlined" startIcon={<PhotoCamera />} component="span">
                        Upload
                    </Button>
                </label>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
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

export default ChangeAvatarDialog;