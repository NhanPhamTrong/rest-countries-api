import "./DetailPage.scss"

export const DetailPage = (props) => {
    return (
        <main className={"detail-page" + (props.isDark ? " dark" : "")}>
            <div className="main-header">
                <button className="back-btn" type="button" onClick={() => props.OpenMainPage()}>
                    <span><i className="fa-solid fa-arrow-left"></i></span>
                    Back
                </button>
            </div>
            <div className="main-container">
                <img src={props.country.flags.png} alt={props.country.flags.alt} />
                <h1>{props.country.name.common}</h1>
                <div>
                    <p><strong>Native Name: </strong>{props.country.name.nativeName !== undefined && Object.values(props.country.name.nativeName)[0].official}</p>
                    <p><strong>Population: </strong>{props.country.population}</p>
                    <p><strong>Region: </strong>{props.country.region}</p>
                    <p><strong>Sub Region: </strong>{props.country.subregion}</p>
                    <p><strong>Capital: </strong>{props.country.capital !== undefined && props.country.capital.join(", ")}</p>
                </div>
                <div>
                    <p><strong>Top Level Domain: </strong>{props.country.tld !== undefined && props.country.tld.join(", ")}</p>
                    <p><strong>Currencies: </strong>{props.country.currencies !== undefined && Object.keys(props.country.currencies).join(", ")}</p>
                    <p><strong>Language: </strong>{props.country.languages !== undefined && Object.values(props.country.languages).join(", ")}</p>
                </div>
                <div>
                    <p><strong>Border Countries:</strong></p>
                    <ul className="border-list">
                        {props.country.borders !== undefined &&
                            props.country.borders.map((border, index) => {
                                let borderCountry = ""
                                
                                props.countryList.forEach((country) => {
                                    if (country.cca3 === border) {
                                        borderCountry = country
                                    }
                                })

                                return (
                                    <li key={index} onClick={() => props.OpenDetail(borderCountry)}>
                                        {borderCountry.name.common}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </main>
    )
}