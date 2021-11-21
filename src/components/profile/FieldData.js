import React, { useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const FieldData = (props) => {
  const [isHover, setIsHover] = useState(false);

  const contentStyle = props.field === 'PHOTO' ?
    { flex: 1, textAlign: 'left', color: '#606469', fontSize: 14 } :
    { flex: 1, textAlign: 'left', color: '#242528', fontSize: 15 };

  const formatContent = (content) => {
    switch (props.field) {
      case 'BIRTHDAY':
        const date = new Date(content);
        return date.toLocaleDateString('vn-VN');
      case 'GENDER':
        return content.charAt(0).toUpperCase() + content.slice(1);
      default:
        return content;
    }
  }

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', backgroundColor: isHover ? '#FAFAFA' : '#FFFFFF' }}>
      <p style={{ width: props.field ? '20%' : '0', color: '#606469', fontSize: 12, fontWeight: 500 }}>{props.field}</p>
      <p style={contentStyle}>{formatContent(props.content)}</p>
      {props.field === 'PHOTO' ?
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
          <Avatar style={{ height: 60, width: 60 }} alt={props.name} src={props.avatar} />
          <div style={{ backgroundColor: 'rgb(35, 38, 41, 0.3)', position: 'absolute', bottom: 0, height: '40%', width: '100%', display: 'flex', justifyContent: 'center' }} onClick={props.handler}>
            <CameraAltIcon style={{ color: '#000000', width: 18 }} />
          </div>
        </div> :
        <IconButton onClick={props.onClick} >
          <ArrowForwardIosIcon />
        </IconButton>
      }
    </div >
  );
}

export default FieldData;