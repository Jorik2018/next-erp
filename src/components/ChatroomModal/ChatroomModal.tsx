import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { CLASSROOM_CHATROOM_PAGE } from '../../constants/endpoints/ui'
import { NotificationItem } from '../NotificationPanel'
import { ModalBackground, ModalPanel } from '../Modal'
import { Header, Body, Footer } from '../Card'
import { Button } from '../Button'
import { hideChatroomModal, showChatroomModal } from '@/lib/slices/chatroom-modal'

// hide this modal if the current url is /chatroom?c=???
const ChatroomModal = () => {

  const dispatch = useDispatch()

  const isModalShowing = useSelector(
    (state: any) => state.chatroomModal
  )

  return <ModalBackground $show={isModalShowing}>
    <ModalPanel $large>
      <Header>ข้อความที่ส่งถึงคุณ</Header>
      <Body $overflowY="scroll" $height="600px">
        {/* {}  */}
        {[0, 1, 2, 3, 4, 5, 6].map((_, i) => (
          <Link href={CLASSROOM_CHATROOM_PAGE} prefetch key={i}>
            <NotificationItem
              origin="Introduction to Computer Science"
              content="ไสดมวไำดยสเนาฟบไำานดำฟสาดร่เพเาๆขนายำสกยบากนฟกานฟหากจๆไำาดชๆสยไำนด่ำไจาเ"
            />
          </Link>
        ))}
      </Body>
      <Footer>
        <Button $light onClick={() => dispatch(hideChatroomModal())}>
          ปิด
        </Button>
      </Footer>
    </ModalPanel>
  </ModalBackground>
}

const mapStateToProps = (state: any) => ({
  isModalShowing: state.chatroomModal
})

const mapDispatchToProps = (dispatch: any) => ({
  showModal: () => dispatch(showChatroomModal()),
  hideModal: () => dispatch(hideChatroomModal())
})
export default ChatroomModal
