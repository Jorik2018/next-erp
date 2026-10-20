import { ModalBackground } from './Modal'
import LoadingIcon from './LoadingIcon'

interface LoadingScreenModalProps {
  isLoading: boolean
}

const LoadingScreenModal = ({
  isLoading
}: LoadingScreenModalProps) => (
  <ModalBackground $show={isLoading}>
    <LoadingIcon style={{ margin: '5em auto' }} />
  </ModalBackground>
)

export default LoadingScreenModal