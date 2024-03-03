export const Home = () => {
  return (
    <main className="bg-blue-500 p-6 text-white flex items-center justify-center flex-col h-screen">
      <header>
      <h1>Welcome to Sveriges Radio</h1>
      </header>

      <section className="mt-4">
      <p>
        Swedish Radio alone decides on programme content. Nobody outside the company can influence decisions on what should or what should not be broadcast. The broadcasting licence lays down Swedish Radio's journalistic freedom and its independence from political, commercial and other interests. The licence is granted to Swedish Radio by the government for several years at a time.
      </p>
      <p className="mt-4">
        To start browsing, select a channel or program from the navigation menu.
      </p>
      <a href="https://sverigesradio.se/artikel/the-company" target="_blank" rel="noopener noreferrer" className="underline text-white mt-4 hover:bg-blue-700 transition-colors duration-200">
      Read more about Sveriges Radio here
      </a>
    </section>
    </main >
  )
}
