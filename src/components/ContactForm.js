import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sellerChecked, setSellerChecked] = useState(true);
  const [newsChecked, setNewsChecked] = useState(true);
  const [formSent, setFormSent] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [mobileSignUp, setMobileSignUp] = useState(0);
  const [desktopSignUp, setDesktopSignUp] = useState(0);

  // Mock submit function that console.logs the value of the form
  // but would usually run an axios.post("/api/endpoint", form) etc
  function submit() {
    if (name && email) {
      const form = {};
      form["name"] = name;
      form["email"] = email;
      form["seller"] = sellerChecked;
      form["news"] = newsChecked;
      console.log("sending form with following data", form);
      setName("");
      setEmail("");
      setMobileSignUp(2);
      setDesktopSignUp(1);
    } else {
      setModalShow(true);
    }
  }

  return (
    <>
      <Container className="contact-container-desktop mt-3">
        {desktopSignUp == 0 ? (
          <Row className="form-row-desktop">
            <Col lg={4} md={6} sm={12}>
              <Row>
                <Col>
                  <div className="bee-informed">Bee informed</div>
                  <div className="bee-informed">when we launch.</div>
                  <h6 className="mt-2">
                    Drop your deets and we'll give you a buzz
                  </h6>
                </Col>
              </Row>
              <Row></Row>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Control
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-2">
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Row id="radio-button-row">
                <Col className="radio-signup-col pb-3" lg={6} md={6} sm={12}>
                  <Form>
                    <Form.Check
                      type="checkbox"
                      label="Count me in as a seller"
                      id="checkboxOption1"
                      checked={sellerChecked}
                      onChange={() => setSellerChecked((prev) => !prev)}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Sign me up for news"
                      id="checkboxOption2"
                      checked={newsChecked}
                      onChange={() => setNewsChecked((prev) => !prev)}
                    />
                  </Form>
                </Col>
                <Col className="radio-signup-col pb-3" lg={6} md={6} sm={12}>
                  <Button onClick={submit} id="signup-button">
                    Sign me up
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : desktopSignUp == 1 ? (
          <Row className="form-row">
            <Col id="form-thank-you">
              <h2>
                <strong>Thank you!</strong>
              </h2>
              <h6>We'll see you in your inbox soon!</h6>
            </Col>
          </Row>
        ) : (
          <></>
        )}

        <Row>
          {" "}
          <Modal show={modalShow} onHide={() => setModalShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Please complete the form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              It looks like you might have forgotten to add your name and email!
            </Modal.Body>
          </Modal>
        </Row>
      </Container>
      <Container id="contact-container-mobile" className="mt-3">
        {mobileSignUp === 1 && (
          <Row className="form-row-mobile">
            <Col lg={4} md={6} sm={12}>
              <Row>
                <Col>
                  <div className="bee-informed">Bee informed</div>
                  <div className="bee-informed">when we launch.</div>
                  <h6 className="mt-2">
                    Drop your deets and we'll give you a buzz
                  </h6>
                </Col>
              </Row>
              <Row></Row>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Control
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-2">
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Row id="radio-button-row">
                <Col className="radio-signup-col pb-3" lg={4} md={6} sm={12}>
                  <Form>
                    <Form.Check
                      type="checkbox"
                      label="Count me in as a seller"
                      id="checkboxOption1"
                      checked={sellerChecked}
                      onChange={() => setSellerChecked((prev) => !prev)}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Sign me up for news"
                      id="checkboxOption2"
                      checked={newsChecked}
                      onChange={() => setNewsChecked((prev) => !prev)}
                    />
                  </Form>
                </Col>
                <Col className="radio-signup-col pb-3" lg={4} md={6} sm={12}>
                  <Button onClick={submit} id="signup-button">
                    Sign me up
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        {mobileSignUp === 2 && (
          <Row className="form-row-mobile">
            <Row>
              <Col id="form-close-col">
                <div onClick={() => setMobileSignUp(3)} className="form-close">
                  x
                </div>
              </Col>
            </Row>
            <Row>
              <Col id="form-thank-you">
                <h2>
                  <strong>Thank you!</strong>
                </h2>
                <h6>We'll see you in your inbox soon!</h6>
              </Col>
            </Row>
          </Row>
        )}
      </Container>
      <Container id="signup-button-container-mobile">
        {!mobileSignUp && (
          <Row className="mt-3">
            <Col align="end">
              <Button onClick={() => setMobileSignUp(1)} id="signup-button">
                Sign me up
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default ContactForm;
