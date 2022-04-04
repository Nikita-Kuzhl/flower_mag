import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
      <Alert variant="danger" className="m-5">
        <Alert.Heading>Вы посетили нерабочую ссылку</Alert.Heading>
        <p>Перейдите на <Link to='/'>главную</Link></p>
      </Alert>
    </div>
  );
};

export default Error;
