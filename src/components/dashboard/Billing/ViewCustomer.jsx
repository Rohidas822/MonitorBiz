// src/components/dashboard/Billing/ViewCustomer.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, ListGroup, Spinner } from "react-bootstrap";
import { FaArrowLeft, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
// import { toast } from "react-toastify";  

const API = "/api/v1/customers";

const ViewCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`${API}/${id}`);
        setCustomer(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load customer");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  if (loading) return <div className="text-center mt-5"><Spinner as={Spinner} animation="border" /></div>;

  if (!customer) return <div className="text-center mt-5"><p>No Customer Found</p></div>;

  return (
    <div className="p-4" style={{ background: "#F9FAFB", minHeight: "100vh" }}>
      <Button variant="light" className="mb-3" onClick={() => navigate("/dashboard/billing/customer")}>
        <FaArrowLeft className="me-2"/> Back
      </Button>

      <Card className="p-3 border-0 shadow-sm rounded-3" style={{ maxWidth: "600px" }}>
        <Card.Body>
          <Card.Title className="fw-bold mb-3">Customer Details</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item><FaUser className="me-2"/> <strong>Name:</strong> {customer.name}</ListGroup.Item>
            <ListGroup.Item><FaPhone className="me-2"/> <strong>Phone:</strong> {customer.phone}</ListGroup.Item>
            <ListGroup.Item><FaEnvelope className="me-2"/> <strong>Email:</strong> {customer.email || "Not Provided"}</ListGroup.Item>
            <ListGroup.Item><FaMapMarkerAlt className="me-2"/> <strong>Address:</strong> {customer.address || "Not Provided"}</ListGroup.Item>
            <ListGroup.Item><FaBuilding className="me-2"/> <strong>Business Type:</strong> {customer.businessType}</ListGroup.Item>
            <ListGroup.Item><strong>GSTIN:</strong> {customer.gst || "No GST"}</ListGroup.Item>
            <ListGroup.Item><strong>City/State:</strong> {customer.city}, {customer.state}</ListGroup.Item>
            <ListGroup.Item><strong>Pincode:</strong> {customer.pincode || "Not Provided"}</ListGroup.Item>
            <ListGroup.Item><strong>Payment Terms:</strong> {customer.paymentTerms}</ListGroup.Item>
            <ListGroup.Item><strong>Billing Address:</strong> {customer.billingAddress || "Not Provided"}</ListGroup.Item>
            <ListGroup.Item><strong>Shipping Address:</strong> {customer.shippingAddress || "Not Provided"}</ListGroup.Item>
          </ListGroup>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="primary" onClick={() => navigate(`/dashboard/billing/customer/edit/${customer._id}`)}>
              <FaEdit className="me-2"/> Edit Customer
            </Button>
          </div>
        </Card.Body>
    </Card>
    </div>
  );
};

export default ViewCustomer;
