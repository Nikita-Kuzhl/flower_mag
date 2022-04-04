import React from "react";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import user from "../../store/user";

const ExitButton = () => {
  const handleClickExit = () => user.delAuth();

  return (

      <Button
        variant="outline-light"
        className="ms-4"
        onClick={handleClickExit}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          fill="white"
          className="bi bi-box-arrow-left"
          viewBox="0 0 16 16"
        >
          <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
          <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
        </svg>
      </Button>

  );
};

export default observer(ExitButton);
