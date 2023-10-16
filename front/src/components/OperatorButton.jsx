function OperatorButton(props) {
    return (
        <button className="operator-button" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default OperatorButton;