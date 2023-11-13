import { observer } from "mobx-react";
import "./app.scss";
import { SearchBar } from "./components/molecules/search-bar/search-bar";
import React, { useEffect, useCallback } from "react";
import store from "./store/store";
import { Card } from "./components/organisms/card/card";

const App: React.FC = observer(() => {
  useEffect(() => {
    store.getAllPokemons(0);
  }, []);

  const handleChange = (filterWord: string) => {
    store.filterPokemons(filterWord);
  };

  const handleOnScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY + 10 >=
      document.body.offsetHeight
    ) {
      store.getMorePokemons(store.page + 50);
      console.log("fetching");
    }
    console.log("NO fetching");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);

    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [handleOnScroll]);

  return (
    <main className="app">
      <section className="app__title">
        <SearchBar handleChange={handleChange} counter={store.counter} />
      </section>

      {store.allPokemons.length === 0 ? (
        <p className="app__pokemons--error">Loading...</p>
      ) : (
        <section className="app__pokemons">
          {store.filteredPokemons?.map((poke) => (
            <Card
              name={poke.name}
              url={poke.url}
              key={poke.url + Math.random()}
            />
          ))}
          {store.filteredPokemons?.length === 0 && (
            <p className="app__pokemons--error">
              There is no pokemon with that name
            </p>
          )}
        </section>
      )}
    </main>
  );
});

export default App;
