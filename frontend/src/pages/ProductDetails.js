import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  function Model({ url }) {
    const [gltf, setGltf] = useState(null);

    useEffect(() => {
      new GLTFLoader().load(url, setGltf);
    }, [url]);

    return gltf ? <primitive object={gltf.scene} dispose={null} /> : null;
  }

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <div style={{ width: '500px', height: '500px' }}>
        <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 2, 1]} intensity={1} />
          <Model url={`http://localhost:5000${product.model3D}`} />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}

export default ProductDetails;