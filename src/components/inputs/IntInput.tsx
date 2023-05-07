const IntInput = ({value, onChangeValue, style}:any) => {
    return (<input
        type={'number'}
        value={value}
        onChange={(e) => onChangeValue(parseInt(e.target.value))}
        style={{
            margin: '10px',
            width: '50px',
            ...style
        }}
        />)
}

export default IntInput;