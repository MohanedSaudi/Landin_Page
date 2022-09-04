"use strict";
/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * create four-section  by javascript instead of HTML
 * i know it is best to do this by html
 * but i prefered to apply what i learnt
 */

function generateSections() {
  const mainElement = document.querySelector("main");
  for (let i = 1; i <= 4; i++) {
    const sectionElement = `<section id="section${i}" data-nav="Section ${i}">
    <div class="landing__container">
    <h2>Section ${i}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
    
    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </div>
    </section>`;
    mainElement.insertAdjacentHTML("beforeend", sectionElement);
  }
}
generateSections();

const mybutton = document.getElementById("myBtn");
const sections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");

// Build menu
function createNavigationList() {
  sections.forEach((section) => {
    // build the nav
    const listItem = document.createElement("li");
    listItem.innerHTML =  `<li><a href="#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a></li>`;
    navList.appendChild(listItem);
  });
}
createNavigationList();

/**
 * Here i use the getBoundingClientRect() method to get the size of the element and its relative position to the viewport
 * and, Compare the position of the element with the viewport height and width to check if the element is visible in the viewport or not
 * https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
 **/
function isInViewport(el) {
  const bounding = el.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

// calcualting when the section is active
function activeSection() {
  sections.forEach((section) => {
    /*
     * when section is in viewport then add "your-active-class"
     * else remove "your-active-class"
     */
    isInViewport(section)
      ? section.classList.add("your-active-class")
      : section.classList.remove("your-active-class");
  });
}
// event listener to the dom itself so
document.addEventListener("scroll", activeSection);

// When the user scrolls down 40px from the top of the page,
// get a button to scroll back to top of the page
window.onscroll = () => {
  document.body.scrollTop > 40 || document.documentElement.scrollTop > 40
    ? (mybutton.style.display = "block")
    : (mybutton.style.display = "none");
};

// When the user clicks on the button, the document will scroll to the top smoothly
// //https: www.w3schools.com/howto/howto_js_scroll_to_top.asp
mybutton.addEventListener("click", () => {
  document.body.scrollTo({ top: 0, behavior: "smooth" });
});

// when you click on nav links will go smoothly to the target section
navList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.dataset.nav) {
    document
      .getElementById(`${e.target.dataset.nav}`)
      .scrollIntoView({ behavior: "smooth" });
  }
});


const navbar = document.getElementById("navbar").querySelectorAll("li");
// when you click on the link it will be highlited
navbar.forEach((item) => {
  item.addEventListener("click", function (e) {
    navbar.forEach((item) => {
      // remove every navbarclick class added befoe in any list item
      item.classList.remove("navbarclick");
    });
    // add the class on the button
    item.classList.add("navbarclick");
  });
});

