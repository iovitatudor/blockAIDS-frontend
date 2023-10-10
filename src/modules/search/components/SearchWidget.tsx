import React, {ChangeEvent, FC, FormEvent, useState} from "react";
import MyInput from "../../../ui/MyInput";
import '../styles/Search.scss';
import searchIcon from "../assets/search-icon.png";

const SearchWidget: FC = () => {
  const [searchField, setSearchField] = useState('')

  const handleSearchField = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchField('');
  }

  return (
    <div className="search-area">
      <form onSubmit={handleSubmit}>
        <div className="search-fields">
          <MyInput
            type="text"
            value={searchField}
            name="name"
            icon={searchIcon}
            placeholder="Search something..."
            onChange={handleSearchField}
          />
          <button className="search-btn">Search</button>
        </div>
      </form>
    </div>
  );
}

export default SearchWidget;