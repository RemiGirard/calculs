const Button = ({children, onClick, style}) => {
    return (<div 
        style={{
            backgroundColor: 'blue',
            color: 'white',
            fontSize: '1.5em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '5px',
            ...style
        }}
        onClick={onClick}
    >
        {
        <div>{children}</div>
        }
    </div>)
}

export default Button;