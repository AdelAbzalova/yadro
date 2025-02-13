import { useNavigate, useParams } from 'react-router-dom'
import { postsApi } from '../services/posts'
import { Avatar, Button, Card, Divider, Flex } from 'antd'
import Error from '../components/Error'
import Loader from '../components/Loader'
const { Meta } = Card

const PostPage = () => {
  const { id } = useParams()
  const {
    data,
    isError: isPostError,
    isLoading,
  } = postsApi.useGetPostByIdQuery(id || '')

  const { data: comments, isError: isCommentsError } =
    postsApi.useGetPostCommentsQuery(id || '')
  const navigate = useNavigate()
  const storedPost = JSON.parse(localStorage.getItem(`post-${id}`) || 'null')

  const post = storedPost || data

  if (isLoading) return <Loader />
  if (isPostError) return <Error />

  return (
    <div>
      {post && (
        <div>
          <h2>{post.title}</h2>
          <div>
            <em style={{ fontSize: '20px' }}>{post.body}</em>
          </div>

          <Button
            style={{ marginTop: 10 }}
            type="primary"
            onClick={() => navigate(`/post/${id}/edit`)}
          >
            Редактировать
          </Button>
        </div>
      )}

      <Divider />

      <div style={{ maxWidth: 1000 }}>
        <h4>Comments</h4>
        {isCommentsError ? (
          <Error />
        ) : (
          <Flex vertical gap="20px">
            {comments?.map(comment => (
              <div key={comment.id}>
                <Card>
                  <Meta
                    avatar={<Avatar>{comment.name[0].toUpperCase()}</Avatar>}
                    title={comment.name}
                  />
                  <div></div>
                  <div>{comment.body}</div>
                </Card>
              </div>
            ))}
          </Flex>
        )}
      </div>
    </div>
  )
}

export default PostPage
