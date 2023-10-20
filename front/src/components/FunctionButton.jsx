function FunctionButton(props) {
    return (
        <button className="function-button" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default FunctionButton;