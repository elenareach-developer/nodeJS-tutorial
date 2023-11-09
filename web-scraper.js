const axios = require('axios');
const cheerio = require('cheerio')

const url = 'https://nodejs.org/en/about';

//get the document

axios.get(url)
    .then((responce)=>{

        if(responce.status == 200){
            const $ = cheerio.load(responce.data)
            //for example title
                const pageTitle = $('title').text();
                console.log(`Page title: ${pageTitle}`)

                $('a').each((index, element) => {
                    const linkText = $(element).text;
                    const linkHref = $(element).attr('href')
                    console.log(`Link ${index +1 }: ${linkText} (${linkHref})`);
                })
                

        }else{
            console.error("We did not get data from the url")
        }

    })
    .catch((error)=>{
        console.error(`Error from reading uri ${error.message}`)
    })