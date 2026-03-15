
import { useState } from "react"
import api from "../services/api"
import ArticleCard from "../components/ArticleCard"

function Search() {

  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

const handleSearch = async (e) => {

const value = e.target.value

setQuery(value)

if(value.length < 2){
setResults([])
return
}

try{

const res = await api.get(`/posts/search?q=${value}`)

setResults(res.data.data || [])

}catch(error){

console.error("Search failed",error)

}

}


  return (

    <div className="max-w-screen-xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        Search Articles
      </h1>

      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search articles..."
        className="w-full border p-3 rounded mb-8"
      />

      <div className="grid md:grid-cols-3 gap-8">

        {results.map(article => (
          <ArticleCard key={article.id} article={article}/>
        ))}

      </div>

    </div>

  )
}

export default Search

