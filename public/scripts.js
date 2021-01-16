const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')

for (const item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) item.classList.add('active')
}

// Pagination
let totalPages = 20,
    selectedPage = 20,
    oldPage,
    pages = []

for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastpage = currentPage == 1 || currentPage ==20
    const pagesAfter = currentPage >= selectedPage - 2
    const pagesBefore = currentPage <= selectedPage + 2

    if (firstAndLastpage || pagesAfter && pagesBefore) {

        if (oldPage && currentPage - oldPage > 2) pages.push('...')
        if (oldPage && currentPage - oldPage == 2) pages.push(oldPage + 1)
        
        pages.push(currentPage)

        oldPage = currentPage
    }
}

console.log(pages)