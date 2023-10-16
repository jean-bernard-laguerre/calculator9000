function NumberButton(props) {
    return (
        <button onClick={props.onClick} className="numberButton">{props.value}</button>
    )
}

export default NumberButton;