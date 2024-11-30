import { Provider } from "react-redux";
import { store } from "../store";
import PropTypes from "prop-types";

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreProvider;
