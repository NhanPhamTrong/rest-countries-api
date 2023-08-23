import { Header } from "./Header/Header"
import { MainPage } from "./MainPage/MainPage"
import { DetailPage } from "./DetailPage/DetailPage"
import { useEffect, useState } from "react"

export const App = () => {
    const [countryList, setCountryList] = useState([])
    const [isDark, setIsDark] = useState(true)
    const [isMainPage, setIsMainPage] = useState(true)
    const [activeCountry, setActiveCountry] = useState("")

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(list => {
                // console.log(list)
                // for (let i = 0; i < list.length; i++) {
                //     if (list[i].subregion === undefined) {
                //         console.log(list[i])
                //     }
                //     console.log(list[i])
                // }
                setCountryList(list.map(item => ({...item, isShow: true})))
            })
    }, [])

    const SwitchMode = () => {
        setIsDark(!isDark)
    }

    const OpenDetail = (country) => {
        setIsMainPage(false)
        setActiveCountry(country)
    }

    const OpenMainPage = () => {
        setIsMainPage(true)
    }

    const GetAll = () => {
        let newList = countryList.map(country => {
            country.isShow = true
            return country
        })
        setCountryList(newList)
    }

    const GetSpecificFilter = (filterName) => {
        let newList = countryList.map(country => {
            country.isShow = country.region === filterName ? true : false
            return country
        })
        setCountryList(newList)
    }

    return (
        <>
            <Header
                isDark={isDark}
                SwitchMode={SwitchMode} />

            {isMainPage ? (
                <MainPage
                    isDark={isDark}
                    countryList={countryList}
                    OpenDetail={OpenDetail}
                    GetAll={GetAll}
                    GetSpecificFilter={GetSpecificFilter}
                />
                ) : (
                <DetailPage
                    isDark={isDark}
                    country={activeCountry}
                    countryList={countryList}
                    OpenMainPage={OpenMainPage}
                    OpenDetail={OpenDetail}
                />
            )}
        </>
    )
}