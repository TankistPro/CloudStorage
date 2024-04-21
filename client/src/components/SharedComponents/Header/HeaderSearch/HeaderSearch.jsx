import React from 'react'

import './headerSearch.scss'
import {useDebounce} from "@hooks/useDebounce.js";

import {useAutoCloseModal} from "@hooks/useAutoCloseModal.js";
import {useSearch} from "@hooks/useSearch.js";
import {getFileExtension} from "@helpers/file.helper.js";

import fileImg from "@images/file.svg";
import folderImg from "@images/folder.svg";

export const HeaderSearch = () => {
    const {search, goToFileFromSearch} = useSearch();

    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchData, setSearchData] = React.useState([]);

    const debouncedValue = useDebounce(searchQuery, 500)

    React.useEffect(() => {
        (async () => {

            if (searchQuery) {
                await searchHandel();
            } else {
                setSearchData([])
            }
        })()
    }, [debouncedValue])

    useAutoCloseModal(
        [".header-search__dropmenu", ".header__search input"],
        searchData.length > 0,
        () => clearSearchData()
    )

    const searchHandel = React.useCallback(async () => {
        const data = await search(searchQuery);
        if (data) {
            setSearchData([...data])
        }
    }, [searchQuery])

    const clickHandler = React.useCallback((item) => {
        goToFileFromSearch(item.filePath, item.fileName);

        const isFile = (getFileExtension(item.fileName))

        if (!isFile) {
            clearSearchData()
        }
    }, [])

    const clearSearchData = React.useCallback(() => {
        setSearchData([])
        setSearchQuery("")
    }, [])

    const fileImage = React.useCallback((item) => {
        const isFile = (getFileExtension(item.fileName));
        return isFile ? fileImg : folderImg
    }, [])

  return (
      <div className="header__search">
          {searchData.length > 0 &&
              <div className="header-search__dropmenu">
                  <ul className="dropmenu-item">
                      {searchData.map((item) => (
                          <li key={item.id} onClick={() => clickHandler(item)}>
                              <div className="dropmenu-item__content">
                                  <img src={ fileImage(item) } alt="file"/>
                              </div>
                              <div className="dropmenu-item__content">
                                  <p>{item.filePath}</p>
                                  <small>Расположение: Home/{item.filePath}</small>
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>
          }
          <input
              onChange={event => setSearchQuery(prev => prev = event.target.value)}
              value={searchQuery}
              type="text"
              placeholder='Поиск по директории'
          />
          <span className="search-layout"></span>
      </div>
  )
}
