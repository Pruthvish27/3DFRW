import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

function ProductDetails() {
    const { id } = useParams();
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
        const [obj, setObj] = useState(null);

        useEffect(() => {
            new OBJLoader().load(url, (obj) => {
                setObj(obj);
            });
        }, [url]);

        return obj ? <primitive object={obj} dispose={null} /> : null;
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