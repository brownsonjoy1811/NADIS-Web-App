







const searchValue = document.getElementById('searchValue')
const searchReturns = document.querySelector('#searchReturns')


const delete_productbtn = document.querySelector('#delete-product')

function delete_item(){
    delete_productbtn.parentElement.remove();
}

const items = ['Headphones', 'Speaker', 'Earpiece', 'Mouse', 'Keyboard', 'Laptop', 'Power Bank', 'Phone Charger', 'Toner Cartridge', 'Flash Drive']



function filterProduct(){
    
    const filterResult = []
    items.filter((item)=>{
    const checkProduct = item.includes(searchValue)
    filterResult.push(checkProduct)
    searchReturns.innerHTML = filterResult
})

}