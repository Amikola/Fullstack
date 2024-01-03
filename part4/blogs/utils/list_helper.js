const _ = require('lodash')

const dummy = (blogs) => {
return 1
}


const totalLikes = (blogs) => {
    let total = 0 

    blogs.forEach(element => {
        total = total + element.likes
    });

    return total
    }
const favoriteBlog = (blogs) => {
        let best = {
            title: "null",
            author: "null",
            likes: 0
          }
    
        blogs.forEach(element => {
            if (element.likes  >= best.likes){
                best = {
                    title: element.title,
                    author: element.author,
                    likes: element.likes
                  }
            }
        });
    
        return best
        }

const mostBlogs = (blogs) => {
    
    const authors = blogs.map(element => element.author)
    const  counted = _.countBy(authors)

    let best = {
        author: "null",
        blogs: 0
    }
    _.forEach(counted , function (value, key)  {

        best = {
            author: key,
            blogs: value
        }

    }
    )

    return best

}


const mostLikes = (blogs) => {

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
      }

    const authors = blogs.map(element => element.author)
    const uniqueAut = authors.filter(onlyUnique)

    let best  = {
        author: "null",
        likes: 0
    } 

    uniqueAut.forEach( element => {
        
       const filter = blogs.filter(inner => inner.author === element)
         
        let likes = 0
        
        filter.forEach(element => likes = likes + element.likes)

        if (likes  >= best.likes ) {
            
            best = {
                author: element,
                likes: likes

            }
        
        }
    })
    
    

    return best 

}



  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }