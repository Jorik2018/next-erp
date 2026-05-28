'use client'

import { ModalBackground } from './Modal'
import LoadingIcon from './LoadingIcon'

type LoadingScreenModalProps = {
  isLoading: boolean
}

export default function LoadingScreenModal({
  isLoading,
}: LoadingScreenModalProps) {
  /*+Type '{ style: { margin: string; }; }' is not assignable to type 'IntrinsicAttributes'.
  Property 'style' does not exist on type 'IntrinsicAttributes'.ts(2322)
(property) style: {
    margin: string;
}+*/
  return (
    <ModalBackground $show={isLoading}>
      <LoadingIcon style={{ margin: '5em auto' }} />
    </ModalBackground>
  )
}