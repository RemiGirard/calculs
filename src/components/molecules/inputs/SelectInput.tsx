const SelectInput = ({value, onChangeValue, choices, renderChoice, style}:any) => {
    return (<select
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        style={{
            margin: '10px',
            ...style
        }}    
    >
        {choices.map(renderChoice)}
    </select>)
}

export default SelectInput