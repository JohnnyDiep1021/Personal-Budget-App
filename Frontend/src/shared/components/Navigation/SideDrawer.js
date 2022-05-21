import reactDom from "react-dom";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const element = (
    <aside className={`side-drawer ${props.active && "active"}`}>
      {props.children}
    </aside>
  );

  return reactDom.createPortal(element, document.getElementById("drawer-hook"));
};

export default SideDrawer;
