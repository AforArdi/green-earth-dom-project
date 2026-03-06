const catagoriesContainer = document.getElementById('catagories-container');
const laodCatagories=async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();
    // displayCatagories(data);
    data.categories.forEach((category)=>{
        console.log(category);
        const newBtn = document.createElement('div');
        newBtn.innerHTML = `
        <div>
            <button class="btn btn-outline btn-outline w-full">${category.category_name}</button>
        </div>
        `;
        catagoriesContainer.append(newBtn);
    });
}

// below display function is also working about showing the categories
// const displayCatagories=(data)=>{
//     const catagoriesContainer = document.getElementById('catagories-container');
//     data.categories.forEach(element => {
//         const newE = document.createElement('div');
//         newE.innerHTML = `
//         <div>
//             <button class="btn btn-outline btn-secondary w-full">${element.category_name}</button>
//         </div>
//         `;
//         catagoriesContainer.append(newE);
//     });
// }

laodCatagories();