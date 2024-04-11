import { useState } from 'react';
import PropTypes from 'prop-types';


const CustomEdge = ({ data , onElementClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (event) => {
    event.stopPropagation();
    onElementClick(data.id, 'edge');
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '50%',
          width: 20,
          height: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {data.label}
      </div>
      {isHovered && (
        <span
          style={{
            position: 'absolute',
            top: '50%',
            right: -10,
            transform: 'translateY(-50%)',
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={handleDelete}
        >
          X
        </span>
      )}
    </div>
  );
};

CustomEdge.propTypes = {
  data: PropTypes.object.isRequired,
  onElementClick: PropTypes.func.isRequired,
};

export default CustomEdge;