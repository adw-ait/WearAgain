import { useAdminAuth } from "../customHooks";

const WithAdminAuth = (props) => {
  return useAdminAuth(props.children);
};

export default WithAdminAuth;
