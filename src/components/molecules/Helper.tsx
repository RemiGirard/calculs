const Helper = ({text = ''}) => {
    return <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{position: 'relative'}}>{text}</div>    
    </div>;
};

export default Helper;