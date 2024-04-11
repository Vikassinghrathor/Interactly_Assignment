import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import PropTypes from 'prop-types';


const CustomNode = ({ data , onElementClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (event) => {
    event.stopPropagation();
    onElementClick(data.id, 'node');
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '50%',
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {data.label}
      {isHovered && (
        <span
          style={{
            position: 'absolute',
            top: -10,
            right: -10,
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
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

CustomNode.propTypes = {
  data: PropTypes.object.isRequired,
  onElementClick: PropTypes.func.isRequired,
};


export default CustomNode;