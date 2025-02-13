import { Flex, Pagination } from 'antd'
import { postsApi } from '../services/posts'
import ListItem from '../components/ListItem'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { useSearchParams } from 'react-router'

const ListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 5

  const { data, isError, isLoading } = postsApi.useGetPostsQuery({
    limit,
    page,
  })
  const posts = data?.map(post => {
    const storedPost = localStorage.getItem(`post-${post.id}`)
    return storedPost ? { ...post, ...JSON.parse(storedPost) } : post
  })
  const handlePaginationChange = (newPage: number, newLimit: number) => {
    setSearchParams({ page: newPage.toString(), limit: newLimit.toString() })
  }

  if (isLoading) return <Loader />
  if (isError) return <Error />

  return (
    <>
      <Flex vertical gap="20px">
        {posts?.map(post => <ListItem key={post.id} post={post} />)}
      </Flex>
      <Pagination
        total={100}
        defaultPageSize={limit}
        onChange={handlePaginationChange}
        pageSizeOptions={[1, 5, 10, 20, 50]}
      />
    </>
  )
}

export default ListPage
