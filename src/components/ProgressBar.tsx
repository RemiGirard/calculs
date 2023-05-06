import React from "react";

const ProgressBar = ({value = 0, color = '#f543e2'}) => {
    return (
      <div style={{width: '100%', height: '30px', display: 'flex', justifyContent: 'center'}}>
        <div style={{
          backgroundColor: color,
          width: `${value}%`,
          height: '100%',
          transition: 'width 0.3s ease'
        }}></div>
      </div>
    );
  }
export default ProgressBar;