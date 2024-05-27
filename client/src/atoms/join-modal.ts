import { atom, useAtomValue, useSetAtom } from 'jotai'

export const isOpenModalAtom = atom(false)

export const useJoinModalWrite = () => {
  const setModal = useSetAtom(isOpenModalAtom)

  return {
    setIsOpenModal: (isOpen: boolean) => setModal(isOpen),
    openModal: () => setModal(true),
    closeModal: () => setModal(false),
    toggleModal: () => setModal(prev => !prev)
  }
}
export const useJoinModalRead = () => {
  const state = useAtomValue(isOpenModalAtom)
  return {
    isOpen: state
  }
}
export const useJoinModal = () => {
  return {
    ...useJoinModalRead(),
    ...useJoinModalWrite()
  }
}
