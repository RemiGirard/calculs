const ProgressBar = ({value = 0, color = '#ffffff'}) => {
    return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      position: 'absolute',
      bottom: '5%',
      height: '5%',
      }}>
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
