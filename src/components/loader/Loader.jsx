
import { BounceLoader } from "react-spinners";

function Loader() {
  return (
		<div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
    }}>
			<BounceLoader color="#1e3c4c" />
		</div>
	);
}

export default Loader