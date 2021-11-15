import { Toast, ToastContainer, ProgressBar } from "react-bootstrap";
import { mapToArray } from "../../globals/helpers/utility";

export default function Batchprocess(props) {
  const { batch_process } = props.state;
  const { batch_process_completed } = props.state;
  const batch_process_array = mapToArray(batch_process);
  return batch_process_array.length ? (
    <ToastContainer className="batch_process_container position-absolute">
      {batch_process_array.map((batch) => (
        <Toast
          show={batch_process_completed.has(batch.id) ? false : true}
          className="batch_item"
          key={batch.id}
        >
          <Toast.Header className="batch_item_header">
            <ul className="batch_meta">
              <li key="batch_id">Batch id: {batch.id}</li>
              <li key="custodian">
                Custodian: {batch.value.data.get("custodian_name")}
              </li>
            </ul>
          </Toast.Header>
          <Toast.Body>
            <p>Upload progress {`${batch.value.progress}%`}</p>
            <ProgressBar variant="warning" now={batch.value.progress} />
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  ) : null;
}
