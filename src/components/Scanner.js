// src/components/Scanner.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Función para detectar si el dispositivo es móvil
const isMobileDevice = () => {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

function Scanner() {
  const [scanning, setScanning] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false); // Para verificar si la foto ha sido tomada
  const [photo, setPhoto] = useState(null); // Para guardar la imagen capturada
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Función para abrir la cámara, seleccionando frontal o trasera según el dispositivo
  const openCamera = async () => {
    setScanning(true);
    try {
      const constraints = {
        video: {
          facingMode: isMobileDevice() ? { exact: 'environment' } : 'user' // Trasera en móvil, frontal en otros
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Error al abrir la cámara: ", err);
      setScanning(false);
      alert("No se puede acceder a la cámara, verifica los permisos.");
    }
  };

  // Función para capturar la imagen
  const capturePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const image = canvasRef.current.toDataURL('image/png'); // Convertir a formato base64
    setPhoto(image);
    setPhotoTaken(true);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop()); // Detener el video
  };

  // Función para simular el proceso de enviar la imagen y obtener el resultado
  const processPhoto = () => {
    const scannedProduct = {
      id: 1,
      name: "Producto Saludable",
      rating: 4.5,
    };
    navigate('/results', { state: { product: scannedProduct } });
  };

  // Función para cancelar el proceso
  const cancelProcess = () => {
    setPhoto(null); // Limpiar la imagen
    setPhotoTaken(false); // Regresar a la vista de escaneo
    setScanning(false); // Resetear estado de escaneo
  };

  return (
    <div className="scanner">
      <h1>SanoWise</h1>
      {!scanning && !photoTaken ? (
        <button className="scan-btn" onClick={openCamera}>
          Escanear Producto
        </button>
      ) : (
        <>
          <video
            ref={videoRef}
            style={{
              display: scanning && !photoTaken ? 'block' : 'none',
              width: '400px',
              height: '400px',
              objectFit: 'cover'
            }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} width="400" height="400"></canvas>
          {scanning && !photoTaken && (
            <button className="capture-btn" onClick={capturePhoto}>
              Tomar Foto
            </button>
          )}
        </>
      )}

      {photoTaken && (
        <div className="photo-preview">
          <img src={photo} alt="Captura del producto" style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
          <div className="buttons">
            <button className="process-btn" onClick={processPhoto}>
              Procesar Foto
            </button>
            <button className="cancel-btn" onClick={cancelProcess}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <p>Escanea un producto para ver su evaluación de salud.</p>
    </div>
  );
}

export default Scanner;
