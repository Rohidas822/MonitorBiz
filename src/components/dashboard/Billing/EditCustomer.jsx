// src/components/dashboard/Billing/EditCustomer.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { Form, Button, Card, Row, Col, Spinner } from "react-bootstrap";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

const API = "/api/v1/customers";

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    gst: "",
    paymentTerms: "",
    businessType: "B2C",
    billingAddress: "",
    shippingAddress: ""
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`${API}/${id}`);
        const c = res.data.data || {};

        // Map fields safely so state never becomes undefined
        setFormData({
          name: c.name || "",
          phone: c.phone || "",
          email: c.email || "",
          address: c.address || "",
          state: c.state || "",
          city: c.city || "",
          pincode: c.pincode || "",
          gst: c.gst || "",
          paymentTerms: c.paymentTerms || "",
          businessType: c.businessType || "B2C",
          billingAddress: c.billingAddress || "",
          shippingAddress: c.shippingAddress || ""
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/${id}`, formData);
      navigate(`/dashboard/billing/customer/view/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="p-4" style={{ background: "#F9FAFB", minHeight: "100vh" }}>

      {/* Back Button */}
      <Button variant="light" className="mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" /> Back
      </Button>

      <h2 className="mb-4 fw-bold">Edit Customer</h2>

      {/* Form Card */}
      <Card className="p-4 shadow-sm border-0 rounded-3">
        <Form onSubmit={handleUpdate}>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Customer Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Business Type</Form.Label>
                <Form.Select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                >
                  <option>B2C</option>
                  <option>B2B</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Select name="state" value={formData.state} onChange={handleChange}>
                  <option value="">Select State</option>
                  <option>Maharashtra</option>
                  <option>Gujarat</option>
                  <option>Delhi</option>
                  <option>Karnataka</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Select name="city" value={formData.city} onChange={handleChange}>
                  <option value="">Select City</option>
                  <option>Mumbai</option>
                  <option>Pune</option>
                  <option>Delhi</option>
                  <option>Bangalore</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>GSTIN</Form.Label>
            <Form.Control
              name="gst"
              value={formData.gst}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Terms</Form.Label>
            <Form.Select name="paymentTerms" value={formData.paymentTerms} onChange={handleChange}>
              <option value="">Select Terms</option>
              <option>Due on Receipt</option>
              <option>Net 15</option>
              <option>Net 30</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Billing Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" variant="primary">
              <FaPlus className="me-2" /> Update Customer
            </Button>
          </div>

        </Form>
      </Card>

    </div>
  );
};

export default EditCustomer;
