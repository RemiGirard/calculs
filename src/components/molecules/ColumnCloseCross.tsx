const ColumnCloseCross = ({onClick = () => {}}: any) => {
  
  return (
    <div style={{position: 'relative'}}>
      <div
        onClick={() => {onClick();}}
        style={{position: 'absolute', top: 0, right: 0, minWidth: '2em', display: "flex", justifyContent: 'center', cursor: 'pointer'}}
      >
        x
      </div>
    </div>
  );
}

export default ColumnCloseCross;