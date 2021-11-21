import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './index.scss';
import NavBar from '../../components/common/NavBar';
import { Card, CardContent, Typography } from '@material-ui/core';
import FieldData from '../../components/profile/FieldData';
import ChangeAvatarDialog from '../../components/profile/ChangeAvatarDialog';

const Profile = () => {
    const user = useSelector(state => state.auth.user);
    const [showChangeAvatarDialog, setShowChangeAvatarDialog] = useState(false);

    const handleOpenChangeAvatarDialog = () => {
        setShowChangeAvatarDialog(true);
    };

    const handleChangeAvatarDialogClose = () => {
        setShowChangeAvatarDialog(false);
    };

    return (
        <div className="profile">
            <NavBar />
            <div className="profile-content">
                <div className="profile-content-header">
                    <h1 style={{ fontWeight: 400 }}>Personal info</h1>
                    <h3 style={{ fontWeight: 300, color: '#5f6368' }}>Info about you and your preferences</h3>
                </div>
                <div className="profile-content-body">
                    <Card style={{ borderRadius: 8 }} variant="outlined" className="profile-content-body-card">
                        <CardContent style={{ padding: '16px 0px' }}>
                            <Typography style={{ padding: 16 }} variant="h5" className='cardItem'>Basic info</Typography>
                            <FieldData field='PHOTO' content='A photo helps personalize your account' avatar={user.avatar} name={user.name} handler={handleOpenChangeAvatarDialog} />
                            <FieldData field='NAME' content={user.name} />
                            <FieldData field='BIRTHDAY' content={user.birthDate} />
                            <FieldData field='GENDER' content={user.gender} />
                        </CardContent>
                    </Card>
                    <Card style={{ borderRadius: 8, marginTop: 20 }} variant="outlined" className="profile-content-body-card">
                        <CardContent style={{ padding: '16px 0px' }}>
                            <Typography style={{ padding: 16 }} variant="h5" className='cardItem'>Contact info</Typography>
                            <FieldData field='EMAIL' content={user.email} />
                            <FieldData field='PHONE' content={user.phone} />
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
            <ChangeAvatarDialog open={showChangeAvatarDialog} onClose={handleChangeAvatarDialogClose} user={user} />
        </div>
    );
}

export default Profile;