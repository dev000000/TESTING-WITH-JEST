import React, { useState, useEffect } from "react"
import debounce from "lodash/debounce"

// Data Type này chúng ta follow theo jsonplaceholder.typicode.com (gọi api ở dưới)
export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export const DebounceSearch: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async (query: string = '') => {
    try {
      setLoading(true)
      const res = await fetch(`https://jsonplaceholder.typicode.com/users?q=${query}`)
      const data = await res.json()
      setUsers(data || [])
    } catch (error) {
      console.log("fetchUsers error", error)
    } finally {
      setLoading(false)
    }
  }

  const debouncedFetch = debounce(fetchUsers, 500)

  return (
    <div>
      <input
        placeholder="Search"
        onChange={(e) => debouncedFetch(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {!users?.length && <p>No result!</p>}
      <ul style={{ listStyle: 'none', textAlign: 'center' }}>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
