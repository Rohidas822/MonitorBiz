// src/components/dashboard/Billing/CreateCustomer.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Card, Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { FaArrowLeft, FaUser, FaPlus, FaEnvelope, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
// import { toast } from "react-toastify";

const API = "/api/v1/customers"; // Change to your backend API

const CreateCustomer = () => {
  const navigate = useNavigate();

  const [customerType, setCustomerType] = useState("individual");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    contactPerson: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    gst: "",
    paymentTerms: "Due on Receipt",
    billingAddress: "",
    shippingAddress: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API, { ...formData, customerType });
      toast.success("Customer created successfully!");
      navigate("/dashboard/billing/customer");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create customer");
    }
  };

  return (
    <div className="p-4" style={{ background: "#F9FAFB", minHeight: "100vh" }}>

      {/* Back Button */}
      <Button variant="light" className="mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" /> Back to Customers
      </Button>

      <h2 className="mb-4 fw-bold">Add New Customer</h2>

      <Card className="p-4 shadow-sm border-0 rounded-3">
        <h5 className="mb-3 text-primary fw-semibold">Customer Information</h5>

        {/* Customer Type */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-medium">Customer Type</Form.Label><br/>
          <ToggleButtonGroup
            type="radio"
            name="customerType"
            value={customerType}
            onChange={val => setCustomerType(val)}
            className="mt-2"
          >
            <ToggleButton id="t1" value="business" variant="outline-primary">
              <FaBuilding className="me-1"/> Business
            </ToggleButton>
            <ToggleButton id="t2" value="individual" variant="outline-primary">
              <FaUser className="me-1"/> Individual
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>

        <Form onSubmit={handleSubmit}>

          <Row>
            {/* Customer Name */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Customer Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="name"
                  placeholder="Enter customer name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            {/* Phone */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="phone"
                  placeholder="Enter phone number"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Email */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            {/* Contact Person */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contact Person</Form.Label>
                <Form.Control
                  name="contactPerson"
                  placeholder="Enter contact person name"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Address */}
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              placeholder="Enter address"
              onChange={handleChange}
            />
          </Form.Group>

          <Row>
            {/* State */}
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Select name="state" onChange={handleChange}>
                  <option value="">Select State</option>
                  <option>Maharashtra</option>
                  <option>Gujarat</option>
                  <option>Delhi</option>
                  <option>Karnataka</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* City */}
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Select name="city" onChange={handleChange}>
                  <option value="">Select City</option>
                  <option>Mumbai</option>
                  <option>Pune</option>
                  <option>Delhi</option>
                  <option>Bangalore</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Pincode */}
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  name="pincode"
                  placeholder="Enter pincode"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* GSTIN */}
          <Form.Group className="mb-3">
            <Form.Label>GSTIN</Form.Label>
            <Form.Control
              name="gst"
              placeholder="Enter GSTIN (optional)"
              onChange={handleChange}
            />
          </Form.Group>

          <Row>
            {/* Payment Terms */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Payment Terms</Form.Label>
                <Form.Select name="paymentTerms" onChange={handleChange} value={formData.paymentTerms}>
                  <option>Due on Receipt</option>
                  <option>Net 15</option>
                  <option>Net 30</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* GST Status */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>GST Status</Form.Label><br/>
                <div className="d-flex gap-3 mt-2">
                  <Form.Check
                    type="radio"
                    label="With GST"
                    name="gstStatus"
                    value="with"
                    onChange={() => setFormData({ ...formData, gst: formData.gst })}
                  />
                  <Form.Check
                    type="radio"
                    label="Without GST"
                    name="gstStatus"
                    value="without"
                    onChange={() => setFormData({ ...formData, gst: "" })}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Billing Address */}
          <Form.Group className="mb-3">
            <Form.Label>Billing Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="billingAddress"
              placeholder="Enter billing address"
              onChange={handleChange}
            />
          </Form.Group>

          {/* Shipping Address */}
          <Form.Group className="mb-3">
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="shippingAddress"
              placeholder="Enter shipping address"
              onChange={handleChange}
            />
          </Form.Group>

          {/* Submit Buttons */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" variant="primary">
              <FaPlus className="me-2" /> Create Customer
            </Button>
          </div>

        </Form>
      </Card>
    </div>
  );
};

export default CreateCustomer;
