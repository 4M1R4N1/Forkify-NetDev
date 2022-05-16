import Recipe from "./models/Recipe";
import Search from "./models/search";
import { clearLoader, elements, renderLoader } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";


const state = {};
window.state = state;


const controlSearch = async () => {

    const query = searchView.getInput();

    
    if(query) {

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResList);


        state.search = new Search(query);
        await state.search.getResult()

        clearLoader();
        searchView.renderResult(state.search.result)
    }
    
}

//Recipe 
const controlRecipe = async () =>{
    const id = window.location.hash.replace("#", '');

    if(id){
        //Prepare UI
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        state.search && searchView.activeLinkStyle(id);

        // Create new recipe object
        state.recipe =  new Recipe(id);

        try {
            await state.recipe.getRecipe();
        } catch(error) {
            alert('recipe error')
        }

        state.recipe.parseIngredients();

        // calculate time and servings
        state.recipe.calcTime();
        state.recipe.calcServings();
        

        clearLoader();
        recipeView.renderRecipe(state.recipe);


    }
}

elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');

    if(btn){
        const goToPage = +btn.dataset.goto;
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage);       
    }

});

window.addEventListener('hashchange', () => {
    controlRecipe();
})

window.addEventListener('load', () => {
    controlRecipe();
})

elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        // Decrease button
        console.log('-')
    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        // Increase button
        console.log('+')

    }
})



