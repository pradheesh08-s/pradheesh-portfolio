const RecipeApp = (() => {
  const STORAGE_KEY = 'favorites';
  const DEFAULT_FILTER = 'all';
  const DEFAULT_SORT = 'name';
  const SEARCH_DEBOUNCE_MS = 350;

  const recipes = [
    {
      id: 1,
      title: 'Classic Spaghetti Carbonara',
      time: 25,
      difficulty: 'easy',
      description: 'A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.',
      category: 'pasta'
    },
    {
      id: 2,
      title: 'Chicken Tikka Masala',
      time: 45,
      difficulty: 'medium',
      description: 'Tender chicken pieces in a creamy, spiced tomato sauce.',
      category: 'curry'
    },
    {
      id: 3,
      title: 'Homemade Croissants',
      time: 180,
      difficulty: 'hard',
      description: 'Buttery, flaky French pastries that require patience but deliver amazing results.',
      category: 'baking'
    },
    {
      id: 4,
      title: 'Greek Salad',
      time: 15,
      difficulty: 'easy',
      description: 'Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.',
      category: 'salad'
    },
    {
      id: 5,
      title: 'Beef Wellington',
      time: 120,
      difficulty: 'hard',
      description: 'Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.',
      category: 'meat'
    },
    {
      id: 6,
      title: 'Vegetable Stir Fry',
      time: 20,
      difficulty: 'easy',
      description: 'Colorful mixed vegetables cooked quickly in a savory sauce.',
      category: 'vegetarian'
    },
    {
      id: 7,
      title: 'Pad Thai',
      time: 30,
      difficulty: 'medium',
      description: 'Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.',
      category: 'noodles'
    },
    {
      id: 8,
      title: 'Margherita Pizza',
      time: 60,
      difficulty: 'medium',
      description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil.',
      category: 'pizza'
    },
    // South Indian A-Z
    { id: 9, title: 'Appam', time: 30, difficulty: 'medium', description: 'Soft, lacy rice pancakes from Kerala, perfect with stew or coconut milk.', category: 'south indian' },
    { id: 10, title: 'Bisi Bele Bath', time: 50, difficulty: 'medium', description: 'Karnataka rice-lentil dish with vegetables and spices.', category: 'south indian' },
    { id: 11, title: 'Chettinad Chicken', time: 60, difficulty: 'hard', description: 'Spicy chicken curry from Chettinad, Tamil Nadu, with roasted spices.', category: 'south indian' },
    { id: 12, title: 'Dosa', time: 20, difficulty: 'easy', description: 'Crispy fermented rice-lentil crepes, a breakfast staple.', category: 'south indian' },
    { id: 13, title: 'Elaneer Payasam', time: 25, difficulty: 'easy', description: 'Chilled tender coconut milk dessert from Kerala.', category: 'south indian' },
    { id: 14, title: 'Filter Coffee', time: 10, difficulty: 'easy', description: 'Strong, aromatic South Indian drip-brewed coffee.', category: 'south indian' },
    { id: 15, title: 'Gongura Pachadi', time: 15, difficulty: 'easy', description: 'Andhra-style tangy chutney made with gongura leaves.', category: 'south indian' },
    { id: 16, title: 'Hyderabadi Biryani', time: 90, difficulty: 'hard', description: 'Fragrant rice and meat biryani from Hyderabad, South India style.', category: 'south indian' },
    { id: 17, title: 'Idli', time: 15, difficulty: 'easy', description: 'Steamed rice-lentil cakes, soft and fluffy, served with chutney and sambar.', category: 'south indian' },
    { id: 18, title: 'Jackfruit Curry', time: 40, difficulty: 'medium', description: 'Kerala-style curry with tender jackfruit pieces in coconut gravy.', category: 'south indian' },
    { id: 19, title: 'Kootu', time: 35, difficulty: 'easy', description: 'Tamil Nadu mixed vegetable and lentil stew.', category: 'south indian' },
    { id: 20, title: 'Lemon Rice', time: 20, difficulty: 'easy', description: 'Tangy, yellow rice flavored with lemon juice and spices.', category: 'south indian' },
    { id: 21, title: 'Medu Vada', time: 30, difficulty: 'medium', description: 'Crispy, savory lentil doughnuts, deep-fried and served with chutney.', category: 'south indian' },
    { id: 22, title: 'Neer Dosa', time: 20, difficulty: 'easy', description: 'Thin, soft rice crepes from Karnataka.', category: 'south indian' },
    { id: 23, title: 'Olan', time: 25, difficulty: 'easy', description: 'Kerala stew of ash gourd and red beans in coconut milk.', category: 'south indian' },
    { id: 24, title: 'Pesarattu', time: 25, difficulty: 'easy', description: 'Andhra Pradesh green gram crepes, protein-rich and healthy.', category: 'south indian' },
    { id: 25, title: 'Quinoa Upma', time: 30, difficulty: 'easy', description: 'Modern upma with quinoa and vegetables, South Indian style.', category: 'south indian' },
    { id: 26, title: 'Rasam', time: 20, difficulty: 'easy', description: 'Spicy, tangy South Indian soup with tamarind and tomatoes.', category: 'south indian' },
    { id: 27, title: 'Sambar', time: 35, difficulty: 'easy', description: 'Lentil and vegetable stew with tamarind, a South Indian staple.', category: 'south indian' },
    { id: 28, title: 'Thayir Sadam', time: 10, difficulty: 'easy', description: 'Curd rice, a cooling comfort food from Tamil Nadu.', category: 'south indian' },
    { id: 29, title: 'Uthappam', time: 25, difficulty: 'easy', description: 'Thick, soft rice-lentil pancakes topped with onions and veggies.', category: 'south indian' },
    { id: 30, title: 'Vangi Bath', time: 30, difficulty: 'medium', description: 'Brinjal (eggplant) rice from Karnataka, spiced and flavorful.', category: 'south indian' },
    { id: 31, title: 'Wheat Halwa', time: 45, difficulty: 'medium', description: 'Rich, glossy halwa made from wheat flour, ghee, and sugar.', category: 'south indian' },
    { id: 32, title: 'Xacuti', time: 60, difficulty: 'hard', description: 'Goan coconut-based curry, sometimes included in South Indian cuisine.', category: 'south indian' },
    { id: 33, title: 'Yellu Bella', time: 15, difficulty: 'easy', description: 'Karnataka festive mix of sesame, jaggery, coconut, and peanuts.', category: 'south indian' },
    { id: 34, title: 'Zucchini Kootu', time: 25, difficulty: 'easy', description: 'Modern kootu with zucchini and lentils, South Indian style.', category: 'south indian' }
  ];

  const state = {
    filter: DEFAULT_FILTER,
    sort: DEFAULT_SORT,
    search: '',
    favoritesOnly: false,
    favorites: readFavorites()
  };

  const dom = {
    recipeContainer: document.querySelector('#recipe-container'),
    recipeCounter: document.querySelector('#recipeCounter'),
    searchInput: document.querySelector('#searchInput'),
    clearSearchButton: document.querySelector('#clearSearch'),
    resetControlsButton: document.querySelector('#resetControls'),
    favoritesFilterButton: document.querySelector('#favoritesFilter'),
    filterButtons: document.querySelectorAll('[data-filter]'),
    sortButtons: document.querySelectorAll('[data-sort]')
  };

  function init() {
    bindEvents();
    updateDisplay();
  }

  function bindEvents() {
    dom.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        state.filter = button.dataset.filter;
        updateDisplay();
      });
    });

    dom.sortButtons.forEach(button => {
      button.addEventListener('click', () => {
        state.sort = button.dataset.sort;
        updateDisplay();
      });
    });

    if (dom.searchInput) {
      const debouncedSearch = debounce((searchText) => {
        state.search = searchText;
        updateDisplay();
      }, SEARCH_DEBOUNCE_MS);

      dom.searchInput.addEventListener(
        'input',
        (event) => {
          debouncedSearch(event.target.value);
        }
      );
    }

    if (dom.clearSearchButton) {
      dom.clearSearchButton.addEventListener('click', () => {
        state.search = '';
        if (dom.searchInput) {
          dom.searchInput.value = '';
          dom.searchInput.focus();
        }
        updateDisplay();
      });
    }

    if (dom.favoritesFilterButton) {
      dom.favoritesFilterButton.addEventListener('click', () => {
        state.favoritesOnly = !state.favoritesOnly;
        updateDisplay();
      });
    }

    if (dom.resetControlsButton) {
      dom.resetControlsButton.addEventListener('click', () => {
        state.filter = DEFAULT_FILTER;
        state.sort = DEFAULT_SORT;
        state.search = '';
        state.favoritesOnly = false;

        if (dom.searchInput) {
          dom.searchInput.value = '';
        }

        updateDisplay();
      });
    }

    if (dom.recipeContainer) {
      dom.recipeContainer.addEventListener('click', (event) => {
        const favoriteButton = event.target.closest('.favorite-btn');
        if (!favoriteButton) return;

        event.stopPropagation();
        const recipeId = Number(favoriteButton.dataset.favid);
        toggleFavorite(recipeId);
      });
    }
  }

  function updateDisplay() {
    const visibleRecipes = applyAllTransforms(recipes);
    renderRecipes(visibleRecipes);
    renderCounter(visibleRecipes.length, recipes.length);
    syncControlStates();
  }

  function applyAllTransforms(recipesArray) {
    let transformed = filterByDifficulty(recipesArray, state.filter);
    transformed = filterBySearch(transformed, state.search);
    transformed = filterByFavorites(transformed, state.favoritesOnly, state.favorites);
    transformed = sortRecipes(transformed, state.sort);
    return transformed;
  }

  function renderRecipes(recipesToRender) {
    if (!dom.recipeContainer) return;

    if (!recipesToRender.length) {
      dom.recipeContainer.innerHTML = '<div class="empty-state">No recipes match your current filters.</div>';
      return;
    }

    dom.recipeContainer.innerHTML = recipesToRender.map(createRecipeCard).join('');
  }

  function createRecipeCard(recipe) {
    const isFavorite = state.favorites.includes(recipe.id);
    const favoriteIcon = isFavorite ? '❤️' : '🤍';

    return `
      <article class="recipe-card" data-id="${recipe.id}">
        <button
          class="favorite-btn"
          data-favid="${recipe.id}"
          type="button"
          aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}"
          title="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}"
        >${favoriteIcon}</button>
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
          <span>⏱️ ${recipe.time} min</span>
          <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
        </div>
        <p>${recipe.description}</p>
      </article>
    `;
  }

  function renderCounter(visibleCount, totalCount) {
    if (dom.recipeCounter) {
      dom.recipeCounter.textContent = `Showing ${visibleCount} of ${totalCount} recipes`;
    }
  }

  function syncControlStates() {
    setActiveButton(dom.filterButtons, state.filter, 'filter');
    setActiveButton(dom.sortButtons, state.sort, 'sort');

    if (dom.favoritesFilterButton) {
      dom.favoritesFilterButton.classList.toggle('is-active', state.favoritesOnly);
      dom.favoritesFilterButton.setAttribute('aria-pressed', String(state.favoritesOnly));
    }

    if (dom.clearSearchButton) {
      const hasSearchText = state.search.trim().length > 0;
      dom.clearSearchButton.disabled = !hasSearchText;
      dom.clearSearchButton.classList.toggle('is-active', hasSearchText);
    }
  }

  function setActiveButton(buttons, activeValue, dataKey) {
    buttons.forEach(button => {
      const isActive = button.dataset[dataKey] === activeValue;
      button.classList.toggle('is-active', isActive);
    });
  }

  function toggleFavorite(recipeId) {
    if (state.favorites.includes(recipeId)) {
      state.favorites = state.favorites.filter(id => id !== recipeId);
    } else {
      state.favorites = [...state.favorites, recipeId];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
    updateDisplay();
  }

  function filterByDifficulty(recipesArray, filterType) {
    if (filterType === 'easy' || filterType === 'medium' || filterType === 'hard') {
      return recipesArray.filter(recipe => recipe.difficulty === filterType);
    }

    if (filterType === 'quick') {
      return recipesArray.filter(recipe => recipe.time < 30);
    }

    return recipesArray;
  }

  function filterBySearch(recipesArray, searchValue) {
    if (!searchValue.trim()) return recipesArray;

    const normalizedSearch = searchValue.toLowerCase();
    return recipesArray.filter(recipe => (
      recipe.title.toLowerCase().includes(normalizedSearch)
      || recipe.description.toLowerCase().includes(normalizedSearch)
      || recipe.category.toLowerCase().includes(normalizedSearch)
    ));
  }

  function filterByFavorites(recipesArray, favoritesOnly, favoriteIds) {
    if (!favoritesOnly) return recipesArray;
    return recipesArray.filter(recipe => favoriteIds.includes(recipe.id));
  }

  function sortRecipes(recipesArray, sortType) {
    const sorted = [...recipesArray];

    if (sortType === 'name') {
      return sorted.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
    }

    if (sortType === 'time') {
      return sorted.sort((a, b) => a.time - b.time);
    }

    return sorted;
  }

  function debounce(callback, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  function readFavorites() {
    try {
      const rawValue = localStorage.getItem(STORAGE_KEY);
      const parsedValue = rawValue ? JSON.parse(rawValue) : [];
      return Array.isArray(parsedValue) ? parsedValue : [];
    } catch {
      return [];
    }
  }

  return {
    init
  };
})();

RecipeApp.init();
