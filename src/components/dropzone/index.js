import { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import upload_icon from "../../assets/images/upload.png";
import {
  VALID_FILE_EXTENSIONS,
  validateFiles,
  setNotification,
} from "../../globals/helpers/utility";
export default (props) => {
  const fileEl = useRef(null);
  const { state, setState } = props;

  //handle file upload
  const handleUpload = (files) => {
    if (!validateFiles(files)) {
      setNotification("INVALID_FILES");
    } else {
      setState({
        show_custodian: true,
        fileList: [...files],
      });
    }
  };

  //mock file upload button
  const browse = (e) => {
    fileEl.current.click();
  };
  return (
    <Container>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
          <div
            className="d-flex mt-5 flex-column align-items-center justify-content-center drop-container border border-3 rounded-3  border-primary"
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleUpload(e.dataTransfer.files);
            }}
            onClick={browse}
          >
            <div className="upload_icon text-center">
              <p>Drop your files here or click to browse</p>
              <p>
                <img src={upload_icon} />
              </p>
              <p className="supp_exts fst-italic">
                Valid extension:{" "}
                {VALID_FILE_EXTENSIONS.map((element) => element.name).join()}
              </p>
            </div>
            <input
              ref={fileEl}
              type="file"
              onChange={(e) => {
                handleUpload(e.target.files);
              }}
              accept={VALID_FILE_EXTENSIONS.map(
                (element) => element.mime
              ).join()}
              className="d-none"
              multiple
            />
          </div>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
};
