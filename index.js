let fruits = [
    { id: 1, title: 'Aple', price: 20, img: 'https://cdn.pixabay.com/photo/2016/11/18/13/47/apple-1834639_960_720.jpg' },
    { id: 2, title: 'Aplesun', price: 30, img: 'https://media.istockphoto.com/photos/orange-fruit-isolated-on-a-white-background-picture-id494037460?s=612x612' },
    { id: 3, title: 'Mango', price: 40, img: 'https://images.freeimages.com/images/small-previews/0cd/mango-1327290.jpg' },
]

const toHTML = function (fruit) {
    return `<div class="col">
        <div class="card">
            <img src="${fruit.img}" style="height: 300px; width: 300px;" class="card-img-top" alt="${fruit.title}"/>
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Check price</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}" >Delete</a>
            </div>
        </div>
    </div>`;
}

function render() {
    const html = fruits.map(toHTML).join('');
    document.getElementById('fruits').innerHTML = html;
}

render()

const priceModal = $.modal({
    title: 'Price for item menu',
    closeable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Close', type: 'primary', handler() {
                priceModal.close();
            }
        }
    ]
});

document.addEventListener('click', (ev) => {
    ev.preventDefault;
    const btnType = ev.target.dataset.btn;
    const id = +ev.target.dataset.id;
    const fruit = fruits.find(f => f.id === id);
    if (btnType === 'price') {
        priceModal.setContent(`
        <p>${fruit.title}: <strong>${fruit.price}</strong></p>`);
        priceModal.open();
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Are you sure?',
            content: `<p>You delete <strong>${fruit.title}</strong></p>`,
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id);
            render();
        }).catch(() => {
            console.log('Cancel was cliked');
        });
    }
})
