const catagoriesContainer = document.getElementById('catagories-container');
const treesContainer = document.getElementById('trees-container');
const spinner = document.getElementById('spinner');
const treeDetailsModal = document.getElementById('tree-details-modal');
const modalDetailsContainer = document.getElementById('modal-details-container');

// manage loading
const showLoading=(status)=>{
    if(status==true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('trees-container').classList.add('hidden');
    } else{
        document.getElementById('trees-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}
// treeDetailsModal + showTreeModal
const loadTreeModal= async(treeId)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${treeId}`);
    const data = await res.json();
    showTreeModal(data.plants);
}
const showTreeModal=(tree)=>{
    // class="line-clamp-3"
    modalDetailsContainer.innerHTML = `
        <div class="flex justify-between items-center">
            <h2 class="card-title cursor-pointer">${tree.name}</h2>
            <form method="dialog">
                <button class="btn btn-xs rounded-full">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </form>
        </div>

        <p class="text-justify">${tree.description}</p>
        <div class="badge badge-outline">${tree.category}</div>
        <div class="card-actions justify-between items-center">
        <h2 class="font-bold text-2xl">$${tree.price}</h2>
        <button class="btn btn-secondary">Cart</button>
        </div>
    `;
    treeDetailsModal.showModal();
}


// button remove active class
const removeActiveClass=()=>{
    const allCategoryBtn = document.querySelectorAll('.categoryBtn, #allTreesbtn');
    allCategoryBtn.forEach((btn)=> {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
    });
}
const setActiveBtn=(btn)=>{
    removeActiveClass();
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-outline');
}

// button onclick
const loadCategory = async (id) => {
    showLoading(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const data = await res.json();
    // button active class code
    removeActiveClass();
    const clickedBtn = document.getElementById(`categoryBtn-${id}`);
    // console.log(clickedBtn);
    setActiveBtn(clickedBtn);
    
    showLoading(false);

    // showCategory(data.plants);
    displayTrees(data);
}
// const showCategory = (plants) => {
//     treesContainer.innerHTML = ''; // clear old cards first

//     plants.forEach((plant) => {
//         const filteredTreeCard = document.createElement('div');
//         filteredTreeCard.innerHTML = `
//             <div class="card bg-base-100 shadow-sm h-[450px]">
//             <figure>
//                 <img
//                 src="${plant.image}"
//                 alt="${plant.name}"
//                 title="${plant.name}" />
//             </figure>
//             <div class="card-body">
//                 <h2 class="card-title">${plant.name}</h2>
//                 <p class="line-clamp-2">${plant.description}</p>
//                 <div class="badge badge-outline">${plant.category}</div>
//                 <div class="card-actions justify-between items-center">
//                     <h2 class="font-bold text-2xl">$${plant.price}</h2>
//                     <button class="btn btn-secondary">Cart</button>
//                 </div>
//             </div>
//         </div>
//         `;
//         treesContainer.append(filteredTreeCard);
//     });
// }
document.getElementById('allTreesbtn').addEventListener('click', () => {
    removeActiveClass();

    const allTreesBtn = document.getElementById('allTreesbtn');
    setActiveBtn(allTreesBtn);

    loadTreeCard();
});

// loading + displaying left side category btn
const laodCatagories=async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();
    // displayCatagories(data);
    data.categories.forEach((category)=>{
        // console.log(category);
        const newBtn = document.createElement('div');
        newBtn.innerHTML = `
        <div>
            <button onclick="loadCategory(${category.id})" id="categoryBtn-${category.id}" class="btn btn-outline w-full categoryBtn">${category.category_name}</button>
        </div>
        `;
        catagoriesContainer.append(newBtn);
    });
}

// loading main tree cards
const loadTreeCard=async()=>{
    showLoading(true);
    const res = await fetch('https://openapi.programming-hero.com/api/plants')
    const data = await res.json();
    showLoading(false);
    displayTrees(data);
}

// displaying main tree cards
const displayTrees=(data)=>{
    treesContainer.innerHTML = '';
    data.plants.forEach((tree)=>{
        const newTreeCard = document.createElement('div');
        newTreeCard.innerHTML = `
        <div id="treeCard" class="card bg-base-100 shadow-sm h-[450px]">
            <figure>
                <img
                src="${tree.image}"
                alt="${tree.name}"
                title="${tree.name}" />
            </figure>
            <div class="card-body">
                <h2 onclick="loadTreeModal(${tree.id})" class="card-title cursor-pointer">${tree.name}</h2>
                <p class="line-clamp-2">${tree.description}</p>
                <div class="badge badge-outline">${tree.category}</div>
                <div class="card-actions justify-between items-center">
                    <h2 class="font-bold text-2xl">$${tree.price}</h2>
                    <button class="btn btn-secondary">Cart</button>
                </div>
            </div>
        </div>
        `;
        treesContainer.append(newTreeCard);
    })
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
loadTreeCard();