function BeautifulScreen(props){
    return (
        <div className="screen">
            <div className="eq-screen">
                <p>{props.equation}</p>
            </div>
            <div className="input-screen">
                <p>{props.inputs}</p>
            </div>
        </div>
    )
}

export default BeautifulScreen;