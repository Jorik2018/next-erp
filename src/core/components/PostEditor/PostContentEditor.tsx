'use client'

import { useRouter } from 'next/navigation'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'

import { PostComponent, renderEditableComponent } from '../../helpers/post'
import { POST_PAGE } from '../../constants/endpoints/ui'
import EmptyField from './PostComponents/EmptyField'
import { CircleButton } from '../Button'
import { InputField } from '../Form'
import Card from '../Card'

type FormValues = {
  title: string
}

type CreatePostData = {
  createPost: {
    success: boolean
    post?: {
      _id: string
    }
    err?: {
      message?: string
    }
  }
}

type CreatePostVariables = {
  title: string
  recipe: string
  isPublic: boolean
  classroomID: string
}

type PostContentEditorProps = {
  showComponentsSelectorModal: () => void
  showEditPostComponentModal: (...args: any[]) => void
  showPostPreviewModal: () => void
  removePostComponent: (...args: any[]) => void
  showLoadingModal: () => void
  hideLoadingModal: () => void
  classroomID: string
  resetPost: () => void
  receipe: PostComponent[]
}

const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $recipe: String!
    $isPublic: Boolean!
    $classroomID: String!
  ) {
    createPost(
      title: $title
      recipe: $recipe
      isPublic: $isPublic
      classroomID: $classroomID
    ) {
      success
      post {
        _id
      }
      err {
        message
      }
    }
  }
`

export default function PostContentEditor({
  receipe,
  resetPost,
  classroomID,
  removePostComponent,
  showLoadingModal,
  hideLoadingModal,
  showPostPreviewModal,
  showEditPostComponentModal,
  showComponentsSelectorModal,
}: PostContentEditorProps) {
  const router = useRouter()

  const { register, handleSubmit } = useForm<FormValues>()

  const [createPost] = useMutation<CreatePostData, CreatePostVariables>(
    CREATE_POST_MUTATION,
  )

  const savePost = async ({ title }: FormValues) => {
    try {
      showLoadingModal()

      if (!title?.trim()) {
        alert('Title is required')
        return
      }

      if (!receipe.length) {
        alert('Post must have at least one component')
        return
      }

      const result = await createPost({
        variables: {
          title,
          classroomID,
          isPublic: false,
          recipe: JSON.stringify(receipe),
        },
      })

      const { success, post } = result.data?.createPost ?? {}

      if (success && post?._id) {
        router.push(`${POST_PAGE}?id=${post._id}`)
      } else {
        alert('failed')
      }
    } catch {
      alert('failed')
    } finally {
      hideLoadingModal()
    }
  }

  return (
    <form onSubmit={handleSubmit(savePost)}>
      <Card $fluidWidth $padding="2em" $marginBottom="2em">
        <InputField
          required
          type="text"
          label="ชื่อโพส"
          {...register('title')}
        />
      </Card>

      <Card $fluidWidth $noShadow $padding="2em" $marginBottom="4em">
        {renderEditableComponent(
          receipe,
          removePostComponent,
          showEditPostComponentModal,
        )}

        <EmptyField onClick={showComponentsSelectorModal} />
      </Card>

      {receipe.length > 0 && (
        <div>
          <CircleButton
            $light
            $right="3em"
            $bottom="17em"
            type="button"
            $position="fixed"
            $padding="1.3em 1em"
            onClick={resetPost}
          >
            รีเซ็ต
          </CircleButton>

          <CircleButton
            $light
            $padding="1.3em 1em"
            $position="fixed"
            type="button"
            $bottom="11em"
            $right="3em"
            onClick={showPostPreviewModal}
          >
            พรีวิว
          </CircleButton>

          <CircleButton
            $primary
            $right="3em"
            $bottom="5em"
            type="submit"
            $position="fixed"
            $padding="1.3em 1em"
          >
            บันทึก
          </CircleButton>
        </div>
      )}
    </form>
  )
}