const Button = ({children, onClick, style= {}, disable = false}:any) => {
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
            ...style,
            opacity: disable ? 0.4 : 1
        }}
        onClick={() => {
            if(!disable){
              onClick()
            }
        }}
    >
        {
        <div>{children}</div>
        }
    </div>)
}

export default Button;