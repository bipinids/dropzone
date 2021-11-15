import { Card } from "react-bootstrap";
import Dropzone from "../dropzone";
import Custodian from "../custodian";

export default (props) => {
  const state = props.state;
  const handleState = (stateData) => {
    props.handleState(stateData);
  };

  return (
    <>
      <Card className="dropzone">
        <Card.Body>
          <Card.Title className="text-light">Upload files</Card.Title>
          {state.show_custodian ? (
            <Custodian state={state} setState={handleState} />
          ) : (
            <Dropzone state={state} setState={handleState} />
          )}
        </Card.Body>
      </Card>
    </>
  );
};
