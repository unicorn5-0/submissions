const dummy = (blogs) => {
    if (typeof(blogs) === 'object') {
        return 1
    }
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
   
    const reducer = (sum, item) => {
    
        return sum + item
        
    }
    
    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (prev, current) => {
        
        return (prev && prev.likes > current.likes) ? prev : current
    }

    const max = blogs.reduce(reducer, 0)
    
    return {
            title: max.title,
            author: max.author,
            likes: max.likes
          }
}

const mostBlogs = (blogs) => {
    const reducer = (prev, current) => {
        return (prev && prev.blogs > current.blogs) ? prev : current
    }

    const max = blogs.reduce(reducer, 0)
    
    return {
            author: max.author,
            likes: max.blogs
          }
    
}

const mostLikes = (blogs) => {
    const reducer = (prev, current) => {
        return (prev && prev.likes > current.likes) ? prev : current
    }

    const max = blogs.reduce(reducer, 0)
    
    return {
            author: max.author,
            likes: max.likes
          }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}