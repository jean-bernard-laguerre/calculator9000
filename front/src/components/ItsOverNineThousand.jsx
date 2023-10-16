function ItsOverNineThousand(props) {
    
    return (
        <>
            {props.value > 9000 ? <h1>It's over 9000!</h1> : null}
        </>
    )
}

export default ItsOverNineThousand;