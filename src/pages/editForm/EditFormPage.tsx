import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { postsApi } from '../../services/posts'
import { useEffect } from 'react'
import styles from './EditFormPage.module.css'

const EditFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: post } = postsApi.useGetPostByIdQuery(id || '')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  useEffect(() => {
    const storedPost = JSON.parse(localStorage.getItem(`post-${id}`) || 'null')
    if (post) {
      reset(storedPost || { title: post.title, body: post.body })
    }
  }, [post, reset, id])

  const onSubmit: SubmitHandler<FieldValues> = data => {
    localStorage.setItem(`post-${id}`, JSON.stringify(data))
    navigate(`/post/${id}`)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <label>
          <h3>Название</h3>

          <textarea
            className={styles.field}
            style={{ resize: 'none' }}
            maxLength={120}
            cols={50}
            {...register('title', {
              required: 'Обязательное поле',
              minLength: {
                value: 5,
                message: 'Минимум 5 символов',
              },
            })}
          />
          <div className={styles.error}>
            {errors.title && <p>{errors.title.message as string}</p>}
          </div>
        </label>
        <label>
          <h3>Описание</h3>

          <textarea
            className={`${styles.field} ${styles.description}`}
            maxLength={1200}
            style={{ resize: 'none' }}
            {...register('body', {
              required: 'Обязательное поле',
              minLength: {
                value: 5,
                message: 'Минимум 5 символов',
              },
            })}
          />
          <div className={styles.error}>
            {errors.body && <p>{errors.body.message as string}</p>}
          </div>
        </label>

        <button>Сохранить</button>
      </form>
    </>
  )
}

export default EditFormPage
