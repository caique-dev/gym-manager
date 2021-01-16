const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')

for (const item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) item.classList.add('active')
}

// Pagination
function paginate(selectedPage, totalPages) {
    let oldPage,
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

    return pages
}

function instacePaginate() {
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ''

    for (let page of pages) {
        if (String(page).includes('...')) elements += `<span>${ page }</span>`
        else elements += `<a href="?page=${ page }&filter=${ filter }">${ page }</a>`
    }

    pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')

if (pagination) instacePaginate()