let counter = 0

const plus_icon = document.getElementById('plus_icon')
const minus_icon = document.getElementById('minus_icon')
const count = document.getElementById('count')
const previous_icon = document.getElementById('previous_icon')
const next_icon = document.getElementById('next_icon')
const product_img = document.getElementById('product_img_list')
const add_to_cart_btn = document.getElementById('btn_container')

const hamburger_icon_container = document.querySelector(
  '.hamburger_icon_container'
)
const close_icon_container = document.querySelector('.close_icon_container')
const nav_links_container = document.querySelector('.nav_links_container')

const cart_icon_container = document.getElementById('cart_icon_container')
const item_count = document.getElementById('item-count')

const checkout_preview_container = document.getElementById(
  'checkout_preview_container'
)
const checkout_preview_item = document.getElementById('checkout_preview_item')
let checkout_preview_item_delete = document.getElementById(
  'checkout_preview_item_delete'
)

const checkout_preview_item_price = document.getElementById(
  'checkout_preview_item_price'
)
const checkout_preview_item_total_price = document.getElementById(
  'checkout_preview_item_total_price'
)
const checkout_preview_btn = document.getElementById('checkout_preview_btn')

const main_img = document.getElementById('main_img')
const thumbnail_images = document.querySelectorAll('.thumbnail_img')

function removeItem() {
  counter = 0
  count.textContent = counter
  item_count.textContent = counter

  checkout_preview_item.innerHTML = `<div class="checkout_preview_empty">Your cart is empty</div>`

  if (!checkout_preview_btn.classList.contains('none'))
    checkout_preview_btn.classList.add('none')
}
function getProductNumber(url) {
  // Extract the filename from the URL
  const filename = url.split('/').pop()

  // Extract the product number from the filename (assuming it's the first part before the hyphen)
  const productNumber = filename.split('-')[2]

  return productNumber
}

hamburger_icon_container.addEventListener('click', () => {
  nav_links_container.classList.add('show')
})

close_icon_container.addEventListener('click', () => {
  nav_links_container.classList.remove('show')
})

plus_icon.addEventListener('click', () => {
  counter++
  count.textContent = counter
})

minus_icon.addEventListener('click', () => {
  if (counter > 0) counter--
  count.textContent = counter
})

previous_icon.addEventListener('click', () => {
  // Get the current left style value as a number
  const currentLeft = parseFloat(product_img.style.left) || 0 // Handle cases where left is not set

  // Calculate the new left position
  let newLeft = currentLeft + 100 // Subtract 100vw from the current value

  if (newLeft > 0) newLeft = -300

  if (product_img.children.length * 100 <= Math.abs(newLeft)) {
    newLeft = 0
  }

  // Set the new left style with units (vw)
  product_img.style.left = `${newLeft}vw`
})

next_icon.addEventListener('click', () => {
  // Get the current left style value as a number
  const currentLeft = parseFloat(product_img.style.left) || 0 // Handle cases where left is not set

  // Calculate the new left position
  let newLeft = currentLeft - 100 // Subtract 100vw from the current value

  if (product_img.children.length * 100 <= Math.abs(newLeft)) {
    newLeft = 0
  }

  // Set the new left style with units (vw)
  product_img.style.left = `${newLeft}vw`
})

add_to_cart_btn.addEventListener('click', () => {
  item_count.textContent = counter

  if (counter > 0) {
    checkout_preview_item.innerHTML = `
            <div class="checkout_preview_item_img">
              <img src="./images/image-product-1-thumbnail.jpg" alt="" />
            </div>
            <div class="checkout_preview_item_desc">
              <div class="checkout_preview_item_name">
                Fall Limited Edition Sneakers
              </div>
              <div class="checkout_preview_item_price">
                $125.00 x ${counter}
                <span
                  class="checkout_preview_item_total_price"
                  id="checkout_preview_item_total_price"
                  >\$${(counter * 125).toFixed(2)}</span
                >
              </div>
            </div>
            <div class="checkout_preview_item_delete" id="checkout_preview_item_delete">
              <img src="./images/icon-delete.svg" alt="" />
            </div>
  `
    if (checkout_preview_btn.classList.contains('none'))
      checkout_preview_btn.classList.remove('none')
  } else {
    checkout_preview_item.innerHTML = `<div class="checkout_preview_empty">Your cart is empty</div>`

    if (!checkout_preview_btn.classList.contains('none'))
      checkout_preview_btn.classList.add('none')
  }

  checkout_preview_item_delete = document.getElementById(
    'checkout_preview_item_delete'
  )

  checkout_preview_item_delete.addEventListener('click', removeItem)
})

cart_icon_container.addEventListener('click', () => {
  checkout_preview_container.classList.toggle('none')
})

thumbnail_images.forEach((el) => {
  el.addEventListener('click', () => {
    main_img.src = `./images/image-product-${getProductNumber(
      el.children[1].src
    )}.jpg`
  })
})
