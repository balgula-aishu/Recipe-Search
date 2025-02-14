let form = document.querySelector("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let recipe_name = document.getElementById("search_recipes").value;
     let fetchRecipes=async()=>{
        let recipes=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe_name}`);
        let finalRecipeData = await recipes.json();
        console.log(finalRecipeData.meals)
        let container=document.getElementById("container");
        container.innerHTML=``;
        finalRecipeData.meals.forEach((ele)=>{
            
            // container.innerHTML+=`
            // <div id="recipe_item">
            // <img src=${ele.strMealThumb} id="food_img">
            // <h2 id="food_name">${ele.strMeal}</h2>
            // <button id="view_recipe">View Recipe</button>
            // </div>
            // `
            let recipe_item=document.createElement("div")
            recipe_item.setAttribute("id","recipe_item")

            container.appendChild(recipe_item)

            let food_img=document.createElement("img")
            food_img.src=`${ele.strMealThumb}`
            food_img.setAttribute("id","food_img")

            let food_name=document.createElement("h2")
            food_name.innerHTML=`${ele.strMeal}`
            food_name.setAttribute("id","food_name")

            let view_recipe=document.createElement("button")
            view_recipe.innerHTML=`View Recipe`
            view_recipe.setAttribute("id","view_recipe")

            recipe_item.append(food_img,food_name,view_recipe)

            let ing_ins=document.querySelector("#ing_ins")
            view_recipe.addEventListener("click",()=>{
                // console.log(ing_ins)
               ing_ins.style.display="block"
               let ing_info=document.getElementById("ing_info")
               ing_info.innerHTML=""
               let ul=document.createElement("ul")
               for(i=1;i<=20;i++){
                let ingredient=ele[`strIngredient${i}`]
                let measure=ele[`strMeasure${i}`]
                let li=document.createElement("li")
                if(ingredient!=""){
                    li.innerHTML=`${ingredient}-${measure}`
                    ul.appendChild(li)
                }
               }
               let h1=document.createElement("h1")
               h1.innerHTML="INGREDIENTS"
               ing_info.append(h1,ul)
               let ins_info=document.getElementById("ins_info")
               ins_info.innerHTML=`
               <h1>INSTRUCTIONS<h1>
               <p>${ele.strInstructions}</p>
               `

            })
            let close=document.querySelector("#close")
            // console.log(close)
            close.addEventListener("click",()=>{
                ing_ins.style.display="none"
            })
        })
     }
     fetchRecipes()
})
