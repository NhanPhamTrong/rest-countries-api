import "./Header.scss"

export const Header = (props) => {
    return (
        <header className={props.isDark ? "dark" : ""}>
            <strong>Where in the world?</strong>
            <button type="button" onClick={() => props.SwitchMode()}>
                <span><i className={"fa-" + (props.isDark ? "solid" : "regular") + " fa-moon"}></i></span>
                Dark Mode
            </button>
        </header>
    )
}