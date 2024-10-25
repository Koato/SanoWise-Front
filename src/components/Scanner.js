// src/components/Scanner.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Scanner() {
  const [scanning, setScanning] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false); // Para verificar si la foto ha sido tomada
  const [photo, setPhoto] = useState(null); // Para guardar la imagen capturada
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Función para abrir la cámara
  const openCamera = async () => {
    setScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Error al abrir la cámara: ", err);
      setScanning(false);
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
    // Simulamos el proceso de análisis y redirigimos a la página de resultados
    const scannedProduct = {
      id: 1,
      name: "Producto Saludable",
      rating: 4.5,
    };
    navigate('/results', { state: { product: scannedProduct } });
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
          <video ref={videoRef} style={{ display: scanning && !photoTaken ? 'block' : 'none', width: '100%' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} width="320" height="240"></canvas>
          {scanning && !photoTaken && (
            <button className="capture-btn" onClick={capturePhoto}>
              Tomar Foto
            </button>
          )}
        </>
      )}

      {photoTaken && (
        <div className="photo-preview">
          <img src={photo} alt="Captura del producto" style={{ width: '100%' }} />
          <button className="process-btn" onClick={processPhoto}>
            Procesar Foto
          </button>
        </div>
      )}

      <p>Escanea un producto para ver su evaluación de salud.</p>
    </div>
  );
}

export default Scanner;
