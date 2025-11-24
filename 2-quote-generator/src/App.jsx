import { useState, useEffect } from 'react' // obviously importing what we are going to use
import './App.css' // also importing the CSS styling

function App () {
    // 1st thing I do is create states 

    // the const for quote saves the data for the quotes and starts as null, without anything
    const [quote, setQuote] = useState(null);
    // loading const starts as false just to keep track if the data is loading or not
    const [loading, setLoading] = useState(false);
    // error const starts as null as there isn't any errors yet
    const [error, setError] = useState(null);

    // to get the data for quotes, a fetch request is made to the API (proxied via Vite during dev)
    const fetchQuote = async () => {
        setLoading(true); // the component will show that the data is still loading
        setError(null); // clears previous errors

        try {
            // needed to use the dev proxy to avoid CORS during development
            // for zenquotes the proxied path will be rewritten to `https://zenquotes.io/api/random/`.
            const res = await fetch('/api/zenquotes/api/random/');
            // const res = await fetch('/api/stoic/stoic-quote/'); // second api also working

            if (!res.ok) { // .ok tells if the response was successful
                const text = await res.text().catch(() => '');
                throw new Error(`Network response was not ok (status ${res.status}) ${text}`);
            }

            let data = await res.json(); // parse the response as JSON

            // normalize different response shapes to an object { quote, author }
            // zenquotes returns an array: [ { q, a } ]
            let payload = null;
            if (Array.isArray(data) && data.length > 0) {
                const first = data[0];
                payload = { quote: first.q ?? first.quote, author: first.a ?? first.author };
            } else if (data?.data) {
                // some APIs wrap the useful object in `data`
                payload = { quote: data.data.quote ?? data.data.q, author: data.data.author ?? data.data.a };
            } else {
                payload = { quote: data.quote ?? data.q, author: data.author ?? data.a };
            }

            if (!payload || (!payload.quote && !payload.author)) {
                throw new Error('Unexpected response shape from API');
            }

            setQuote(payload); // received data is saved
        } catch (error) {
            setError(error.message); // error message is saved for debugging
        } finally {
            setLoading(false); // as data was received, no need to any loading
        }
    }

    // useEffect is responsible for calling the function for the first time
    useEffect(() => {
        fetchQuote(); // searches for the first quote
    }, []); // empty array guarantees that the useEffect will only run once

    return (
        <div className="container">
            <h1>Quote Generator</h1>

            <section className="quote-box">
                {/* this will properly show if the data is loading or if there was an error */}
                {loading && <p>Loading...</p>}
                {error && <p className="error-text">Error: {error}</p>}
                
                {/* this will show the quote, if: the quote itself is truthy, meaning one exists, the data is not loading, and there is no error */}
                {quote && !loading && !error && (
                    <blockquote>
                        <p className="quote-text">"{quote.quote}"</p>
                        <footer className="quote-author">-{quote.author}</footer>
                    </blockquote>
                )}
            </section>

            {/* this button will call the same function as useEffect to get a new quote */}
            <button onClick={fetchQuote} disabled={loading}> {/* disables the button while data is being fetched */}
                {/* if the data is still loading, the text inside the button will change */}
                {loading ? 'Loading...' : 'New Quote'} 
            </button>
        </div>  
    );
}

export default App