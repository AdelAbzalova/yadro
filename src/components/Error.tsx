import { Alert } from 'antd'
const Error = () => {
  return (
    <>
      <Alert
        message="Ошибка"
        description="Не удалось получить данные"
        type="error"
        showIcon
      />
    </>
  )
}

export default Error
