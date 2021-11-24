export const FailAlert = ({ message }) => {
  return (
    <div class="alert alert-danger" role="alert" style={{ width: "100%" }}>
      <h4 class="alert-heading">Login Failed!</h4>
      <p class="mb-0">{message ? message : ""}</p>
    </div>
  );
};
export const LoadingAlert = ({ message }) => {
  return (
    <div class="alert alert-info" role="alert" style={{ width: "100%" }}>
      <p class="mb-0">{message ? message : ""}</p>
    </div>
  );
};

export const SucessAlert = ({ message }) => {
  return (
    <div class="alert alert-success" role="alert" style={{ width: "100%" }}>
      <h4 class="alert-heading">Login Success!</h4>
      <p class="mb-0">{message ? message : ""}</p>
    </div>
  );
};

export const AlertBox = () => {
  let alertBx = document.getElementById('alert-box')
  return (
    <div id={'alert-box'} class="xd-message">
      <div class="xd-message-icon">
        <i class="ion-alert"></i>
      </div>
      <div class="xd-message-content">
        <p>The quick brown fox jumped over the lazy dog.</p>
      </div>
      <a href="#" class="xd-message-close" onClick={this.parent}>
        &times;
      </a>
    </div>
  );
};
