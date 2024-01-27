const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
})

describe('favorite blog', () => {
    const listBlogs = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 15,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    ]
  
    test('return author with the most blogs', () => {
      const result = listHelper.favoriteBlog(listBlogs)
      expect(result).toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 15,
      },)
    })
})

describe('most blogs', () => {
    const listBlogs = [
      {
        title: "Canonical string reduction",
        author: 'Edsger W. Dijkstra',
        blogs: 15,
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: "Alto O. Jeckins",
        blogs: 12
      },
      {
        title: "Jest just got bigger",
        author: "Robert C. Martin",
        blogs: 8
      }
    ]
  
    test('return author who has most blogs', () => {
      const result = listHelper.mostBlogs(listBlogs)
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 15,
      },)
    })
})

describe('most likes', () => {
    const listBlogs = [
      {
        title: "Canonical string reduction",
        author: 'Edsger W. Dijkstra',
        likes: 15,
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: "Alto O. Jeckins",
        likes: 12
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: "Robert C. Martin",
        likes: 8
      }
    ]
  
    test('return blog with the most likes', () => {
      const result = listHelper.mostLikes(listBlogs)
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 15
      })
    })
})