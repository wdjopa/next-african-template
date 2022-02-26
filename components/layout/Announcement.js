import React, { useState } from "react";

function Announcement({ text, visible = false }) {
  const [show, set_show] = useState(visible);
  if (!show) return <></>;
  return (
    <div className="announcement">
      <div className="container announcement_container">
        <span></span>
        {text}
        <span
          onClick={() => {
            set_show(false);
          }}
          className="announcement_close"
        >
          &times;
        </span>
      </div>
    </div>
  );
}

export default Announcement;
