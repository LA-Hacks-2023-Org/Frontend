// import React, { useRef, useEffect, useState } from 'react';

// const WebcamAccess = () => {
//   const videoRef = useRef(null);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [webcamEnabled, setWebcamEnabled] = useState(false);

//   useEffect(() => {
//     if (webcamEnabled) {
//       const getMedia = async () => {
//         try {
//           const stream = await navigator.mediaDevices.getUserMedia({ video: true });

//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         } catch (error) {
//           console.error('Error accessing webcam:', error);
//           setErrorMsg('Error accessing webcam.');
//         }
//       };

//       getMedia();

//       return () => {
//         if (videoRef.current && videoRef.current.srcObject) {
//           videoRef.current.srcObject.getTracks().forEach((track) => {
//             track.stop();
//           });
//         }
//       };
//     } else {
//       if (videoRef.current && videoRef.current.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => {
//           track.stop();
//         });
//       }
//     }
//   }, [webcamEnabled]);

//   const toggleWebcam = () => {
//     setWebcamEnabled((prevState) => !prevState);
//   };

//   return (
//     <div>
//       <h1>Webcam Access</h1>
//       {errorMsg && <p>{errorMsg}</p>}
//       <div style={{ width: '100%', maxWidth: '400px', height: '300px', backgroundColor: '#eee' }}>
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           style={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover',
//             display: webcamEnabled ? 'block' : 'none',
//           }}
//         />
//       </div>
//       <button onClick={toggleWebcam}>{webcamEnabled ? 'Turn off webcam' : 'Turn on webcam'}</button>
//     </div>
//   );
// };

// export default WebcamAccess;

import React, { useRef, useEffect, useState } from 'react';

const WebcamAccess = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    if (webcamEnabled) {
      const getMedia = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing webcam:', error);
          setErrorMsg('Error accessing webcam.');
        }
      };

      getMedia();

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach((track) => {
            track.stop();
          });
        }
      };
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => {
          track.stop();
        });
      }
    }
  }, [webcamEnabled]);

  const toggleWebcam = () => {
    setWebcamEnabled((prevState) => !prevState);
  };

  const takePicture = () => {
    if (!webcamEnabled) {
      alert('Please turn on the webcam to take a picture.');
      return;
    }

    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      const base64Image = canvasRef.current.toDataURL('image/jpeg');
      console.log(base64Image);
    }
  };


  return (
    <div>
      <h1>Webcam Access</h1>
      {errorMsg && <p>{errorMsg}</p>}
      <div style={{ width: '100%', maxWidth: '400px', height: '300px', backgroundColor: '#eee' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: webcamEnabled ? 'block' : 'none',
          }}
        />
      </div>
      <button onClick={toggleWebcam}>{webcamEnabled ? 'Turn off webcam' : 'Turn on webcam'}</button>
      <button onClick={takePicture}>Take picture</button>
      <h2>Picture</h2>
      <canvas ref={canvasRef} width="400" height="300" style={{ border: '1px solid #000' }} />
    </div>
  );
};

export default WebcamAccess;
