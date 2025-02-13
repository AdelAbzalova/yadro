import { useNavigate } from 'react-router-dom'
import { Post } from '../models/Post'
import { Card } from 'antd'

type ListItemProps = {
  post: Post
}

const ListItem = ({ post }: ListItemProps) => {
  const navigate = useNavigate()

  return (
    <Card title={post.title} onClick={() => navigate(`/post/${post.id}`)}>
      <p>{post.body}</p>
    </Card>
  )
}

export default ListItem
