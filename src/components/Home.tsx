export const Home = () => {
  return (
    <main className="bg-blue-500 p-6 text-white flex items-center justify-center flex-col h-screen">
      <header>
        <h1>Welcome to Sveriges Radio</h1>
      </header>

      <section className="mt-4">
        <p>
          This is the Swedish national publicly funded radio broadcaster.
          Sveriges Radio is a public limited company, owned by an independent foundation,
          and funded through a licensing fee determined by the Swedish Riksdag.
        </p>
        <p className="mt-4">
          To start browsing, select a channel or program from the navigation menu.
        </p>
      </section>
    </main>
  )
}
