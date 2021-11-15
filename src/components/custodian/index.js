import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
export default function Custodian(props) {
  const { state, setState } = props;
  const { fileList } = state;

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      setValidated(true);
      //prepare form datat and state
      var formData = new FormData(form);
      //set batch_id to form data. batch_id is expected to return as response from the server after successfull batch processing.
      const batch_id = uuidv4();
      formData.append("batch_id", batch_id);
      //attach files
      [...fileList].forEach((file, index) => {
        formData.append(`custodian_file_${index}`, file);
      });

      //clear file list and set the form data to state.Also hide the custodian form
      setState({
        fileList: [],
        form: formData,
        show_custodian: false,
      });
    }
  };

  return (
    <Container className="custodian_form">
      <Row className="flex-column align-items-center justify-content-center">
        <Col xs={6}>
          <p>Files to upload:</p>

          <ul className="list-files ps-0 text-start">
            {fileList.map((elem, index) => (
              <li className="list-files-item" key={`file_${index}`}>
                {elem.name}
              </li>
            ))}
          </ul>
        </Col>
        <Col xs={6}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Custodian name</Form.Label>
              <Form.Control
                required
                maxLength="50"
                minLength="5"
                type="text"
                placeholder="Enter custodian name."
                name="custodian_name"
              />
              <Form.Control.Feedback type="invalid">
                Custodian name must have 5-20 characters characters.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Upload batch
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
