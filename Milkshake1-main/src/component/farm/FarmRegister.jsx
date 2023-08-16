import Register from "../../constants/Register/Register";
const FarmRegister = () => {
  return (
    <div className="row justify-content-center text-center">
      <div className="farm-title">Register For farming</div>
      <button
        className="btn-banner mt-5"
        style={{ width: "30%" }}
        onClick={async () => {
          await Register();
        }}
      >
        Register
      </button>
    </div>
  );
};

export default FarmRegister;
