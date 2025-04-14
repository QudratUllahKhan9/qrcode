import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import cartimage from './image/images2.png';
import circle_success from './image/circle_success.png';

const UserDetail = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();  // This will grab the 'id' from the URL
  console.log(id)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://verification-backend.vercel.app/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        console.log("✅ Data received:", data);
        setData(data)
      } catch (err) {
        console.error("❌ Failed to fetch data:", err.message);
      }
    };
  
    fetchData();
  }, [id]);
  
  
  if (!data) return <div>Loading...</div>;

  return (
    <div className="main-container">
      <div className="header">
        <div className="fingerprint-wrapper">
          <img src="/images.jpg" alt="Fingerprint" className="fingerprint" />
        </div>
        <div className="header-text">
          <span className="header-title">Authenticate your document</span>
          <span className="header-subtext">
            Thank you for submitting your document for verification.<br />
            Please find below the answer to your request.
          </span>
        </div>
      </div>
      <div className="data-card-wrapper-main">
        <div className="data-card-header">
          <img src={circle_success} alt="Success" />
        </div>
        <div className="data-card-wrapper">
          <div className="data-card-body">
            <div className="data-row"><strong>Deliverable Id :</strong><span>{data.deliverableId}</span></div>
            <div className="data-row"><strong>Published on :</strong><span>{data.publishedOn}</span></div>
            <div className="data-row"><strong>QR Code Status :</strong><span>{data.qrCodeStatus}</span></div>
            <div className="data-row"><strong>NAME :</strong><span>{data.name}</span></div>
            <div className="data-row"><strong>ID :</strong><span>{data.id}</span></div>
            <div className="data-row"><strong>ISSUED ON :</strong><span>{data.issuedOn}</span></div>
            <div className="data-row"><strong>VALID UNTIL :</strong><span>{data.validUntil}</span></div>
            <div className="data-row"><strong>TYPE :</strong><span>{data.type}</span></div>
            <div className="data-row"><strong>MODEL :</strong><span>{data.model}</span></div>
            <div className="data-row"><strong>COMPANY :</strong><span>{data.company}</span></div>
            <div className="data-row"><strong>TRAINING LOCATION :</strong><span>{data.trainingLocation}</span></div>
            <div className="data-row"><strong>TRAINER :</strong><span>{data.trainer}</span></div>

            <p className="footer-note">
              <strong>For any further information on this document, please contact the issuer of the document.</strong>
            </p>
          </div>
        </div>
        <span className="bottom-image">
          <img src={cartimage} alt="Bureau Veritas" />
        </span>
      </div>
      <div>
        <a
          href="https://group.bureauveritas.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bv-link"
        >
          <p style={{ padding: 10, width: 180 }}>
            <span style={{ display: 'block', fontSize: 11, textAlign: 'center' }}>Visit</span>
            <b style={{ fontWeight: 'lighter' }}>Bureau Veritas Website</b>
          </p>
        </a>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
