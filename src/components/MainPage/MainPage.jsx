import { useEffect, useState } from "react"
import "./MainPage.scss"

export const MainPage = (props) => {
    const [search, setSearch] = useState("")
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [filter, setFilter] = useState("Filter by Region")

    const HandleClickOutside = (e) => {
        if (e.target.nodeName !== "HTML") {
            if (e.target.classList.contains("filter") === false && e.target.closest("div").classList.contains("filter-section") === false) {
                setIsOpenFilter(false)
            }
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", HandleClickOutside)
        return (() => {
            document.removeEventListener("mousedown", HandleClickOutside)
        })
    })

    const ChooseFilter = (e) => {
        const filterName = e.currentTarget.getAttribute("name")

        if (filterName === "All") {
            props.GetAll()
        }
        else {
            props.GetSpecificFilter(filterName)
        }

        setIsOpenFilter(false)
        setFilter(filterName)
    }

    return (
        <main className={"main-page" + (props.isDark ? " dark" : "")}>
            <div className="main-header">
                <form action="">
                    <span><i className="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" name="search" placeholder="Search for a country..." onChange={(e) => setSearch(e.target.value)} />
                </form>
                <div className="filter-section">
                    <button className="filter" type="button" onClick={() => setIsOpenFilter(!isOpenFilter)}>
                        {filter}
                        <span><i className="fa-solid fa-chevron-down"></i></span>
                    </button>
                    <ul className={isOpenFilter ? "active" : ""}>
                        <li>
                            <button type="button" name="All" onClick={ChooseFilter}>All</button>
                        </li>
                        <li>
                            <button type="button" name="Africa" onClick={ChooseFilter}>Africa</button>
                        </li>
                        <li>
                            <button type="button" name="Americas" onClick={ChooseFilter}>Americas</button>
                        </li>
                        <li>
                            <button type="button" name="Asia" onClick={ChooseFilter}>Asia</button>
                        </li>
                        <li>
                            <button type="button" name="Europe" onClick={ChooseFilter}>Europe</button>
                        </li>
                        <li>
                            <button type="button" name="Oceania" onClick={ChooseFilter}>Oceania</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main-container">
                <ul>
                    {props.countryList
                    .filter((country) => {
                        return search.toLowerCase() === "" ? country : country.name.common.toLowerCase().includes(search)
                    })
                    .map((country, index) => (
                        <li key={index} className={country.isShow ? "show" : ""} onClick={() => props.OpenDetail(country)}>
                            <div className="flag-image">
                                <img src={country.flags.png} alt={country.flags.alt} />
                            </div>
                            <div className="content">
                                <h1>{country.name.common}</h1>
                                <p><strong>Population: </strong>{Number(country.population).toLocaleString()}</p>
                                <p><strong>Region: </strong>{country.region}</p>
                                <p><strong>Capital: </strong>{country.capital !== undefined && country.capital.join(", ")}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}