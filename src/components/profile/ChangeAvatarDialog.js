import { Avatar, Dialog, DialogContent, DialogTitle, Button, IconButton, Input } from '@material-ui/core';
import { PhotoCamera } from '@mui/icons-material';
import React, { useState } from 'react';

const ChangeAvatarDialog = (props) => {
    const [avatar, setAvatar] = useState(props.avatar);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChooseFile = (event) => {
        setSelectedFile(event.target.files[0]);
        setAvatar(URL.createObjectURL(event.target.files[0]));
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Change Avatar</DialogTitle>
            <DialogContent style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Avatar src={avatar} style={{ height: 320, width: 320, margin: 16 }} />
                <label htmlFor="choose-file" style={{ display: 'flex', justifyContent: 'center' }}>
                    <input style={{ display: 'none' }} type="file" accept="image/*" name="file" id="choose-file" onChange={handleChooseFile} />
                    <Button variant="outlined" startIcon={<PhotoCamera />} component="span">
                        Upload
                    </Button>
                </label>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 16 }}>
                    <Button variant="outlined" disableElevation onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" disableElevation>
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ChangeAvatarDialog;