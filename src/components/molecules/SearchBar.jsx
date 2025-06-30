import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const SearchBar = ({ onSearch, placeholder = "Search tasks...", className = '' }) => {
  const [searchValue, setSearchValue] = useState('')
  const debounceTimer = React.useRef(null)

  // Defensive function check with development warning
  const safeOnSearch = typeof onSearch === 'function' ? onSearch : (() => {
    if (process.env.NODE_ENV === 'development' && onSearch !== undefined) {
      console.warn('SearchBar: onSearch prop must be a function, received:', typeof onSearch)
    }
  })

useEffect(() => {
    if (searchValue.trim()) {
      debounceTimer.current = setTimeout(() => {
        safeOnSearch(searchValue.trim())
      }, 300)
    } else {
      safeOnSearch('')
    }

    // Cleanup debounce timer
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [searchValue, safeOnSearch])

  const handleClear = () => {
    setSearchValue('')
  }

return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative ${className}`}
    >
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        icon="Search"
        className="pr-10"
      />
      {searchValue && (
{searchValue && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Button
            variant="ghost"
            size="sm"
            icon="X"
            onClick={handleClear}
            className="p-1 hover:bg-surface-100 rounded-full"
          />
        </div>
      )}
    </motion.div>
  )
}

export default SearchBar