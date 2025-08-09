import React from 'react'

interface Props {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

const Search:React.FC<Props> = ({searchTerm, setSearchTerm}) => {
    return (
        <div className='flex justify-end mt-4 ml-4'>
            <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text" placeholder="Search ID here..." className="input input-sm" />
        </div>
    )
}

export default Search