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
  const navigate = useNavigate(); // Hook para redireccionar

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

  // Función para procesar la foto y enviar al servidor con un retraso de 3 segundos
  const processPhoto = async () => {
    if (photo) {
      const mimeTypeMatch = photo.match(/data:(image\/[a-zA-Z]+);base64,/);
      if (!mimeTypeMatch) {
        console.error("No se pudo obtener el tipo de imagen.");
        return;
      }
      const mimeType = mimeTypeMatch[1];
      const extension = mimeType.split('/')[1];
      const base64Image = photo.split(',')[1];

      const requestBody = {
        imageBase64: base64Image,
        imageExtension: extension
      };

      // Esperar 3 segundos antes de enviar la solicitud
      setTimeout(async () => {
        try {
          const response = await fetch("http://localhost:8080/api/analyze/image-text", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
          });

          if (!response.ok) {
            throw new Error(`Error al procesar la imagen: ${response.statusText}`);
          }

          const result = await response.json();
          navigate('/results', { state: { product: result } });
        } catch (error) {
          console.error("Error al enviar la imagen:", error);
          alert("Hubo un error al procesar la imagen.");
        }
      }, 3000); // Retraso de 3 segundos (3000 milisegundos)
    }
  };

  // Función para redirigir a la página de inicio
  const cancelAndGoHome = () => {
    setPhoto(null); // Limpiar la imagen
    setPhotoTaken(false); // Regresar a la vista de escaneo
    setScanning(false); // Resetear estado de escaneo
    navigate('/'); // Redirige a la página de inicio
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
            <button className="cancel-btn" onClick={cancelAndGoHome}>
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
