import { atom, useAtomValue, useSetAtom } from 'jotai'

export const isOpenModalAtom = atom(false)

export const useLoginModalWrite = () => {
  const setModal = useSetAtom(isOpenModalAtom)

  return {
    setIsOpenModal: (isOpen: boolean) => setModal(isOpen),
    openModal: () => setModal(true),
    closeModal: () => setModal(false),
    toggleModal: () => setModal(prev => !prev)
  }
}
export const useLoginModalRead = () => {
  const state = useAtomValue(isOpenModalAtom)
  return {
    isOpen: state
  }
}
export const useLoginModal = () => {
  return {
    ...useLoginModalRead(),
    ...useLoginModalWrite()
  }
}
