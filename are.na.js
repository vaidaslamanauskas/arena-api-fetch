console.log('JS is loaded');

// Are.na's base API url
const api = 'https://api.are.na/v2/channels/';

// Get grid element from index.html
const blocks_el = document.querySelector('#blocks');

let sites = [];
let current_page = 1;

async function getSites (page) {
    // Fetch all items from Are.na's channel
    fetch(`${api}model-sites?&page=${page}&per=10`)
    .then(res => res.json())
    .then((data) => {
        let total_pages = data.length;

        document.querySelector('#blocks').dataset.total_pages = total_pages;

        sites = data.contents.filter(item => item.class == 'Link');
      
        //sites.reverse();

        // console.log('sites:', sites.length);

        data.contents.forEach((item => {

            let site = sites.pop();
            console.log(site);

            const newDiv = document.createElement("div");
          
            const currentDiv = document.querySelector("#blocks");
            
            currentDiv.appendChild(newDiv);
          
            
            //item.href = site.source.url
          
            newDiv.innerHTML = `
                <img src="${site.image.square.url}">
            `;
            
    
        }));

        blocks_el.style.display = 'grid';
        document.querySelector('#spinner').style.display = 'none';
      
      
        button.innerHTML = 'load more';

        
    });
}

getSites(1);

var button = document.querySelector('#load-more');

button.addEventListener('click', () => {
        
    //let old_blocks = document.querySelectorAll('.block');
  
    //for (block of old_blocks) {
    //    block.href = '';
    //    block.innerHTML = '';
    //}
  
    button.innerHTML = 'loading ..';
  
    let total_pages = document.querySelector('#blocks').dataset.total_pages;

    if (current_page <= total_pages) {
        current_page++;
      
    } else {
        current_page = 1;
        
        button.style.background = 'violet';
    }

    getSites(current_page);

    console.log(current_page);

});
