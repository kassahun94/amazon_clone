import PropTypes from 'prop-types';


import Header from '../header/Header';

function LayOut({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default LayOut;

LayOut.propTypes = {
	children: PropTypes.node.isRequired,
};


