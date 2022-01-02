import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const drawAvatar = (canvas, context, partner, backgroundColor) => {
  canvas.width = 50;
  canvas.height = 50;
  context.beginPath();
  context.arc(25, 25, 20, 0, 2 * Math.PI);
  context.closePath();
  context.fillStyle = backgroundColor;
  context.fill();
  context.font = '1rem sans-serif';
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.textBaseline = 'bottom';
  context.fillText(partner.firstName[0], 25, 35);
  return canvas.toDataURL('image/png');
}

// from https://dev.to/dcodeyt/build-a-user-profile-avatar-generator-with-javascript-436m
const defaultAvatar = (imageURL, canvas, context, partner, backgroundColor) => {
  if (context && canvas) {
    canvas.width = 50;
    canvas.height = 50;
    var img = new Image();
    if (imageURL.length > 0) {
       img.onload = () => {
        context.drawImage(img, 5, 5, 40, 40);
      }
      context.beginPath();
      context.arc(25, 25, 20, 0, Math.PI * 2, true);
      context.clip();
      context.closePath();
      img.onerror = (e) => {
        drawAvatar(canvas, context, partner, backgroundColor);
      }
      img.src = imageURL;
    } else if (!imageURL) drawAvatar(canvas, context, partner, backgroundColor);
  }
};

const colors = [
  '#59009F',
  '#0069C9',
  '#01D93F',
  '#ffbf00',
  '#FF8B00',
  '#DB2B28',
];

const pickColor = (firstName) => {
  let index = 0;
  if (firstName) {
    index = ((firstName.toLowerCase().charCodeAt(0) - 97) % 6);
  }
  return colors[index];
};


const Avatar = ({
  partner
}) => {

  const canvasRef = useRef();
  const [context, setContext] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const contextObj = canvas.getContext('2d');
    setContext(contextObj);
  }, [])

  return (
    <canvas ref={canvasRef} id={partner.id}>
          {defaultAvatar(partner.imageURL, canvasRef.current, context, partner, pickColor(partner.firstName))}
    </canvas>
  );
};

Avatar.propTypes = {
  partner: PropTypes.object
}

export default Avatar;
