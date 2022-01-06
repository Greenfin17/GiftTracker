import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const drawAvatar = (canvas, context, firstName, backgroundColor, width, height) => {
  const fontSize = width * .02;
  canvas.width = width;
  canvas.height = height;
  context.beginPath();
  context.arc(width / 2, height / 2, .4 * width, 0, Math.PI * 2);
  context.closePath();
  context.fillStyle = backgroundColor;
  context.fill();
  context.font = `${fontSize}rem sans-serif`;
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.textBaseline = 'bottom';
  if (firstName?.length > 0) context.fillText(firstName[0], width / 2, .7 * height);
  return canvas.toDataURL('image/png');
}

// from https://dev.to/dcodeyt/build-a-user-profile-avatar-generator-with-javascript-436m
const defaultAvatar = (imageURL, canvas, context, partner, backgroundColor, width, height) => {
  if (context && canvas ) {
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    var img = new Image();
    if ( imageURL && imageURL.length > 0) {
       img.onload = () => {
        context.drawImage(img, width / 10, height / 10, .8 * width, .8 * height);
      }
      context.beginPath();
      context.arc(width / 2, height / 2, .4 * width, 0, Math.PI * 2, true);
      context.clip();
      context.closePath();
      img.onerror = (e) => {
        // this error doesn't seem to be called right away in the user profile
        drawAvatar(canvas, context, partner, backgroundColor, width, height);
      }
      img.src = imageURL;
    } else if (!imageURL) drawAvatar(canvas, context, partner, backgroundColor, width, height);
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
  if (firstName && firstName.length > 0) {
    index = ((firstName.toLowerCase().charCodeAt(0) - 97) % 6);
  }
  return colors[index];
};


const Avatar = ({
  imageURL,
  firstName,
  width,
  height
}) => {

  const canvasRef = useRef();
  const [context, setContext] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const contextObj = canvas.getContext('2d');
    setContext(contextObj);
  }, [])

  return (
    <canvas ref={canvasRef} >
          {defaultAvatar(imageURL, canvasRef.current, context, firstName,
            pickColor(firstName), width, height)}
    </canvas>
  );
};

Avatar.propTypes = {
  imageURL: PropTypes.string,
  firstName: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}

export default Avatar;
