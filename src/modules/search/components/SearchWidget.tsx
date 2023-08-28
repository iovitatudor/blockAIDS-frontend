import React, {ChangeEvent, FC, FormEvent, useState} from "react";
import Input from "../../../ui/Input";
import '../styles/Search.scss';

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
          <Input
            type="text"
            value={searchField}
            name="name"
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